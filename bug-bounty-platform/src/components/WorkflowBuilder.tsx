import React, { useState, useCallback, useRef, useEffect } from 'react'
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
  Handle,
  Position,
  Connection,
  ReactFlowInstance,
  OnConnect,
  OnNodesChange,
  OnEdgesChange,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Terminal from './Terminal'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useLocation } from 'react-router-dom'
import { ToolData, WorkflowNode, WorkflowEdge, ToolCategories, NodeProps } from '@/types/workflow'

// Custom node component for Kali tools
const ToolNode: React.FC<NodeProps> = ({ data, selected }) => {
  const getNodeColor = (category: string): string => {
    const colors: { [key: string]: string } = {
      reconnaissance: '#3b82f6', // Blue
      web_testing: '#10b981',    // Green
      vulnerability: '#f59e0b',  // Orange
      secrets_scanning: '#a855f7', // Purple
      exploitation: '#ef4444',   // Red
      network: '#06b6d4',        // Cyan
      osint: '#ec4899',          // Pink
      cloud: '#84cc16',          // Lime
      mobile: '#f97316',         // Orange
      utilities: '#6b7280'       // Gray
    }
    return colors[category] || '#6b7280'
  }

  const isInputNode = data.id === 'input'
  const isOutputNode = data.id === 'output'

  return (
    <div 
      className={`px-4 py-2 shadow-md rounded-md border-2 min-w-[150px] ${
        selected ? 'border-blue-500' : 'border-gray-300'
      }`}
      style={{ 
        backgroundColor: 'white',
        borderColor: selected ? '#3b82f6' : getNodeColor(data.category)
      }}
    >
      {!isInputNode && (
        <Handle
          type="target"
          position={Position.Left}
          className="w-3 h-3"
          style={{ background: getNodeColor(data.category) }}
        />
      )}
      
      <div className="flex flex-col">
        <div className="font-bold text-sm">{data.label}</div>
        <div className="text-xs text-gray-500">{data.category}</div>
        {data.status && (
          <div className={`text-xs mt-1 px-2 py-1 rounded ${
            data.status === 'running' ? 'bg-yellow-100 text-yellow-800' :
            data.status === 'completed' ? 'bg-green-100 text-green-800' :
            data.status === 'failed' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {data.status}
          </div>
        )}
      </div>

      {!isOutputNode && (
        <Handle
          type="source"
          position={Position.Right}
          className="w-3 h-3"
          style={{ background: getNodeColor(data.category) }}
        />
      )}
    </div>
  )
}

const nodeTypes = {
  toolNode: ToolNode,
}

const WorkflowBuilder: React.FC = () => {
  const [nodes, setNodes, onNodesChange]: [WorkflowNode[], any, OnNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange]: [WorkflowEdge[], any, OnEdgesChange] = useEdgesState([])
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null)
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null)
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const location = useLocation()

  // Tool categories and tools (HackAtomIQ - Enhanced Bug Bounty Arsenal)
  const toolCategories: ToolCategories = {
    reconnaissance: {
      name: 'Reconnaissance',
      tools: [
        { id: 'nmap', label: 'Nmap', description: 'Network scanner', category: 'reconnaissance' },
        { id: 'subfinder', label: 'Subfinder', description: 'Subdomain discovery', category: 'reconnaissance' },
        { id: 'jsubfinder', label: 'JSubfinder', description: 'JavaScript subdomain finder', category: 'reconnaissance' },
        { id: 'amass', label: 'Amass', description: 'Attack surface mapping', category: 'reconnaissance' },
        { id: 'masscan', label: 'Masscan', description: 'High-speed port scanner', category: 'reconnaissance' },
        { id: 'dnsrecon', label: 'DNSrecon', description: 'DNS enumeration', category: 'reconnaissance' },
        { id: 'rustscan', label: 'RustScan', description: 'Ultra-fast port scanner', category: 'reconnaissance' },
        { id: 'shodan', label: 'Shodan', description: 'Internet-connected device search', category: 'reconnaissance' },
      ]
    },
    web_testing: {
      name: 'Web Testing',
      tools: [
        { id: 'gobuster', label: 'Gobuster', description: 'Directory brute-forcer', category: 'web_testing' },
        { id: 'nikto', label: 'Nikto', description: 'Web scanner', category: 'web_testing' },
        { id: 'sqlmap', label: 'SQLmap', description: 'SQL injection testing', category: 'web_testing' },
        { id: 'xsstrike', label: 'XSStrike', description: 'Advanced XSS detection suite', category: 'web_testing' },
        { id: 'ffuf', label: 'ffuf', description: 'Fast web fuzzer', category: 'web_testing' },
        { id: 'httpx', label: 'HTTPx', description: 'Fast HTTP toolkit', category: 'web_testing' },
        { id: 'katana', label: 'Katana', description: 'Next-gen crawling framework', category: 'web_testing' },
        { id: 'dalfox', label: 'Dalfox', description: 'Parameter analysis & XSS scanner', category: 'web_testing' },
      ]
    },
    vulnerability: {
      name: 'Vulnerability Scanning',
      tools: [
        { id: 'nuclei', label: 'Nuclei', description: 'Fast vulnerability scanner', category: 'vulnerability' },
        { id: 'openvas', label: 'OpenVAS', description: 'Comprehensive scanner', category: 'vulnerability' },
        { id: 'nessus', label: 'Nessus', description: 'Professional scanner', category: 'vulnerability' },
        { id: 'wpscan', label: 'WPScan', description: 'WordPress security scanner', category: 'vulnerability' },
        { id: 'joomscan', label: 'JoomScan', description: 'Joomla vulnerability scanner', category: 'vulnerability' },
        { id: 'jaeles', label: 'Jaeles', description: 'Powerful vulnerability scanner', category: 'vulnerability' },
      ]
    },
    secrets_scanning: {
      name: 'Secrets & Leaks',
      tools: [
        { id: 'truffleHog', label: 'TruffleHog', description: 'Find secrets in git repos', category: 'secrets_scanning' },
        { id: 'gitleaks', label: 'GitLeaks', description: 'Detect secrets in git repos', category: 'secrets_scanning' },
        { id: 'secretfinder', label: 'SecretFinder', description: 'Find secrets in JS files', category: 'secrets_scanning' },
        { id: 'github-search', label: 'GitHub Search', description: 'Search GitHub for secrets', category: 'secrets_scanning' },
      ]
    },
    exploitation: {
      name: 'Exploitation',
      tools: [
        { id: 'metasploit', label: 'Metasploit', description: 'Penetration testing framework', category: 'exploitation' },
        { id: 'msfvenom', label: 'MSFvenom', description: 'Payload generator', category: 'exploitation' },
        { id: 'empire', label: 'Empire', description: 'Post-exploitation framework', category: 'exploitation' },
        { id: 'beef', label: 'BeEF', description: 'Browser exploitation framework', category: 'exploitation' },
        { id: 'sliver', label: 'Sliver', description: 'Adversary emulation framework', category: 'exploitation' },
      ]
    },
    network: {
      name: 'Network Analysis',
      tools: [
        { id: 'wireshark', label: 'Wireshark', description: 'Network protocol analyzer', category: 'network' },
        { id: 'tcpdump', label: 'tcpdump', description: 'Command-line packet analyzer', category: 'network' },
        { id: 'netcat', label: 'Netcat', description: 'Network utility', category: 'network' },
        { id: 'naabu', label: 'Naabu', description: 'Fast port scanner', category: 'network' },
        { id: 'proxify', label: 'Proxify', description: 'Swiss Army Knife Proxy', category: 'network' },
      ]
    },
    osint: {
      name: 'OSINT & Intelligence',
      tools: [
        { id: 'spiderfoot', label: 'SpiderFoot', description: 'OSINT automation platform', category: 'osint' },
        { id: 'maltego', label: 'Maltego', description: 'Link analysis platform', category: 'osint' },
        { id: 'sherlock', label: 'Sherlock', description: 'Hunt down social media accounts', category: 'osint' },
        { id: 'crosslinked', label: 'CrossLinked', description: 'LinkedIn enumeration tool', category: 'osint' },
      ]
    },
    cloud: {
      name: 'Cloud Security',
      tools: [
        { id: 'cloud-enum', label: 'Cloud Enum', description: 'Multi-cloud enumeration', category: 'cloud' },
        { id: 'pacu', label: 'Pacu', description: 'AWS exploitation framework', category: 'cloud' },
        { id: 'prowler', label: 'Prowler', description: 'AWS security assessment', category: 'cloud' },
        { id: 'scoutsuite', label: 'ScoutSuite', description: 'Multi-cloud auditing tool', category: 'cloud' },
      ]
    },
    mobile: {
      name: 'Mobile Security',
      tools: [
        { id: 'mobsf', label: 'MobSF', description: 'Mobile Security Framework', category: 'mobile' },
        { id: 'frida', label: 'Frida', description: 'Dynamic instrumentation toolkit', category: 'mobile' },
        { id: 'objection', label: 'Objection', description: 'Runtime mobile exploration', category: 'mobile' },
        { id: 'apktool', label: 'APKTool', description: 'Android APK reverse engineering', category: 'mobile' },
      ]
    },
    utilities: {
      name: 'Utilities',
      tools: [
        { id: 'input', label: 'Input', description: 'Workflow input node', category: 'utilities' },
        { id: 'output', label: 'Output', description: 'Workflow output node', category: 'utilities' },
        { id: 'filter', label: 'Filter', description: 'Data filtering utility', category: 'utilities' },
        { id: 'merge', label: 'Merge', description: 'Data combination tool', category: 'utilities' },
        { id: 'sort', label: 'Sort', description: 'Data sorting utility', category: 'utilities' },
        { id: 'unique', label: 'Unique', description: 'Remove duplicate entries', category: 'utilities' },
        { id: 'sleep', label: 'Sleep', description: 'Add delays to workflow', category: 'utilities' },
      ]
    }
  }

  const onConnect: OnConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const onDragStart = (event: React.DragEvent, tool: ToolData) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(tool))
    event.dataTransfer.effectAllowed = 'move'
  }

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()

      if (!reactFlowWrapper.current || !reactFlowInstance) return

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
      const toolData = JSON.parse(event.dataTransfer.getData('application/reactflow'))

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      })

      const newNode: WorkflowNode = {
        id: `${toolData.id}_${Date.now()}`,
        type: 'toolNode',
        position,
        data: {
          label: toolData.label,
          tool: toolData.id,
          category: toolData.category,
          description: toolData.description,
          status: 'idle',
          target: 'example.com'
        },
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [reactFlowInstance, setNodes]
  )

  const onNodeClick = useCallback((event: React.MouseEvent, node: WorkflowNode) => {
    setSelectedNode(node)
  }, [])

  const onPaneClick = useCallback(() => {
    setSelectedNode(null)
  }, [])

  const runWorkflow = () => {
    console.log('Running workflow with nodes:', nodes)
    console.log('Running workflow with edges:', edges)
    
    // Update node statuses to running
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: { ...node.data, status: 'running' }
      }))
    )

    // Simulate workflow execution
    setTimeout(() => {
      setNodes((nds) =>
        nds.map((node) => ({
          ...node,
          data: { ...node.data, status: 'completed' }
        }))
      )
    }, 3000)
  }

  const clearWorkflow = () => {
    setNodes([])
    setEdges([])
    setSelectedNode(null)
  }

  const defaultEdgeOptions = {
    animated: true,
    style: { stroke: '#3b82f6', strokeWidth: 2 },
  }

  // Load workflow from localStorage if available
  useEffect(() => {
    const savedWorkflow = localStorage.getItem('selectedWorkflow')
    if (savedWorkflow) {
      try {
        const workflow = JSON.parse(savedWorkflow)
        setNodes(workflow.nodes || [])
        setEdges(workflow.edges || [])
        localStorage.removeItem('selectedWorkflow') // Clear after loading
      } catch (error) {
        console.error('Failed to load workflow:', error)
      }
    }
  }, [setNodes, setEdges])

  return (
    <div className="h-full flex flex-col">
      {/* Main Content Area - 80% height */}
      <div className="flex-1 flex" style={{ height: '80%' }}>
        {/* Tool Library - Left 20% */}
        <div className="w-80 border-r border-border p-4 overflow-y-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tool Library</CardTitle>
              <CardDescription>Drag tools to the canvas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(toolCategories).map(([categoryKey, category]) => (
                  <div key={categoryKey}>
                    <h3 className="font-semibold text-sm mb-3">{category.name}</h3>
                    <div className="space-y-2">
                      {category.tools.map((tool) => (
                        <div
                          key={tool.id}
                          className="p-3 border rounded cursor-grab hover:bg-accent transition-colors"
                          draggable
                          onDragStart={(event) => onDragStart(event, tool)}
                        >
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ 
                                backgroundColor: tool.category === 'reconnaissance' ? '#3b82f6' :
                                               tool.category === 'web_testing' ? '#10b981' :
                                               tool.category === 'vulnerability' ? '#f59e0b' :
                                               tool.category === 'secrets_scanning' ? '#a855f7' :
                                               tool.category === 'exploitation' ? '#ef4444' :
                                               tool.category === 'network' ? '#06b6d4' :
                                               tool.category === 'osint' ? '#ec4899' :
                                               tool.category === 'cloud' ? '#84cc16' :
                                               tool.category === 'mobile' ? '#f97316' :
                                               '#6b7280'
                              }}
                            />
                            <div className="font-medium text-sm">{tool.label}</div>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">{tool.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Workflow Canvas - Center */}
        <div className="flex-1 relative">
          <div ref={reactFlowWrapper} className="h-full">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onNodeClick={onNodeClick}
              onPaneClick={onPaneClick}
              nodeTypes={nodeTypes}
              defaultEdgeOptions={defaultEdgeOptions}
              fitView
              className="bg-background"
            >
              <Controls />
              <MiniMap />
              <Background variant="dots" gap={12} size={1} />
              <Panel position="top-left">
                <div className="flex items-center space-x-2">
                  <Button onClick={runWorkflow} size="sm">
                    Run Workflow
                  </Button>
                  <Button onClick={clearWorkflow} variant="outline" size="sm">
                    Clear
                  </Button>
                </div>
              </Panel>
            </ReactFlow>
          </div>
        </div>

        {/* Properties Panel - Right 20% */}
        <div className="w-80 border-l border-border p-4 overflow-y-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Properties Panel</CardTitle>
              <CardDescription>Configure selected node</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedNode ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Node ID</label>
                    <div className="text-sm text-muted-foreground">{selectedNode.id}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Tool Name</label>
                    <div className="text-sm text-muted-foreground">{selectedNode.data.label}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <div className="text-sm text-muted-foreground">{selectedNode.data.description}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Category</label>
                    <div className="text-sm text-muted-foreground capitalize">
                      {selectedNode.data.category.replace('_', ' ')}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Status</label>
                    <Badge variant="secondary" className="ml-2">
                      {selectedNode.data.status}
                    </Badge>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="font-medium text-sm mb-2">Configuration</h4>
                    <div className="space-y-2">
                      <div>
                        <label className="text-xs">Target</label>
                        <input 
                          type="text" 
                          defaultValue={selectedNode.data.target || "example.com"} 
                          className="w-full mt-1 p-1 text-xs border rounded"
                          onChange={(e) => {
                            if (selectedNode) {
                              selectedNode.data.target = e.target.value
                            }
                          }}
                        />
                      </div>
                      <div>
                        <label className="text-xs">Timeout (seconds)</label>
                        <input 
                          type="number" 
                          defaultValue="300" 
                          className="w-full mt-1 p-1 text-xs border rounded"
                        />
                      </div>
                      <div>
                        <label className="text-xs">Output Format</label>
                        <select className="w-full mt-1 p-1 text-xs border rounded">
                          <option>JSON</option>
                          <option>XML</option>
                          <option>CSV</option>
                          <option>TXT</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <div className="text-4xl mb-2">🔧</div>
                  <p className="text-sm">Select a node to configure its properties</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Terminal Area - Bottom 20% */}
      <div style={{ height: '20%' }}>
        <Terminal 
          selectedNodeId={selectedNode?.id}
          selectedNodeData={selectedNode?.data}
          onExecuteTool={(toolId, params) => {
            console.log('Execute tool:', toolId, params)
          }}
        />
      </div>
    </div>
  )
}

export default WorkflowBuilder

