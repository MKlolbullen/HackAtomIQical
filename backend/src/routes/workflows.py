from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any
from pydantic import BaseModel
from datetime import datetime
from src.database.core import get_db
from src.models.all_models import Workflow

router = APIRouter(prefix="/api/workflows", tags=["Workflows"])

class WorkflowBase(BaseModel):
    title: str
    description: Optional[str] = None
    structure_json: Dict[str, Any]

class WorkflowOut(WorkflowBase):
    id: int
    created_at: datetime
    class Config: from_attributes = True

@router.get("/", response_model=List[WorkflowOut])
def list_workflows(db: Session = Depends(get_db)):
    return db.query(Workflow).all()

@router.post("/", response_model=WorkflowOut)
def create_workflow(wf: WorkflowBase, db: Session = Depends(get_db)):
    db_wf = Workflow(title=wf.title, description=wf.description, structure_json=wf.structure_json, owner_id=1)
    db.add(db_wf)
    db.commit()
    db.refresh(db_wf)
    return db_wf
