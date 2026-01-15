import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# Import Database & Models (to ensure tables are created)
from src.database.core import engine, Base
from src.routes import tools, workflows, scans

# Configure Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("hackatomiq.main")

# Create Database Tables
# In production, use Alembic for migrations. For this setup, auto-create is fine.
Base.metadata.create_all(bind=engine)

# Initialize App
app = FastAPI(
    title="HackAtomIQ API",
    description="Backend orchestration for HackAtomIQ security platform.",
    version="1.0.0"
)

# --- CORS Configuration ---
# Allow the frontend (Vite runs on 5173 by default)
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Register Routers ---
app.include_router(tools.router)
app.include_router(workflows.router)
app.include_router(scans.router)

# --- Root Endpoints ---

@app.get("/")
def health_check():
    """Simple health check for Docker/Kubernetes probes."""
    return {
        "status": "online", 
        "system": "HackAtomIQ", 
        "version": "1.0.0",
        "docs": "/docs"
    }

if __name__ == "__main__":
    # This allows you to run 'python src/main.py' directly
    uvicorn.run("src.main:app", host="0.0.0.0", port=5000, reload=True)
