"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Clock, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/workspace";

interface ProjectTimelineProps {
  project: Project;
}

export function ProjectTimeline({ project }: ProjectTimelineProps) {
  const phases = [
    { 
      key: 'discovery' as const, 
      label: 'Análisis', 
      icon: CheckCircle2,
      description: 'Extracción de requisitos'
    },
    { 
      key: 'proposal' as const, 
      label: 'Propuesta', 
      icon: CheckCircle2,
      description: 'Documento técnico'
    },
    { 
      key: 'engineering' as const, 
      label: 'Ingeniería', 
      icon: Clock,
      description: 'P&IDs y especificaciones'
    },
    { 
      key: 'procurement' as const, 
      label: 'Procurement', 
      icon: Circle,
      description: 'Selección de equipos'
    },
  ];

  const getPhaseStatus = (phaseKey: typeof phases[0]['key']) => {
    const progress = project.progress[phaseKey];
    const isCurrentPhase = project.phase === phaseKey;
    
    if (progress === 100) return 'completed';
    if (isCurrentPhase && progress > 0) return 'in_progress';
    if (isCurrentPhase) return 'current';
    if (progress === 0) return 'pending';
    return 'partial';
  };

  const getPhaseIcon = (phaseKey: typeof phases[0]['key']) => {
    const status = getPhaseStatus(phaseKey);
    const progress = project.progress[phaseKey];
    
    switch (status) {
      case 'completed':
        return CheckCircle2;
      case 'in_progress':
        return Loader2;
      case 'current':
        return Clock;
      default:
        return Circle;
    }
  };

  const getConnectionProgress = (fromPhase: typeof phases[0]['key']) => {
    const fromProgress = project.progress[fromPhase];
    return fromProgress === 100 ? 100 : 0;
  };

  const calculateOverallProgress = () => {
    const totalProgress = Object.values(project.progress).reduce((sum, progress) => sum + progress, 0);
    return Math.round(totalProgress / 4);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Timeline del Proyecto</span>
          <Badge variant="outline" className="text-sm">
            {calculateOverallProgress()}% Completado
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 lg:space-y-6">
        {/* Timeline responsive */}
        <div className="flex items-center justify-between overflow-x-auto pb-2">
          {phases.map((phase, index) => {
            const status = getPhaseStatus(phase.key);
            const Icon = getPhaseIcon(phase.key);
            const progress = project.progress[phase.key];
            
            return (
              <div key={phase.key} className="flex items-center flex-shrink-0">
                {/* Phase Circle */}
                <div className="flex flex-col items-center">
                  <div className={cn(
                    "w-10 lg:w-12 h-10 lg:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                    status === 'completed' 
                      ? "bg-green-500 border-green-500 text-white"
                      : status === 'in_progress'
                      ? "bg-blue-500 border-blue-500 text-white"
                      : status === 'current'
                      ? "bg-blue-100 border-blue-500 text-blue-600"
                      : "bg-gray-100 border-gray-300 text-gray-400"
                  )}>
                    <Icon className={cn(
                      "h-4 lg:h-5 w-4 lg:w-5",
                      status === 'in_progress' && "animate-spin"
                    )} />
                  </div>
                  
                  {/* Phase Label */}
                  <div className="mt-1 lg:mt-2 text-center min-w-0">
                    <p className={cn(
                      "text-xs lg:text-sm font-medium truncate",
                      status === 'completed' || status === 'in_progress' || status === 'current'
                        ? "text-gray-900"
                        : "text-gray-500"
                    )}>
                      {phase.label}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 hidden lg:block">
                      {phase.description}
                    </p>
                    {progress > 0 && (
                      <p className="text-xs font-medium mt-1">
                        {progress}%
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Connection Line */}
                {index < phases.length - 1 && (
                  <div className="w-16 lg:w-24 h-1 bg-gray-200 mx-2 lg:mx-4 relative">
                    <div 
                      className="h-full bg-blue-500 transition-all duration-500"
                      style={{ 
                        width: `${getConnectionProgress(phase.key)}%` 
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress Summary */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-medium">Progreso General</span>
            <span className="font-semibold">{calculateOverallProgress()}%</span>
          </div>
          <Progress value={calculateOverallProgress()} className="h-2" />
        </div>
        
        {/* Project Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4 text-sm">
          <div className="text-center">
            <span className="text-gray-600 text-xs lg:text-sm">CAPEX Estimado</span>
            <p className="font-semibold text-base lg:text-lg">
              ${project.capex.toLocaleString()}
            </p>
          </div>
          <div className="text-center">
            <span className="text-gray-600 text-xs lg:text-sm">Ubicación</span>
            <p className="font-semibold text-sm lg:text-base truncate">
              {project.location}
            </p>
          </div>
          <div className="text-center">
            <span className="text-gray-600 text-xs lg:text-sm">Sector</span>
            <p className="font-semibold text-sm lg:text-base truncate">
              {project.sector.split(' - ')[0]}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}