import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Download, Star, Clock, User, Filter, Grid, List } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { WorkflowTemplate, ViewMode, CategoryFilter, DifficultyFilter } from '@/types/library'

const WorkflowLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyFilter>('all')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const navigate = useNavigate()

  // Enhanced workflow templates for HackAtomIQ
  const workflows: WorkflowTemplate[] = [
    {
      id: 1,
      title: 'Basic Web Application Scan',
      description: 'Comprehensive web application security assessment workflow for beginners',
      category: 'Web Security',
      difficulty: 'Beginner',
      duration: '30 min',
      rating: 4.8,
      downloads: 2847,
      author: 'HackAtomIQ Team',
      tags: ['web', 'scanning', 'basic', 'beginner'],
      nodes: [
        { id: '1', type: 'toolNode', position: { x: 100, y: 100 }, data: { label: 'Input', tool: 'input', category: 'utilities' } },
        { id: '2', type: 'toolNode', position: { x: 300, y: 100 }, data: { label: 'Subfinder', tool: 'subfinder', category: 'reconnaissance' } },
        { id: '3', type: 'toolNode', position: { x: 500, y: 100 }, data: { label: 'HTTPx', tool: 'httpx', category: 'web_testing' } },
        { id: '4', type: 'toolNode', position: { x: 700, y: 100 }, data: { label: 'Nuclei', tool: 'nuclei', category: 'vulnerability' } },
        { id: '5', type: 'toolNode', position: { x: 300, y: 250 }, data: { label: 'Gobuster', tool: 'gobuster', category: 'web_testing' } },
        { id: '6', type: 'toolNode', position: { x: 500, y: 250 }, data: { label: 'Nikto', tool: 'nikto', category: 'web_testing' } },
        { id: '7', type: 'toolNode', position: { x: 700, y: 250 }, data: { label: 'Output', tool: 'output', category: 'utilities' } }
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2', animated: true },
        { id: 'e2-3', source: '2', target: '3', animated: true },
        { id: 'e3-4', source: '3', target: '4', animated: true },
        { id: 'e2-5', source: '2', target: '5', animated: true },
        { id: 'e5-6', source: '5', target: '6', animated: true },
        { id: 'e4-7', source: '4', target: '7', animated: true },
        { id: 'e6-7', source: '6', target: '7', animated: true }
      ]
    },
    {
      id: 2,
      title: 'Advanced Reconnaissance Workflow',
      description: 'Comprehensive reconnaissance workflow using multiple tools and techniques',
      category: 'Reconnaissance',
      difficulty: 'Advanced',
      duration: '90 min',
      rating: 4.9,
      downloads: 1923,
      author: 'Bug Hunter Pro',
      tags: ['recon', 'advanced', 'osint', 'subdomain'],
      nodes: [
        { id: '1', type: 'toolNode', position: { x: 100, y: 100 }, data: { label: 'Input', tool: 'input', category: 'utilities' } },
        { id: '2', type: 'toolNode', position: { x: 300, y: 50 }, data: { label: 'Subfinder', tool: 'subfinder', category: 'reconnaissance' } },
        { id: '3', type: 'toolNode', position: { x: 300, y: 150 }, data: { label: 'Amass', tool: 'amass', category: 'reconnaissance' } },
        { id: '4', type: 'toolNode', position: { x: 500, y: 100 }, data: { label: 'DNSx', tool: 'dnsx', category: 'reconnaissance' } },
        { id: '5', type: 'toolNode', position: { x: 700, y: 100 }, data: { label: 'HTTPx', tool: 'httpx', category: 'web_testing' } },
        { id: '6', type: 'toolNode', position: { x: 900, y: 100 }, data: { label: 'Nuclei', tool: 'nuclei', category: 'vulnerability' } },
        { id: '7', type: 'toolNode', position: { x: 1100, y: 100 }, data: { label: 'Output', tool: 'output', category: 'utilities' } }
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2', animated: true },
        { id: 'e1-3', source: '1', target: '3', animated: true },
        { id: 'e2-4', source: '2', target: '4', animated: true },
        { id: 'e3-4', source: '3', target: '4', animated: true },
        { id: 'e4-5', source: '4', target: '5', animated: true },
        { id: 'e5-6', source: '5', target: '6', animated: true },
        { id: 'e6-7', source: '6', target: '7', animated: true }
      ]
    },
    {
      id: 3,
      title: 'Parameter Discovery & XSS Testing',
      description: 'Comprehensive parameter discovery and XSS vulnerability testing workflow',
      category: 'Web Security',
      difficulty: 'Advanced',
      duration: '75 min',
      rating: 4.7,
      downloads: 2156,
      author: 'XSS Hunter',
      tags: ['xss', 'parameters', 'web', 'vulnerability'],
      nodes: [
        { id: '1', type: 'toolNode', position: { x: 100, y: 100 }, data: { label: 'Input', tool: 'input', category: 'utilities' } },
        { id: '2', type: 'toolNode', position: { x: 300, y: 50 }, data: { label: 'GAU', tool: 'gau', category: 'web_testing' } },
        { id: '3', type: 'toolNode', position: { x: 300, y: 150 }, data: { label: 'HakRawler', tool: 'hakrawler', category: 'web_testing' } },
        { id: '4', type: 'toolNode', position: { x: 500, y: 100 }, data: { label: 'Arjun', tool: 'arjun', category: 'parameter_discovery' } },
        { id: '5', type: 'toolNode', position: { x: 700, y: 50 }, data: { label: 'XSStrike', tool: 'xsstrike', category: 'web_testing' } },
        { id: '6', type: 'toolNode', position: { x: 700, y: 150 }, data: { label: 'Dalfox', tool: 'dalfox', category: 'web_testing' } },
        { id: '7', type: 'toolNode', position: { x: 900, y: 100 }, data: { label: 'Output', tool: 'output', category: 'utilities' } }
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2', animated: true },
        { id: 'e1-3', source: '1', target: '3', animated: true },
        { id: 'e2-4', source: '2', target: '4', animated: true },
        { id: 'e3-4', source: '3', target: '4', animated: true },
        { id: 'e4-5', source: '4', target: '5', animated: true },
        { id: 'e4-6', source: '4', target: '6', animated: true },
        { id: 'e5-7', source: '5', target: '7', animated: true },
        { id: 'e6-7', source: '6', target: '7', animated: true }
      ]
    },
    {
      id: 4,
      title: 'GitHub Secrets & Leaks Scanner',
      description: 'Comprehensive GitHub repository scanning for secrets and sensitive information',
      category: 'OSINT',
      difficulty: 'Intermediate',
      duration: '45 min',
      rating: 4.6,
      downloads: 1834,
      author: 'OSINT Master',
      tags: ['github', 'secrets', 'leaks', 'osint'],
      nodes: [
        { id: '1', type: 'toolNode', position: { x: 100, y: 100 }, data: { label: 'Input', tool: 'input', category: 'utilities' } },
        { id: '2', type: 'toolNode', position: { x: 300, y: 50 }, data: { label: 'GitHub Search', tool: 'github-search', category: 'osint' } },
        { id: '3', type: 'toolNode', position: { x: 300, y: 150 }, data: { label: 'GitDorker', tool: 'gitdorker', category: 'secrets_scanning' } },
        { id: '4', type: 'toolNode', position: { x: 500, y: 50 }, data: { label: 'TruffleHog', tool: 'truffleHog', category: 'secrets_scanning' } },
        { id: '5', type: 'toolNode', position: { x: 500, y: 150 }, data: { label: 'GitLeaks', tool: 'gitleaks', category: 'secrets_scanning' } },
        { id: '6', type: 'toolNode', position: { x: 700, y: 100 }, data: { label: 'SecretFinder', tool: 'secretfinder', category: 'secrets_scanning' } },
        { id: '7', type: 'toolNode', position: { x: 900, y: 100 }, data: { label: 'Output', tool: 'output', category: 'utilities' } }
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2', animated: true },
        { id: 'e1-3', source: '1', target: '3', animated: true },
        { id: 'e2-4', source: '2', target: '4', animated: true },
        { id: 'e3-5', source: '3', target: '5', animated: true },
        { id: 'e4-6', source: '4', target: '6', animated: true },
        { id: 'e5-6', source: '5', target: '6', animated: true },
        { id: 'e6-7', source: '6', target: '7', animated: true }
      ]
    },
    {
      id: 5,
      title: 'JavaScript Analysis & Endpoint Discovery',
      description: 'Extract endpoints and secrets from JavaScript files using specialized tools',
      category: 'Web Security',
      difficulty: 'Intermediate',
      duration: '60 min',
      rating: 4.5,
      downloads: 2234,
      author: 'JS Hunter',
      tags: ['javascript', 'endpoints', 'secrets', 'analysis'],
      nodes: [
        { id: '1', type: 'toolNode', position: { x: 100, y: 100 }, data: { label: 'Input', tool: 'input', category: 'utilities' } },
        { id: '2', type: 'toolNode', position: { x: 300, y: 100 }, data: { label: 'JSubfinder', tool: 'jsubfinder', category: 'reconnaissance' } },
        { id: '3', type: 'toolNode', position: { x: 500, y: 50 }, data: { label: 'Cariddi', tool: 'cariddi', category: 'web_testing' } },
        { id: '4', type: 'toolNode', position: { x: 500, y: 150 }, data: { label: 'SecretFinder', tool: 'secretfinder', category: 'secrets_scanning' } },
        { id: '5', type: 'toolNode', position: { x: 700, y: 100 }, data: { label: 'HTTPx', tool: 'httpx', category: 'web_testing' } },
        { id: '6', type: 'toolNode', position: { x: 900, y: 100 }, data: { label: 'Output', tool: 'output', category: 'utilities' } }
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2', animated: true },
        { id: 'e2-3', source: '2', target: '3', animated: true },
        { id: 'e2-4', source: '2', target: '4', animated: true },
        { id: 'e3-5', source: '3', target: '5', animated: true },
        { id: 'e4-5', source: '4', target: '5', animated: true },
        { id: 'e5-6', source: '5', target: '6', animated: true }
      ]
    },
    {
      id: 6,
      title: 'CSRF & Authentication Bypass Testing',
      description: 'Comprehensive CSRF vulnerability testing and authentication bypass techniques',
      category: 'Web Security',
      difficulty: 'Advanced',
      duration: '55 min',
      rating: 4.8,
      downloads: 1567,
      author: 'Auth Bypass Pro',
      tags: ['csrf', 'authentication', 'bypass', 'web'],
      nodes: [
        { id: '1', type: 'toolNode', position: { x: 100, y: 100 }, data: { label: 'Input', tool: 'input', category: 'utilities' } },
        { id: '2', type: 'toolNode', position: { x: 300, y: 100 }, data: { label: 'HTTPx', tool: 'httpx', category: 'web_testing' } },
        { id: '3', type: 'toolNode', position: { x: 500, y: 50 }, data: { label: 'XSRFProbe', tool: 'xsrfprobe', category: 'web_testing' } },
        { id: '4', type: 'toolNode', position: { x: 500, y: 150 }, data: { label: 'Arjun', tool: 'arjun', category: 'parameter_discovery' } },
        { id: '5', type: 'toolNode', position: { x: 700, y: 100 }, data: { label: 'Burp Suite', tool: 'burp', category: 'web_testing' } },
        { id: '6', type: 'toolNode', position: { x: 900, y: 100 }, data: { label: 'Output', tool: 'output', category: 'utilities' } }
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2', animated: true },
        { id: 'e2-3', source: '2', target: '3', animated: true },
        { id: 'e2-4', source: '2', target: '4', animated: true },
        { id: 'e3-5', source: '3', target: '5', animated: true },
        { id: 'e4-5', source: '4', target: '5', animated: true },
        { id: 'e5-6', source: '5', target: '6', animated: true }
      ]
    },
    {
      id: 7,
      title: 'ProjectDiscovery Full Suite Workflow',
      description: 'Complete workflow using the entire ProjectDiscovery toolkit for comprehensive testing',
      category: 'Comprehensive',
      difficulty: 'Expert',
      duration: '120 min',
      rating: 4.9,
      downloads: 3456,
      author: 'ProjectDiscovery Team',
      tags: ['projectdiscovery', 'comprehensive', 'nuclei', 'subfinder'],
      nodes: [
        { id: '1', type: 'toolNode', position: { x: 100, y: 100 }, data: { label: 'Input', tool: 'input', category: 'utilities' } },
        { id: '2', type: 'toolNode', position: { x: 250, y: 50 }, data: { label: 'Subfinder', tool: 'subfinder', category: 'reconnaissance' } },
        { id: '3', type: 'toolNode', position: { x: 250, y: 150 }, data: { label: 'Chaos', tool: 'chaos', category: 'reconnaissance' } },
        { id: '4', type: 'toolNode', position: { x: 400, y: 100 }, data: { label: 'DNSx', tool: 'dnsx', category: 'reconnaissance' } },
        { id: '5', type: 'toolNode', position: { x: 550, y: 100 }, data: { label: 'HTTPx', tool: 'httpx', category: 'web_testing' } },
        { id: '6', type: 'toolNode', position: { x: 700, y: 50 }, data: { label: 'Katana', tool: 'katana', category: 'web_testing' } },
        { id: '7', type: 'toolNode', position: { x: 700, y: 150 }, data: { label: 'Naabu', tool: 'naabu', category: 'network' } },
        { id: '8', type: 'toolNode', position: { x: 850, y: 100 }, data: { label: 'Nuclei', tool: 'nuclei', category: 'vulnerability' } },
        { id: '9', type: 'toolNode', position: { x: 1000, y: 100 }, data: { label: 'Output', tool: 'output', category: 'utilities' } }
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2', animated: true },
        { id: 'e1-3', source: '1', target: '3', animated: true },
        { id: 'e2-4', source: '2', target: '4', animated: true },
        { id: 'e3-4', source: '3', target: '4', animated: true },
        { id: 'e4-5', source: '4', target: '5', animated: true },
        { id: 'e5-6', source: '5', target: '6', animated: true },
        { id: 'e5-7', source: '5', target: '7', animated: true },
        { id: 'e6-8', source: '6', target: '8', animated: true },
        { id: 'e7-8', source: '7', target: '8', animated: true },
        { id: 'e8-9', source: '8', target: '9', animated: true }
      ]
    },
    {
      id: 8,
      title: 'Cloud Security Assessment',
      description: 'Multi-cloud security assessment workflow for AWS, Azure, and GCP',
      category: 'Cloud Security',
      difficulty: 'Advanced',
      duration: '75 min',
      rating: 4.4,
      downloads: 1456,
      author: 'Cloud Security Expert',
      tags: ['cloud', 'aws', 'azure', 'gcp'],
      nodes: [
        { id: '1', type: 'toolNode', position: { x: 100, y: 100 }, data: { label: 'Input', tool: 'input', category: 'utilities' } },
        { id: '2', type: 'toolNode', position: { x: 300, y: 50 }, data: { label: 'Cloud Enum', tool: 'cloud-enum', category: 'cloud' } },
        { id: '3', type: 'toolNode', position: { x: 300, y: 150 }, data: { label: 'Prowler', tool: 'prowler', category: 'cloud' } },
        { id: '4', type: 'toolNode', position: { x: 500, y: 100 }, data: { label: 'ScoutSuite', tool: 'scoutsuite', category: 'cloud' } },
        { id: '5', type: 'toolNode', position: { x: 700, y: 100 }, data: { label: 'Output', tool: 'output', category: 'utilities' } }
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2', animated: true },
        { id: 'e1-3', source: '1', target: '3', animated: true },
        { id: 'e2-4', source: '2', target: '4', animated: true },
        { id: 'e3-4', source: '3', target: '4', animated: true },
        { id: 'e4-5', source: '4', target: '5', animated: true }
      ]
    },
    {
      id: 9,
      title: 'Mobile Application Security Testing',
      description: 'Comprehensive mobile app security testing for Android and iOS applications',
      category: 'Mobile Security',
      difficulty: 'Advanced',
      duration: '80 min',
      rating: 4.3,
      downloads: 1678,
      author: 'Mobile Security Pro',
      tags: ['mobile', 'android', 'ios', 'apk'],
      nodes: [
        { id: '1', type: 'toolNode', position: { x: 100, y: 100 }, data: { label: 'Input', tool: 'input', category: 'utilities' } },
        { id: '2', type: 'toolNode', position: { x: 300, y: 100 }, data: { label: 'MobSF', tool: 'mobsf', category: 'mobile' } },
        { id: '3', type: 'toolNode', position: { x: 500, y: 50 }, data: { label: 'APKTool', tool: 'apktool', category: 'mobile' } },
        { id: '4', type: 'toolNode', position: { x: 500, y: 150 }, data: { label: 'Frida', tool: 'frida', category: 'mobile' } },
        { id: '5', type: 'toolNode', position: { x: 700, y: 100 }, data: { label: 'Output', tool: 'output', category: 'utilities' } }
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2', animated: true },
        { id: 'e2-3', source: '2', target: '3', animated: true },
        { id: 'e2-4', source: '2', target: '4', animated: true },
        { id: 'e3-5', source: '3', target: '5', animated: true },
        { id: 'e4-5', source: '4', target: '5', animated: true }
      ]
    },
    {
      id: 10,
      title: 'API Security Testing',
      description: 'Comprehensive API security testing workflow for REST and GraphQL APIs',
      category: 'API Security',
      difficulty: 'Intermediate',
      duration: '50 min',
      rating: 4.6,
      downloads: 2067,
      author: 'API Security Specialist',
      tags: ['api', 'rest', 'graphql', 'security'],
      nodes: [
        { id: '1', type: 'toolNode', position: { x: 100, y: 100 }, data: { label: 'Input', tool: 'input', category: 'utilities' } },
        { id: '2', type: 'toolNode', position: { x: 300, y: 100 }, data: { label: 'HTTPx', tool: 'httpx', category: 'web_testing' } },
        { id: '3', type: 'toolNode', position: { x: 500, y: 50 }, data: { label: 'Arjun', tool: 'arjun', category: 'parameter_discovery' } },
        { id: '4', type: 'toolNode', position: { x: 500, y: 150 }, data: { label: 'ffuf', tool: 'ffuf', category: 'web_testing' } },
        { id: '5', type: 'toolNode', position: { x: 700, y: 100 }, data: { label: 'Nuclei', tool: 'nuclei', category: 'vulnerability' } },
        { id: '6', type: 'toolNode', position: { x: 900, y: 100 }, data: { label: 'Output', tool: 'output', category: 'utilities' } }
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2', animated: true },
        { id: 'e2-3', source: '2', target: '3', animated: true },
        { id: 'e2-4', source: '2', target: '4', animated: true },
        { id: 'e3-5', source: '3', target: '5', animated: true },
        { id: 'e4-5', source: '4', target: '5', animated: true },
        { id: 'e5-6', source: '5', target: '6', animated: true }
      ]
    },
    {
      id: 11,
      title: 'Network Discovery & Enumeration',
      description: 'Complete network discovery and service enumeration workflow',
      category: 'Network Security',
      difficulty: 'Intermediate',
      duration: '45 min',
      rating: 4.7,
      downloads: 3156,
      author: 'Network Security Pro',
      tags: ['network', 'discovery', 'enumeration', 'ports'],
      nodes: [
        { id: '1', type: 'toolNode', position: { x: 100, y: 100 }, data: { label: 'Input', tool: 'input', category: 'utilities' } },
        { id: '2', type: 'toolNode', position: { x: 300, y: 50 }, data: { label: 'Nmap', tool: 'nmap', category: 'reconnaissance' } },
        { id: '3', type: 'toolNode', position: { x: 300, y: 150 }, data: { label: 'Masscan', tool: 'masscan', category: 'reconnaissance' } },
        { id: '4', type: 'toolNode', position: { x: 500, y: 100 }, data: { label: 'Naabu', tool: 'naabu', category: 'network' } },
        { id: '5', type: 'toolNode', position: { x: 700, y: 100 }, data: { label: 'Nuclei', tool: 'nuclei', category: 'vulnerability' } },
        { id: '6', type: 'toolNode', position: { x: 900, y: 100 }, data: { label: 'Output', tool: 'output', category: 'utilities' } }
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2', animated: true },
        { id: 'e1-3', source: '1', target: '3', animated: true },
        { id: 'e2-4', source: '2', target: '4', animated: true },
        { id: 'e3-4', source: '3', target: '4', animated: true },
        { id: 'e4-5', source: '4', target: '5', animated: true },
        { id: 'e5-6', source: '5', target: '6', animated: true }
      ]
    },
    {
      id: 12,
      title: 'SQL Injection Testing Workflow',
      description: 'Advanced SQL injection detection and exploitation workflow',
      category: 'Web Security',
      difficulty: 'Advanced',
      duration: '35 min',
      rating: 4.8,
      downloads: 2156,
      author: 'SQL Injection Expert',
      tags: ['sql', 'injection', 'database', 'web'],
      nodes: [
        { id: '1', type: 'toolNode', position: { x: 100, y: 100 }, data: { label: 'Input', tool: 'input', category: 'utilities' } },
        { id: '2', type: 'toolNode', position: { x: 300, y: 100 }, data: { label: 'GAU', tool: 'gau', category: 'web_testing' } },
        { id: '3', type: 'toolNode', position: { x: 500, y: 50 }, data: { label: 'Arjun', tool: 'arjun', category: 'parameter_discovery' } },
        { id: '4', type: 'toolNode', position: { x: 500, y: 150 }, data: { label: 'GF', tool: 'gf', category: 'vulnerability' } },
        { id: '5', type: 'toolNode', position: { x: 700, y: 100 }, data: { label: 'SQLmap', tool: 'sqlmap', category: 'web_testing' } },
        { id: '6', type: 'toolNode', position: { x: 900, y: 100 }, data: { label: 'Output', tool: 'output', category: 'utilities' } }
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2', animated: true },
        { id: 'e2-3', source: '2', target: '3', animated: true },
        { id: 'e2-4', source: '2', target: '4', animated: true },
        { id: 'e3-5', source: '3', target: '5', animated: true },
        { id: 'e4-5', source: '4', target: '5', animated: true },
        { id: 'e5-6', source: '5', target: '6', animated: true }
      ]
    }
  ]

  const categories: string[] = ['all', 'Web Security', 'Reconnaissance', 'OSINT', 'Cloud Security', 'Mobile Security', 'API Security', 'Network Security', 'Comprehensive']
  const difficulties: DifficultyFilter[] = ['all', 'Beginner', 'Intermediate', 'Advanced', 'Expert']

  const filteredWorkflows: WorkflowTemplate[] = workflows.filter(workflow => {
    const matchesSearch = workflow.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || workflow.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'all' || workflow.difficulty === selectedDifficulty
    
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const loadWorkflow = (workflow: WorkflowTemplate): void => {
    // Store the workflow in localStorage for the builder to pick up
    localStorage.setItem('selectedWorkflow', JSON.stringify(workflow))
    // Navigate back to builder
    navigate('/builder')
  }

  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'Advanced': return 'bg-orange-100 text-orange-800'
      case 'Expert': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-cyan-400">HackAtomIQ Workflow Library</h1>
              <p className="text-gray-400 mt-2">Professional bug bounty and penetration testing workflows</p>
            </div>
            <Button 
              onClick={() => navigate('/builder')}
              className="bg-cyan-600 hover:bg-cyan-700"
            >
              Back to Builder
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search workflows..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>

            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>
                  {difficulty === 'all' ? 'All Difficulties' : difficulty}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400">
            Showing {filteredWorkflows.length} of {workflows.length} workflows
          </p>
        </div>

        {/* Workflow Grid/List */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredWorkflows.map(workflow => (
            <Card key={workflow.id} className="bg-gray-800 border-gray-700 hover:border-cyan-500 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-cyan-400 text-lg mb-2">{workflow.title}</CardTitle>
                    <CardDescription className="text-gray-300 text-sm">
                      {workflow.description}
                    </CardDescription>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-3">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {workflow.category}
                  </Badge>
                  <Badge className={getDifficultyColor(workflow.difficulty)}>
                    {workflow.difficulty}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {workflow.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      {workflow.rating}
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      {workflow.downloads.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-gray-400">
                    <User className="w-4 h-4" />
                    {workflow.author}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {workflow.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs border-gray-600 text-gray-300">
                        {tag}
                      </Badge>
                    ))}
                    {workflow.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                        +{workflow.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  <Button 
                    onClick={() => loadWorkflow(workflow)}
                    className="w-full bg-cyan-600 hover:bg-cyan-700"
                  >
                    Load Workflow
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredWorkflows.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No workflows found matching your criteria.</p>
            <p className="text-gray-500 mt-2">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default WorkflowLibrary

