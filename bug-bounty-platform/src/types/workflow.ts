import { Node, Edge } from '@xyflow/react'

export interface ToolData {
  id: string
  label: string
  description: string
  category: string
  status?: string
}

export interface WorkflowNode extends Node {
  data: ToolData
}

export interface WorkflowEdge extends Edge {}

export interface ToolCategory {
  name: string
  tools: ToolData[]
}

export interface ToolCategories {
  [key: string]: ToolCategory
}

export interface NodeProps {
  data: ToolData
  selected: boolean
}

export interface WorkflowData {
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
  name?: string
  description?: string
  created?: string
  updated?: string
}

