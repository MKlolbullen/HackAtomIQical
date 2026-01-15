from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any
from pydantic import BaseModel
from datetime import datetime

from src.database.core import get_db
from src.models.all_models import Workflow

router = APIRouter(prefix="/api/workflows", tags=["Workflows"])

# --- Pydantic Schemas ---
class WorkflowBase(BaseModel):
    title: str
    description: Optional[str] = None
    structure_json: Dict[str, Any]  # The ReactFlow nodes/edges

class WorkflowCreate(WorkflowBase):
    pass

class WorkflowOut(WorkflowBase):
    id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

# --- Endpoints ---

@router.get("/", response_model=List[WorkflowOut])
def list_workflows(db: Session = Depends(get_db)):
    """Get all saved workflow templates."""
    return db.query(Workflow).all()

@router.get("/{workflow_id}", response_model=WorkflowOut)
def get_workflow(workflow_id: int, db: Session = Depends(get_db)):
    """Load a specific workflow."""
    wf = db.query(Workflow).filter(Workflow.id == workflow_id).first()
    if not wf:
        raise HTTPException(status_code=404, detail="Workflow not found")
    return wf

@router.post("/", response_model=WorkflowOut)
def create_workflow(wf: WorkflowCreate, db: Session = Depends(get_db)):
    """Save a new workflow design."""
    # owner_id is hardcoded to 1 for this single-user version
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
def update_workflow(workflow_id: int, wf: WorkflowCreate, db: Session = Depends(get_db)):
    """Update an existing workflow."""
    db_wf = db.query(Workflow).filter(Workflow.id == workflow_id).first()
    if not db_wf:
        raise HTTPException(status_code=404, detail="Workflow not found")
    
    db_wf.title = wf.title
    db_wf.description = wf.description
    db_wf.structure_json = wf.structure_json
    
    db.commit()
    db.refresh(db_wf)
    return db_wf

@router.delete("/{workflow_id}")
def delete_workflow(workflow_id: int, db: Session = Depends(get_db)):
    """Delete a workflow."""
    db_wf = db.query(Workflow).filter(Workflow.id == workflow_id).first()
    if not db_wf:
        raise HTTPException(status_code=404, detail="Workflow not found")
    
    db.delete(db_wf)
    db.commit()
    return {"message": "Workflow deleted"}
