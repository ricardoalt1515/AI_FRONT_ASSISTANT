'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  ChevronDown,
  ChevronRight,
  Play,
  Pause,
  RefreshCw,
  CheckCircle,
  Circle,
  Clock,
  AlertTriangle,
  Zap,
  Database,
  Wrench,
  ShoppingCart,
  TrendingUp,
  Activity,
  Brain,
  Eye,
  Download
} from 'lucide-react';
import type { PremiumAIAgentsFlowProps, AIAgent } from '@/types/premium';
import { cn } from '@/lib/utils';

const PremiumAIAgentsFlow = ({ 
  workflow, 
  onAgentClick, 
  onRetry, 
  expandedAgent, 
  className 
}: PremiumAIAgentsFlowProps) => {
  const [expandedAgents, setExpandedAgents] = useState<Set<string>>(new Set([expandedAgent].filter(Boolean)));

  const toggleAgent = (agentId: string) => {
    const newExpanded = new Set(expandedAgents);
    if (newExpanded.has(agentId)) {
      newExpanded.delete(agentId);
    } else {
      newExpanded.add(agentId);
    }
    setExpandedAgents(newExpanded);
    onAgentClick?.(agentId);
  };

  const getAgentIcon = (role: AIAgent['role']) => {
    switch (role) {
      case 'discovery':
        return <Eye className="h-5 w-5" />;
      case 'engineering':
        return <Wrench className="h-5 w-5" />;
      case 'procurement':
        return <ShoppingCart className="h-5 w-5" />;
      case 'optimization':
        return <TrendingUp className="h-5 w-5" />;
      default:
        return <Brain className="h-5 w-5" />;
    }
  };

  const getStatusIcon = (status: AIAgent['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'working':
        return <Activity className="h-4 w-4 text-blue-600 animate-pulse" />;
      case 'waiting':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: AIAgent['status']) => {
    switch (status) {
      case 'completed':
        return 'border-green-500 bg-green-50';
      case 'working':
        return 'border-blue-500 bg-blue-50';
      case 'waiting':
        return 'border-yellow-500 bg-yellow-50';
      case 'error':
        return 'border-red-500 bg-red-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  const getStatusText = (status: AIAgent['status']) => {
    switch (status) {
      case 'completed':
        return 'Completado';
      case 'working':
        return 'Trabajando';
      case 'waiting':
        return 'En espera';
      case 'error':
        return 'Error';
      default:
        return 'Inactivo';
    }
  };

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 75) return 'text-blue-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getOverallStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'in_progress':
        return 'text-blue-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Workflow Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Zap className="h-6 w-6 text-blue-600" />
            Pipeline de Agentes IA
            <Badge variant="outline" className={getOverallStatusColor(workflow.status)}>
              {workflow.status === 'in_progress' ? 'En Proceso' : 
               workflow.status === 'completed' ? 'Completado' : 
               workflow.status === 'error' ? 'Error' : 'No Iniciado'}
            </Badge>
          </CardTitle>
          <CardDescription>
            Proyecto: {workflow.projectId} • Iniciado: {new Date(workflow.createdAt).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{workflow.overallProgress}%</div>
              <div className="text-sm text-muted-foreground">Progreso Total</div>
            </div>
            <div className="text-center">
              <div className={cn("text-2xl font-bold", getConfidenceColor(workflow.overallConfidence))}>
                {workflow.overallConfidence}%
              </div>
              <div className="text-sm text-muted-foreground">Confianza</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{workflow.estimatedTotal}min</div>
              <div className="text-sm text-muted-foreground">Tiempo Estimado</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {workflow.agents.filter(a => a.status === 'completed').length}/{workflow.agents.length}
              </div>
              <div className="text-sm text-muted-foreground">Agentes Completados</div>
            </div>
          </div>

          {/* Overall Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progreso del Pipeline</span>
              <span>{workflow.overallProgress}%</span>
            </div>
            <Progress value={workflow.overallProgress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Agents Flow */}
      <div className="space-y-4">
        {workflow.agents.map((agent, index) => (
          <div key={agent.id} className="relative">
            {/* Connection Line */}
            {index < workflow.agents.length - 1 && (
              <div className="absolute left-6 top-16 w-0.5 h-8 bg-border z-0" />
            )}

            <Card className={cn("relative z-10 transition-all duration-200", getStatusColor(agent.status))}>
              <Collapsible 
                open={expandedAgents.has(agent.id)}
                onOpenChange={() => toggleAgent(agent.id)}
              >
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-background/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-full border-2 flex items-center justify-center",
                        getStatusColor(agent.status)
                      )}>
                        {getAgentIcon(agent.role)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{agent.name}</CardTitle>
                          {getStatusIcon(agent.status)}
                          <Badge variant="outline" className="text-xs">
                            {getStatusText(agent.status)}
                          </Badge>
                        </div>
                        <CardDescription className="mt-1">
                          {agent.description}
                        </CardDescription>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <Progress value={agent.progress} className="w-20 h-2" />
                            <span className="text-sm font-medium min-w-fit">{agent.progress}%</span>
                          </div>
                          {agent.confidence > 0 && (
                            <div className="text-xs text-muted-foreground mt-1">
                              Confianza: <span className={getConfidenceColor(agent.confidence)}>
                                {agent.confidence}%
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          {agent.status === 'error' && onRetry && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                onRetry(agent.id);
                              }}
                            >
                              <RefreshCw className="h-3 w-3" />
                            </Button>
                          )}
                          {expandedAgents.has(agent.id) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Current Task Preview */}
                    {agent.currentTask && !expandedAgents.has(agent.id) && (
                      <div className="mt-3 p-3 bg-background rounded-lg">
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {agent.currentTask}
                          </span>
                        </div>
                      </div>
                    )}
                  </CardHeader>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <Separator className="mb-4" />

                    <div className="space-y-6">
                      {/* Current Task Detail */}
                      {agent.currentTask && (
                        <div>
                          <h4 className="text-sm font-medium mb-2">Tarea Actual</h4>
                          <div className="p-3 bg-background rounded-lg border">
                            <div className="flex items-start gap-2">
                              <Activity className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{agent.currentTask}</span>
                            </div>
                            {agent.estimatedCompletion && (
                              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>Estimado: {new Date(agent.estimatedCompletion).toLocaleTimeString()}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Output */}
                      {agent.output && (
                        <div>
                          <h4 className="text-sm font-medium mb-2">Resultado</h4>
                          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-green-800">{agent.output}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Dependencies */}
                      {agent.dependencies && agent.dependencies.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium mb-2">Dependencias</h4>
                          <div className="flex flex-wrap gap-2">
                            {agent.dependencies.map((depId) => {
                              const depAgent = workflow.agents.find(a => a.id === depId);
                              return depAgent ? (
                                <Badge key={depId} variant="outline" className="text-xs">
                                  {depAgent.name}
                                  {depAgent.status === 'completed' && (
                                    <CheckCircle className="h-3 w-3 ml-1 text-green-600" />
                                  )}
                                </Badge>
                              ) : null;
                            })}
                          </div>
                        </div>
                      )}

                      {/* Metrics */}
                      {agent.metrics && (
                        <div>
                          <h4 className="text-sm font-medium mb-2">Métricas de Rendimiento</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {agent.metrics.processing_time !== undefined && (
                              <div className="text-center p-3 bg-background rounded-lg border">
                                <div className="text-lg font-bold text-blue-600">
                                  {formatDuration(agent.metrics.processing_time)}
                                </div>
                                <div className="text-xs text-muted-foreground">Tiempo</div>
                              </div>
                            )}
                            {agent.metrics.accuracy_score !== undefined && (
                              <div className="text-center p-3 bg-background rounded-lg border">
                                <div className={cn("text-lg font-bold", getConfidenceColor(agent.metrics.accuracy_score))}>
                                  {agent.metrics.accuracy_score}%
                                </div>
                                <div className="text-xs text-muted-foreground">Precisión</div>
                              </div>
                            )}
                            {agent.metrics.data_points_analyzed !== undefined && (
                              <div className="text-center p-3 bg-background rounded-lg border">
                                <div className="text-lg font-bold text-purple-600">
                                  {agent.metrics.data_points_analyzed}
                                </div>
                                <div className="text-xs text-muted-foreground">Datos</div>
                              </div>
                            )}
                            {agent.metrics.recommendations_generated !== undefined && (
                              <div className="text-center p-3 bg-background rounded-lg border">
                                <div className="text-lg font-bold text-green-600">
                                  {agent.metrics.recommendations_generated}
                                </div>
                                <div className="text-xs text-muted-foreground">Recomendaciones</div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Last Update */}
                      <div className="text-xs text-muted-foreground border-t pt-2">
                        Última actualización: {new Date(agent.lastUpdate).toLocaleString()}
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          </div>
        ))}
      </div>

      {/* Timeline */}
      {workflow.timeline.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-gray-600" />
              Línea de Tiempo
            </CardTitle>
            <CardDescription>
              Historial de eventos del pipeline
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workflow.timeline.slice().reverse().map((event, index) => {
                const agent = workflow.agents.find(a => a.id === event.agentId);
                return (
                  <div key={event.id} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{agent?.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {event.event === 'started' ? 'Iniciado' :
                           event.event === 'completed' ? 'Completado' :
                           event.event === 'error' ? 'Error' :
                           event.event === 'waiting' ? 'En espera' : 'Reanudado'}
                        </Badge>
                        {event.duration && (
                          <span className="text-xs text-muted-foreground">
                            {formatDuration(event.duration)}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{event.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(event.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PremiumAIAgentsFlow;