# ⚛️ HackAtomIQical

> **The Advanced Self-Hosted Bug Bounty Platform** 🚀  
> *Inspired by Trickest.io | Visual Workflow Builder | AI-Powered via MCP*

HackAtomIQical is a cutting-edge, locally hosted platform designed for **Offensive Security Specialists** and **Bug Bounty Hunters**. It combines a powerful visual workflow builder with an arsenal of 150+ security tools, all orchestrated by a Python backend and a modern React frontend.

Now featuring **Model Context Protocol (MCP)** support, allowing you to control your scans directly from **Claude Desktop** or any LLM agent! 🤖💥

---

## 🚀 Quick Start

We have simplified the installation process. You no longer need to manually configure backend/frontend separately!

### 1. Automated Installation (Linux/macOS)
Run our new all-in-one installer. It sets up the environment, installs dependencies, and creates a desktop shortcut.

```bash
chmod +x install.sh
./install.sh
```
2. Start the Platform
Once installed, you can launch the full stack (Frontend + Backend + API) with a single command:
```bash
./start_hackatomiq.sh
```

 * Frontend: http://localhost:5173
 * Backend API: http://localhost:5000

🤖 AI Integration (MCP)
HackAtomIQical now supports the Model Context Protocol. This bridges the gap between your LLM and your tools.
Setup for Claude Desktop
 * Run the installer (./install.sh).
 * Copy the configuration snippet output by the script.
 * Paste it into your Claude Desktop config file.
What can the AI do?
 * Recon: run_scan(target="example.com", profile="stealth")
 * Analysis: analyze_findings()
 * Exploitation: execute_safe_exploit(vuln_id="CVE-2023-XXXX") (Scope restricted!)


​🛠️ Features
​🎯 Tool Categories (150+ Tools)
​<details>
<summary><strong>🔵 Reconnaissance (25 tools)</strong></summary>
​Subdomain Discovery: Subfinder, Amass, JSubfinder, Chaos, Assetfinder
​Network Scanning: Nmap, Masscan, RustScan, Naabu, Zmap, Smap
​DNS Enumeration: DNSrecon, DNSx, Fierce, DNSMap, MassDNS
​OSINT: theHarvester, Recon-ng, Shodan, Censys, SpiderFoot
​CRAWLING: Katana, Hakrawler, Photon, Gospider
​Web Discovery: HTTPx, Aquatone, EyeWitness, Gowitness, WebScreenshot
​</details>
​<details>
<summary><strong>🟢 Web Application Testing (30 tools)</strong></summary>
​Directory Fuzzing: Gobuster, ffuf, Wfuzz, DirSearch, Feroxbuster
​Web Scanners: Nikto, WhatWeb, wafw00f, WPScan, JoomScan
​Crawlers: HakRawler, Cariddi, GAU, Waybackurls, Katana
​Parameter Discovery: Arjun, ParamSpider, x8, ParamMiner
​XSS Testing: XSStrike, Dalfox, XSS Hunter, DOM XSS Scanner
​SQL Injection: SQLmap, NoSQLMap, Commix, jSQL Injection
​CSRF Testing: XSRFProbe, CSRFTester, CSRF Scanner
​</details>
​<details>
<summary><strong>🟠 Vulnerability Scanning (20 tools)</strong></summary>
​Multi-purpose: Nuclei, Dalfox, XSStrike, XSRFprobe
​Web Specific: Nikto, W3AF, OWASP ZAP, Arachni, Skipfish
​Network: Nmap NSE, Vulners
​Specialized: WPScan, JoomScan, DroopeScan, CMSmap, BlindElephant
​</details>
​<details>
<summary><strong>🔷 OSINT & Intelligence (20 tools)</strong></summary>
​Social Media: Sherlock, Social Mapper, Twint, InstagramOSINT
​Email: theHarvester, Hunter.io, EmailHarvester, h8mail
​GitHub: GitDorker, TruffleHog, GitLeaks, GitRob, Gitrob
​Domain Intelligence: Amass, Assetfinder, Subfinder, CSPRecon, Certificate Transparency
​People Search: BBoT, SpiderFoot, Recon-ng, OSINT Framework
​</details>
​<details>
<summary><strong>☁️ Cloud Security (12 tools)</strong></summary>
​Multi-Cloud: ScoutSuite, Prowler, CloudSploit, CloudMapper
​AWS: AWS CLI, Pacu, WeirdAAL, CloudGoat
​Azure: AzureHound, MicroBurst, PowerZure
​GCP: GCP Scanner, Cloud Asset Inventory
​</details>
​<details>
<summary><strong>🔐 Secrets & Credentials (10 tools)</strong></summary>
​Git Secrets: TruffleHog, GitLeaks, GitRob, Repo Supervisor
​File Analysis: SecretFinder, LinkFinder, JSParser, Retire.js
​Credential Stuffing: Hydra, Medusa, Patator, Crowbar
​</details>
​<details>
<summary><strong>🛠️ Utilities & Workflow (15 tools)</strong></summary>
​Input/Output: File Input, URL Input, Target List, Output Formatter
​Data Processing: Filter, Merge, Sort, Deduplicate, Transform
​Reporting: Report Generator, PDF Export, JSON Export, CSV Export
​Notification: Slack, Discord, Email, Webhook, SMS
​</details>
​📚 Professional Workflow Templates
​🟢 Basic Web Application Scan (Beginner, 30 min)
​Subfinder → HTTPx → Nuclei → Output
​Perfect for beginners learning web security
​🔴 Advanced Reconnaissance Workflow (Advanced, 90 min)
​Multi-tool subdomain discovery and validation
​Comprehensive asset discovery and enumeration
​🟡 Parameter Discovery & XSS Testing (Advanced, 75 min)
​GAU/HakRawler → Arjun → XSStrike/Dalfox → Output
​Specialized for parameter-based vulnerabilities
​🔵 GitHub Secrets & Leaks Scanner (Intermediate, 45 min)
​GitHub Search → GitDorker → TruffleHog → SecretFinder
​OSINT-focused secret discovery
​🟠 JavaScript Analysis & Endpoint Discovery (Intermediate, 60 min)
​JSubfinder → Cariddi → SecretFinder → HTTPx
​JavaScript-focused security testing
​🟣 CSRF & Authentication Bypass Testing (Advanced, 55 min)
​HTTPx → XSRFProbe → Arjun → Burp Suite
​Authentication security assessment
​⚫ ProjectDiscovery Full Suite Workflow (Expert, 120 min)
​Complete PD toolkit integration
​Professional-grade comprehensive testing
​☁️ Cloud Security Assessment (Advanced, 75 min)
​Multi-cloud security evaluation
​AWS, Azure, GCP coverage
​📱 Mobile Application Security Testing (Advanced, 80 min)
​Comprehensive mobile app analysis
​Android and iOS coverage
​🔗 API Security Testing (Intermediate, 50 min)
​REST and GraphQL API testing
​Parameter discovery and vulnerability assessment
​🌐 Network Discovery & Enumeration (Intermediate, 45 min)
​Network-focused security assessment
​Port scanning and service enumeration
​💉 SQL Injection Testing Workflow (Advanced, 35 min)
​Specialized SQL injection detection
​Parameter discovery and exploitation

🐳 Docker Deployment


For those who prefer containerization over local installation.
```bash
Development Environment
# Start development stack
docker-compose up -d
```

# View logs
```bash
docker-compose logs -f
```

Production Environment
```bash
# Start production stack with monitoring
docker-compose --profile production --profile monitoring up -d
```

# Scale services
```
docker-compose up -d --scale hackatomiq-backend=3
```

Available Profiles

 * development - Basic frontend + backend
 * production - Optimized for production with Nginx
 * monitoring - Adds Prometheus, Grafana, and ELK stack
 * database - PostgreSQL + Redis for persistence
```markdown
📁 Project Structure
hackatomiq/
├── 📁 frontend/                    # React Frontend Application
│   ├── 📁 public/                  # Static assets
│   ├── 📁 src/
│   │   ├── 📁 components/          # React components
│   │   │   ├── Navigation.jsx      # Main navigation bar
│   │   │   ├── WorkflowBuilder.jsx # Drag-and-drop builder
│   │   │   └── WorkflowLibrary.jsx # Template library
│   │   ├── 📁 pages/               # Page components
│   │   │   ├── HomePage.jsx        # Dashboard home
│   │   │   ├── BuilderPage.jsx     # Workflow builder
│   │   │   ├── ScannerPage.jsx     # Scan management
│   │   │   ├── ResultsPage.jsx     # Results visualization
│   │   │   └── ConfigurationPage.jsx # Settings
│   │   ├── 📁 components/ui/       # UI components (shadcn/ui)
│   │   ├── App.jsx                 # Main app component
│   │   └── main.jsx               # Entry point
│   ├── package.json               # Frontend dependencies
│   ├── vite.config.js            # Vite configuration
│   └── tailwind.config.js        # Tailwind CSS config
├── 📁 backend/                     # Python Flask/FastAPI Backend
│   ├── 📁 src/
│   │   ├── main.py                # App entry
│   │   ├── 📁 routes/             # API route handlers
│   │   ├── 📁 models/             # Database models
│   │   └── 📁 database/          # Database files
│   ├── requirements.txt          # Python dependencies
│   └── mcp_server.py             # MCP Server Logic
├── 📁 docker/                     # Docker configuration
├── docker-compose.yml            # Docker Compose setup
├── install.sh                    # Automated installation script
├── README.md                     # This documentation
└── 📁 docs/                      # Additional documentation
```

🔧 Configuration

Environment Variables
Create .env files for configuration:
```basb
Frontend (.env)
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=HackAtomIQ
VITE_VERSION=1.0.0
```
Backend (.env)
```bash
FLASK_ENV=development
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///hackatomiq.db
REDIS_URL=redis://localhost:6379
```

### Tool Installation

The platform supports automatic installation of security tools:

# Install specific tools via API
``°bash
curl -X POST http://localhost:5000/api/tools/install/jsubfinder
curl -X POST http://localhost:5000/api/tools/install/xsstrike
```

📊 API Documentation
Tools API
# Get available tools
```bash
GET /api/tools
```

# Execute a tool
```bash
POST /api/tools/{tool_id}/execute
{
  "target": "example.com",
  "options": {"timeout": 300}
}
```

Workflows API
```bash
# Get all workflows
GET /api/workflows
```

# Execute workflow
```bash
POST /api/workflows/{workflow_id}/execute
```

Scans API
# Create scan
```bash
POST /api/scans
{
  "target": "example.com",
  "scan_type": "comprehensive"
}
```

⚠️ Disclaimer
HackAtomIQical is for educational and authorized testing purposes only.
The developers assume no liability and are not responsible for any misuse or damage caused by this program. Always obtain proper authorization before scanning targets.

## 🙏 Acknowledgments
 * Trickest.io - Inspiration for the visual workflow builder
 * ProjectDiscovery - Amazing security tools and community
 * OWASP - Security testing methodologies
 * React Flow - Excellent workflow visualization library
<div align="center">
⭐ Star this repository if you find it useful!
Made with ❤️ by the HackAtomIQ Team
</div>

