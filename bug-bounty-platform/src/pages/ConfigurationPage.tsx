import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Settings, Save, RotateCcw, X } from 'lucide-react'
import { useState } from 'react'

const ConfigurationPage = () => {
  const [activeCategory, setActiveCategory] = useState('general')

  const categories = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'security', label: 'Security', icon: Settings },
    { id: 'tools', label: 'Tools', icon: Settings },
    { id: 'api-keys', label: 'API Keys', icon: Settings },
    { id: 'workflows', label: 'Workflows', icon: Settings },
    { id: 'export', label: 'Export', icon: Settings },
    { id: 'users', label: 'Users', icon: Settings },
  ]

  const renderCategoryContent = () => {
    switch (activeCategory) {
      case 'general':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="platform-name">Platform Name</Label>
                <Input id="platform-name" defaultValue="Kali Bug Bounty Platform" />
              </div>
              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <select className="w-full p-2 border border-input rounded-md bg-background">
                  <option>UTC</option>
                  <option>America/New_York</option>
                  <option>Europe/London</option>
                  <option>Asia/Tokyo</option>
                </select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="description">Platform Description</Label>
              <Textarea 
                id="description" 
                placeholder="Enter platform description..."
                defaultValue="Professional penetration testing and bug bounty hunting platform"
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="auto-save" defaultChecked />
                <Label htmlFor="auto-save">Enable auto-save</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="notifications" defaultChecked />
                <Label htmlFor="notifications">Enable notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="dark-mode" defaultChecked />
                <Label htmlFor="dark-mode">Dark mode</Label>
              </div>
            </div>
          </div>
        )
      
      case 'security':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Input id="session-timeout" type="number" defaultValue="60" />
              </div>
              <div>
                <Label htmlFor="max-attempts">Max Login Attempts</Label>
                <Input id="max-attempts" type="number" defaultValue="5" />
              </div>
            </div>
            
            <div>
              <Label htmlFor="allowed-ips">Allowed IP Addresses</Label>
              <Textarea 
                id="allowed-ips" 
                placeholder="Enter IP addresses or ranges, one per line..."
                defaultValue="192.168.1.0/24&#10;10.0.0.0/8"
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="2fa" />
                <Label htmlFor="2fa">Require two-factor authentication</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="audit-log" defaultChecked />
                <Label htmlFor="audit-log">Enable audit logging</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="ssl-only" defaultChecked />
                <Label htmlFor="ssl-only">Require SSL/TLS</Label>
              </div>
            </div>
          </div>
        )
      
      case 'tools':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tool-timeout">Default Tool Timeout (seconds)</Label>
                <Input id="tool-timeout" type="number" defaultValue="300" />
              </div>
              <div>
                <Label htmlFor="concurrent-scans">Max Concurrent Scans</Label>
                <Input id="concurrent-scans" type="number" defaultValue="5" />
              </div>
            </div>
            
            <div>
              <Label htmlFor="tool-path">Tool Installation Path</Label>
              <Input id="tool-path" defaultValue="/usr/bin" />
            </div>
            
            <div>
              <Label>Available Tools</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {['Nmap', 'Nuclei', 'Gobuster', 'SQLmap', 'Nikto', 'Subfinder', 'Amass', 'Masscan', 'OpenVAS'].map(tool => (
                  <div key={tool} className="flex items-center space-x-2">
                    <input type="checkbox" id={tool.toLowerCase()} defaultChecked />
                    <Label htmlFor={tool.toLowerCase()} className="text-sm">{tool}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      
      case 'api-keys':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="shodan-api">Shodan API Key</Label>
                <Input id="shodan-api" type="password" placeholder="Enter Shodan API key..." />
              </div>
              <div>
                <Label htmlFor="virustotal-api">VirusTotal API Key</Label>
                <Input id="virustotal-api" type="password" placeholder="Enter VirusTotal API key..." />
              </div>
              <div>
                <Label htmlFor="censys-api">Censys API Key</Label>
                <Input id="censys-api" type="password" placeholder="Enter Censys API key..." />
              </div>
              <div>
                <Label htmlFor="github-token">GitHub Token</Label>
                <Input id="github-token" type="password" placeholder="Enter GitHub token..." />
              </div>
            </div>
            
            <div className="p-4 border rounded-lg bg-muted/50">
              <h3 className="font-medium mb-2">API Key Security</h3>
              <p className="text-sm text-muted-foreground">
                API keys are encrypted and stored securely. They are only used for authorized tool integrations.
              </p>
            </div>
          </div>
        )
      
      default:
        return (
          <div className="text-center text-muted-foreground">
            <p>Configuration options for {categories.find(c => c.id === activeCategory)?.label} will be implemented here.</p>
          </div>
        )
    }
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-6">
        <Settings className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Configuration</h1>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Settings Categories - 25% */}
        <div className="col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Settings Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        activeCategory === category.id
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-accent'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Icon className="h-4 w-4" />
                        <span className="text-sm">{category.label}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Configuration Forms - 75% */}
        <div className="col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="capitalize">
                {categories.find(c => c.id === activeCategory)?.label} Settings
              </CardTitle>
              <CardDescription>
                Configure {categories.find(c => c.id === activeCategory)?.label.toLowerCase()} options for the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderCategoryContent()}
              
              {/* Action Buttons */}
              <div className="flex items-center space-x-2 mt-8 pt-6 border-t">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                <Button variant="outline">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ConfigurationPage

