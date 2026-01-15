from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, JSON, Text, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from src.database.core import Base

class ScanStatus(str, enum.Enum):
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"

class ToolCategory(str, enum.Enum):
    RECON = "Reconnaissance"
    WEB = "Web Discovery"
    VULN = "Vulnerability"
    NETWORK = "Network"
    OSINT = "OSINT"
    CLOUD = "Cloud Security"
    UTILS = "Utilities"
    UNKNOWN = "Unknown"

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    scans = relationship("Scan", back_populates="owner")
    workflows = relationship("Workflow", back_populates="owner")

class Tool(Base):
    __tablename__ = "tools"
    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String, unique=True, index=True)
    name = Column(String)
    category = Column(String, default=ToolCategory.UNKNOWN)
    description = Column(Text, nullable=True)
    command_structure = Column(JSON, nullable=False) 
    args_schema = Column(JSON, nullable=True)
    output_config = Column(JSON, nullable=True)
    is_installed = Column(Boolean, default=True)

class Workflow(Base):
    __tablename__ = "workflows"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, nullable=True)
    structure_json = Column(JSON, nullable=False) 
    created_at = Column(DateTime, default=datetime.utcnow)
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="owner")

class Scan(Base):
    __tablename__ = "scans"
    id = Column(Integer, primary_key=True, index=True)
    target = Column(String, index=True)
    scan_type = Column(String)
    status = Column(String, default=ScanStatus.PENDING)
    result_data = Column(JSON, nullable=True) 
    logs = Column(Text, nullable=True)
    started_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="scans")
