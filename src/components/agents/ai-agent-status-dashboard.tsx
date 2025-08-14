"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Brain, 
  FileText, 
  Settings, 
  ShoppingCart,
  CheckCircle2, 
  Loader2, 
  Clock,
  AlertTriangle,
  TrendingUp,
  Database,
  Zap,
  Eye
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getPhaseColors } from "@/lib/design-system";
import type { Project } from "@/types/workspace";

interface AIAgent {
  id: string;
  name: string;
  description: string;
  phase: 'discovery' | 'proposal' | 'engineering' | 'procurement';
  status: 'idle' | 'analyzing' | 'generating' | 'completed' | 'error';
  progress: number;
  confidence: number;
  lastUpdate: string;
  dataPoints: number;
  processingTime: string;
  icon: typeof Brain;
}

interface AIAgentStatusDashboardProps {
  project: Project;
  onAgentClick?: (agentId: string) => void;
  onViewDetails?: (agentId: string) => void;
  realTimeUpdates?: boolean;
}

// Mock AI agents based on project phase
function getProjectAIAgents(project: Project): AIAgent[] {
  const baseAgents = [
    {
      id: 'discovery-agent',
      name: 'Discovery Agent',
      description: 'Analiza requisitos y extrae parámetros técnicos',
      phase: 'discovery' as const,
      icon: Brain,
      dataPoints: 47,
      processingTime: '2.3s'
    },
    {
      id: 'proposal-agent', 
      name: 'Proposal Agent',
      description: 'Genera propuestas técnicas profesionales',
      phase: 'proposal' as const,
      icon: FileText,
      dataPoints: 156,
      processingTime: '45s'
    },
    {
      id: 'engineering-agent',
      name: 'Engineering Agent', 
      description: 'Desarrolla P&IDs y especificaciones detalladas',
      phase: 'engineering' as const,
      icon: Settings,
      dataPoints: 892,
      processingTime: '3.2min'
    },
    {
      id: 'procurement-agent',
      name: 'Procurement Agent',
      description: 'Optimiza selección de equipos y proveedores',
      phase: 'procurement' as const,
      icon: ShoppingCart,
      dataPoints: 234,
      processingTime: '1.8min'
    }
  ];

  return baseAgents.map(agent => {
    const phaseProgress = project.progress[agent.phase];
    const isCurrentPhase = project.phase === agent.phase;
    const isCompletedPhase = phaseProgress === 100;
    const isInProgress = isCurrentPhase && phaseProgress > 0 && phaseProgress < 100;
    
    let status: AIAgent['status'];
    let confidence: number;
    let lastUpdate: string;
    
    if (isCompletedPhase) {
      status = 'completed';
      confidence = 0.95 + Math.random() * 0.04; // 95-99%
      lastUpdate = 'Completado';
    } else if (isInProgress) {
      status = phaseProgress < 50 ? 'analyzing' : 'generating';
      confidence = 0.75 + (phaseProgress / 100) * 0.2; // 75-95%
      lastUpdate = 'Hace 2 minutos';
    } else if (isCurrentPhase) {
      status = 'idle';
      confidence = 0.85;
      lastUpdate = 'Listo para iniciar';
    } else {
      status = 'idle';
      confidence = 0.85;
      lastUpdate = 'Esperando fase anterior';
    }

    return {
      ...agent,
      status,
      progress: phaseProgress,
      confidence,
      lastUpdate
    };
  });
}

export function AIAgentStatusDashboard({ 
  project, 
  onAgentClick,
  onViewDetails,
  realTimeUpdates = false 
}: AIAgentStatusDashboardProps) {
  const agents = getProjectAIAgents(project);
  const activeAgents = agents.filter(agent => 
    agent.status === 'analyzing' || agent.status === 'generating'
  );
  
  const overallConfidence = agents.reduce((sum, agent) => sum + agent.confidence, 0) / agents.length;
  const totalDataPoints = agents.reduce((sum, agent) => sum + agent.dataPoints, 0);

  const getStatusIcon = (status: AIAgent['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'analyzing':
      case 'generating':
        return <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusText = (status: AIAgent['status']) => {
    const statusMap = {
      idle: 'En espera',
      analyzing: 'Analizando',
      generating: 'Generando',
      completed: 'Completado',
      error: 'Error'
    };
    return statusMap[status];
  };

  const getStatusColor = (status: AIAgent['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'analyzing':
      case 'generating':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* AI System Overview */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Brain className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900">Sistema de IA Activo</h3>
              <p className="text-sm font-normal text-blue-700">
                {activeAgents.length > 0 
                  ? `${activeAgents.length} agentes procesando activamente`
                  : 'Todos los agentes listos para trabajar'
                }
              </p>
            </div>
            {realTimeUpdates && (
              <div className="ml-auto">
                <div className="flex items-center gap-2 text-sm text-blue-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  Tiempo real
                </div>
              </div>
            )}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* System Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-white rounded-lg border">
              <TrendingUp className="h-5 w-5 mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold text-blue-600">
                {Math.round(overallConfidence * 100)}%
              </p>
              <p className="text-xs text-gray-600">Confianza General</p>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border">
              <Database className="h-5 w-5 mx-auto mb-2 text-purple-600" />
              <p className="text-2xl font-bold text-purple-600">
                {totalDataPoints.toLocaleString()}
              </p>
              <p className="text-xs text-gray-600">Puntos de Datos</p>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border">
              <Zap className="h-5 w-5 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold text-green-600">
                {agents.filter(a => a.status === 'completed').length}/4
              </p>
              <p className="text-xs text-gray-600">Agentes Completados</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual AI Agents */}
      <div className="grid gap-4 md:grid-cols-2">
        {agents.map((agent) => {
          const phaseColors = getPhaseColors(agent.phase);
          const IconComponent = agent.icon;
          
          return (
            <Card 
              key={agent.id}
              className={cn(
                "transition-all duration-200 hover:shadow-md cursor-pointer",
                agent.status === 'analyzing' || agent.status === 'generating' 
                  ? "ring-2 ring-blue-200 bg-blue-50" 
                  : "",
                agent.status === 'completed'
                  ? "ring-1 ring-green-200 bg-green-50"
                  : ""
              )}
              onClick={() => onAgentClick?.(agent.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 bg-${agent.phase}-100 rounded-lg`}>
                      <IconComponent className={`h-5 w-5 text-${agent.phase}-600`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{agent.name}</h4>
                      <p className="text-sm text-gray-600">{agent.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {getStatusIcon(agent.status)}
                    <Badge 
                      variant="outline" 
                      className={cn("text-xs", getStatusColor(agent.status))}
                    >
                      {getStatusText(agent.status)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Progress Bar */}
                {agent.progress > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progreso</span>
                      <span className="font-medium">{agent.progress}%</span>
                    </div>
                    <Progress 
                      value={agent.progress} 
                      className={`h-2 bg-${agent.phase}-100`}
                    />
                  </div>
                )}

                {/* Agent Metrics */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      {Math.round(agent.confidence * 100)}%
                    </p>
                    <p className="text-xs text-gray-600">Confianza</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      {agent.dataPoints}
                    </p>
                    <p className="text-xs text-gray-600">Datos</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      {agent.processingTime}
                    </p>
                    <p className="text-xs text-gray-600">Tiempo</p>
                  </div>
                </div>

                <Separator />

                {/* Last Update & Actions */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {agent.lastUpdate}
                  </span>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewDetails?.(agent.id);
                    }}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Detalles
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Active Processes Alert */}
      {activeAgents.length > 0 && (
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
              <div>
                <p className="font-medium text-blue-900">
                  Procesamiento Activo
                </p>
                <p className="text-sm text-blue-700">
                  {activeAgents.length} agente{activeAgents.length > 1 ? 's' : ''} 
                  {' '}trabajando en tu proyecto. Los resultados se actualizarán automáticamente.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}