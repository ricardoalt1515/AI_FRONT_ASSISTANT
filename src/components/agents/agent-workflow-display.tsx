"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  MessageSquare,
  Settings,
  ShoppingCart,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Brain,
  FileText,
  RefreshCw,
  Play,
  Pause,
  StopCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

// Agent types and states
export type AgentType = 'proposal' | 'engineering' | 'procurement';
export type AgentState = 'idle' | 'analyzing' | 'working' | 'waiting_approval' | 'completed' | 'error';

interface AgentWorkflowStep {
  id: string;
  name: string;
  description: string;
  estimatedTime: string;
  progress: number;
  status: 'pending' | 'in_progress' | 'completed' | 'error' | 'waiting_approval';
  dependencies?: string[];
  output?: any;
}

interface AgentInfo {
  type: AgentType;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  state: AgentState;
  progress: number;
  currentStep?: string;
  timeRemaining?: string;
  steps: AgentWorkflowStep[];
}

// Mock agent data based on your architecture
const mockAgents: AgentInfo[] = [
  {
    type: 'proposal',
    name: 'Proposal Agent',
    description: 'Generando propuesta técnica basada en conversación AI',
    icon: MessageSquare,
    color: 'amber',
    state: 'completed',
    progress: 100,
    steps: [
      {
        id: 'analyze_requirements',
        name: 'Análisis de Requerimientos',
        description: 'Procesando información del chat AI',
        estimatedTime: '15 min',
        progress: 100,
        status: 'completed'
      },
      {
        id: 'technical_sizing',
        name: 'Dimensionamiento Técnico',
        description: 'Calculando capacidades y especificaciones',
        estimatedTime: '30 min', 
        progress: 100,
        status: 'completed'
      },
      {
        id: 'cost_estimation',
        name: 'Estimación de Costos',
        description: 'Calculando CAPEX y OPEX estimados',
        estimatedTime: '20 min',
        progress: 100,
        status: 'completed'
      },
      {
        id: 'proposal_generation',
        name: 'Generación de Propuesta',
        description: 'Creando documento PDF ejecutivo',
        estimatedTime: '25 min',
        progress: 100,
        status: 'completed'
      },
      {
        id: 'handoff_preparation',
        name: 'Preparación para Ingeniería',
        description: 'Estructurando contexto para siguiente fase',
        estimatedTime: '10 min',
        progress: 100,
        status: 'completed'
      }
    ]
  },
  {
    type: 'engineering',
    name: 'Engineering Agent',
    description: 'Desarrollando especificaciones técnicas detalladas',
    icon: Settings,
    color: 'emerald', 
    state: 'working',
    progress: 65,
    currentStep: 'Dimensionamiento de Equipos',
    timeRemaining: '18 horas',
    steps: [
      {
        id: 'extract_specs',
        name: 'Extracción de Especificaciones',
        description: 'Analizando datos de propuesta aprobada',
        estimatedTime: '2 horas',
        progress: 100,
        status: 'completed'
      },
      {
        id: 'generate_pid',
        name: 'Generación P&ID',
        description: 'Creando diagrama de proceso e instrumentación',
        estimatedTime: '8 horas',
        progress: 100,
        status: 'completed'
      },
      {
        id: 'equipment_sizing',
        name: 'Dimensionamiento de Equipos',
        description: 'Calculando tamaños y especificaciones de 27 equipos',
        estimatedTime: '12 horas',
        progress: 75,
        status: 'in_progress'
      },
      {
        id: 'hydraulic_calcs',
        name: 'Cálculos Hidráulicos',
        description: 'Validando presiones y caudales del sistema',
        estimatedTime: '16 horas',
        progress: 0,
        status: 'pending'
      },
      {
        id: 'layout_design',
        name: 'Diseño de Layout',
        description: 'Optimizando distribución espacial de equipos',
        estimatedTime: '8 horas',
        progress: 0,
        status: 'pending'
      },
      {
        id: 'compliance_validation',
        name: 'Validación de Cumplimiento',
        description: 'Verificando regulaciones NOM-001, NOM-002, NOM-003',
        estimatedTime: '2 horas',
        progress: 0,
        status: 'pending'
      }
    ]
  },
  {
    type: 'procurement',
    name: 'Procurement Agent',
    description: 'Investigando proveedores y generando RFQs',
    icon: ShoppingCart,
    color: 'purple',
    state: 'idle',
    progress: 0,
    steps: [
      {
        id: 'vendor_research',
        name: 'Investigación de Proveedores',
        description: 'Búsqueda multi-fuente de vendedores por equipo',
        estimatedTime: '24 horas',
        progress: 0,
        status: 'pending'
      },
      {
        id: 'rfq_campaign',
        name: 'Campaña de RFQs',
        description: 'Envío automatizado de solicitudes de cotización',
        estimatedTime: '24 horas',
        progress: 0,
        status: 'pending'
      },
      {
        id: 'quote_analysis',
        name: 'Análisis de Cotizaciones',
        description: 'Procesamiento y comparación inteligente',
        estimatedTime: '24 horas',
        progress: 0,
        status: 'pending'
      }
    ]
  }
];

const stateConfig = {
  idle: { 
    color: 'bg-slate-100 text-slate-600', 
    icon: Clock,
    label: 'En Espera'
  },
  analyzing: { 
    color: 'bg-blue-100 text-blue-600', 
    icon: Brain,
    label: 'Analizando'
  },
  working: { 
    color: 'bg-amber-100 text-amber-600', 
    icon: RefreshCw,
    label: 'Trabajando'
  },
  waiting_approval: { 
    color: 'bg-orange-100 text-orange-600', 
    icon: AlertTriangle,
    label: 'Esperando Aprobación'
  },
  completed: { 
    color: 'bg-emerald-100 text-emerald-600', 
    icon: CheckCircle2,
    label: 'Completado'
  },
  error: { 
    color: 'bg-red-100 text-red-600', 
    icon: AlertTriangle,
    label: 'Error'
  }
};

const colorVariants = {
  amber: 'border-l-amber-500 bg-amber-50',
  emerald: 'border-l-emerald-500 bg-emerald-50', 
  purple: 'border-l-purple-500 bg-purple-50'
};

interface AgentWorkflowDisplayProps {
  projectId: string;
  className?: string;
}

export function AgentWorkflowDisplay({ projectId, className }: AgentWorkflowDisplayProps) {
  const [expandedAgent, setExpandedAgent] = useState<AgentType | null>('engineering');
  
  const handleAgentControl = (agentType: AgentType, action: 'start' | 'pause' | 'stop') => {
    console.log(`${action} agent:`, agentType);
    // Here you would integrate with your agent system
  };

  const handleApproveStep = (agentType: AgentType, stepId: string) => {
    console.log(`Approve step ${stepId} for agent:`, agentType);
    // Here you would send approval to agent system
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Workflow Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Workflow de Agentes IA</h2>
          <p className="text-muted-foreground">
            Seguimiento en tiempo real del proceso automático
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="px-3 py-1">
            Proyecto: Los Mochis
          </Badge>
          <Badge variant="secondary" className="px-3 py-1">
            Fase: Ingeniería
          </Badge>
        </div>
      </div>

      {/* Agent Cards */}
      <div className="grid gap-6 lg:grid-cols-1">
        {mockAgents.map((agent) => {
          const StateIcon = stateConfig[agent.state].icon;
          const AgentIcon = agent.icon;
          const isExpanded = expandedAgent === agent.type;
          
          return (
            <Card 
              key={agent.type} 
              className={cn(
                "card-premium border-l-4 transition-all duration-300",
                colorVariants[agent.color],
                isExpanded && "shadow-lg"
              )}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl",
                      agent.color === 'amber' ? "bg-amber-500" :
                      agent.color === 'emerald' ? "bg-emerald-500" :
                      "bg-purple-500"
                    )}>
                      <AgentIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <span>{agent.name}</span>
                        <Badge className={stateConfig[agent.state].color}>
                          <StateIcon className="h-3 w-3 mr-1" />
                          {stateConfig[agent.state].label}
                        </Badge>
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {agent.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {agent.state === 'working' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAgentControl(agent.type, 'pause')}
                      >
                        <Pause className="h-4 w-4" />
                      </Button>
                    )}
                    
                    {(agent.state === 'idle' || agent.state === 'error') && (
                      <Button
                        size="sm"
                        onClick={() => handleAgentControl(agent.type, 'start')}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Iniciar
                      </Button>
                    )}
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setExpandedAgent(isExpanded ? null : agent.type)}
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Overall Progress */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progreso General</span>
                    <div className="flex items-center space-x-2">
                      {agent.currentStep && (
                        <span className="text-foreground font-medium">
                          {agent.currentStep}
                        </span>
                      )}
                      <span className="font-semibold">{agent.progress}%</span>
                    </div>
                  </div>
                  <Progress value={agent.progress} className="h-2" />
                  {agent.timeRemaining && (
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Tiempo restante estimado</span>
                      <span>{agent.timeRemaining}</span>
                    </div>
                  )}
                </div>
              </CardHeader>

              {/* Expanded Steps */}
              {isExpanded && (
                <CardContent className="pt-0">
                  <Separator className="mb-4" />
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground mb-3">
                      Pasos del Workflow
                    </h4>
                    {agent.steps.map((step, index) => (
                      <div
                        key={step.id}
                        className={cn(
                          "flex items-center space-x-4 p-3 rounded-lg border transition-colors",
                          step.status === 'completed' ? "bg-emerald-50 border-emerald-200" :
                          step.status === 'in_progress' ? "bg-amber-50 border-amber-200" :
                          step.status === 'waiting_approval' ? "bg-orange-50 border-orange-200" :
                          step.status === 'error' ? "bg-red-50 border-red-200" :
                          "bg-slate-50 border-slate-200"
                        )}
                      >
                        <div className="flex-shrink-0">
                          {step.status === 'completed' ? (
                            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                          ) : step.status === 'in_progress' ? (
                            <RefreshCw className="h-5 w-5 text-amber-600 animate-spin" />
                          ) : step.status === 'waiting_approval' ? (
                            <AlertTriangle className="h-5 w-5 text-orange-600" />
                          ) : step.status === 'error' ? (
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                          ) : (
                            <Clock className="h-5 w-5 text-slate-400" />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h5 className="font-medium text-foreground">
                              {step.name}
                            </h5>
                            <span className="text-xs text-muted-foreground">
                              {step.estimatedTime}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {step.description}
                          </p>
                          
                          {step.status === 'in_progress' && (
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">Progreso</span>
                                <span className="font-medium">{step.progress}%</span>
                              </div>
                              <Progress value={step.progress} className="h-1" />
                            </div>
                          )}
                          
                          {step.status === 'waiting_approval' && (
                            <div className="flex items-center space-x-2 mt-2">
                              <Button
                                size="sm"
                                className="h-7"
                                onClick={() => handleApproveStep(agent.type, step.id)}
                              >
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Aprobar
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7"
                              >
                                Revisar
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}