import { Button } from '@/components/ui/button'
import { Workflow, Save, Play, Download, Library } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import WorkflowBuilder from "../components/WorkflowBuilder.tsx";

const BuilderPage = () => {
  const navigate = useNavigate()

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Workflow className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Workflow Builder</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/builder/library')}
            >
              <Library className="h-4 w-4 mr-2" />
              Workflow Library
            </Button>
            <Button variant="outline" size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm">
              <Play className="h-4 w-4 mr-2" />
              Run
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Workflow Builder Component */}
      <div className="flex-1">
        <WorkflowBuilder />
      </div>
    </div>
  )
}

export default BuilderPage

