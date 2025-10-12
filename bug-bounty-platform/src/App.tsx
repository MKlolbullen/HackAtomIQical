// @ts-nocheck
import { useEffect, useMemo, useState } from "react";
import ReactFlow, { Background, Controls, MiniMap, Edge, Node } from "reactflow";
import "reactflow/dist/style.css";
import type { Workflow, FlowNode, FlowEdge, ToolDef } from "./types";
import { listTools, startRun, connectRun } from "./api";
import ArgsPanel from "./ArgsPanel";

const initial: Workflow = {
  id: "wf1",
  name: "Recon→HTTPX→Nuclei",
  nodes: [
    { id: "n1", type: "tool", data: { tool: "subfinder", params: {}, label: "Subfinder" } },
    { id: "n2", type: "tool", data: { tool: "httpx", params: {}, label: "HTTPX" } },
    { id: "n3", type: "tool", data: { tool: "nuclei", params: {}, label: "Nuclei" } },
  ],
  edges: [{ id:"e1", source:"n1", target:"n2" }, { id:"e2", source:"n2", target:"n3" }],
};

export default function App(){
  const [wf,setWf]=useState<Workflow>(initial);
  const [selected, setSelected] = useState<string|null>(null);
  const [tools, setTools] = useState<Record<string,ToolDef>>({});
  const [runId, setRunId] = useState<string>();
  const [logs, setLogs] = useState<Record<string,string[]>>({});
  const [status, setStatus] = useState<Record<string,string>>({});

  useEffect(()=>{ listTools().then(r=>{
    const map: Record<string,ToolDef> = {}; r.tools.forEach((t:any)=> map[t.id]=t); setTools(map);
  }); },[]);

  function onArgsChange(nodeId: string, params: any){
    setWf(prev=>({ ...prev, nodes: prev.nodes.map(n=> n.id===nodeId ? ({...n, data: {...n.data, params}}) : n) }));
  }

  async function onRun(){
    const { run_id } = await startRun(wf, "local");
    setRunId(run_id);
    connectRun(run_id, (m)=>{
      if (m.type==="log") setLogs(p=>({...p,[m.node]:[...(p[m.node]||[]), m.line]}));
      if (m.type==="node_status") setStatus(p=>({...p,[m.node]: m.status}));
    });
  }

  const rfNodes: Node[] = wf.nodes.map((n,i)=>({ id:n.id, position:{x:150+i*260,y:160}, data:{label:n.data.label} }));
  const rfEdges: Edge[] = wf.edges;
  const selectedNode = useMemo(()=> wf.nodes.find(n=>n.id===selected) || null, [wf, selected]);

  // Full-window grid:
  // rows: [top navbar, center content, bottom terminal]
  // cols: [left tools, center canvas, right args]
  return (
    <div className="h-screen w-screen grid grid-rows-[48px_1fr_200px] grid-cols-[280px_1fr_340px]">
      {/* navigation_bar */}
      <div className="row-start-1 row-end-2 col-start-1 col-end-4 border-b bg-white flex items-center px-3 justify-between">
        <div className="flex items-center gap-3">
          <span className="font-semibold">mini‑Trickest</span>
          <button onClick={onRun} className="px-3 py-1 rounded bg-black text-white text-sm">Run</button>
          <span className="text-xs text-gray-500">Run ID: {runId||"—"}</span>
        </div>
        <div className="text-xs text-gray-500">Builder / Runner</div>
      </div>

      {/* tools_area */}
      <div className="row-start-2 row-end-3 col-start-1 col-end-2 border-r overflow-auto">
        <div className="p-2 font-semibold">Tools</div>
        <div className="p-2 space-y-1">
          {Object.values(tools).map((t:any)=>(
            <div key={t.id} className="px-2 py-1 text-sm border rounded hover:bg-gray-50">{t.label||t.id}</div>
          ))}
        </div>
      </div>

      {/* workflow canvas */}
      <div className="row-start-2 row-end-3 col-start-2 col-end-3 relative">
        <ReactFlow
          nodes={rfNodes}
          edges={rfEdges}
          onNodeClick={(_,node)=>setSelected(node.id)}
          onPaneClick={()=>setSelected(null)}
        >
          <MiniMap/><Controls/><Background/>
        </ReactFlow>
      </div>

      {/* argument_area */}
      <div className="row-start-2 row-end-3 col-start-3 col-end-4 border-l overflow-auto">
        <ArgsPanel node={selectedNode} tools={tools} onChange={onArgsChange}/>
      </div>

      {/* terminal_area */}
      <div className="row-start-3 row-end-4 col-start-1 col-end-4 border-t overflow-hidden">
        <div className="h-full grid grid-cols-3">
          {wf.nodes.map(n=>(
            <div key={n.id} className="border-r p-2 overflow-auto">
              <div className="flex justify-between mb-1">
                <b className="text-sm">{n.data.label}</b>
                <span className={`text-xs ${status[n.id]==="running"?"text-yellow-600":status[n.id]==="ok"?"text-green-600":status[n.id]==="error"?"text-red-600":"text-gray-400"}`}>
                  {status[n.id]||"idle"}
                </span>
              </div>
              <pre className="text-[11px] whitespace-pre-wrap">{(logs[n.id]||[]).slice(-400).join("\n")}</pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
