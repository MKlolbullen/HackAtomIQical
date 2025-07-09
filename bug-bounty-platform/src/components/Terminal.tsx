import React, { useState, useEffect, useRef } from 'react'
import {
  Terminal as TerminalIcon,
  Play,
  Square,
  Trash2,
  Copy,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { io, Socket } from 'socket.io-client'

interface TerminalProps {
  selectedNodeId?: string
  selectedNodeData?: any
}

interface TerminalLine {
  id: string
  timestamp: string
  type: 'input' | 'output' | 'error' | 'info'
  content: string
}

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000'
const SOCKET_URL = API_BASE.replace(/\/?$/, '') // same host/port

const Terminal: React.FC<TerminalProps> = ({ selectedNodeData }) => {
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [running, setRunning] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)
  const socketRef = useRef<Socket>()

  /* ---------------------------------------------------------------------- */
  /*  Socket.IO connection                                                  */
  /* ---------------------------------------------------------------------- */
  useEffect(() => {
    const socket = io(SOCKET_URL)
    socketRef.current = socket

    addLine('info', `Connected to backend ${SOCKET_URL}`)

    socket.on('exec_started', ({ tool }: { tool: string }) => {
      setRunning(true)
      addLine('info', `--- ${tool} started ---`)
    })

    socket.on('exec_log', ({ line }: { line: string }) =>
    addLine('output', line),
    )

    socket.on('exec_finished', ({ returncode }: { returncode: number }) => {
      addLine(
        returncode === 0 ? 'info' : 'error',
        `--- finished (exit ${returncode}) ---`,
      )
      setRunning(false)
    })

    socket.on('disconnect', () =>
    addLine('error', 'Socket disconnected from backend'),
    )

    return () => socket.disconnect()
  }, [])

  /* auto-scroll */
  useEffect(() => {
    terminalRef.current?.scrollTo({ top: terminalRef.current.scrollHeight })
  }, [lines])

  /* ---------------------------------------------------------------------- */
  /*  Helpers                                                               */
  /* ---------------------------------------------------------------------- */
  const addLine = (type: TerminalLine['type'], content: string) => {
    setLines((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
             timestamp: new Date().toLocaleTimeString(),
             type,
             content,
      },
    ])
  }

  const lineColor = (type: TerminalLine['type']) =>
  ({
    input: 'text-cyan-400',
    output: 'text-green-400',
    error: 'text-red-400',
    info: 'text-yellow-400',
  }[type])

  const prefix = (type: TerminalLine['type']) =>
  ({ input: '$ ', output: '  ', error: '! ', info: '# ' }[type])

  /* ---------------------------------------------------------------------- */
  /*  Run / stop / misc                                                     */
  /* ---------------------------------------------------------------------- */
  const executeTool = async () => {
    if (!selectedNodeData?.tool) {
      addLine('error', 'No node selected')
      return
    }

    const toolId = selectedNodeData.tool as string
    const params = selectedNodeData.params ?? []
    addLine('input', `${toolId} ${params.join(' ')}`)

    try {
      const res = await fetch(
        `${API_BASE}/api/tools/${toolId}/execute`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ params, workflow_id: 'adhoc' }),
        },
      )
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || res.statusText)
      }
    } catch (err: any) {
      addLine('error', err.message)
    }
  }

  const clearTerminal = () => setLines([])

  const copyOutput = () => {
    navigator.clipboard.writeText(
      lines.map((l) => `[${l.timestamp}] ${l.content}`).join('\n'),
    )
    addLine('info', 'Copied to clipboard')
  }

  return (
    <div className="h-full flex flex-col bg-gray-900 border-t border-gray-700">
    {/* Header */}
    <div className="flex items-center justify-between p-2 bg-gray-800 border-b border-gray-700">
    <div className="flex items-center space-x-2">
    <TerminalIcon className="h-4 w-4 text-green-400" />
    <span className="text-sm font-medium text-gray-300">
    Terminal {selectedNodeData ? `- ${selectedNodeData.label}` : ''}
    </span>
    </div>

    <div className="flex items-center space-x-1">
    <Button
    size="sm"
    variant="ghost"
    onClick={executeTool}
    disabled={running || !selectedNodeData}
    className="h-6 px-2 text-xs"
    >
    <Play className="h-3 w-3 mr-1" />
    Run
    </Button>
    <Button
    size="sm"
    variant="ghost"
    disabled
    className="h-6 px-2 text-xs"
    >
    <Square className="h-3 w-3 mr-1" />
    Stop
    </Button>
    <Button
    size="sm"
    variant="ghost"
    onClick={copyOutput}
    className="h-6 px-2 text-xs"
    >
    <Copy className="h-3 w-3 mr-1" />
    Copy
    </Button>
    <Button
    size="sm"
    variant="ghost"
    onClick={clearTerminal}
    className="h-6 px-2 text-xs"
    >
    <Trash2 className="h-3 w-3 mr-1" />
    Clear
    </Button>
    </div>
    </div>

    {/* Content */}
    <div
    ref={terminalRef}
    className="flex-1 p-2 overflow-y-auto font-mono text-sm bg-black"
    >
    {lines.length === 0 ? (
      <div className="text-gray-500 text-center py-8">
      Ready – select a node and click <kbd>Run</kbd>
      </div>
    ) : (
      lines.map((l) => (
        <div key={l.id} className="flex">
        <span className="text-gray-500 text-xs mr-2">{l.timestamp}</span>
        <span className={`${lineColor(l.type)} flex-1`}>
        {prefix(l.type)}
        {l.content}
        </span>
        </div>
      ))
    )}
    {running && (
      <div className="text-yellow-400 animate-pulse">executing…</div>
    )}
    </div>
    </div>
  )
}

export default Terminal
