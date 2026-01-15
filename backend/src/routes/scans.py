from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime
from src.database.core import get_db
from src.models.all_models import Scan

router = APIRouter(prefix="/api/scans", tags=["Scans"])

class ScanOut(BaseModel):
    id: int
    target: str
    scan_type: str
    status: str
    started_at: datetime
    class Config: from_attributes = True

class ScanResultOut(BaseModel):
    id: int
    logs: Optional[str]
    result_data: Optional[dict]

@router.get("/", response_model=List[ScanOut])
def get_all_scans(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    return db.query(Scan).order_by(Scan.started_at.desc()).offset(skip).limit(limit).all()

@router.get("/{scan_id}/results", response_model=ScanResultOut)
def get_scan_results(scan_id: int, db: Session = Depends(get_db)):
    scan = db.query(Scan).filter(Scan.id == scan_id).first()
    if not scan: raise HTTPException(404, "Scan not found")
    return {"id": scan.id, "logs": scan.logs, "result_data": scan.result_data or {}}
