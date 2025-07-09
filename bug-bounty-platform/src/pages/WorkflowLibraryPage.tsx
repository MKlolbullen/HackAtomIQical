import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Library } from 'lucide-react'
import WorkflowLibrary from '../components/WorkflowLibrary'
import { useNavigate } from 'react-router-dom'

const WorkflowLibraryPage = () => {
  const navigate = useNavigate()

  const handleLoadWorkflow = (workflow) => {
    // Store the workflow in localStorage to pass to builder
    localStorage.setItem('selectedWorkflow', JSON.stringify(workflow))
    // Navigate back to builder with the workflow
    navigate('/builder?loadWorkflow=true')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/builder')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Builder
            </Button>
            <div className="flex items-center space-x-2">
              <Library className="h-6 w-6" />
              <h1 className="text-2xl font-bold">Workflow Library</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Workflow Library Component */}
      <WorkflowLibrary onLoadWorkflow={handleLoadWorkflow} />
    </div>
  )
}

export default WorkflowLibraryPage

