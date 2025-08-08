export type ArgSpec =
  | { name: string; type: "string" | "number" | "boolean"; label?: string; default?: any; required?: boolean }
  | { name: string; type: "enum"; label?: string; options: string[]; default?: string }
  | { name: string; type: "list<string>" | "list<number>" | "list<enum>"; label?: string; options?: string[]; default?: any[] };

export type CmdPart =
  | string
  | { kind: "arg"; name: string; flag?: string; mode?: "value"|"bool"|"repeat"|"join"; sep?: string };

export type ToolDef = {
  id: string;
  label?: string;
  cmd: CmdPart[];
  args?: ArgSpec[];
  out?: { kind: string; path?: string };
};

export type NodeParams = Record<string, { value: any }>;
export type FlowNode = { id: string; type: "tool"; data: { tool: string; params: NodeParams; label: string } };
export type FlowEdge = { id: string; source: string; target: string };
export type Workflow = { id: string; name: string; nodes: FlowNode[]; edges: FlowEdge[] };
