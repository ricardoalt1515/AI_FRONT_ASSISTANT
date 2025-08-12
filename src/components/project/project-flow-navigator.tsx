"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  MessageSquare,
  FileText, 
  ShoppingCart,
  ArrowRight,
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface ProjectFlowNavigatorProps {
  projectId: string
  currentPhase: 'proposal' | 'engineering' | 'procurement'
  progress: {
    proposal: number
    engineering: number
    procurement: number
  }
  className?: string
}

const phases = [
  {
    id: 'proposal',
    title: 'Consulta IA',
    description: 'Chat con agentes especializados',
    icon: MessageSquare,
    route: 'chat',
    color: 'amber'
  },
  {
    id: 'engineering',
    title: 'Ingeniería',
    description: 'P&IDs, BOMs y cálculos',
    icon: FileText,
    route: 'engineering',
    color: 'emerald'
  },
  {
    id: 'procurement',
    title: 'Procurement',
    description: 'Búsqueda de proveedores',
    icon: ShoppingCart,
    route: 'procurement',
    color: 'purple'
  }
] as const

export function ProjectFlowNavigator({ 
  projectId, 
  currentPhase, 
  progress, 
  className 
}: ProjectFlowNavigatorProps) {
  
  const getPhaseStatus = (phaseId: string) => {
    const phaseProgress = progress[phaseId as keyof typeof progress]
    
    if (phaseProgress === 100) return 'completed'
    if (phaseId === currentPhase) return 'active'
    
    // Check if this phase can be started
    const phaseIndex = phases.findIndex(p => p.id === phaseId)
    const currentIndex = phases.findIndex(p => p.id === currentPhase)
    
    if (phaseIndex <= currentIndex) return 'available'
    return 'locked'
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return CheckCircle
      case 'active':
        return Zap
      case 'available':
        return Clock
      default:
        return Clock
    }
  }

  const getStatusColor = (status: string, phaseColor: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'active':
        return `bg-${phaseColor}-100 text-${phaseColor}-700 border-${phaseColor}-200`
      case 'available':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      default:
        return 'bg-gray-100 text-gray-500 border-gray-200'
    }
  }

  return (
    <Card className={cn("border-2 border-primary/10", className)}>
      <CardContent className="p-6">
        <div className="grid md:grid-cols-3 gap-4">
          {phases.map((phase, index) => {
            const Icon = phase.icon
            const status = getPhaseStatus(phase.id)
            const StatusIcon = getStatusIcon(status)
            const phaseProgress = progress[phase.id as keyof typeof progress]
            const isClickable = status === 'active' || status === 'completed' || status === 'available'

            return (
              <div key={phase.id} className="flex items-center">
                <div className="flex-1">
                  <div className={cn(
                    "relative p-4 rounded-xl border-2 transition-all duration-300",
                    status === 'active' && "ring-2 ring-primary/20",
                    status === 'completed' && "bg-green-50 border-green-200",
                    status === 'available' && "bg-blue-50 border-blue-200 hover:bg-blue-100",
                    status === 'locked' && "bg-gray-50 border-gray-200 opacity-60",
                    isClickable && "cursor-pointer hover:shadow-md"
                  )}>
                    {/* Phase Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "p-2 rounded-lg",
                          status === 'completed' ? "bg-green-100 text-green-600" :
                          status === 'active' ? `bg-${phase.color}-100 text-${phase.color}-600` :
                          status === 'available' ? "bg-blue-100 text-blue-600" :
                          "bg-gray-100 text-gray-400"
                        )}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm">{phase.title}</h3>
                          <p className="text-xs text-muted-foreground">{phase.description}</p>
                        </div>
                      </div>
                      
                      <Badge className={getStatusColor(status, phase.color)}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {status === 'completed' && 'Completo'}
                        {status === 'active' && 'Activo'}
                        {status === 'available' && 'Disponible'}
                        {status === 'locked' && 'Bloqueado'}
                      </Badge>
                    </div>

                    {/* Progress Bar */}
                    {phaseProgress > 0 && (
                      <div className="mb-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Progreso</span>
                          <span className="font-medium">{phaseProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={cn(
                              "h-2 rounded-full transition-all duration-300",
                              status === 'completed' ? "bg-green-500" :
                              status === 'active' ? `bg-${phase.color}-500` :
                              "bg-blue-500"
                            )}
                            style={{ width: `${phaseProgress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Action Button */}
                    {isClickable && (
                      <Button 
                        asChild
                        size="sm" 
                        variant={status === 'active' ? 'default' : 'outline'}
                        className="w-full"
                      >
                        <Link href={`/projects/${projectId}/${phase.route}`}>
                          {status === 'completed' && 'Ver Resultados'}
                          {status === 'active' && 'Continuar'}
                          {status === 'available' && 'Comenzar'}
                        </Link>
                      </Button>
                    )}

                    {/* Status indicator dot */}
                    <div className={cn(
                      "absolute -top-2 -right-2 w-4 h-4 rounded-full border-2 border-white",
                      status === 'completed' ? "bg-green-500" :
                      status === 'active' ? `bg-${phase.color}-500` :
                      status === 'available' ? "bg-blue-500" :
                      "bg-gray-300"
                    )} />
                  </div>
                </div>

                {/* Arrow between phases */}
                {index < phases.length - 1 && (
                  <div className="hidden md:flex items-center justify-center w-8">
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Overall Progress */}
        <div className="mt-6 pt-4 border-t">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-sm">Progreso General del Proyecto</h4>
            <span className="text-sm font-medium">
              {Math.round((progress.proposal + progress.engineering + progress.procurement) / 3)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="h-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-500"
              style={{ 
                width: `${(progress.proposal + progress.engineering + progress.procurement) / 3}%` 
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}