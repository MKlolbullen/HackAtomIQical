// @ts-nocheck
import { useEffect, useMemo, useState } from "react";
import type { FlowNode, ToolDef } from "./types";

type Props = { node: FlowNode | null; tools: Record<string, ToolDef>; onChange: (nodeId: string, nextParams: any) => void; };

export default function ArgsPanel({ node, tools, onChange }: Props) {
  const tool = useMemo(()=> node ? tools[node.data.tool] : null, [node, tools]);
  const [local, setLocal] = useState<Record<string, any>>({});

  useEffect(()=>{
    if (!node || !tool) return;
    const start: Record<string, any> = {};
    (tool.args||[]).forEach(a=>{
      const existing = node.data.params?.[a.name]?.value;
      if (existing !== undefined) start[a.name] = existing;
      else if ("default" in (a as any)) start[a.name] = (a as any).default;
      else start[a.name] = a.type?.startsWith("list") ? [] : (a.type==="boolean"?false:"");
    });
    setLocal(start);
  }, [node?.id, tool?.id]);

  if (!node) return <div className="p-4 text-sm text-gray-500">Select a node</div>;
  if (!tool) return <div className="p-4 text-sm text-gray-500">Unknown tool</div>;

  const update = (name: string, val: any) => {
    const next = { ...local, [name]: val };
    setLocal(next);
    const params = Object.fromEntries(Object.entries(next).map(([k,v])=>[k,{value:v}]));
    onChange(node.id, params);
  };

  const renderField = (a: any) => {
    const label = a.label ?? a.name;
    const v = local[a.name];

    if (a.type==="enum") {
      return (
        <div key={a.name} className="space-y-1">
          <label className="text-xs">{label}</label>
          <select className="w-full border rounded p-1" value={v??""} onChange={e=>update(a.name, e.target.value)}>
            <option value="">--</option>
            {(a.options||[]).map((o:string)=><option key={o} value={o}>{o}</option>)}
          </select>
        </div>
      );
    }
    if (a.type==="boolean") {
      return (
        <label key={a.name} className="flex items-center gap-2">
          <input type="checkbox" checked={!!v} onChange={e=>update(a.name, e.target.checked)} />
          <span className="text-sm">{label}</span>
        </label>
      );
    }
    if (a.type==="number") {
      return (
        <div key={a.name} className="space-y-1">
          <label className="text-xs">{label}</label>
          <input type="number" className="w-full border rounded p-1" value={v??0} onChange={e=>update(a.name, Number(e.target.value))}/>
        </div>
      );
    }
    if (a.type?.startsWith("list")) {
      const isEnumList = a.type==="list<enum>";
      return (
        <div key={a.name} className="space-y-1">
          <label className="text-xs">{label}</label>
          {isEnumList ? (
            <select multiple className="w-full border rounded p-1 h-24"
              value={v||[]} onChange={e=>update(a.name, Array.from(e.target.selectedOptions).map(o=>o.value))}>
              {(a.options||[]).map((o:string)=><option key={o} value={o}>{o}</option>)}
            </select>
          ) : (
            <textarea className="w-full border rounded p-1 h-20"
              placeholder="One per line"
              value={(v||[]).join("\n")}
              onChange={e=>update(a.name, e.target.value.split("\n").filter(Boolean))}/>
          )}
        </div>
      );
    }
    return (
      <div key={a.name} className="space-y-1">
        <label className="text-xs">{label}</label>
        <input type="text" className="w-full border rounded p-1" value={v??""} onChange={e=>update(a.name, e.target.value)} />
      </div>
    );
  };

  return (
    <div className="p-3 space-y-3 h-full overflow-auto">
      <div className="font-semibold">{tool.label || tool.id}</div>
      <div className="grid gap-3">{(tool.args||[]).map(renderField)}</div>
    </div>
  );
}
