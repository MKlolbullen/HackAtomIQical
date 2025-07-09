import { WorkflowNode, WorkflowEdge } from './workflow'

export interface WorkflowTemplate {
  id: number
  title: string
  description: string
  category: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  duration: string
  rating: number
  downloads: number
  author: string
  tags: string[]
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
}

export type ViewMode = 'grid' | 'list'
export type CategoryFilter = 'all' | string
export type DifficultyFilter = 'all' | 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'

