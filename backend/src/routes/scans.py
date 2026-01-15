from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

from src.database.core import get_db
from src.models.all_models import Scan, ScanStatus

router = APIRouter(prefix="/api/scans", tags=["Scans"])

# --- Pydantic Schemas ---
class ScanOut(BaseModel):
    id: int
    target: str
    scan_type: str
    status: str
    started_at: datetime
    completed_at: Optional[datetime]
    
    class Config:
        from_attributes = True

class ScanResultOut(BaseModel):
    id: int
    logs: Optional[str]
    result_data: Optional[dict]

# --- Endpoints ---

@router.get("/", response_model=List[ScanOut])
def get_all_scans(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    """Retrieve a history of all scans."""
    return db.query(Scan).order_by(Scan.started_at.desc()).offset(skip).limit(limit).all()

@router.get("/{scan_id}", response_model=ScanOut)
def get_scan_status(scan_id: int, db: Session = Depends(get_db)):
    """Check the status of a specific scan."""
    scan = db.query(Scan).filter(Scan.id == scan_id).first()
    if not scan:
        raise HTTPException(status_code=404, detail="Scan not found")
    return scan

@router.get("/{scan_id}/results", response_model=ScanResultOut)
def get_scan_results(scan_id: int, db: Session = Depends(get_db)):
    """Retrieve the full output (logs and JSON) of a completed scan."""
    scan = db.query(Scan).filter(Scan.id == scan_id).first()
    if not scan:
        raise HTTPException(status_code=404, detail="Scan not found")
    
    return {
        "id": scan.id,
        "logs": scan.logs,
        "result_data": scan.result_data or {}
    }

@router.delete("/{scan_id}")
def delete_scan(scan_id: int, db: Session = Depends(get_db)):
    """Remove a scan record from history."""
    scan = db.query(Scan).filter(Scan.id == scan_id).first()
    if not scan:
        raise HTTPException(status_code=404, detail="Scan not found")
    
    db.delete(scan)
    db.commit()
    return {"message": "Scan deleted"}
