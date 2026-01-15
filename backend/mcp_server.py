import asyncio
import logging
import json
import time
from typing import List, Optional, Dict
from enum import Enum
from pydantic import BaseModel

# Import FastMCP and Context
from mcp.server.fastmcp import FastMCP, Context, Image

# --- Configuration & Logging ---
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# --- State Management ---
class TargetScope(BaseModel):
    allowed_ips: List[str]
    allowed_domains: List[str]
    excluded_hosts: List[str] = []

class EngagementState:
    def __init__(self):
        self.scope = TargetScope(allowed_ips=[], allowed_domains=[])
        self.findings: List[Dict] = []
        # Store "files" in memory for this demo (Resources)
        self.reports: Dict[str, str] = {} 

state = EngagementState()

mcp = FastMCP("HackAtomIQical Pro")

# ==============================================================================
# 1. RESOURCES (The "Read" Layer)
# Allows the GUI to display file content or logs directly to the LLM.
# ==============================================================================

@mcp.resource("hackatom://logs/audit")
def get_audit_logs() -> str:
    """
    Reads the active audit log of the engagement.
    Useful for the LLM to verify what actions have been taken so far.
    """
    # In a real app, read from 'audit_trace.log'
    return f"Log Entry [TIMESTAMP]: Initialized Scope.\nLog Entry [TIMESTAMP]: Scan run on {state.scope.allowed_ips}"

@mcp.resource("hackatom://reports/latest")
def get_latest_report() -> str:
    """
    Retrieves the most recent scan finding in JSON format.
    """
    if not state.findings:
        return "No findings available."
    return json.dumps(state.findings[-1], indent=2)

# ==============================================================================
# 2. PROMPTS (The "Template" Layer)
# These appear in the GUI (e.g., Claude Desktop) as slash commands.
# ==============================================================================

@mcp.prompt("start-pentest")
def start_pentest_prompt(target: str, intensity: str = "quick") -> str:
    """
    Template to kick off a new penetration test engagement.
    """
    return f"""
    Please act as an offensive security specialist. 
    1. First, set the engagement scope to allow: {target}.
    2. Then, perform a {intensity} reconnaissance scan on {target}.
    3. Finally, analyze the findings and suggest next steps.
    """

@mcp.prompt("analyze-vuln")
def analyze_vuln_prompt(vuln_id: str) -> str:
    """
    Template to analyze a specific CVE or vulnerability ID.
    """
    return f"""
    I have identified {vuln_id} during my scan.
    1. Check if we have any existing findings for this vulnerability in the 'hackatom://reports/latest' resource.
    2. Explain the theoretical impact of {vuln_id}.
    3. If safe, use the execute_safe_exploit tool to verify it.
    """

# ==============================================================================
# 3. TOOLS (The "Action" Layer)
# ==============================================================================

@mcp.tool()
def set_engagement_scope(allowed_targets: List[str]) -> str:
    """Sets the authorized scope (IPs/Domains)."""
    state.scope.allowed_ips = [t for t in allowed_targets if t.replace('.', '').isdigit()]
    state.scope.allowed_domains = [t for t in allowed_targets if t not in state.scope.allowed_ips]
    return f"Scope set. Allowed: {allowed_targets}"

@mcp.tool()
async def run_scan(target: str, ctx: Context = None) -> str:
    """Scans a target IP/Domain."""
    # Scope check
    if target not in state.scope.allowed_ips and target not in state.scope.allowed_domains:
        return f"ERROR: {target} is Out of Scope."

    if ctx:
        await ctx.info(f"🚀 Launching scan against {target}...")
        await asyncio.sleep(1)
        await ctx.info(f"🔍 Enumerating ports...")

    # Mock finding
    finding = {
        "target": target, 
        "ports": [80, 443, 8080], 
        "vuln": "Weak Credentials (SSH)"
    }
    state.findings.append(finding)

    # Save to "report" resource automatically
    state.reports["latest"] = json.dumps(finding)

    return f"Scan complete. Found open ports: {finding['ports']}"

if __name__ == "__main__":
    mcp.run()