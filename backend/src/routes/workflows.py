from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any
from pydantic import BaseModel
from datetime import datetime

from src.database.core import get_db
from src.models.all_models import Workflow
from src.utils.workflow_engine import WorkflowEngine

router = APIRouter(prefix="/api/workflows", tags=["Workflows"])

# --- Pydantic Schemas ---
class WorkflowBase(BaseModel):
    title: str
    description: Optional[str] = None
    structure_json: Dict[str, Any]  # The ReactFlow nodes/edges

class WorkflowOut(WorkflowBase):
    id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

# --- Endpoints ---

@router.get("/", response_model=List[WorkflowOut])
def list_workflows(db: Session = Depends(get_db)):
    """
    List all saved workflow templates.
    """
    return db.query(Workflow).all()

@router.get("/{workflow_id}", response_model=WorkflowOut)
def get_workflow(workflow_id: int, db: Session = Depends(get_db)):
    """
    Load a specific workflow.
    """
    wf = db.query(Workflow).filter(Workflow.id == workflow_id).first()
    if not wf:
        raise HTTPException(status_code=404, detail="Workflow not found")
    return wf

@router.post("/", response_model=WorkflowOut)
def create_workflow(wf: WorkflowBase, db: Session = Depends(get_db)):
    """
    Save a new workflow design.
    """
    # owner_id hardcoded to 1 for single-user mode
    db_wf = Workflow(
        title=wf.title,
        description=wf.description,
        structure_json=wf.structure_json,
        owner_id=1 
    )
    db.add(db_wf)
    db.commit()
    db.refresh(db_wf)
    return db_wf

@router.put("/{workflow_id}", response_model=WorkflowOut)
def update_workflow(workflow_id: int, wf: WorkflowBase, db: Session = Depends(get_db)):
    """
    Update an existing workflow.
    """
    db_wf = db.query(Workflow).filter(Workflow.id == workflow_id).first()
    if not db_wf:
        raise HTTPException(status_code=404, detail="Workflow not found")
    
    db_wf.title = wf.title
    db_wf.description = wf.description
    db_wf.structure_json = wf.structure_json
    db_wf.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(db_wf)
    return db_wf

@router.delete("/{workflow_id}")
def delete_workflow(workflow_id: int, db: Session = Depends(get_db)):
    """
    Delete a workflow.
    """
    db_wf = db.query(Workflow).filter(Workflow.id == workflow_id).first()
    if not db_wf:
        raise HTTPException(status_code=404, detail="Workflow not found")
    
    db.delete(db_wf)
    db.commit()
    return {"message": "Workflow deleted"}

@router.post("/{workflow_id}/run")
async def run_workflow(
    workflow_id: int, 
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """
    EXECUTE the workflow.
    Passes the ID to the WorkflowEngine to run in the background.
    """
    wf = db.query(Workflow).filter(Workflow.id == workflow_id).first()
    if not wf:
        raise HTTPException(status_code=404, detail="Workflow not found")
    
    # Trigger the engine
    background_tasks.add_task(WorkflowEngine.run_workflow, workflow_id, background_tasks)
    
    return {
        "message": "Workflow execution started", 
        "workflow_id": workflow_id,
        "status": "running"
    }
