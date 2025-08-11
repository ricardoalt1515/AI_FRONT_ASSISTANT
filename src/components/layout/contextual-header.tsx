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

          {/* Core 3 KPIs Only */}
          <div className="flex items-center space-x-6 flex-shrink-0">
            {/* KPI 1: Status Badge */}
            <Badge className={cn("px-3 py-1.5", statusInfo.color)}>
              <StatusIcon className="h-3 w-3 mr-1.5" />
              {statusInfo.label}
            </Badge>

            {/* KPI 2: Progress - Tablet+ */}
            {deviceType !== 'mobile' && (
              <div className="flex items-center space-x-3">
                <div className="text-right min-w-0">
                  <div className="text-lg font-bold text-foreground">
                    {totalProgress}%
                  </div>
                  <div className="text-xs text-muted-foreground">Progreso</div>
                </div>
                <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300"
                    style={{ width: `${totalProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* KPI 3: Financial Impact - Desktop+ */}
            {(deviceType === 'desktop' || deviceType === 'large') && (
              <div className="flex items-center space-x-3">
                <DollarSign className="h-5 w-5 text-green-600" />
                <div className="min-w-0">
                  <div className="text-lg font-bold text-foreground">
                    {formatCapex(project.financial.capexOriginal)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {project.financial.savings ? 
                      `Ahorrado ${formatCapex(project.financial.savings)}` : 
                      'CAPEX Total'
                    }
                  </div>
                </div>
              </div>
            )}

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