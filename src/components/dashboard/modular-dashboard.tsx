"use client"

import React, { Suspense, lazy, useState, useMemo } from 'react'
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { 
  ContextCard,
  ContextCardHeader,
  ContextCardTitle,
  ContextCardDescription,
  ContextCardContent,
  ContextCardFooter 
} from "@/components/ui/context-card"
import {
  MetricCard,
  MetricGrid,
  QuickKPI
} from "@/components/ui/metric-card"
import {
  InlineDisclosure,
  HoverDisclosure, 
  SheetDisclosure,
  LayeredMetric,
  DisclosureManager
} from "@/components/ui/progressive-disclosure"
import {
  useDashboard,
  useDashboardFeatures,
  useDashboardLayout,
  useDashboardPermissions,
  type DashboardType
} from "@/contexts/dashboard-context"
import { 
  TrendingUp, 
  TrendingDown, 
  Droplet, 
  Gauge, 
  Shield, 
  DollarSign,
  Users,
  Calendar,
  Settings,
  Plus,
  RefreshCw,
  BarChart3,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight
} from "lucide-react"

/**
 * Modular Dashboard - Complete implementation leveraging:
 * - shadcn/ui compound component patterns
 * - Tailwind OKLCH colors & context themes
 * - Progressive disclosure system
 * - CVA-based variants
 * - Performance optimizations
 */

// Dashboard layout variants using CVA
const dashboardVariants = cva(
  "min-h-screen bg-gradient-to-br transition-all duration-300",
  {
    variants: {
      context: {
        executive: "from-context-executive-50 via-background to-context-executive-50/30",
        project: "from-context-project-50 via-background to-context-project-50/30", 
        technical: "from-context-technical-50 via-background to-context-technical-50/30",
        client: "from-context-client-50 via-background to-context-client-50/30"
      },
      density: {
        comfortable: "p-8 space-y-8",
        compact: "p-6 space-y-6", 
        minimal: "p-4 space-y-4"
      }
    },
    defaultVariants: {
      context: "executive",
      density: "comfortable"
    }
  }
)

// Mock data for different contexts
const getMockData = (context: DashboardType) => {
  const baseKPIs = {
    executive: [
      {
        id: "revenue",
        title: "Ingresos Totales",
        value: "$2.4M",
        trend: "up" as const,
        trendValue: "+12.5%",
        status: "success" as const
      },
      {
        id: "projects",
        title: "Proyectos Activos", 
        value: "24",
        trend: "up" as const,
        trendValue: "+3",
        status: "info" as const
      },
      {
        id: "efficiency",
        title: "Eficiencia Operativa",
        value: "94.2%",
        trend: "neutral" as const,
        trendValue: "0.2%",
        status: "success" as const
      }
    ],
    project: [
      {
        id: "active",
        title: "Proyectos En Curso",
        value: "8",
        trend: "up" as const,
        trendValue: "+2",
        status: "info" as const
      },
      {
        id: "completion",
        title: "Promedio Completado",
        value: "73%",
        trend: "up" as const, 
        trendValue: "+5%",
        status: "success" as const
      },
      {
        id: "budget",
        title: "Presupuesto Utilizado",
        value: "67%",
        trend: "neutral" as const,
        trendValue: "+2%",
        status: "warning" as const
      }
    ],
    technical: [
      {
        id: "systems",
        title: "Sistemas Operativos",
        value: "12",
        trend: "neutral" as const,
        status: "success" as const
      },
      {
        id: "efficiency",
        title: "Eficiencia Técnica",
        value: "97.8%",
        trend: "up" as const,
        trendValue: "+0.3%", 
        status: "success" as const
      },
      {
        id: "maintenance",
        title: "Mantenimientos",
        value: "3",
        trend: "down" as const,
        trendValue: "-2",
        status: "success" as const
      }
    ],
    "client-portal": [
      {
        id: "my-projects",
        title: "Mis Proyectos",
        value: "3",
        trend: "neutral" as const,
        status: "info" as const
      },
      {
        id: "progress",
        title: "Progreso Promedio", 
        value: "68%",
        trend: "up" as const,
        trendValue: "+8%",
        status: "success" as const
      },
      {
        id: "next-milestone",
        title: "Próximo Hito",
        value: "5 días",
        trend: "neutral" as const,
        status: "warning" as const
      }
    ]
  }

  return baseKPIs[context] || baseKPIs.executive
}

// Enhanced Metrics Section with Progressive Disclosure
interface ModularMetricsProps {
  context: DashboardType
  density: "comfortable" | "compact" | "minimal"
  showAdvanced: boolean
  className?: string
}

const ModularMetrics = React.memo<ModularMetricsProps>(({ 
  context, 
  density, 
  showAdvanced,
  className 
}) => {
  const kpis = getMockData(context)
  
  return (
    <div className={cn("space-y-6", className)}>
      {/* Primary KPIs - Always visible */}
      <QuickKPI 
        kpis={kpis}
        context={context}
        onKPIClick={(id) => console.log('KPI clicked:', id)}
      />
      
      {/* Advanced Metrics - Progressive Disclosure */}
      {showAdvanced && (
        <div className="animate-fade-in-up">
          <InlineDisclosure
            trigger={
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                <span>Métricas Avanzadas</span>
              </div>
            }
            badge={<Badge variant="secondary">Pro</Badge>}
            defaultOpen={false}
          >
            <MetricGrid context={context} density={density}>
              <LayeredMetric
                title="Análisis de Rendimiento"
                value="87.5%"
                subtitle="vs mes anterior"
                hoverContent={
                  <div className="space-y-2">
                    <p>Rendimiento calculado basado en:</p>
                    <ul className="list-disc pl-4 space-y-1 text-sm">
                      <li>Tiempo de respuesta del sistema</li>
                      <li>Calidad del agua procesada</li>
                      <li>Eficiencia energética</li>
                    </ul>
                  </div>
                }
                expandableContent={
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Este Mes</p>
                      <p className="text-2xl font-bold text-emerald-600">87.5%</p>
                    </div>
                    <div>
                      <p className="font-medium">Mes Anterior</p>
                      <p className="text-2xl font-bold text-muted-foreground">84.2%</p>
                    </div>
                  </div>
                }
                drillDownContent={
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-heading-lg mb-3">Desglose Detallado</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Calidad del Agua</span>
                          <span className="font-semibold">96.2%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Eficiencia Energética</span>
                          <span className="font-semibold">91.8%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Tiempo de Respuesta</span>
                          <span className="font-semibold">74.5%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                }
                context={context}
                showLayers={[1, 2, 3]}
              />
              
              <LayeredMetric
                title="Predicción de Costos"
                value="$145K"
                subtitle="próximos 3 meses"
                hoverContent={
                  <p>Predicción basada en patrones históricos y proyectos en curso</p>
                }
                context={context}
                showLayers={[1]}
              />
            </MetricGrid>
          </InlineDisclosure>
        </div>
      )}
    </div>
  )
})
ModularMetrics.displayName = "ModularMetrics"

// Action Items with Context Awareness
interface ActionItemsProps {
  context: DashboardType
  className?: string
}

const ActionItems = React.memo<ActionItemsProps>(({ context, className }) => {
  const actions = useMemo(() => {
    const baseActions = {
      executive: [
        {
          id: "budget-review",
          title: "Revisión Presupuestaria Q2",
          description: "Análisis de desviaciones presupuestarias",
          priority: "high" as const,
          dueDate: "2 días",
          icon: <DollarSign className="h-4 w-4" />
        },
        {
          id: "client-meeting", 
          title: "Reunión con Cliente Estratégico",
          description: "Presentación de propuesta ampliación",
          priority: "medium" as const,
          dueDate: "5 días",
          icon: <Users className="h-4 w-4" />
        }
      ],
      project: [
        {
          id: "milestone-review",
          title: "Revisión Hito Proyecto Alpha",
          description: "Evaluación progreso sistema tratamiento",
          priority: "high" as const, 
          dueDate: "1 día",
          icon: <CheckCircle2 className="h-4 w-4" />
        }
      ],
      technical: [
        {
          id: "system-maintenance",
          title: "Mantenimiento Sistema Beta",
          description: "Calibración sensores calidad agua",
          priority: "medium" as const,
          dueDate: "3 días", 
          icon: <Settings className="h-4 w-4" />
        }
      ],
      "client-portal": [
        {
          id: "document-review",
          title: "Revisar Documentos Pendientes",
          description: "3 documentos requieren aprobación",
          priority: "medium" as const,
          dueDate: "7 días",
          icon: <FileText className="h-4 w-4" />
        }
      ]
    }
    
    return baseActions[context] || []
  }, [context])

  const priorityColors = {
    high: "border-l-red-500 bg-red-50/30",
    medium: "border-l-amber-500 bg-amber-50/30", 
    low: "border-l-blue-500 bg-blue-50/30"
  }

  if (actions.length === 0) return null

  return (
    <ContextCard context={context} className={className}>
      <ContextCardHeader
        icon={<AlertTriangle className="h-5 w-5 text-amber-600" />}
      >
        <div>
          <ContextCardTitle>Acciones Requeridas</ContextCardTitle>
          <ContextCardDescription>
            {actions.length} elemento{actions.length !== 1 ? 's' : ''} pendiente{actions.length !== 1 ? 's' : ''}
          </ContextCardDescription>
        </div>
      </ContextCardHeader>
      
      <ContextCardContent spacing="sm">
        <div className="space-y-3">
          {actions.map((action) => (
            <div
              key={action.id}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg border-l-2 transition-all hover:bg-muted/30",
                priorityColors[action.priority]
              )}
            >
              <div className="p-2 rounded-lg bg-background/80">
                {action.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{action.title}</p>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </div>
              <div className="text-right text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {action.dueDate}
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </div>
          ))}
        </div>
      </ContextCardContent>
    </ContextCard>
  )
})
ActionItems.displayName = "ActionItems"

// Main Modular Dashboard Component
interface ModularDashboardProps extends VariantProps<typeof dashboardVariants> {
  context?: DashboardType
  className?: string
}

export const ModularDashboard = React.forwardRef<HTMLDivElement, ModularDashboardProps>(
  ({ context = "executive", density, className, ...props }, ref) => {
    const [showAdvanced, setShowAdvanced] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)

    const contextConfig = {
      executive: {
        title: "Dashboard Ejecutivo H₂O Allegiant",
        subtitle: "Vista estratégica de operaciones y rendimiento",
        primaryAction: "Nuevo Proyecto"
      },
      project: {
        title: "Gestión de Proyectos",
        subtitle: "Seguimiento operacional y coordinación de equipos", 
        primaryAction: "Crear Tarea"
      },
      technical: {
        title: "Panel Técnico",
        subtitle: "Monitoreo de sistemas y especificaciones",
        primaryAction: "Nuevo Sistema"
      },
      "client-portal": {
        title: "Portal de Cliente", 
        subtitle: "Seguimiento de sus proyectos de tratamiento",
        primaryAction: "Contactar Soporte"
      }
    }

    const config = contextConfig[context]

    const handleRefresh = async () => {
      setIsRefreshing(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsRefreshing(false)
    }

    return (
      <div 
        ref={ref}
        className={cn(dashboardVariants({ context, density }), className)}
        data-context={context}
        {...props}
      >
        {/* Header Section */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Droplet className="h-8 w-8 text-primary animate-pulse-gentle" />
              <h1 className="text-display-lg">{config.title}</h1>
              <Badge variant="outline" className="capitalize">
                {context.replace('-', ' ')}
              </Badge>
            </div>
            <p className="text-body-lg text-muted-foreground">{config.subtitle}</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline" 
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              {showAdvanced ? 'Vista Simple' : 'Vista Avanzada'}
            </Button>
            
            <Button
              variant="outline"
              size="sm" 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="gap-2"
            >
              <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
              Actualizar
            </Button>
            
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              {config.primaryAction}
            </Button>
          </div>
        </div>

        {/* Metrics Section */}
        <ModularMetrics
          context={context}
          density={density || "comfortable"}
          showAdvanced={showAdvanced}
        />

        {/* Action Items */}
        <ActionItems context={context} />

        {/* Projects Section (Placeholder) */}
        <ContextCard context={context} size="lg">
          <ContextCardHeader>
            <div>
              <ContextCardTitle>Proyectos Recientes</ContextCardTitle>
              <ContextCardDescription>
                Vista de proyectos según su contexto
              </ContextCardDescription>
            </div>
          </ContextCardHeader>
          <ContextCardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Gauge className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Proyecto {i}</p>
                      <p className="text-sm text-muted-foreground">Sistema tratamiento</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progreso</span>
                      <span className="font-medium">{65 + i * 10}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary rounded-full h-2 transition-all"
                        style={{ width: `${65 + i * 10}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ContextCardContent>
        </ContextCard>
      </div>
    )
  }
)
ModularDashboard.displayName = "ModularDashboard"

// Export for easy integration
export default ModularDashboard