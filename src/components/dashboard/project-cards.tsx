"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Building2,
  MessageSquare,
  FileText,
  MoreVertical,
  Clock,
  DollarSign,
  MapPin,
  Zap
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { mockProjects, type Project } from "@/lib/mock-data";

// Use the Project interface from mock-data
// interface Project is imported from mock-data

const statusConfig = {
  proposal: {
    color: "badge-status-proposal",
    label: "Propuesta",
    progressColor: "bg-gradient-to-r from-amber-400 to-orange-400",
    cardAccent: "border-l-amber-400",
    bgGradient: "from-amber-50 to-orange-50"
  },
  engineering: {
    color: "badge-status-engineering", 
    label: "Ingeniería",
    progressColor: "bg-gradient-to-r from-emerald-400 to-green-400",
    cardAccent: "border-l-emerald-400",
    bgGradient: "from-emerald-50 to-green-50"
  },
  procurement: {
    color: "badge-status-procurement",
    label: "Procurement", 
    progressColor: "bg-gradient-to-r from-purple-400 to-indigo-400",
    cardAccent: "border-l-purple-400",
    bgGradient: "from-purple-50 to-indigo-50"
  },
  execution: {
    color: "bg-blue-500 text-white",
    label: "Ejecución",
    progressColor: "bg-gradient-to-r from-blue-400 to-cyan-400",
    cardAccent: "border-l-blue-400",
    bgGradient: "from-blue-50 to-cyan-50"
  },
  completed: {
    color: "bg-green-500 text-white",
    label: "Completado",
    progressColor: "bg-gradient-to-r from-green-500 to-emerald-500",
    cardAccent: "border-l-green-400",
    bgGradient: "from-green-50 to-emerald-50"
  },
  paused: {
    color: "status-error",
    label: "Pausado",
    progressColor: "bg-gradient-to-r from-red-400 to-rose-400",
    cardAccent: "border-l-red-400",
    bgGradient: "from-red-50 to-rose-50"
  }
};

interface ProjectCardProps {
  project: Project;
  onNavigate?: (projectId: string) => void;
}

function ProjectCard({ project, onNavigate }: ProjectCardProps) {
  const statusInfo = statusConfig[project.status];
  const totalProgress = Math.round((project.progress.proposal + project.progress.engineering + project.progress.procurement) / 3);
  
  const formatCapex = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value.toLocaleString()}`;
  };
  
  const getPriorityIndicator = () => {
    switch (project.priority) {
      case 'high': return '🔴';
      case 'critical': return '🚨';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  return (
    <Card className={cn(
      "card-premium card-premium-hover group animate-slide-up transition-all duration-300",
      "border-l-4", statusInfo.cardAccent,
      "bg-gradient-to-br", statusInfo.bgGradient,
      project.priority === 'high' && "shadow-lg ring-1 ring-orange-200",
      project.priority === 'critical' && "pulse-critical shadow-xl ring-2 ring-red-200"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl shadow-sm text-white transition-transform group-hover:scale-105",
              statusInfo.progressColor
            )}>
              <Building2 className="h-6 w-6" />
            </div>
            <div className="container-safe">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-display-sm font-bold whitespace-normal break-words sm:truncate" title={project.name}>{project.name}</h3>
                <span className="text-sm flex-shrink-0">{getPriorityIndicator()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                <span className="text-body-sm text-muted-foreground whitespace-normal break-words sm:truncate" title={project.location}>{project.location}</span>
              </div>
              <p className="text-body-sm text-muted-foreground/80 mt-1 whitespace-normal break-words sm:truncate" title={project.client}>{project.client}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <span className="text-body-sm text-muted-foreground hidden sm:block">{project.lastActivity}</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/50">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/projects/${project.id}`}>Ver Detalles</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/projects/${project.id}/settings`}>Configurar</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Compartir</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  Archivar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Status and Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className={cn("inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold", statusInfo.color)}>
              {statusInfo.label}
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-bold">{totalProgress}%</span>
              <span className="text-xs text-muted-foreground">completo</span>
            </div>
          </div>
          
          {/* Phase Progress Bars */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Propuesta</span>
              <span className="font-medium">{project.progress.proposal}%</span>
            </div>
            <Progress value={project.progress.proposal} className="h-1.5" />
            
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Ingeniería</span>
              <span className="font-medium">{project.progress.engineering}%</span>
            </div>
            <Progress value={project.progress.engineering} className="h-1.5" />
            
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Procurement</span>
              <span className="font-medium">{project.progress.procurement}%</span>
            </div>
            <Progress value={project.progress.procurement} className="h-1.5" />
          </div>
        </div>

        {/* Technical & Financial Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
              <div className="container-safe">
                <p className="text-display-sm font-bold whitespace-nowrap tabular-nums" title={String(project.financial.capexOriginal)}>{formatCapex(project.financial.capexOriginal)}</p>
                <p className="text-caption">CAPEX Original</p>
                {project.financial.savings && (
                  <p className="text-body-sm text-success font-medium whitespace-nowrap">-{formatCapex(project.financial.savings)} ahorrado</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
              <div className="container-safe">
                <p className="text-display-sm font-bold whitespace-nowrap tabular-nums">{project.technical.flowRate} {project.technical.flowRateUnit}</p>
                <p className="text-caption">Caudal</p>
                <p className="text-body-sm text-muted-foreground whitespace-nowrap">{project.technical.efficiency}% eficiencia</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <p className="text-body text-muted-foreground mb-3 leading-tight overflow-safe-wrap">
            {project.sector} • {project.technical.treatmentType}
          </p>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button 
              onClick={() => onNavigate?.(project.id)}
              className={cn(
                "flex-1 h-9 text-white shadow-sm transition-all duration-200",
                statusInfo.progressColor
              )}
              size="sm"
            >
              <Zap className="h-4 w-4 mr-2" />
              {project.status === "proposal" ? "Continuar Chat" : 
               project.status === "engineering" ? "Ver Ingeniería" :
               project.status === "procurement" ? "Ver Procurement" : "Ver Proyecto"}
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              className="h-9 w-9 hover:bg-white/80"
              asChild
            >
              <Link href={`/projects/${project.id}/chat`}>
                <MessageSquare className="h-4 w-4" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              className="h-9 w-9 hover:bg-white/80"
              asChild
            >
              <Link href={`/projects/${project.id}/documents`}>
                <FileText className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ProjectCards({ onNavigate }: { onNavigate?: (projectId: string) => void }) {
  // Use realistic mock data
  const projects = mockProjects;

  if (projects.length === 0) {
    return (
      <Card className="card-premium">
        <CardContent className="section-padding text-center">
          <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-heading-md mb-2">No hay proyectos</h3>
          <p className="text-body text-muted-foreground mb-4">
            Crea tu primer proyecto de tratamiento de agua
          </p>
          <Button asChild>
            <Link href="/projects/create">
              <Zap className="h-4 w-4 mr-2" />
              Nuevo Proyecto
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-display-sm">Proyectos Activos</h2>
          <p className="text-body text-muted-foreground">
            {projects.length} {projects.length === 1 ? 'proyecto' : 'proyectos'} en desarrollo
          </p>
        </div>
        <Button asChild>
          <Link href="/projects/create">
            <Zap className="h-4 w-4 mr-2" />
            Nuevo Proyecto
          </Link>
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </div>
  );
}