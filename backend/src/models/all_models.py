from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, JSON, Text, Boolean, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from src.database.core import Base

# --- Enums for strict typing in DB ---
class ScanStatus(str, enum.Enum):
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"

class ToolCategory(str, enum.Enum):
    RECON = "Reconnaissance"
    WEB = "Web Application"
    VULN = "Vulnerability"
    NETWORK = "Network"
    OSINT = "OSINT"
    CLOUD = "Cloud Security"
    UTILS = "Utilities"

# --- Tables ---

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    
    # Relationships
    scans = relationship("Scan", back_populates="owner")
    workflows = relationship("Workflow", back_populates="owner")

class Tool(Base):
    __tablename__ = "tools"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)  # e.g., "Nmap", "Nuclei"
    category = Column(String, default=ToolCategory.UTILS)
    description = Column(Text, nullable=True)
    
    # The template command. Variables like {target} are replaced at runtime.
    # Example: "nmap -sV -p- {target} -oX -"
    command_template = Column(String, nullable=False) 
    
    is_installed = Column(Boolean, default=False)
    version = Column(String, nullable=True)

class Workflow(Base):
    __tablename__ = "workflows"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, nullable=True)
    
    # Stores the ReactFlow graph: { "nodes": [...], "edges": [...] }
    structure_json = Column(JSON, nullable=False) 
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="workflows")

class Scan(Base):
    __tablename__ = "scans"

    id = Column(Integer, primary_key=True, index=True)
    target = Column(String, index=True)
    scan_type = Column(String)  # "single_tool", "workflow", "quick_audit"
    
    status = Column(String, default=ScanStatus.PENDING)
    
    # Stores raw text logs or JSON output from the tool
    result_data = Column(JSON, nullable=True) 
    logs = Column(Text, nullable=True)
    
    started_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)
    
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="scans")
