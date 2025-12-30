// Derive API base from env, falling back to current origin
const API_BASE: string = (import.meta as any).env?.VITE_API_BASE || window.location.origin

function buildApiUrl(path: string): string {
  return new URL(path, API_BASE.replace(/\/?$/, '/')).toString()
}

function buildWsUrl(path: string): string {
  const base = new URL(API_BASE)
  const wsProtocol = base.protocol === 'https:' ? 'wss:' : 'ws:'
  return new URL(path, `${wsProtocol}//${base.host}/`).toString()
}

export async function listTools(): Promise<{ tools: any[] }> {
  const r = await fetch(buildApiUrl('/api/tools'))
  return r.json()
}

export async function fetchWorkflows(): Promise<{ workflows: any[] }> {
  const r = await fetch(buildApiUrl('/api/workflows'))
  return r.json()
}

export async function saveWorkflow(workflow: any) {
  const r = await fetch(buildApiUrl('/api/workflows'), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(workflow)
  })
  return r.json()
}

export async function startRun(workflow: any, project = "default", inputs: any = {}) {
  const r = await fetch(buildApiUrl('/api/run'), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ workflow, project, inputs })
  })
  return r.json()
}

export function connectRun(runId: string, onMsg: (m: any) => void) {
  const ws = new WebSocket(buildWsUrl(`/ws/run/${runId}`))
  ws.onmessage = ev => onMsg(JSON.parse(ev.data))
  return ws
}
