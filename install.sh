#!/bin/bash

# HackAtomIQ - Advanced Bug Bounty Platform
# Automated Installation Script
# Version: 1.0.0

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# ASCII Art Banner
print_banner() {
    echo -e "${CYAN}"
    cat << "EOF"
    ██╗  ██╗ █████╗  ██████╗██╗  ██╗ █████╗ ████████╗ ██████╗ ███╗   ███╗██╗ ██████╗ 
    ██║  ██║██╔══██╗██╔════╝██║ ██╔╝██╔══██╗╚══██╔══╝██╔═══██╗████╗ ████║██║██╔═══██╗
    ███████║███████║██║     █████╔╝ ███████║   ██║   ██║   ██║██╔████╔██║██║██║   ██║
    ██╔══██║██╔══██║██║     ██╔═██╗ ██╔══██║   ██║   ██║   ██║██║╚██╔╝██║██║██║▄▄ ██║
    ██║  ██║██║  ██║╚██████╗██║  ██╗██║  ██║   ██║   ╚██████╔╝██║ ╚═╝ ██║██║╚██████╔╝
    ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝     ╚═╝╚═╝ ╚══▀▀═╝ 
                                                                                      
    Advanced Bug Bounty & Penetration Testing Platform
    Inspired by Trickest.io | 150+ Security Tools | Visual Workflow Builder
EOF
    echo -e "${NC}"
}

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check system requirements
check_requirements() {
    log_info "Checking system requirements..."

    # Check OS
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        log_success "Linux detected"
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        log_success "macOS detected"
    else
        log_error "Unsupported operating system: $OSTYPE"
        exit 1
    fi

    # Check Node.js
    if command_exists node; then
        NODE_VERSION=$(node --version | cut -d'v' -f2)
        log_success "Node.js found: v$NODE_VERSION"
    else
        log_error "Node.js not found. Please install Node.js 18+ from https://nodejs.org/"
        exit 1
    fi

    # Check Python
    if command_exists python3; then
        PYTHON_VERSION=$(python3 --version | cut -d' ' -f2)
        log_success "Python found: $PYTHON_VERSION"
    else
        log_error "Python 3 not found. Please install Python 3.8+ from https://python.org/"
        exit 1
    fi

    # Check pip
    if command_exists pip3; then
        log_success "pip3 found"
    else
        log_error "pip3 not found. Please install pip3"
        exit 1
    fi

    # Check package manager
    if command_exists npm; then
        log_success "npm found"
        PACKAGE_MANAGER="npm"
    elif command_exists pnpm; then
        log_success "pnpm found"
        PACKAGE_MANAGER="pnpm"
    elif command_exists yarn; then
        log_success "yarn found"
        PACKAGE_MANAGER="yarn"
    else
        log_error "No package manager found. Please install npm, pnpm, or yarn"
        exit 1
    fi
}

# Install frontend dependencies
install_frontend() {
    log_info "Installing frontend dependencies..."

    if [ -d "bug-bounty-platform" ]; then
        cd bug-bounty-platform
    elif [ -d "frontend" ]; then
        cd frontend
    else
        log_error "Frontend directory not found"
        exit 1
    fi

    case $PACKAGE_MANAGER in
        "npm")
            npm install
            ;;
        "pnpm")
            pnpm install
            ;;
        "yarn")
            yarn install
            ;;
    esac

    log_success "Frontend dependencies installed"
    cd ..
}

# Install backend dependencies
install_backend() {
    log_info "Installing backend dependencies..."

    if [ -d "bug-bounty-backend" ]; then
        cd bug-bounty-backend
    elif [ -d "backend" ]; then
        cd backend
    else
        log_error "Backend directory not found"
        exit 1
    fi

    # Create virtual environment if it doesn't exist
    if [ ! -d "venv" ]; then
        log_info "Creating Python virtual environment..."
        python3 -m venv venv
    fi

    # Activate virtual environment
    source venv/bin/activate

    # Upgrade pip
    pip install --upgrade pip

    # Install requirements
    if [ -f "requirements.txt" ]; then
        pip install -r requirements.txt
    else
        log_error "requirements.txt not found"
        exit 1
    fi

    log_success "Backend dependencies installed"
    cd ..
}

# Install security tools
install_security_tools() {
    log_info "Installing security tools..."

    # Check if running on Kali Linux
    if [ -f "/etc/os-release" ] && grep -q "kali" /etc/os-release; then
        log_info "Kali Linux detected - most tools should already be available"
    else
        log_warning "Not running on Kali Linux - some tools may need manual installation"
    fi

    # Install Go tools if Go is available
    if command_exists go; then
        log_info "Installing Go-based security tools..."

        # ProjectDiscovery tools
        go install -v github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest
        go install -v github.com/projectdiscovery/httpx/cmd/httpx@latest
        go install -v github.com/projectdiscovery/nuclei/v2/cmd/nuclei@latest
        go install -v github.com/projectdiscovery/naabu/v2/cmd/naabu@latest
        go install -v github.com/projectdiscovery/katana/cmd/katana@latest
        go install -v github.com/projectdiscovery/dnsx/cmd/dnsx@latest

        # Other Go tools
        go install github.com/hakluke/hakrawler@latest
        go install github.com/edoardottt/cariddi/cmd/cariddi@latest
        go install github.com/lc/gau/v2/cmd/gau@latest
        go install github.com/tomnomnom/waybackurls@latest
        go install github.com/ffuf/ffuf@latest

        log_success "Go-based tools installed"
    else
        log_warning "Go not found - skipping Go-based tool installation"
    fi

    # Install Python tools
    log_info "Installing Python-based security tools..."
    pip3 install --user arjun sqlmap xsrfprobe

    log_success "Security tools installation completed"
}

# Create startup scripts
create_startup_scripts() {
    log_info "Creating startup scripts..."

    # Frontend startup script
    cat > start_frontend.sh << 'EOF'
#!/bin/bash
cd bug-bounty-platform || cd frontend
npm run dev
EOF

    # Backend startup script
    cat > start_backend.sh << 'EOF'
#!/bin/bash
cd bug-bounty-backend || cd backend
source venv/bin/activate
python src/main.py
EOF

    # Combined startup script
    cat > start_hackatomiq.sh << 'EOF'
#!/bin/bash

# HackAtomIQ Startup Script
echo "Starting HackAtomIQ Platform..."

# Start backend in background
echo "Starting backend..."
cd bug-bounty-backend || cd backend
source venv/bin/activate
python src/main.py &
BACKEND_PID=$!

# Wait for backend to start
sleep 5

# Start frontend
echo "Starting frontend..."
cd ../bug-bounty-platform || cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo "HackAtomIQ is starting up..."
echo "Frontend: http://localhost:5173"
echo "Backend API: http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for user interrupt
trap 'kill $BACKEND_PID $FRONTEND_PID; exit' INT
wait
EOF

    chmod +x start_frontend.sh start_backend.sh start_hackatomiq.sh

    log_success "Startup scripts created"
}

# Create desktop shortcut (Linux only)
create_desktop_shortcut() {
    if [[ "$OSTYPE" == "linux-gnu"* ]] && [ -d "$HOME/Desktop" ]; then
        log_info "Creating desktop shortcut..."

        cat > "$HOME/Desktop/HackAtomIQ.desktop" << EOF
[Desktop Entry]
Version=1.0
Type=Application
Name=HackAtomIQ
Comment=Advanced Bug Bounty Platform
Exec=$(pwd)/start_hackatomiq.sh
Icon=security
Terminal=true
Categories=Security;Development;
EOF

        chmod +x "$HOME/Desktop/HackAtomIQ.desktop"
        log_success "Desktop shortcut created"
    fi
}

# Main installation function
main() {
    print_banner

    log_info "Starting HackAtomIQ installation..."
    log_info "This will install the complete bug bounty platform with 150+ security tools"

    # Ask for confirmation
    read -p "Do you want to continue? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        log_info "Installation cancelled"
        exit 0
    fi

    # Run installation steps
    check_requirements
    install_frontend
    install_backend
    install_security_tools
    create_startup_scripts
    create_desktop_shortcut

    # Final success message
    echo
    log_success "🎉 HackAtomIQ installation completed successfully!"
    echo
    echo -e "${CYAN}Next steps:${NC}"
    echo "1. Start the platform: ${GREEN}./start_hackatomiq.sh${NC}"
    echo "2. Open your browser: ${GREEN}http://localhost:5173${NC}"
    echo "3. Explore the workflow builder and 150+ security tools"
    echo
    echo -e "${CYAN}Quick commands:${NC}"
    echo "• Frontend only: ${GREEN}./start_frontend.sh${NC}"
    echo "• Backend only: ${GREEN}./start_backend.sh${NC}"
    echo "• Full platform: ${GREEN}./start_hackatomiq.sh${NC}"
    echo
    echo -e "${CYAN}Documentation:${NC}"
    echo "• README.md - Complete documentation"
    echo "• API docs: http://localhost:5000/api/health"
    echo
    echo -e "${YELLOW}Happy Bug Hunting! 🎯${NC}"
}

# Run main function
main "$@"
