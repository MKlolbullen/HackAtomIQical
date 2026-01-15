import asyncio
import logging
from typing import List, Dict, Any
from sqlalchemy.orm import Session
from src.models.all_models import Workflow, Tool, Scan, ScanStatus
from src.utils.command_builder import CommandBuilder
from src.database.core import SessionLocal

logger = logging.getLogger("hackatomiq.engine")

class WorkflowEngine:
    @staticmethod
    async def run_workflow(workflow_id: int, background_tasks):
        """
        Orchestrates the execution of a workflow graph.
        """
        db = SessionLocal()
        try:
            wf = db.query(Workflow).filter(Workflow.id == workflow_id).first()
            if not wf: return
            
            # 1. Parse Graph (ReactFlow JSON)
            nodes = wf.structure_json.get("nodes", [])
            edges = wf.structure_json.get("edges", [])
            
            # 2. Build Dependency Map
            adj = {n["id"]: [] for n in nodes}
            in_degree = {n["id"]: 0 for n in nodes}
            node_map = {n["id"]: n for n in nodes}
            
            for edge in edges:
                src, target = edge["source"], edge["target"]
                adj[src].append(target)
                in_degree[target] += 1
            
            # 3. Topological Sort (Kahn's Algorithm)
            queue = [nid for nid, deg in in_degree.items() if deg == 0]
            execution_order = []
            
            while queue:
                u = queue.pop(0)
                execution_order.append(u)
                for v in adj[u]:
                    in_degree[v] -= 1
                    if in_degree[v] == 0:
                        queue.append(v)
                        
            if len(execution_order) != len(nodes):
                logger.error("Cycle detected in workflow! execution aborted.")
                return

            # 4. Execute in Order
            # We store outputs in a dictionary: {node_id: "/path/to/output.txt"}
            context_outputs = {}
            
            for node_id in execution_order:
                node = node_map[node_id]
                tool_slug = node["data"]["tool_id"] # Assumes frontend sends this
                
                # Fetch tool def
                tool = db.query(Tool).filter(Tool.slug == tool_slug).first()
                if not tool: continue

                # Resolve Inputs (Check if input comes from previous node)
                inputs = node["data"].get("inputs", {}).copy()
                
                # Check edges to see if any input comes from an upstream node
                incoming_edges = [e for e in edges if e["target"] == node_id]
                for edge in incoming_edges:
                    source_node = edge["source"]
                    if source_node in context_outputs:
                        # MAGIC: Automatically pipe previous output to 'input_file'
                        inputs["input_file"] = context_outputs[source_node]

                # Build Command
                tool_def = {"command_structure": tool.command_structure, "args_schema": tool.args_schema}
                command = CommandBuilder.build_command(tool_def, inputs)
                
                # Run Tool (Synchronously await for this demo, to ensure order)
                logger.info(f"▶️ Running Node {node_id} ({tool.name})...")
                proc = await asyncio.create_subprocess_shell(
                    command,
                    stdout=asyncio.subprocess.PIPE,
                    stderr=asyncio.subprocess.PIPE
                )
                stdout, stderr = await proc.communicate()
                
                # Capture Output
                if tool.output_config and "path" in tool.output_config:
                    # If tool defines an output file, store it for the next step
                    output_path = tool.output_config["path"]
                    context_outputs[node_id] = output_path
                    logger.info(f"✅ Node {node_id} finished. Output: {output_path}")
                
        except Exception as e:
            logger.error(f"Workflow failed: {e}")
        finally:
            db.close()
