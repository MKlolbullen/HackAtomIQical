FROM python:3.10-slim

# 1. Install System Dependencies & Security Tools
RUN apt-get update && apt-get install -y \
    nmap \
    wget \
    curl \
    git \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# 2. Install Go (For Nuclei, Subfinder, etc.)
COPY --from=golang:1.21-alpine /usr/local/go/ /usr/local/go/
ENV PATH="/usr/local/go/bin:${PATH}"
ENV GOPATH="/go"
ENV PATH="${GOPATH}/bin:${PATH}"

# 3. Install ProjectDiscovery Tools
RUN go install -v github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest
RUN go install -v github.com/projectdiscovery/nuclei/v2/cmd/nuclei@latest
RUN go install -v github.com/projectdiscovery/httpx/cmd/httpx@latest
# Add more tools here...

# 4. Python Setup
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copy App
COPY . .

# 6. Run
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "5000"]
