"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Building2,
  DollarSign,
  Clock,
  Users,
  AlertTriangle,
  CheckCircle,
  Settings,
  Share,
  MoreHorizontal
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { mockProjects, type Project } from "@/lib/mock-data";
import { useDeviceType } from "@/hooks/use-mobile";
import Link from "next/link";

interface ContextualHeaderProps {
  projectId?: string;
  className?: string;
}

const statusConfig = {
  proposal: {
    color: "bg-amber-500 text-white",
    label: "Propuesta",
    icon: AlertTriangle
  },
  engineering: {
    color: "bg-emerald-500 text-white", 
    label: "Ingeniería",
    icon: CheckCircle
  },
  procurement: {
    color: "bg-purple-500 text-white",
    label: "Procurement", 
    icon: Settings
  },
  execution: {
    color: "bg-blue-500 text-white",
    label: "Ejecución",
    icon: CheckCircle
  },
  completed: {
    color: "bg-green-500 text-white",
    label: "Completado",
    icon: CheckCircle
  },
  paused: {
    color: "bg-red-500 text-white",
    label: "Pausado",
    icon: AlertTriangle
  }
};

const priorityConfig = {
  low: { color: "text-green-600", emoji: "🟢" },
  medium: { color: "text-yellow-600", emoji: "🟡" },
  high: { color: "text-orange-600", emoji: "🔴" },
  critical: { color: "text-red-600", emoji: "🚨" }
};

export function ContextualHeader({ projectId, className }: ContextualHeaderProps) {
  const deviceType = useDeviceType();
  
  if (!projectId) {
    return null;
  }

  const project = mockProjects.find(p => p.id === projectId);
  
  if (!project) {
    return null;
  }

  const statusInfo = statusConfig[project.status];
  const priorityInfo = priorityConfig[project.priority];
  const StatusIcon = statusInfo.icon;
  
  const formatCapex = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value.toLocaleString()}`;
  };

  const totalProgress = Math.round(
    (project.progress.proposal + project.progress.engineering + project.progress.procurement) / 3
  );

  return (
    <header className={cn(
      "bg-white border-b border-border sticky top-0 z-40 backdrop-blur-sm bg-white/95",
      className
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full">
        <div className="flex items-center justify-between h-16 min-w-0">
          {/* Project Info */}
          <div className="flex items-center space-x-4 container-safe">
            <div className="flex items-center space-x-3 min-w-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground flex-shrink-0">
                <Building2 className="h-5 w-5" />
              </div>
              <div className="container-safe">
                <h1 className="text-display-sm font-bold text-foreground overflow-safe">
                  {project.name}
                </h1>
                <div className="flex items-center space-x-2 overflow-hidden">
                  <span className="text-body-sm text-muted-foreground overflow-safe">
                    {project.client}
                  </span>
                  <span className="text-muted-foreground flex-shrink-0">•</span>
                  <span className="text-body-sm text-muted-foreground overflow-safe">
                    {project.location}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Status & Metrics */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            {/* Status Badge */}
            <div className="flex items-center space-x-2">
              <Badge className={cn("px-3 py-1", statusInfo.color)}>
                <StatusIcon className="h-3 w-3 mr-1" />
                {statusInfo.label}
              </Badge>
              
              {/* Priority Indicator - Desktop only */}
              {deviceType !== 'mobile' && (
                <span className={cn("text-sm font-medium", priorityInfo.color)}>
                  {priorityInfo.emoji} {project.priority.toUpperCase()}
                </span>
              )}
            </div>

            {/* Progress - Tablet+ */}
            {deviceType !== 'mobile' && (
              <>
                <Separator orientation="vertical" className="h-8" />
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <div className="text-sm font-semibold">
                      {totalProgress}% Completo
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Progreso General
                    </div>
                  </div>
                  <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${totalProgress}%` }}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Financial Info - Desktop+ */}
            {(deviceType === 'desktop' || deviceType === 'large') && (
              <>
                <Separator orientation="vertical" className="h-8" />
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-semibold">
                        {formatCapex(project.financial.capexOriginal)}
                      </div>
                      <div className="text-xs text-muted-foreground">CAPEX</div>
                    </div>
                  </div>
                  
                  {project.financial.savings && (
                    <div className="flex items-center space-x-2">
                      <div>
                        <div className="text-sm font-semibold text-success">
                          -{formatCapex(project.financial.savings)}
                        </div>
                        <div className="text-xs text-muted-foreground">Ahorrado</div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Team Info - Large screens */}
            {deviceType === 'large' && project.team.length > 0 && (
              <>
                <Separator orientation="vertical" className="h-8" />
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div className="flex -space-x-2">
                    {project.team.slice(0, 3).map((member, idx) => (
                      <div
                        key={idx}
                        className="h-8 w-8 rounded-full bg-primary/10 border-2 border-background flex items-center justify-center"
                        title={member.name}
                      >
                        <span className="text-xs font-medium text-primary">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    ))}
                    {project.team.length > 3 && (
                      <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">
                          +{project.team.length - 3}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Last Activity */}
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {project.lastActivity}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              {deviceType !== 'mobile' && (
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/projects/${project.id}/share`}>
                    <Share className="h-4 w-4 mr-1" />
                    Compartir
                  </Link>
                </Button>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/projects/${project.id}/settings`}>
                      <Settings className="h-4 w-4 mr-2" />
                      Configuración
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/projects/${project.id}/team`}>
                      <Users className="h-4 w-4 mr-2" />
                      Gestionar Equipo
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={`/projects/${project.id}/reports`}>
                      Generar Reporte
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Exportar Datos
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    Archivar Proyecto
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}