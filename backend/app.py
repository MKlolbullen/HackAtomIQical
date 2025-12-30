import asyncio, json, os, shutil
from pathlib import Path
from typing import Dict, Any, List
import yaml
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

ROOT = Path.home()/".mini_trickest"
TOOLS_YAML = os.environ.get("TOOLS_FILE", str(Path(__file__).with_name("tools.yaml")))
WORKFLOWS_FILE = ROOT / "workflows.json"
ROOT.mkdir(parents=True, exist_ok=True)

def load_registry():
    with open(TOOLS_YAML, "r", encoding="utf-8") as f:
        data = yaml.safe_load(f)
    tools = {t["id"]: t for t in data["tools"]}
    return tools, data.get("global_env", {})

TOOLS, GLOBAL_ENV = load_registry()

app = FastAPI()

# CORS: honor ALLOWED_ORIGINS env (comma-separated). If wildcard, disable credentials.
_allowed_origins = os.environ.get("ALLOWED_ORIGINS", "*")
ALLOWED_ORIGINS = [o.strip() for o in _allowed_origins.split(",") if o.strip()]
allow_credentials = not (len(ALLOWED_ORIGINS) == 1 and ALLOWED_ORIGINS[0] == "*")
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=allow_credentials,
    allow_methods=["*"],
    allow_headers=["*"]
)

class ArgValue(BaseModel):
    value: Any

class NodeData(BaseModel):
    tool: str
    params: Dict[str, ArgValue] = Field(default_factory=dict)
    label: str = ""

class Node(BaseModel):
    id: str
    type: str = "tool"
    data: NodeData
    position: Dict[str, float] = None

class Edge(BaseModel):
    source: str
    target: str

class Workflow(BaseModel):
    id: str
    name: str
    nodes: List[Node]
    edges: List[Edge]

class RunRequest(BaseModel):
    workflow: Workflow
    project: str
    inputs: Dict[str, Any] = Field(default_factory=dict)

RUN_WS: Dict[str, List[WebSocket]] = {}

def topo(nodes: List[Node], edges: List[Edge]) -> List[str]:
    g = {n.id:set() for n in nodes}
    indeg = {n.id:0 for n in nodes}
    for e in edges:
        if e.source not in g or e.target not in g: continue
        if e.target not in g[e.source]:
            g[e.source].add(e.target)
            indeg[e.target]+=1
    q = [n.id for n in nodes if indeg[n.id]==0]
    order=[]
    while q:
        u=q.pop()
        order.append(u)
        for v in g[u]:
            indeg[v]-=1
            if indeg[v]==0: q.append(v)
    if len(order)!=len(nodes): raise HTTPException(400, "Cycle in workflow")
    return order

async def ws_broadcast(run_id: str, msg: Dict[str, Any]):
    """Send a message to all websockets for a run, pruning any dead ones."""
    clients = RUN_WS.get(run_id, [])
    if not clients:
        return
    dead: List[WebSocket] = []
    payload = json.dumps(msg)
    for ws in clients:
        try:
            await ws.send_text(payload)
        except Exception:
            dead.append(ws)
    if dead:
        for ws in dead:
            try:
                clients.remove(ws)
            except ValueError:
                pass

def apply_args(tool_def: Dict[str,Any], params: Dict[str,Any]) -> Dict[str,Any]:
    arg_specs = {a["name"]:a for a in tool_def.get("args", [])}
    values = {}
    for name, spec in arg_specs.items():
        if name in params:
            values[name] = params[name].value
        elif "default" in spec:
            values[name] = spec["default"]
        elif spec.get("required"):
            raise HTTPException(400, f"Missing required arg: {name}")
    return values

def build_command(tool_def: Dict[str,Any], values: Dict[str,Any], runtime_vars: Dict[str,str]):
    def render(s: str) -> str:
        for k,v in {**values, **runtime_vars}.items():
            s = s.replace("{{"+k+"}}", str(v))
        return s

    argv = []
    for part in tool_def["cmd"]:
        if isinstance(part, str):
            argv.append(render(part))
        elif isinstance(part, dict) and part.get("kind")=="arg":
            spec = part
            name = spec["name"]
            v = values.get(name)
            if v in (None, "", [], False):
                if v==0: pass
                else: continue
            flag = spec.get("flag")
            mode = spec.get("mode","value")  # value|bool|repeat|join
            if mode=="bool":
                if v: argv.append(flag)
            elif mode=="repeat":
                for item in v:
                    if flag: argv.extend([flag, str(item)])
                    else: argv.append(str(item))
            elif mode=="join":
                sep = spec.get("sep", ",")
                joined = sep.join(str(x) for x in (v if isinstance(v,list) else [v]))
                if flag: argv.extend([flag, joined])
                else: argv.append(joined)
            else:
                if flag: argv.extend([flag, str(v)])
                else: argv.append(str(v))
        else:
            raise HTTPException(400, f"Invalid cmd part in tool {tool_def['id']}: {part}")

    env = os.environ.copy()
    env.update(GLOBAL_ENV)
    for e in tool_def.get("env", []):
        name = e["name"]; val = e.get("value","")
        env[name] = render(val)
    return argv, env

async def pipe_logs(proc, node_id, run_id):
    async def pipe(stream, kind):
        async for line in stream:
            await ws_broadcast(run_id, {"type":"log","node":node_id,"stream":kind,"line":line.decode(errors="ignore")})
    await asyncio.gather(pipe(proc.stdout,"stdout"), pipe(proc.stderr,"stderr"))

async def run_node(node: Node, run_dir: Path, inputs: Dict[str,Any], run_id: str):
    tool = TOOLS.get(node.data.tool)
    if not tool: raise HTTPException(400, f"Unknown tool: {node.data.tool}")
    node_dir = run_dir / node.id
    node_dir.mkdir(parents=True, exist_ok=True)

    values = apply_args(tool, node.data.params)
    runtime_vars = {
        "workspace": str(node_dir),
        "input_file": inputs.get("input_file",""),
        "domain": inputs.get("domain",""),
        "url": inputs.get("url",""),
    }
    argv, env = build_command(tool, values, runtime_vars)

    await ws_broadcast(run_id, {"type":"node_status","node":node.id,"status":"running","argv":argv})

    cmd_exe = argv[0]
    if not shutil.which(cmd_exe):
        # MOCK MODE
        await ws_broadcast(run_id, {"type":"log","node":node.id,"stream":"stderr","line":f"MOCK: {cmd_exe} not found. Simulating execution."})
        out_def = tool.get("out", {})
        if out_def.get("path"):
            op = node_dir/out_def["path"]
            kind = out_def.get("kind", "txt")
            if kind in ("list:text", "txt", "stdout"):
                op.write_text("mock_output_1\nmock_output_2\n")
            elif kind == "jsonl":
                op.write_text('{"mock": "data_1"}\n{"mock": "data_2"}\n')
            elif kind == "dir":
                op.mkdir(parents=True, exist_ok=True)
                (op/"index.html").write_text("<html><body>Mock Report</body></html>")
            else:
                op.write_text("mock_data")
        rc = 0
    else:
        proc = await asyncio.create_subprocess_exec(*argv, cwd=str(node_dir),
                                                    stdout=asyncio.subprocess.PIPE,
                                                    stderr=asyncio.subprocess.PIPE,
                                                    env=env)
        await pipe_logs(proc, node.id, run_id)
        rc = await proc.wait()

    out_def = tool.get("out", {})
    produced = None
    if out_def.get("path"):
        op = node_dir/out_def["path"]
        if op.exists():
            produced = str(op)
            inputs["input_file"] = produced

    await ws_broadcast(run_id, {"type":"node_status","node":node.id,
                                "status":"ok" if rc==0 else "error",
                                "returncode": rc, "out": produced})
    return rc

@app.get("/api/tools")
def list_tools():
    return {"tools": list(TOOLS.values())}

@app.get("/api/health")
def health_check():
    return {"status": "ok"}

@app.post("/api/tools/install/{tool_id}")
def install_tool(tool_id: str):
    return {"status": "installed", "tool": tool_id}

@app.get("/api/workflows")
def list_workflows():
    if not WORKFLOWS_FILE.exists():
        return {"workflows": []}
    try:
        data = json.loads(WORKFLOWS_FILE.read_text())
        return {"workflows": data}
    except Exception:
        return {"workflows": []}

@app.post("/api/workflows")
def save_workflow(wf: Workflow):
    data = []
    if WORKFLOWS_FILE.exists():
        try:
            data = json.loads(WORKFLOWS_FILE.read_text())
        except Exception:
            data = []

    # Update if exists, else append
    idx = next((i for i, w in enumerate(data) if w["id"] == wf.id), -1)
    if idx >= 0:
        data[idx] = wf.model_dump()
    else:
        data.append(wf.model_dump())

    WORKFLOWS_FILE.write_text(json.dumps(data, indent=2))
    return {"status": "saved"}

@app.post("/api/run")
async def start_run(req: RunRequest):
    run_id = os.urandom(6).hex()
    proj_dir = ROOT/"projects"/req.project
    run_dir = proj_dir/"runs"/run_id
    run_dir.mkdir(parents=True, exist_ok=True)
    (run_dir/"workflow.json").write_text(req.workflow.model_dump_json())

    async def runner():
        await asyncio.sleep(1)
        try:
            order = topo(req.workflow.nodes, req.workflow.edges)
            node_map = {n.id:n for n in req.workflow.nodes}
            await ws_broadcast(run_id, {"type":"run_status","status":"started","run_id":run_id,"order":order})
            inputs = dict(req.inputs)
            for nid in order:
                rc = await run_node(node_map[nid], run_dir, inputs, run_id)
                if rc != 0:
                    await ws_broadcast(run_id, {"type":"run_status","status":"failed","run_id":run_id})
                    return
            await ws_broadcast(run_id, {"type":"run_status","status":"finished","run_id":run_id})
        except Exception as e:
            await ws_broadcast(run_id, {"type":"run_status","status":"error","error":str(e),"run_id":run_id})

    asyncio.create_task(runner())
    return {"run_id": run_id}

@app.websocket("/ws/run/{run_id}")
async def ws(run_id: str, websocket: WebSocket):
    await websocket.accept()
    RUN_WS.setdefault(run_id, []).append(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        RUN_WS[run_id].remove(websocket)
