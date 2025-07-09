import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search, Play, Pause, Square } from 'lucide-react'

const ScannerPage = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-6">
        <Search className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Scanner</h1>
      </div>

      {/* Scan Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Scan Configuration</CardTitle>
          <CardDescription>Configure your security scan parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="target">Target</Label>
              <Input 
                id="target" 
                placeholder="Enter domain, IP, or IP range (e.g., example.com, 192.168.1.1, 192.168.1.0/24)"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="scan-type">Scan Type</Label>
              <select className="w-full mt-1 p-2 border border-input rounded-md bg-background">
                <option>Quick Scan</option>
                <option>Comprehensive Scan</option>
                <option>Custom Workflow</option>
                <option>Vulnerability Assessment</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button className="w-full">
                <Play className="h-4 w-4 mr-2" />
                Start Scan
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="port-scan" className="rounded" />
              <Label htmlFor="port-scan" className="text-sm">Port Scanning</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="vuln-scan" className="rounded" />
              <Label htmlFor="vuln-scan" className="text-sm">Vulnerability Scan</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="web-scan" className="rounded" />
              <Label htmlFor="web-scan" className="text-sm">Web Application</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="ssl-scan" className="rounded" />
              <Label htmlFor="ssl-scan" className="text-sm">SSL/TLS Check</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Results Feed */}
      <Card>
        <CardHeader>
          <CardTitle>Live Results Feed</CardTitle>
          <CardDescription>Real-time scan progress and findings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Port scan on 192.168.1.100</span>
                <Badge variant="secondary">Running</Badge>
              </div>
              <Progress value={65} className="mb-2" />
              <p className="text-sm text-muted-foreground">Found 12 open ports, scanning services...</p>
            </div>
            
            <div className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Vulnerability scan on example.com</span>
                <Badge variant="outline">Queued</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Waiting for port scan to complete...</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scan Management Tabs */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active Scans</TabsTrigger>
          <TabsTrigger value="queue">Queue</TabsTrigger>
          <TabsTrigger value="completed">Completed Scans</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">Network Discovery - 192.168.1.0/24</div>
                    <div className="text-sm text-muted-foreground">Started 5 minutes ago</div>
                    <Progress value={45} className="mt-2" />
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Badge>Running</Badge>
                    <Button variant="outline" size="sm">
                      <Pause className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Square className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">Web Application Scan - example.com</div>
                    <div className="text-sm text-muted-foreground">Started 12 minutes ago</div>
                    <Progress value={78} className="mt-2" />
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Badge>Running</Badge>
                    <Button variant="outline" size="sm">
                      <Pause className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Square className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="queue" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-muted-foreground">
                <p>No scans in queue</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">Vulnerability Assessment - test.org</div>
                    <div className="text-sm text-muted-foreground">Completed 2 hours ago</div>
                    <div className="text-sm text-green-600 mt-1">Found 8 vulnerabilities (2 critical)</div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Badge variant="outline">Completed</Badge>
                    <Button variant="outline" size="sm">View Report</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ScannerPage

