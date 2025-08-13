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

  return (
    <Card className="hover:shadow-lg transition-all duration-200 border-0 bg-white">
      <CardContent className="p-6">
        {/* 1. PROJECT NAME + LOCATION */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {project.name}
          </h3>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            {project.location}
          </div>
        </div>

        {/* 2. STATUS BADGE */}
        <div className="mb-4">
          <Badge className={cn("text-xs", statusInfo.color)}>
            {statusInfo.label}
          </Badge>
        </div>

        {/* 3. PROGRESS BAR */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Progreso</span>
            <span className="font-medium">{totalProgress}%</span>
          </div>
          <Progress value={totalProgress} className="h-2" />
        </div>

        {/* 4. CAPEX */}
        <div className="mb-6">
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 text-gray-400 mr-2" />
            <span className="text-lg font-bold text-gray-900">
              {formatCapex(project.financial.capexOriginal)}
            </span>
          </div>
          <span className="text-xs text-gray-500 ml-6">CAPEX Estimado</span>
        </div>

        {/* 5. PRIMARY ACTION */}
        <Button 
          onClick={() => onNavigate?.(project.id)}
          className="w-full"
          size="sm"
        >
          Continuar Trabajo
        </Button>

        {/* 6. OVERFLOW MENU (MINIMAL) */}
        <div className="mt-3 flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuItem asChild>
                <Link href={`/projects/${project.id}/chat`}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Chat
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/projects/${project.id}/documents`}>
                  <FileText className="h-4 w-4 mr-2" />
                  Documentos
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
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