import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Activity, 
  Shield, 
  Zap, 
  Target, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'

const HomePage = () => {
  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to Kali Bug Bounty Platform</h1>
        <p className="text-muted-foreground">
          Professional penetration testing and bug bounty hunting platform
        </p>
      </div>

      {/* 3x2 Grid Layout as requested */}
      <div className="grid grid-cols-5 gap-6 h-[calc(100vh-200px)]">
        {/* Left Column - 20% width */}
        <div className="col-span-1 space-y-6">
          {/* Quick Actions */}
          <Card className="h-[70%]">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" size="sm">
                New Workflow
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                Quick Scan
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                Import Target
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                View Reports
              </Button>
            </CardContent>
          </Card>

          {/* Recent Scans */}
          <Card className="h-[30%]">
            <CardHeader>
              <CardTitle className="text-sm">Recent Scans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>example.com</span>
                  <Badge variant="secondary">Running</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>test.org</span>
                  <Badge variant="outline">Complete</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Center Column - 60% width */}
        <div className="col-span-3 space-y-6">
          {/* Main Dashboard - 70% height */}
          <Card className="h-[70%]">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Dashboard Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">24</div>
                  <div className="text-sm text-muted-foreground">Active Scans</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">156</div>
                  <div className="text-sm text-muted-foreground">Vulnerabilities</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">12</div>
                  <div className="text-sm text-muted-foreground">Critical</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">89</div>
                  <div className="text-sm text-muted-foreground">Targets</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold">Recent Activity</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 p-2 rounded border">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Nmap scan completed on 192.168.1.0/24</span>
                    <span className="text-xs text-muted-foreground ml-auto">2 min ago</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 rounded border">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">SQL injection found in login form</span>
                    <span className="text-xs text-muted-foreground ml-auto">5 min ago</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 rounded border">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Workflow "Web App Audit" started</span>
                    <span className="text-xs text-muted-foreground ml-auto">10 min ago</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Workflow Gallery - 30% height */}
          <Card className="h-[30%]">
            <CardHeader>
              <CardTitle className="text-lg">Workflow Gallery</CardTitle>
              <CardDescription>Popular and featured workflows</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 border rounded cursor-pointer hover:bg-accent">
                  <h4 className="font-medium text-sm">Web App Scan</h4>
                  <p className="text-xs text-muted-foreground">Basic web application security assessment</p>
                </div>
                <div className="p-3 border rounded cursor-pointer hover:bg-accent">
                  <h4 className="font-medium text-sm">Network Discovery</h4>
                  <p className="text-xs text-muted-foreground">Comprehensive network enumeration</p>
                </div>
                <div className="p-3 border rounded cursor-pointer hover:bg-accent">
                  <h4 className="font-medium text-sm">Bug Bounty</h4>
                  <p className="text-xs text-muted-foreground">Complete bug bounty workflow</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - 20% width */}
        <div className="col-span-1 space-y-6">
          {/* System Status */}
          <Card className="h-[70%]">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>System Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">CPU Usage</span>
                  <span className="text-sm font-medium">45%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{width: '45%'}}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Memory</span>
                  <span className="text-sm font-medium">67%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{width: '67%'}}></div>
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Database Online</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">API Services</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">Tool Updates</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tool Library Stats */}
          <Card className="h-[30%]">
            <CardHeader>
              <CardTitle className="text-sm">Tool Library</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Available Tools</span>
                  <span className="font-medium">127</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Categories</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Updated</span>
                  <span className="font-medium">Today</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default HomePage

