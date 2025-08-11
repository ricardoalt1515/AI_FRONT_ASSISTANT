"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle2, 
  Clock, 
  Circle,
  FileText,
  Settings,
  ShoppingCart,
  DollarSign,
  Calendar,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Phase {
  id: string;
  name: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  status: "completed" | "in_progress" | "pending";
  progress: number;
  estimatedDays?: number;
}

interface ProjectTimelineProps {
  currentPhase: "proposal" | "engineering" | "procurement";
  progress: {
    proposal: number;
    engineering: number;
    procurement: number;
  };
  capex: number;
  estimatedDays: number;
  projectStatus?: string;
}

export function ProjectTimeline({ 
  currentPhase, 
  progress, 
  capex, 
  estimatedDays,
  projectStatus = "Excelente"
}: ProjectTimelineProps) {
  const phases: Phase[] = [
    {
      id: "proposal",
      name: "proposal", 
      label: "Propuesta",
      icon: FileText,
      status: progress.proposal === 100 ? "completed" : 
              currentPhase === "proposal" ? "in_progress" : "pending",
      progress: progress.proposal,
      estimatedDays: 3
    },
    {
      id: "engineering", 
      name: "engineering",
      label: "Ingeniería",
      icon: Settings,
      status: progress.engineering === 100 ? "completed" : 
              currentPhase === "engineering" ? "in_progress" : "pending",
      progress: progress.engineering,
      estimatedDays: 14
    },
    {
      id: "procurement",
      name: "procurement", 
      label: "Procurement",
      icon: ShoppingCart,
      status: progress.procurement === 100 ? "completed" : 
              currentPhase === "procurement" ? "in_progress" : "pending",
      progress: progress.procurement,
      estimatedDays: 7
    }
  ];

  const getStatusIcon = (phase: Phase) => {
    switch (phase.status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-success" />;
      case "in_progress":
        return <Clock className="h-5 w-5 text-warning" />;
      default:
        return <Circle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (phase: Phase) => {
    switch (phase.status) {
      case "completed":
        return "text-success";
      case "in_progress":
        return "text-warning";
      default:
        return "text-muted-foreground";
    }
  };

  const getProgressColor = (phase: Phase) => {
    switch (phase.status) {
      case "completed":
        return "bg-success";
      case "in_progress":
        return "bg-warning";
      default:
        return "bg-muted";
    }
  };

  const getConnectionProgress = (index: number) => {
    if (index === phases.length - 1) return 0;
    
    const currentPhaseData = phases[index];
    const nextPhase = phases[index + 1];
    
    if (currentPhaseData.status === "completed") return 100;
    if (currentPhaseData.status === "in_progress") {
      return Math.min(currentPhaseData.progress, 100);
    }
    return 0;
  };

  return (
    <Card className="card-premium">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <span>Timeline del Proyecto</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Timeline Visual */}
        <div className="relative">
          <div className="flex items-center justify-between">
            {phases.map((phase, index) => (
              <div
                key={phase.id}
                className="group flex items-center motion-safe:transition motion-safe:duration-200 motion-safe:ease-out hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:transform-none"
              >
                {/* Phase Step */}
                <div className="flex flex-col items-center space-y-3">
                  <div className="relative">
                    <div className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all motion-safe:duration-200 motion-safe:ease-out hover:shadow-sm group-hover:ring-2 group-hover:ring-primary/20 motion-reduce:transition-none",
                      phase.status === "completed" 
                        ? "border-success bg-success/10" 
                        : phase.status === "in_progress"
                        ? "border-warning bg-warning/10"
                        : "border-muted bg-background"
                    )}>
                      {getStatusIcon(phase)}
                    </div>
                    
                    {/* Progress indicator for active phase */}
                    {phase.status === "in_progress" && phase.progress > 0 && (
                      <div className="absolute -bottom-1 -right-1">
                        <div className="h-4 w-4 rounded-full bg-background border flex items-center justify-center">
                          <span className="text-xs font-medium text-warning">
                            {phase.progress}%
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center">
                    <p className={cn("font-medium text-sm", getStatusColor(phase))}>
                      {phase.label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {phase.status === "completed" ? "Completa" :
                       phase.status === "in_progress" ? `${phase.progress}%` :
                       phase.estimatedDays ? `${phase.estimatedDays} días` : "Pendiente"}
                    </p>
                  </div>
                </div>

                {/* Connection Line */}
                {index < phases.length - 1 && (
                  <div className="flex-1 px-4">
                    <div className="relative h-1 bg-muted rounded-full mx-4">
                      <div 
                        className="absolute top-0 left-0 h-full bg-success rounded-full transition-all duration-700 ease-out"
                        style={{ 
                          width: `${getConnectionProgress(index)}%` 
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Progress Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {phases.map((phase) => (
            <Card key={phase.id} className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{phase.label}</span>
                  <Badge variant={
                    phase.status === "completed" ? "default" :
                    phase.status === "in_progress" ? "secondary" : "outline"
                  }>
                    {phase.status === "completed" ? "✓" :
                     phase.status === "in_progress" ? `${phase.progress}%` : "○"}
                  </Badge>
                </div>
                <Progress 
                  value={phase.progress} 
                  className="h-2"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {phase.status === "completed" ? "Fase completada" :
                   phase.status === "in_progress" ? "En progreso..." :
                   `Estimado: ${phase.estimatedDays} días`}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Project Summary */}
        <div className="flex items-center justify-between text-sm bg-muted/30 p-4 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">CAPEX: ${capex.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Estimado: {estimatedDays} días</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground">Estado:</span>
            <Badge variant="outline" className="text-success border-success">
              {projectStatus}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}