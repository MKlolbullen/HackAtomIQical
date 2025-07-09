import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { 
  Home, 
  Workflow, 
  Search, 
  BarChart3, 
  Settings,
  Shield,
  LucideIcon
} from 'lucide-react'

interface NavItem {
  path: string
  label: string
  icon: LucideIcon
}

const Navigation: React.FC = () => {
  const location = useLocation()

  const navItems: NavItem[] = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/builder', label: 'Builder', icon: Workflow },
    { path: '/scanner', label: 'Scanner', icon: Search },
    { path: '/results', label: 'Results', icon: BarChart3 },
    { path: '/configuration', label: 'Configuration', icon: Settings },
  ]

  return (
    <nav className="bg-card border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Kali Platform</span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  asChild
                  className="flex items-center space-x-2"
                >
                  <Link to={item.path}>
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </Button>
              )
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              Profile
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation

