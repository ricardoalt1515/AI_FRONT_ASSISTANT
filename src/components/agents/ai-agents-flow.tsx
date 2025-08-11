"use client"

// =============================================================================
// H₂O Allegiant - AI Agents Flow Management System
// =============================================================================

import React, { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import {
  MessageSquare,
  FileText,
  Settings2,
  ShoppingCart,
  CheckCircle,
  Clock,
  Zap,
  AlertCircle,
  ArrowRight,
  Bot,
  Wrench,
  Package
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ProjectStatus } from '@/lib/mock-data'

// AI Agent Phases Configuration
export const agentPhases = [
  {
    id: 'proposal',
    name: 'Propuesta IA',
    agent: 'ModernProposalAgent',
    description: 'Chat inteligente y generación de propuesta técnica profesional',
    icon: MessageSquare,
    color: 'amber',
    estimatedTime: '2-4 horas',
    outputs: ['Propuesta técnica PDF', 'Contexto del proyecto', 'Parámetros técnicos'],
    status: 'active' as const
  },
  {
    id: 'engineering',
    name: 'Ingeniería Detallada',
    agent: 'DetailedEngineeringAgent',
    description: 'P&IDs, memorias de cálculo, BOM y documentos de ingeniería',
    icon: Wrench,
    color: 'emerald',
    estimatedTime: '24-48 horas',
    outputs: ['P&IDs principales', 'BOM detallado', 'Memorias de cálculo', 'Layout preliminar'],
    status: 'pending' as const
  },
  {
    id: 'procurement',
    name: 'Procurement Inteligente',
    agent: 'ProcurementAgent',
    description: 'Búsqueda de proveedores, cotizaciones y optimización de costos',
    icon: ShoppingCart,
    color: 'purple',
    estimatedTime: '48-72 horas',
    outputs: ['Cotizaciones comparativas', 'Análisis de ahorros', 'Órdenes de compra'],
    status: 'pending' as const
  }
] as const

const statusConfig = {
  pending: {
    color: 'bg-muted text-muted-foreground',
    icon: Clock,
    label: 'Pendiente'
  },
  active: {
    color: 'bg-blue-500 text-white',
    icon: Zap,
    label: 'En Progreso'
  },
  completed: {
    color: 'bg-green-500 text-white',
    icon: CheckCircle,
    label: 'Completado'
  },
  error: {
    color: 'bg-red-500 text-white',
    icon: AlertCircle,
    label: 'Error'
  }
} as const

interface AIAgentsFlowProps {
  projectId: string
  currentPhase: 'proposal' | 'engineering' | 'procurement'
  phaseProgress?: Record<string, number>
  onPhaseAction?: (phaseId: string, action: string) => void
  className?: string
}

export function AIAgentsFlow({ 
  projectId, 
  currentPhase, 
  phaseProgress = {}, 
  onPhaseAction,
  className 
}: AIAgentsFlowProps) {
  const [expandedPhase, setExpandedPhase] = useState<string | null>(currentPhase)

  const getPhaseStatus = (phaseId: string) => {
    if (phaseId === currentPhase) return 'active'
    if (agentPhases.findIndex(p => p.id === phaseId) < agentPhases.findIndex(p => p.id === currentPhase)) {
      return 'completed'
    }
    return 'pending'
  }

  const getPhaseProgress = (phaseId: string) => {
    return phaseProgress[phaseId] || 0
  }

  const canStartPhase = (phaseId: string) => {
    const phaseIndex = agentPhases.findIndex(p => p.id === phaseId)
    const currentIndex = agentPhases.findIndex(p => p.id === currentPhase)
    return phaseIndex <= currentIndex + 1
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Flow Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Flujo de Agentes IA</h2>
          <p className="text-muted-foreground">
            Automatización completa: Chat → Ingeniería → Procurement
          </p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          <Bot className="h-4 w-4 mr-1" />
          3 Agentes Activos
        </Badge>
      </div>

      {/* Progress Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Timeline del Proyecto</CardTitle>
          <CardDescription>
            Progreso automático a través de las fases de desarrollo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            {agentPhases.map((phase, index) => {
              const status = getPhaseStatus(phase.id)
              const progress = getPhaseProgress(phase.id)
              const StatusIcon = statusConfig[status].icon
              const PhaseIcon = phase.icon

              return (
                <React.Fragment key={phase.id}>
                  <div className="flex flex-col items-center space-y-2">
                    <div className={cn(
                      "relative p-3 rounded-xl shadow-sm transition-all duration-300",
                      status === 'completed' && 'bg-green-100 border-green-200',
                      status === 'active' && 'bg-blue-100 border-blue-200 ring-2 ring-blue-200',
                      status === 'pending' && 'bg-muted border-border'
                    )}>
                      <PhaseIcon className={cn(
                        "h-5 w-5",
                        status === 'completed' && 'text-green-600',
                        status === 'active' && 'text-blue-600',
                        status === 'pending' && 'text-muted-foreground'
                      )} />
                      
                      {/* Status indicator */}
                      <div className={cn(
                        "absolute -top-1 -right-1 h-4 w-4 rounded-full flex items-center justify-center",
                        statusConfig[status].color
                      )}>
                        <StatusIcon className="h-2.5 w-2.5" />
                      </div>
                    </div>
                    
                    <div className="text-center min-w-0">
                      <p className="text-sm font-medium">{phase.name}</p>
                      {status === 'active' && progress > 0 && (
                        <p className="text-xs text-muted-foreground">{progress}%</p>
                      )}
                    </div>
                  </div>
                  
                  {index < agentPhases.length - 1 && (
                    <ArrowRight className={cn(
                      "h-4 w-4 flex-shrink-0",
                      status === 'completed' ? 'text-green-400' : 'text-muted-foreground'
                    )} />
                  )}
                </React.Fragment>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Phase Details Cards */}
      <div className="grid gap-4">
        {agentPhases.map((phase) => {
          const status = getPhaseStatus(phase.id)
          const progress = getPhaseProgress(phase.id)
          const isExpanded = expandedPhase === phase.id
          const StatusIcon = statusConfig[status].icon
          const PhaseIcon = phase.icon

          return (
            <Card key={phase.id} className={cn(
              "transition-all duration-300",
              status === 'active' && "ring-2 ring-blue-200 border-blue-200",
              status === 'completed' && "border-green-200 bg-green-50/20"
            )}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={cn(
                      "p-2 rounded-lg",
                      phase.color === 'amber' && "bg-amber-100 text-amber-600",
                      phase.color === 'emerald' && "bg-emerald-100 text-emerald-600",
                      phase.color === 'purple' && "bg-purple-100 text-purple-600"
                    )}>
                      <PhaseIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <CardTitle className="text-lg">{phase.name}</CardTitle>
                        <Badge className={cn("text-xs", statusConfig[status].color)}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusConfig[status].label}
                        </Badge>
                      </div>
                      <CardDescription className="mt-1">
                        {phase.description}
                      </CardDescription>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
                  >
                    {isExpanded ? 'Contraer' : 'Expandir'}
                  </Button>
                </div>

                {/* Progress bar for active phase */}
                {status === 'active' && progress > 0 && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Progreso</span>
                      <span className="font-medium">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )}
              </CardHeader>

              {isExpanded && (
                <CardContent className="pt-0">
                  <Separator className="mb-4" />
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    {/* Agent Details */}
                    <div>
                      <h4 className="font-medium mb-2">Agente IA</h4>
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="text-sm font-mono text-muted-foreground mb-1">
                          {phase.agent}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Tiempo estimado: {phase.estimatedTime}
                        </p>
                      </div>
                    </div>

                    {/* Outputs */}
                    <div>
                      <h4 className="font-medium mb-2">Entregables</h4>
                      <div className="space-y-1">
                        {phase.outputs.map((output, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-sm">
                            <Package className="h-3 w-3 text-muted-foreground" />
                            <span>{output}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Phase Actions */}
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        {status === 'pending' && 'Esperando fase anterior'}
                        {status === 'active' && 'Ejecutándose automáticamente'}
                        {status === 'completed' && 'Fase completada exitosamente'}
                      </div>
                      
                      <div className="flex space-x-2">
                        {status === 'pending' && canStartPhase(phase.id) && (
                          <Button
                            size="sm"
                            onClick={() => onPhaseAction?.(phase.id, 'start')}
                          >
                            <Zap className="h-4 w-4 mr-1" />
                            Iniciar Fase
                          </Button>
                        )}
                        
                        {status === 'active' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onPhaseAction?.(phase.id, 'pause')}
                          >
                            Pausar
                          </Button>
                        )}
                        
                        {status === 'completed' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onPhaseAction?.(phase.id, 'view-results')}
                          >
                            Ver Resultados
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}