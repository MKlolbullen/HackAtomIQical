import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useEffect, useState, useRef } from 'react'
import { io } from 'socket.io-client'

import {
  BarChart3,
  Download,
  Filter,
  Search,
  Eye,
  AlertTriangle,
  Shield,
  Clock,
  Target,
  Activity,
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
  ResponsiveContainer,
} from 'recharts'

/* -------------------------------------------------------------------------- */
/*  Placeholder-data                                                          */
/* -------------------------------------------------------------------------- */
const severityData = [
  { name: 'Critical', value: 12, color: '#ef4444' },
{ name: 'High', value: 34, color: '#f97316' },
{ name: 'Medium', value: 89, color: '#eab308' },
{ name: 'Low', value: 156, color: '#22c55e' },
{ name: 'Info', value: 21, color: '#6b7280' },
]

const timelineData = [
  { date: '06-18', findings: 23 },
{ date: '06-19', findings: 31 },
{ date: '06-20', findings: 28 },
{ date: '06-21', findings: 45 },
{ date: '06-22', findings: 38 },
{ date: '06-23', findings: 52 },
{ date: '06-24', findings: 45 },
]

const topVulnerabilities = [
  { name: 'SQL Injection', count: 15 },
{ name: 'XSS', count: 12 },
{ name: 'CSRF', count: 8 },
{ name: 'Directory Traversal', count: 6 },
{ name: 'Weak Auth', count: 5 },
]

const vulnerabilities = [
  {
    id: 1,
    title: 'SQL Injection in login form',
    severity: 'Critical',
    tool: 'SQLmap',
    target: 'example.com',
    date: '2024-06-24',
    description:
    'Time-based blind SQL injection vulnerability found in login parameter',
  },
{
  id: 2,
  title: 'Directory traversal vulnerability',
  severity: 'High',
  tool: 'Nikto',
  target: 'test.org',
  date: '2024-06-24',
  description: 'Path traversal allows access to sensitive files',
},
{
  id: 3,
  title: 'Outdated Apache version',
  severity: 'Medium',
  tool: 'Nuclei',
  target: '192.168.1.100',
  date: '2024-06-24',
  description: 'Apache 2.4.29 contains known security vulnerabilities',
},
{
  id: 4,
  title: 'Missing security headers',
  severity: 'Low',
  tool: 'Nuclei',
  target: 'example.com',
  date: '2024-06-24',
  description: 'X-Frame-Options and CSP headers not implemented',
},
{
  id: 5,
  title: 'Weak SSL/TLS configuration',
  severity: 'Medium',
  tool: 'SSLyze',
  target: 'secure.example.com',
  date: '2024-06-24',
  description: 'TLS 1.0 and weak cipher suites enabled',
},
]

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */
const getSeverityColor = (s: string) =>
({
  Critical: 'bg-red-500',
  High: 'bg-orange-500',
  Medium: 'bg-yellow-500',
  Low: 'bg-green-500',
} as Record<string, string>)[s] ?? 'bg-gray-500'

const getSeverityIcon = (s: string) =>
['Critical', 'High', 'Medium', 'Low', 'Info'].includes(s) ? (
  <AlertTriangle className="h-4 w-4" />
) : (
  <Shield className="h-4 w-4" />
)

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */
function ResultsPage() {
  const [logs, setLogs] = useState<string[]>([])
  const [running, setRunning] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_BASE)
    socket.on('exec_started', () => {
      setRunning(true)
      setLogs([])
    })
    socket.on('exec_log', ({ line }: { line: string }) =>
    setLogs((prev) => [...prev, line]),
    )
    socket.on('exec_finished', () => setRunning(false))
    return () => socket.disconnect()
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  return (
    <div className="container mx-auto p-6 space-y-6">
    {/* ---------- Header ---------- */}
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

    {/* ---------- Filters & Search ---------- */}
    <Card>
    <CardHeader>
    <CardTitle className="text-lg">Filters & Search</CardTitle>
    </CardHeader>
    <CardContent>
    {/* filters grid … unchanged */}
    </CardContent>
    </Card>

    {/* ---------- Dashboard Overview ---------- */}
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
    {/* Results Summary */}
    {/* Severity Distribution */}
    {/* Findings Over Time */}
    {/* Top Vulnerabilities */}
    {/* put all four cards here exactly as you already had them */}
    </div>

    {/* ---------- Timeline & Vulnerability list ---------- */}
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
    {/* Timeline card */}
    {/* Vulnerability Details card */}
    </div>

    {/* ---------- Live-logs ---------- */}
    <Card>
    <CardHeader>
    <CardTitle className="text-lg flex items-center space-x-2">
    <Activity className="h-5 w-5" />
    <span>Live Execution Logs</span>
    </CardTitle>
    <CardDescription>
    Streaming lines straight from running tools
    </CardDescription>
    </CardHeader>

    <CardContent>
    <div className="h-72 overflow-y-auto bg-zinc-900 text-green-400 p-4 rounded">
    {logs.map((l) => (
      <pre key={l} className="whitespace-pre-wrap">
      {l}
      </pre>
    ))}
    {running && <span className="animate-pulse text-white">▮ running…</span>}
    <div ref={bottomRef} />
    </div>
    </CardContent>
    </Card>
    </div>
  )
}

export default ResultsPage
