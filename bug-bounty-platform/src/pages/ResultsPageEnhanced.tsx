import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart3, 
  Download, 
  Filter, 
  Search,
  Eye,
  AlertTriangle,
  Shield,
  Clock,
  Target
} from 'lucide-react'
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

const ResultsPage = () => {
  // Sample data for charts
  const severityData = [
    { name: 'Critical', value: 12, color: '#ef4444' },
    { name: 'High', value: 34, color: '#f97316' },
    { name: 'Medium', value: 89, color: '#eab308' },
    { name: 'Low', value: 156, color: '#22c55e' },
    { name: 'Info', value: 21, color: '#6b7280' }
  ]

  const timelineData = [
    { date: '2024-06-18', findings: 23 },
    { date: '2024-06-19', findings: 31 },
    { date: '2024-06-20', findings: 28 },
    { date: '2024-06-21', findings: 45 },
    { date: '2024-06-22', findings: 38 },
    { date: '2024-06-23', findings: 52 },
    { date: '2024-06-24', findings: 45 }
  ]

  const topVulnerabilities = [
    { name: 'SQL Injection', count: 15 },
    { name: 'XSS', count: 12 },
    { name: 'CSRF', count: 8 },
    { name: 'Directory Traversal', count: 6 },
    { name: 'Weak Authentication', count: 5 }
  ]

  const vulnerabilities = [
    {
      id: 1,
      title: 'SQL Injection in login form',
      severity: 'Critical',
      tool: 'SQLmap',
      target: 'example.com',
      date: '2024-06-24',
      description: 'Time-based blind SQL injection vulnerability found in login parameter'
    },
    {
      id: 2,
      title: 'Directory traversal vulnerability',
      severity: 'High',
      tool: 'Nikto',
      target: 'test.org',
      date: '2024-06-24',
      description: 'Path traversal allows access to sensitive files'
    },
    {
      id: 3,
      title: 'Outdated Apache version',
      severity: 'Medium',
      tool: 'Nuclei',
      target: '192.168.1.100',
      date: '2024-06-24',
      description: 'Apache 2.4.29 contains known security vulnerabilities'
    },
    {
      id: 4,
      title: 'Missing security headers',
      severity: 'Low',
      tool: 'Nuclei',
      target: 'example.com',
      date: '2024-06-24',
      description: 'X-Frame-Options and CSP headers not implemented'
    },
    {
      id: 5,
      title: 'Weak SSL/TLS configuration',
      severity: 'Medium',
      tool: 'SSLyze',
      target: 'secure.example.com',
      date: '2024-06-24',
      description: 'TLS 1.0 and weak cipher suites enabled'
    }
  ]

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'bg-red-500'
      case 'High': return 'bg-orange-500'
      case 'Medium': return 'bg-yellow-500'
      case 'Low': return 'bg-green-500'
      case 'Info': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'Critical': return <AlertTriangle className="h-4 w-4" />
      case 'High': return <AlertTriangle className="h-4 w-4" />
      case 'Medium': return <Shield className="h-4 w-4" />
      case 'Low': return <Shield className="h-4 w-4" />
      default: return <Shield className="h-4 w-4" />
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Results</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Filters & Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <select className="p-2 border rounded">
              <option>Date Range</option>
              <option>Last 24 hours</option>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Custom range</option>
            </select>
            <select className="p-2 border rounded">
              <option>Severity</option>
              <option>Critical</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
              <option>Info</option>
            </select>
            <select className="p-2 border rounded">
              <option>Tool</option>
              <option>Nmap</option>
              <option>Nuclei</option>
              <option>Nikto</option>
              <option>SQLmap</option>
              <option>Gobuster</option>
            </select>
            <Input placeholder="Target filter" />
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search vulnerabilities..." className="pl-10" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Results Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Results Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold">312</div>
              <div className="text-muted-foreground">Total Findings</div>
            </div>
            <div className="space-y-2 mt-4">
              {severityData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <Badge className={getSeverityColor(item.name)}>
                    {item.value}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Severity Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Severity Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Findings Over Time */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Findings Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="findings" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Vulnerabilities */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Vulnerabilities</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={topVulnerabilities} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={80} />
                <Tooltip />
                <Bar dataKey="count" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Timeline</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="font-medium">Today</div>
                <div className="text-sm text-muted-foreground">45 new findings</div>
              </div>
              <div>
                <div className="font-medium">Yesterday</div>
                <div className="text-sm text-muted-foreground">23 new findings</div>
              </div>
              <div>
                <div className="font-medium">This Week</div>
                <div className="text-sm text-muted-foreground">156 total findings</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vulnerability Details */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Vulnerability Details</span>
            </CardTitle>
            <CardDescription>Detailed findings from security scans</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vulnerabilities.map((vuln) => (
                <div key={vuln.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {getSeverityIcon(vuln.severity)}
                        <h3 className="font-medium">{vuln.title}</h3>
                        <Badge className={getSeverityColor(vuln.severity)}>
                          {vuln.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{vuln.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>Tool: {vuln.tool}</span>
                        <span>Target: {vuln.target}</span>
                        <span>Date: {vuln.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ResultsPage

