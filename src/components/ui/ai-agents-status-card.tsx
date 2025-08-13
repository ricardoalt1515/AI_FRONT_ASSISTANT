"use client"

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Eye, 
  Wrench, 
  ShoppingCart, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  Activity,
  Zap,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface AgentStatus {
  id: string;
  name: string;
  description: string;
  status: 'completed' | 'working' | 'waiting' | 'pending';
  progress: number;
  icon: React.ReactNode;
  color: {
    background: string;
    border: string;
    text: string;
    icon: string;
  };
}

interface AIAgentsStatusCardProps {
  title?: string;
  description?: string;
  overallProgress?: number;
  estimatedTime?: string;
  className?: string;
  showDetailLink?: boolean;
  agents?: AgentStatus[];
}

const defaultAgents: AgentStatus[] = [
  {
    id: 'discovery',
    name: 'Discovery Agent',
    description: 'Análisis de requerimientos completado',
    status: 'completed',
    progress: 100,
    icon: <Eye className="h-4 w-4" />,
    color: {
      background: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: 'text-green-600'
    }
  },
  {
    id: 'engineering',
    name: 'Engineering Agent',
    description: 'Diseñando solución técnica...',
    status: 'working',
    progress: 75,
    icon: <Wrench className="h-4 w-4" />,
    color: {
      background: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: 'text-blue-600'
    }
  },
  {
    id: 'procurement',
    name: 'Procurement Agent',
    description: 'Esperando diseño técnico',
    status: 'waiting',
    progress: 0,
    icon: <ShoppingCart className="h-4 w-4" />,
    color: {
      background: 'bg-gray-50',
      border: 'border-gray-200',
      text: 'text-gray-600',
      icon: 'text-gray-400'
    }
  },
  {
    id: 'optimization',
    name: 'Optimization Agent',
    description: 'En cola de procesamiento',
    status: 'pending',
    progress: 0,
    icon: <TrendingUp className="h-4 w-4" />,
    color: {
      background: 'bg-gray-50',
      border: 'border-gray-200',
      text: 'text-gray-600',
      icon: 'text-gray-400'
    }
  }
];

const getStatusIcon = (status: AgentStatus['status']) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'working':
      return <Activity className="h-4 w-4 text-blue-600 animate-pulse" />;
    case 'waiting':
    case 'pending':
      return <Clock className="h-4 w-4 text-gray-400" />;
    default:
      return <Clock className="h-4 w-4 text-gray-400" />;
  }
};

const getStatusText = (status: AgentStatus['status']) => {
  switch (status) {
    case 'completed':
      return 'Completado';
    case 'working':
      return 'Trabajando';
    case 'waiting':
      return 'En espera';
    case 'pending':
      return 'Pendiente';
    default:
      return 'Desconocido';
  }
};

export function AIAgentsStatusCard({
  title = "Pipeline de Agentes IA",
  description = "4 agentes especializados trabajando en secuencia",
  overallProgress = 65,
  estimatedTime = "12 min restantes",
  className,
  showDetailLink = true,
  agents = defaultAgents
}: AIAgentsStatusCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="flex items-center gap-2 text-lg">
                {title}
                <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
                  AI-Powered
                </Badge>
              </CardTitle>
              <CardDescription className="mt-1">
                {description}
              </CardDescription>
            </div>
          </div>
          {showDetailLink && (
            <Button variant="outline" size="sm" asChild>
              <Link href="/ai-agents">
                Ver Detalles
                <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </Button>
          )}
        </div>
        
        {/* Overall Progress */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Progreso General</span>
            <div className="flex items-center gap-2">
              <span>{overallProgress}%</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{estimatedTime}</span>
            </div>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          {agents.map((agent, index) => (
            <div key={agent.id} className="relative">
              {/* Connection Line */}
              {index < agents.length - 1 && (
                <div className="absolute left-6 top-14 w-0.5 h-6 bg-border z-0" />
              )}
              
              <div className={cn(
                "relative z-10 flex items-center gap-4 p-4 rounded-lg border-2 transition-all duration-200",
                agent.color.background,
                agent.color.border,
                agent.status === 'working' && "shadow-md"
              )}>
                {/* Agent Icon */}
                <div className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2",
                  agent.color.background,
                  agent.color.border
                )}>
                  <div className={agent.color.icon}>
                    {agent.icon}
                  </div>
                </div>
                
                {/* Agent Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={cn("font-medium", agent.color.text)}>
                      {agent.name}
                    </h4>
                    {getStatusIcon(agent.status)}
                    <Badge 
                      variant={agent.status === 'completed' ? 'default' : 'outline'} 
                      className="text-xs"
                    >
                      {getStatusText(agent.status)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {agent.description}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="flex items-center gap-3">
                    <Progress 
                      value={agent.progress} 
                      className="flex-1 h-1.5" 
                    />
                    <span className="text-xs font-medium text-muted-foreground min-w-fit">
                      {agent.progress}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Action Buttons */}
        <div className="mt-6 flex items-center gap-3">
          <Button variant="outline" size="sm" asChild>
            <Link href="/onboarding">
              <Eye className="h-3 w-3 mr-1" />
              Nuevo Proyecto
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/demo">
              Ver Demo
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default AIAgentsStatusCard;