export async function listTools(): Promise<{ tools: any[] }> {
  const r = await fetch("http://localhost:8000/api/tools");
  return r.json();
}
export async function startRun(workflow: any, project="default", inputs:any={}){
  // Transform frontend workflow structure to backend expected structure
  // Frontend: {id, type, data: {tool, params, label}}
  // Backend: {id, tool, params}
  const backendWorkflow = {
    ...workflow,
    nodes: workflow.nodes.map((n: any) => ({
      id: n.id,
      tool: n.data.tool,
      params: n.data.params || {}
    }))
  };
  
  const r = await fetch("http://localhost:8000/api/run", {
    method:"POST", headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ workflow: backendWorkflow, project, inputs })
  });
  return r.json();
}
export function connectRun(runId: string, onMsg:(m:any)=>void){
  const ws = new WebSocket(`ws://localhost:8000/ws/run/${runId}`);
  ws.onmessage = ev => onMsg(JSON.parse(ev.data));
  return ws;
}
