"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Bot, 
  Brain, 
  Zap, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  MessageSquare,
  FileText,
  ShoppingCart,
  ArrowRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface AgentStatus {
  id: string
  name: string
  phase: 'proposal' | 'engineering' | 'procurement'
  status: 'idle' | 'thinking' | 'working' | 'completed' | 'error'
  progress: number
  currentTask: string
  estimatedTime?: string
  lastUpdate: string
}

interface AIAgentStatusProps {
  projectId: string
  currentPhase: 'proposal' | 'engineering' | 'procurement'
  className?: string
}

// Mock data for demonstration
const mockAgentStatus: Record<string, AgentStatus[]> = {
  '1': [
    {
      id: 'proposal-agent',
      name: 'Proposal Engineer',
      phase: 'proposal',
      status: 'working',
      progress: 85,
      currentTask: 'Finalizando cálculos hidráulicos',
      estimatedTime: '5 min restantes',
      lastUpdate: 'hace 30 segundos'
    }
  ],
  '2': [
    {
      id: 'proposal-agent',
      name: 'Proposal Engineer',
      phase: 'proposal',
      status: 'completed',
      progress: 100,
      currentTask: 'Propuesta completada',
      lastUpdate: 'hace 2 días'
    },
    {
      id: 'engineering-agent',
      name: 'Engineering Designer',
      phase: 'engineering',
      status: 'working',
      progress: 75,
      currentTask: 'Generando P&IDs principales',
      estimatedTime: '2 horas restantes',
      lastUpdate: 'hace 1 minuto'
    }
  ]
}

const statusConfig = {
  idle: {
    color: 'bg-gray-100 text-gray-700 border-gray-200',
    icon: Clock,
    label: 'En espera'
  },
  thinking: {
    color: 'bg-blue-100 text-blue-700 border-blue-200',
    icon: Brain,
    label: 'Analizando'
  },
  working: {
    color: 'bg-amber-100 text-amber-700 border-amber-200',
    icon: Zap,
    label: 'Trabajando'
  },
  completed: {
    color: 'bg-green-100 text-green-700 border-green-200',
    icon: CheckCircle,
    label: 'Completado'
  },
  error: {
    color: 'bg-red-100 text-red-700 border-red-200',
    icon: AlertCircle,
    label: 'Error'
  }
}

const phaseConfig = {
  proposal: {
    color: 'bg-amber-500',
    icon: MessageSquare,
    label: 'Propuesta'
  },
  engineering: {
    color: 'bg-emerald-500',
    icon: FileText,
    label: 'Ingeniería'
  },
  procurement: {
    color: 'bg-purple-500',
    icon: ShoppingCart,
    label: 'Procurement'
  }
}

export function AIAgentStatus({ projectId, currentPhase, className }: AIAgentStatusProps) {
  const [agents, setAgents] = useState<AgentStatus[]>([])
  const [isExpanded, setIsExpanded] = useState(true)

  useEffect(() => {
    // Simulate fetching agent status
    setAgents(mockAgentStatus[projectId] || [])
  }, [projectId])

  const activeAgent = agents.find(agent => agent.status === 'working' || agent.status === 'thinking')
  const completedAgents = agents.filter(agent => agent.status === 'completed')

  return (
    <Card className={cn("border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            AI Agents Status
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Contraer' : 'Expandir'}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Active Agent */}
        {activeAgent && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-2 rounded-lg text-white",
                  phaseConfig[activeAgent.phase].color
                )}>
                  {React.createElement(phaseConfig[activeAgent.phase].icon, { className: "h-4 w-4" })}
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{activeAgent.name}</h4>
                  <p className="text-xs text-muted-foreground">{activeAgent.currentTask}</p>
                </div>
              </div>
              <Badge className={statusConfig[activeAgent.status].color}>
                {React.createElement(statusConfig[activeAgent.status].icon, { className: "h-3 w-3 mr-1" })}
                {statusConfig[activeAgent.status].label}
              </Badge>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progreso</span>
                <span className="font-medium">{activeAgent.progress}%</span>
              </div>
              <Progress 
                value={activeAgent.progress} 
                className="h-2"
              />
              {activeAgent.estimatedTime && (
                <p className="text-xs text-muted-foreground">
                  ⏱️ {activeAgent.estimatedTime}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Completed Agents Summary */}
        {completedAgents.length > 0 && (
          <div className="pt-3 border-t">
            <h5 className="text-sm font-medium text-muted-foreground mb-2">
              Agentes Completados ({completedAgents.length})
            </h5>
            <div className="space-y-2">
              {completedAgents.map((agent) => (
                <div key={agent.id} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="flex-1">{agent.name}</span>
                  <span className="text-xs text-muted-foreground">{agent.lastUpdate}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next Phase Preview */}
        {!activeAgent && currentPhase !== 'procurement' && (
          <div className="pt-3 border-t">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Próxima fase: {currentPhase === 'proposal' ? 'Ingeniería' : 'Procurement'}
                </span>
              </div>
              <Button size="sm" variant="outline">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* No Active Agents */}
        {agents.length === 0 && (
          <div className="text-center py-4">
            <Bot className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Los agentes IA están listos para trabajar en tu proyecto
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Support React.createElement in TypeScript
declare global {
  namespace React {
    function createElement(
      type: any,
      props?: any,
      ...children: any[]
    ): React.ReactElement;
  }
}