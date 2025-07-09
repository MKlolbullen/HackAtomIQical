# HackAtomIQ - Advanced Bug Bounty Platform
# Multi-stage Docker build for production deployment

# Stage 1: Build React Frontend
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend

# Copy package files
COPY bug-bounty-platform/package*.json ./
COPY bug-bounty-platform/pnpm-lock.yaml* ./

# Install dependencies
RUN npm install -g pnpm && pnpm install

# Copy source code
COPY bug-bounty-platform/ ./

# Build for production
RUN pnpm run build

# Stage 2: Python Backend with Security Tools
FROM python:3.11-slim AS backend

# Install system dependencies and security tools
RUN apt-get update && apt-get install -y \
    git \
    curl \
    wget \
    nmap \
    nikto \
    sqlmap \
    gobuster \
    dirb \
    dnsutils \
    netcat-traditional \
    masscan \
    amass \
    subfinder \
    httpx-toolkit \
    nuclei \
    && rm -rf /var/lib/apt/lists/*

# Install Go for additional tools
RUN curl -L https://go.dev/dl/go1.21.0.linux-amd64.tar.gz | tar -C /usr/local -xz
ENV PATH="/usr/local/go/bin:${PATH}"

# Install Go-based security tools
RUN go install -v github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest && \
    go install -v github.com/projectdiscovery/httpx/cmd/httpx@latest && \
    go install -v github.com/projectdiscovery/nuclei/v2/cmd/nuclei@latest && \
    go install -v github.com/projectdiscovery/naabu/v2/cmd/naabu@latest && \
    go install -v github.com/projectdiscovery/katana/cmd/katana@latest && \
    go install -v github.com/projectdiscovery/dnsx/cmd/dnsx@latest && \
    go install github.com/hakluke/hakrawler@latest && \
    go install github.com/edoardottt/cariddi/cmd/cariddi@latest && \
    go install github.com/lc/gau/v2/cmd/gau@latest && \
    go install github.com/tomnomnom/waybackurls@latest && \
    go install github.com/ffuf/ffuf@latest

# Set up Python environment
WORKDIR /app

# Copy backend requirements
COPY bug-bounty-backend/requirements.txt ./

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Install additional Python security tools
RUN pip install --no-cache-dir \
    arjun \
    xsrfprobe \
    truffleHog \
    gitpython \
    paramiko

# Copy backend source
COPY bug-bounty-backend/src/ ./src/

# Copy built frontend to backend static folder
COPY --from=frontend-builder /app/frontend/dist/ ./src/static/

# Create necessary directories
RUN mkdir -p ./src/database ./src/logs

# Set environment variables
ENV FLASK_APP=src/main.py
ENV FLASK_ENV=production
ENV PYTHONPATH=/app

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:5000/api/health || exit 1

# Start the application
CMD ["python", "src/main.py"]

