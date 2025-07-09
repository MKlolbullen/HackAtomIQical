# 🎯 HackAtomIQ - Advanced Bug Bounty Platform

<div align="center">

![HackAtomIQ Logo](https://img.shields.io/badge/HackAtomIQ-v1.0.0-cyan?style=for-the-badge&logo=security&logoColor=white)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Flask](https://img.shields.io/badge/Flask-2.3.3-000000?style=for-the-badge&logo=flask&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Professional Bug Bounty Hunting & Penetration Testing Platform**

*Inspired by Trickest.io with 25+ security tools and visual workflow builder*


![image](https://github.com/user-attachments/assets/bf94fd3d-bce3-4f04-abe1-9bae8d080351)

![image](https://github.com/user-attachments/assets/7cc82a4e-97fe-4a05-bff2-fae3473adefb)



[🚀 Quick Start](#-quick-start) • [📖 Documentation](#-documentation) • [🛠️ Features](#-features) • [🐳 Docker](#-docker-deployment)

</div>

---

## 🌟 Overview

HackAtomIQ is a comprehensive bug bounty hunting and penetration testing platform that provides a visual workflow builder similar to Trickest.io. It features 150+ security tools, 12 professional workflow templates, and an intuitive drag-and-drop interface for creating custom security testing workflows.

### ✨ Key Features

- 🎨 **Visual Workflow Builder** - Drag-and-drop interface with React Flow
- 🛠️ **150+ Security Tools** - Complete arsenal across 11 categories
- 📚 **12 Professional Templates** - Ready-to-use workflows for all scenarios
- 🔗 **Interactive Connections** - Visible edges and handles like Trickest.io
- 🌙 **Dark Theme UI** - Professional, modern interface
- 🐳 **Docker Support** - Easy deployment and scaling
- 🔧 **Python/Flask Backend** - RESTful API for tool execution
- 📊 **Real-time Results** - Live scan monitoring and visualization

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm/pnpm
- **Python** 3.8+ and pip
- **Docker** (optional, for containerized deployment)
- **Git** for cloning repositories

### 🔧 Installation

#### Option 1: Automated Installation

```bash
# Extract the platform
unzip hackatomiq-v1.0.0.zip
cd hackatomiq

# Run automated installation
chmod +x install.sh
./install.sh
```

#### Option 2: Manual Installation

```bash
# Clone or extract the project
cd hackatomiq

# Install frontend dependencies
cd frontend
npm install
# or
pnpm install

# Install backend dependencies
cd ../backend
pip install -r requirements.txt

# Start the services
# Terminal 1 - Backend
cd backend && python src/main.py

# Terminal 2 - Frontend
cd frontend && npm run dev
```

### 🌐 Access the Platform

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Health**: http://localhost:5000/api/health

---

## 🐳 Docker Deployment

### Development Environment

```bash
# Start development stack
docker-compose up -d

# View logs
docker-compose logs -f
```

### Production Environment

```bash
# Start production stack with monitoring
docker-compose --profile production --profile monitoring up -d

# Scale services
docker-compose up -d --scale hackatomiq-backend=3
```

### Available Profiles

- **`development`** - Basic frontend + backend
- **`production`** - Optimized for production with Nginx
- **`monitoring`** - Adds Prometheus, Grafana, and ELK stack
- **`database`** - PostgreSQL + Redis for persistence

---

## 🛠️ Features

### 🎯 Tool Categories (150+ Tools)

<details>
<summary><strong>🔵 Reconnaissance (25 tools)</strong></summary>

- **Subdomain Discovery**: Subfinder, Amass, JSubfinder, Chaos, Assetfinder
- **Network Scanning**: Nmap, Masscan, RustScan, Naabu, Zmap
- **DNS Enumeration**: DNSrecon, DNSx, Fierce, DNSMap, MassDNS
- **OSINT**: theHarvester, Recon-ng, Shodan, Censys, SpiderFoot
- **Web Discovery**: HTTPx, Aquatone, EyeWitness, Gowitness, WebScreenshot

</details>

<details>
<summary><strong>🟢 Web Application Testing (30 tools)</strong></summary>

- **Directory Fuzzing**: Gobuster, ffuf, Wfuzz, DirSearch, Feroxbuster
- **Web Scanners**: Nikto, WhatWeb, wafw00f, WPScan, JoomScan
- **Crawlers**: HakRawler, Cariddi, GAU, Waybackurls, Katana
- **Parameter Discovery**: Arjun, ParamSpider, x8, ParamMiner
- **XSS Testing**: XSStrike, Dalfox, XSS Hunter, DOM XSS Scanner
- **SQL Injection**: SQLmap, NoSQLMap, Commix, jSQL Injection
- **CSRF Testing**: XSRFProbe, CSRFTester, CSRF Scanner

</details>

<details>
<summary><strong>🟠 Vulnerability Scanning (20 tools)</strong></summary>

- **Multi-purpose**: Nuclei, OpenVAS, Nessus, Nexpose, Rapid7
- **Web Specific**: Nikto, W3AF, OWASP ZAP, Arachni, Skipfish
- **Network**: Nmap NSE, Vulners, SearchSploit, ExploitDB
- **Specialized**: WPScan, JoomScan, DroopeScan, CMSmap, BlindElephant

</details>

<details>
<summary><strong>🔴 Exploitation & Post-Exploitation (15 tools)</strong></summary>

- **Frameworks**: Metasploit, Empire, Cobalt Strike, Covenant
- **Payload Generation**: MSFvenom, Unicorn, Veil, TheFatRat
- **Post-Exploitation**: Mimikatz, BloodHound, PowerSploit, Empire
- **Privilege Escalation**: LinPEAS, WinPEAS, Linux Exploit Suggester

</details>

<details>
<summary><strong>🟣 Network Analysis (15 tools)</strong></summary>

- **Traffic Analysis**: Wireshark, tcpdump, tshark, NetworkMiner
- **Network Tools**: Netcat, Socat, hping3, Scapy, Nping
- **MITM**: Ettercap, Bettercap, MITMproxy, SSLstrip
- **Wireless**: Aircrack-ng, Kismet, Wifite, Reaver, PixieWPS

</details>

<details>
<summary><strong>🔷 OSINT & Intelligence (20 tools)</strong></summary>

- **Social Media**: Sherlock, Social Mapper, Twint, InstagramOSINT
- **Email**: theHarvester, Hunter.io, EmailHarvester, h8mail
- **GitHub**: GitDorker, TruffleHog, GitLeaks, GitRob, Gitrob
- **Domain Intelligence**: Amass, Subfinder, Certificate Transparency
- **People Search**: Maltego, SpiderFoot, Recon-ng, OSINT Framework

</details>

<details>
<summary><strong>☁️ Cloud Security (12 tools)</strong></summary>

- **Multi-Cloud**: ScoutSuite, Prowler, CloudSploit, CloudMapper
- **AWS**: AWS CLI, Pacu, WeirdAAL, CloudGoat
- **Azure**: AzureHound, MicroBurst, PowerZure
- **GCP**: GCP Scanner, Cloud Asset Inventory

</details>

<details>
<summary><strong>📱 Mobile Security (8 tools)</strong></summary>

- **Android**: MobSF, APKTool, Jadx, Frida, Objection
- **iOS**: iMazing, 3uTools, iOS App Analyzer
- **Dynamic Analysis**: Frida, Objection, Runtime Mobile Security

</details>

<details>
<summary><strong>🔐 Secrets & Credentials (10 tools)</strong></summary>

- **Git Secrets**: TruffleHog, GitLeaks, GitRob, Repo Supervisor
- **File Analysis**: SecretFinder, LinkFinder, JSParser, Retire.js
- **Credential Stuffing**: Hydra, Medusa, Patator, Crowbar

</details>

<details>
<summary><strong>🛠️ Utilities & Workflow (15 tools)</strong></summary>

- **Input/Output**: File Input, URL Input, Target List, Output Formatter
- **Data Processing**: Filter, Merge, Sort, Deduplicate, Transform
- **Reporting**: Report Generator, PDF Export, JSON Export, CSV Export
- **Notification**: Slack, Discord, Email, Webhook, SMS

</details>

### 📚 Professional Workflow Templates

1. **🟢 Basic Web Application Scan** (Beginner, 30 min)
   - Subfinder → HTTPx → Nuclei → Output
   - Perfect for beginners learning web security

2. **🔴 Advanced Reconnaissance Workflow** (Advanced, 90 min)
   - Multi-tool subdomain discovery and validation
   - Comprehensive asset discovery and enumeration

3. **🟡 Parameter Discovery & XSS Testing** (Advanced, 75 min)
   - GAU/HakRawler → Arjun → XSStrike/Dalfox → Output
   - Specialized for parameter-based vulnerabilities

4. **🔵 GitHub Secrets & Leaks Scanner** (Intermediate, 45 min)
   - GitHub Search → GitDorker → TruffleHog → SecretFinder
   - OSINT-focused secret discovery

5. **🟠 JavaScript Analysis & Endpoint Discovery** (Intermediate, 60 min)
   - JSubfinder → Cariddi → SecretFinder → HTTPx
   - JavaScript-focused security testing

6. **🟣 CSRF & Authentication Bypass Testing** (Advanced, 55 min)
   - HTTPx → XSRFProbe → Arjun → Burp Suite
   - Authentication security assessment

7. **⚫ ProjectDiscovery Full Suite Workflow** (Expert, 120 min)
   - Complete PD toolkit integration
   - Professional-grade comprehensive testing

8. **☁️ Cloud Security Assessment** (Advanced, 75 min)
   - Multi-cloud security evaluation
   - AWS, Azure, GCP coverage

9. **📱 Mobile Application Security Testing** (Advanced, 80 min)
   - Comprehensive mobile app analysis
   - Android and iOS coverage

10. **🔗 API Security Testing** (Intermediate, 50 min)
    - REST and GraphQL API testing
    - Parameter discovery and vulnerability assessment

11. **🌐 Network Discovery & Enumeration** (Intermediate, 45 min)
    - Network-focused security assessment
    - Port scanning and service enumeration

12. **💉 SQL Injection Testing Workflow** (Advanced, 35 min)
    - Specialized SQL injection detection
    - Parameter discovery and exploitation

---

## 📁 Project Structure

```
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
├── 📁 backend/                     # Python Flask Backend
│   ├── 📁 src/
│   │   ├── main.py                # Flask application entry
│   │   ├── 📁 routes/             # API route handlers
│   │   │   ├── tools.py           # Tools API endpoints
│   │   │   ├── workflows.py       # Workflows API
│   │   │   ├── scans.py          # Scan management API
│   │   │   └── user.py           # User management
│   │   ├── 📁 models/             # Database models
│   │   │   └── user.py           # User model
│   │   └── 📁 database/          # Database files
│   ├── requirements.txt          # Python dependencies
│   └── 📁 venv/                  # Virtual environment
├── 📁 docker/                     # Docker configuration
│   ├── Dockerfile.frontend       # Frontend container
│   ├── Dockerfile.backend        # Backend container
│   └── nginx.conf                # Nginx configuration
├── docker-compose.yml            # Docker Compose setup
├── install.sh                    # Automated installation script
├── README.md                     # This documentation
└── 📁 docs/                      # Additional documentation
    ├── API.md                    # API documentation
    ├── DEPLOYMENT.md             # Deployment guide
    └── CONTRIBUTING.md           # Contribution guidelines
```

---

## 🔧 Configuration

### Environment Variables

Create `.env` files for configuration:

**Frontend (.env)**
```bash
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=HackAtomIQ
VITE_VERSION=1.0.0
```

**Backend (.env)**
```bash
FLASK_ENV=development
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///hackatomiq.db
REDIS_URL=redis://localhost:6379
```

### Tool Installation

The platform supports automatic installation of security tools:

```bash
# Install specific tools via API
curl -X POST http://localhost:5000/api/tools/install/jsubfinder
curl -X POST http://localhost:5000/api/tools/install/xsstrike
curl -X POST http://localhost:5000/api/tools/install/hakrawler
```

---

## 📊 API Documentation

### Tools API

```bash
# Get available tools
GET /api/tools

# Execute a tool
POST /api/tools/{tool_id}/execute
{
  "target": "example.com",
  "options": {"timeout": 300}
}

# Get execution status
GET /api/tools/executions/{execution_id}
```

### Workflows API

```bash
# Get all workflows
GET /api/workflows

# Save workflow
POST /api/workflows
{
  "title": "My Custom Workflow",
  "nodes": [...],
  "edges": [...]
}

# Execute workflow
POST /api/workflows/{workflow_id}/execute
```

### Scans API

```bash
# Create scan
POST /api/scans
{
  "target": "example.com",
  "scan_type": "comprehensive"
}

# Get scan results
GET /api/scans/{scan_id}/results
```

---

## 🚀 Deployment

### Production Deployment

```bash
# Build frontend for production
cd frontend && npm run build

# Copy build to backend static folder
cp -r dist/* ../backend/src/static/

# Start production server
cd ../backend && python src/main.py
```

### Docker Production

```bash
# Production deployment with monitoring
docker-compose --profile production --profile monitoring up -d

# Scale backend services
docker-compose up -d --scale hackatomiq-backend=3

# View service status
docker-compose ps
```

### Kubernetes Deployment

```bash
# Apply Kubernetes manifests
kubectl apply -f k8s/

# Check deployment status
kubectl get pods -l app=hackatomiq
```

---

## 🔒 Security Considerations

### Tool Execution Security

- All tool executions run in isolated containers
- Input validation and sanitization
- Resource limits and timeouts
- Audit logging for all operations

### API Security

- JWT authentication for API access
- Rate limiting on all endpoints
- Input validation and CORS protection
- Secure secret management

### Data Protection

- Encrypted data storage
- Secure communication (HTTPS/TLS)
- Regular security updates
- Vulnerability scanning

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](docs/CONTRIBUTING.md) for guidelines.

### Development Setup

```bash
# Fork and clone the repository
git clone https://github.com/yourusername/hackatomiq.git

# Create feature branch
git checkout -b feature/amazing-feature

# Make changes and commit
git commit -m "Add amazing feature"

# Push and create pull request
git push origin feature/amazing-feature
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Trickest.io** - Inspiration for the visual workflow builder
- **ProjectDiscovery** - Amazing security tools and community
- **OWASP** - Security testing methodologies
- **Kali Linux** - Comprehensive security tool collection
- **React Flow** - Excellent workflow visualization library

---

## 📞 Support

- 📧 **Email**: support@hackatomiq.com
- 💬 **Discord**: [HackAtomIQ Community](https://discord.gg/hackatomiq)
- 🐛 **Issues**: [GitHub Issues](https://github.com/hackatomiq/hackatomiq/issues)
- 📖 **Documentation**: [docs.hackatomiq.com](https://docs.hackatomiq.com)

---

<div align="center">

**⭐ Star this repository if you find it useful!**

Made with ❤️ by the HackAtomIQ Team

</div>

