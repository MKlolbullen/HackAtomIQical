from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any
from pydantic import BaseModel
import asyncio
import logging
from datetime import datetime

from src.database.core import get_db, SessionLocal
from src.models.all_models import Tool, Scan, ScanStatus
from src.utils.command_builder import CommandBuilder

logger = logging.getLogger("hackatomiq.tools")
router = APIRouter(prefix="/api/tools", tags=["Tools"])

class ToolOut(BaseModel):
    id: int
    slug: str
    name: str
    description: Optional[str]
    args_schema: Optional[List[Dict[str, Any]]]
    class Config: from_attributes = True

class ExecuteRequest(BaseModel):
    target: Optional[str] = None
    params: Optional[Dict[str, Any]] = {}

async def run_tool_background(scan_id: int, command: str, db_session_factory):
    db = db_session_factory()
    scan = db.query(Scan).filter(Scan.id == scan_id).first()
    try:
        scan.status = ScanStatus.RUNNING
        db.commit()
        logger.info(f"🚀 Executing: {command}")
        
        proc = await asyncio.create_subprocess_shell(
            command, stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.PIPE
        )
        stdout, stderr = await proc.communicate()
        
        scan.result_data = {"raw_output": stdout.decode(), "exit_code": proc.returncode}
        scan.logs = stderr.decode() if stderr else ""
        scan.status = ScanStatus.COMPLETED if proc.returncode == 0 else ScanStatus.FAILED
        scan.completed_at = datetime.utcnow()
    except Exception as e:
        scan.status = ScanStatus.FAILED
        scan.logs = str(e)
    finally:
        db.commit()
        db.close()

@router.get("/", response_model=List[ToolOut])
def get_all_tools(db: Session = Depends(get_db)):
    return db.query(Tool).all()

@router.post("/{tool_id}/execute")
async def execute_tool(tool_id: int, req: ExecuteRequest, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    tool = db.query(Tool).filter(Tool.id == tool_id).first()
    if not tool: raise HTTPException(404, "Tool not found")

    user_inputs = req.params or {}
    if req.target:
        for k in ["target", "url", "domain", "input_file"]:
            if k not in user_inputs: user_inputs[k] = req.target

    try:
        tool_def = {"command_structure": tool.command_structure, "args_schema": tool.args_schema}
        final_command = CommandBuilder.build_command(tool_def, user_inputs)
    except Exception as e:
        raise HTTPException(400, f"Command Build Error: {e}")

    new_scan = Scan(target=req.target or "params", scan_type=tool.slug, status=ScanStatus.PENDING, owner_id=1)
    db.add(new_scan)
    db.commit()
    db.refresh(new_scan)

    background_tasks.add_task(run_tool_background, new_scan.id, final_command, SessionLocal)
    return {"message": "Started", "scan_id": new_scan.id}
