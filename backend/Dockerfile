# ==========================================
# 🧱 BASE BUILDER: THE FOUNDATION
# ==========================================
FROM python:3.11-bookworm

ENV DEBIAN_FRONTEND=noninteractive
ENV GOPATH="/go"
ENV PATH="${GOPATH}/bin:/root/.cargo/bin:${PATH}"

# 1. Install System Dependencies & Compilers
# includes libpcap (for naabu/masscan), ruby (wpscan), java (apktool), and build-essential
RUN apt-get update && apt-get install -y \
    build-essential \
    libpcap-dev \
    libssl-dev \
    libffi-dev \
    git \
    wget \
    curl \
    unzip \
    jq \
    nmap \
    masscan \
    ruby-full \
    ruby-dev \
    default-jre \
    zlib1g-dev \
    libxml2-dev \
    libxslt-dev \
    chromium-driver \
    && rm -rf /var/lib/apt/lists/*

# ==========================================
# 🐹 GO TOOLS (The Heavy Lifters)
# ==========================================
COPY --from=golang:1.21-bookworm /usr/local/go/ /usr/local/go/
ENV PATH="/usr/local/go/bin:${PATH}"

# > ProjectDiscovery Suite (Recon & Vuln)
RUN go install -v github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest && \
    go install -v github.com/projectdiscovery/httpx/cmd/httpx@latest && \
    go install -v github.com/projectdiscovery/nuclei/v2/cmd/nuclei@latest && \
    go install -v github.com/projectdiscovery/naabu/v2/cmd/naabu@latest && \
    go install -v github.com/projectdiscovery/katana/cmd/katana@latest && \
    go install -v github.com/projectdiscovery/dnsx/cmd/dnsx@latest && \
    go install -v github.com/projectdiscovery/alterx/cmd/alterx@latest && \
    go install -v github.com/projectdiscovery/notify/cmd/notify@latest && \
    go install -v github.com/projectdiscovery/chaos-client/cmd/chaos@latest && \
    go install -v github.com/projectdiscovery/shuffledns/cmd/shuffledns@latest

# > The "TomNomNom" Collection (Filtering)
RUN go install -v github.com/tomnomnom/anew@latest && \
    go install -v github.com/tomnomnom/unfurl@latest && \
    go install -v github.com/tomnomnom/gf@latest && \
    go install -v github.com/tomnomnom/waybackurls@latest

# > Specialized Recon
RUN go install -v github.com/owasp-amass/amass/v4/...@master && \
    go install -v github.com/lc/gau/v2/cmd/gau@latest && \
    go install -v github.com/hakluke/hakrawler@latest && \
    go install -v github.com/sensepost/gowitness@latest && \
    go install -v github.com/ffuf/ffuf@latest && \
    go install -v github.com/d3mondev/puredns/v2@latest && \
    go install -v github.com/hahwul/dalfox/v2@latest && \
    go install -v github.com/trufflesecurity/trufflehog/v3@latest && \
    go install -v github.com/dwisiswant0/go-dork@latest

# ==========================================
# 🦀 RUST TOOLS (High Performance Fuzzing)
# ==========================================
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
RUN cargo install feroxbuster

# ==========================================
# 🐍 PYTHON TOOLS (Exploitation & Logic)
# ==========================================
# Install core pip tools
RUN pip install --no-cache-dir \
    sqlmap \
    commix \
    trufflehog3 \
    arjun \
    wafw00f \
    uro \
    paramspider \
    requests \
    urllib3 \
    uvicorn \
    fastapi \
    sqlalchemy \
    psycopg2-binary \
    pyyaml \
    aiofiles

# > Cloud Enum
RUN git clone https://github.com/initstring/cloud_enum.git /opt/cloud_enum && \
    pip install -r /opt/cloud_enum/requirements.txt && \
    ln -s /opt/cloud_enum/cloud_enum.py /usr/local/bin/cloud_enum

# > Waymore (Advanced Wayback)
RUN git clone https://github.com/xnl-h4ck3r/waymore.git /opt/waymore && \
    cd /opt/waymore && python3 setup.py install

# > Ghauri (Advanced SQLi)
RUN git clone https://github.com/r0oth3x49/ghauri.git /opt/ghauri && \
    cd /opt/ghauri && python3 -m pip install -r requirements.txt && \
    python3 setup.py install

# > Mantra (Secret finding)
RUN git clone https://github.com/MrEmpy/Mantra.git /opt/mantra && \
    cd /opt/mantra && pip install -r requirements.txt && \
    ln -s /opt/mantra/mantra.py /usr/local/bin/mantra

# ==========================================
# 🛠️ MANUAL BINARIES & COMPILATION
# ==========================================

# > MassDNS (Required for Puredns/Shuffledns)
RUN git clone https://github.com/blechschmidt/massdns.git /tmp/massdns && \
    cd /tmp/massdns && make && \
    mv bin/massdns /usr/local/bin/ && \
    rm -rf /tmp/massdns

# > Kiterunner (API Fuzzing)
RUN wget https://github.com/assetnote/kiterunner/releases/download/v1.0.2/kiterunner_1.0.2_linux_amd64.tar.gz -O /tmp/kr.tar.gz && \
    tar xvf /tmp/kr.tar.gz -C /tmp && \
    mv /tmp/kr /usr/local/bin/ && \
    rm /tmp/kr.tar.gz

# > Trivy (Container Security)
RUN curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -s -- -b /usr/local/bin

# > Apktool (Mobile Reversing)
RUN wget https://raw.githubusercontent.com/iBotPeaches/Apktool/master/scripts/linux/apktool -O /usr/local/bin/apktool && \
    wget https://bitbucket.org/iBotPeaches/apktool/downloads/apktool_2.9.1.jar -O /usr/local/bin/apktool.jar && \
    chmod +x /usr/local/bin/apktool /usr/local/bin/apktool.jar

# > WPScan (CMS)
RUN gem install wpscan

# ==========================================
# 📚 WORDLISTS (SecLists Minimal)
# ==========================================
WORKDIR /usr/share/wordlists
RUN git clone --depth 1 https://github.com/danielmiessler/SecLists.git
# Create symlinks for commonly used paths
RUN ln -s /usr/share/wordlists/SecLists/Discovery/DNS/subdomains-top1million-110000.txt /usr/share/wordlists/subdomains.txt && \
    ln -s /usr/share/wordlists/SecLists/Discovery/Web-Content/common.txt /usr/share/wordlists/dirb-common.txt && \
    ln -s /usr/share/wordlists/SecLists/Discovery/DNS/resolvers.txt /usr/share/wordlists/resolvers.txt

# ==========================================
# 🚀 APP SETUP
# ==========================================
WORKDIR /app

# Copy Requirements & Install (for App Logic)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy Configs
COPY tools.yaml .

# Copy Source Code
COPY src/ ./src/

# Permissions for output
RUN mkdir -p scans && chmod 777 scans

# Update Nuclei Templates on build
RUN nuclei -update-templates

EXPOSE 5000

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "5000", "--reload"]
