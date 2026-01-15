from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
import asyncio
import shlex
import logging

from src.database.core import get_db
from src.models.all_models import Tool, Scan, ScanStatus, ToolCategory

# Setup Logger
logger = logging.getLogger("hackatomiq.tools")

router = APIRouter(prefix="/api/tools", tags=["Tools"])

# --- Pydantic Schemas ---
class ToolBase(BaseModel):
    name: str
    category: str
    description: Optional[str] = None
    command_template: str

class ToolCreate(ToolBase):
    pass

class ToolOut(ToolBase):
    id: int
    is_installed: bool
    
    class Config:
        from_attributes = True

class ExecuteRequest(BaseModel):
    target: str
    params: Optional[dict] = {}

# --- Helper Functions ---

async def run_tool_background(scan_id: int, command: str, db_session_factory):
    """
    Background task to execute the shell command and update the Scan record.
    Uses a fresh DB session because the request session closes when the response is sent.
    """
    db = db_session_factory()
    scan = db.query(Scan).filter(Scan.id == scan_id).first()
    
    try:
        # Update status to running
        scan.status = ScanStatus.RUNNING
        db.commit()

        logger.info(f"Executing: {command}")
        
        # Async execution
        proc = await asyncio.create_subprocess_shell(
            command,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        
        stdout, stderr = await proc.communicate()
        
        # Save results
        scan.logs = stderr.decode() if stderr else ""
        scan.result_data = {"raw_output": stdout.decode(), "exit_code": proc.returncode}
        scan.status = ScanStatus.COMPLETED if proc.returncode == 0 else ScanStatus.FAILED
        scan.completed_at = datetime.utcnow()
        
    except Exception as e:
        scan.status = ScanStatus.FAILED
        scan.logs = str(e)
        logger.error(f"Scan failed: {e}")
        
    finally:
        db.commit()
        db.close()

# --- Endpoints ---

@router.get("/", response_model=List[ToolOut])
def get_all_tools(db: Session = Depends(get_db)):
    """List all available tools."""
    return db.query(Tool).all()

@router.post("/", response_model=ToolOut)
def add_tool(tool: ToolCreate, db: Session = Depends(get_db)):
    """Manually register a new tool."""
    db_tool = Tool(**tool.dict(), is_installed=True)
    db.add(db_tool)
    db.commit()
    db.refresh(db_tool)
    return db_tool

@router.post("/{tool_id}/execute")
async def execute_tool(
    tool_id: int, 
    req: ExecuteRequest, 
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """
    Run a tool against a target. 
    Creates a 'Scan' record immediately, then processes in background.
    """
    tool = db.query(Tool).filter(Tool.id == tool_id).first()
    if not tool:
        raise HTTPException(status_code=404, detail="Tool not found")

    # 1. Create a Scan Record (Audit trail)
    new_scan = Scan(
        target=req.target,
        scan_type="single_tool",
        status=ScanStatus.PENDING,
        owner_id=1  # Default admin for now
    )
    db.add(new_scan)
    db.commit()
    db.refresh(new_scan)

    # 2. Construct Command
    # WARNING: Basic injection protection. In prod, use stricter validation.
    safe_target = shlex.quote(req.target) 
    try:
        command = tool.command_template.format(target=safe_target)
    except KeyError as e:
        raise HTTPException(status_code=400, detail=f"Command template missing parameter: {e}")

    # 3. Launch Background Task
    # We pass 'SessionLocal' (the factory) to the background task, not the 'db' instance
    from src.database.core import SessionLocal
    background_tasks.add_task(run_tool_background, new_scan.id, command, SessionLocal)

    return {
        "message": f"Execution started for {tool.name}",
        "scan_id": new_scan.id,
        "status": "pending"
    }

@router.post("/seed")
def seed_default_tools(db: Session = Depends(get_db)):
    """Populate the database with common tools if empty."""
    if db.query(Tool).first():
        return {"message": "Tools already exist. Skipping seed."}
    
    defaults = [
        {
            "name": "Nmap Quick",
            "category": ToolCategory.NETWORK,
            "description": "Fast port scan for top 100 ports",
            "command_template": "nmap -F {target}"
        },
        {
            "name": "Subfinder",
            "category": ToolCategory.RECON,
            "description": "Passive subdomain discovery",
            "command_template": "subfinder -d {target} -silent"
        },
        {
            "name": "HTTPx",
            "category": ToolCategory.WEB,
            "description": "Probe for working HTTP servers",
            "command_template": "httpx -u {target} -silent"
        },
        {
            "name": "Nuclei Critical",
            "category": ToolCategory.VULN,
            "description": "Scan for critical vulnerabilities",
            "command_template": "nuclei -u {target} -s critical -silent"
        },
        {
            "name": "Ping",
            "category": ToolCategory.UTILS,
            "description": "Simple connectivity check",
            "command_template": "ping -c 3 {target}"
        }
    ]
    
    created = []
    for t in defaults:
        tool = Tool(**t, is_installed=True)
        db.add(tool)
        created.append(tool.name)
    
    db.commit()
    return {"message": "Database seeded successfully", "tools_added": created}
