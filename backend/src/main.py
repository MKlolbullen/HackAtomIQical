import logging
import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from src.database.core import engine, Base, SessionLocal
from src.routes import tools, workflows, scans
from src.utils.tool_loader import load_yaml_tools

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("hackatomiq.main")

Base.metadata.create_all(bind=engine)

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("🚀 HackAtomIQ Starting...")
    db = SessionLocal()
    try:
        yaml_path = next((p for p in ["tools.yaml", "../tools.yaml", "/app/tools.yaml"] if os.path.exists(p)), None)
        if yaml_path: load_yaml_tools(yaml_path, db)
        else: logger.warning("⚠️ tools.yaml not found!")
    finally:
        db.close()
    yield
    logger.info("🛑 Shutting down...")

app = FastAPI(title="HackAtomIQ API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tools.router)
app.include_router(workflows.router)
app.include_router(scans.router)

if __name__ == "__main__":
    uvicorn.run("src.main:app", host="0.0.0.0", port=5000, reload=True)
