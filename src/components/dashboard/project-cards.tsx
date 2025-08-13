"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
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
import { motion } from "framer-motion";

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
  const statusInfo = statusConfig[project.status] || {
    color: "bg-gray-500 text-white",
    label: "Desconocido",
    progressColor: "bg-gradient-to-r from-gray-400 to-gray-500",
    cardAccent: "border-l-gray-400",
    bgGradient: "from-gray-50 to-gray-50"
  };
  const totalProgress = Math.round((project.progress.proposal + project.progress.engineering + project.progress.procurement) / 3);
  
  const formatCapex = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value.toLocaleString()}`;
  };

  return (
    <Card
      role="article"
      aria-labelledby={`project-title-${project.id}`}
      className={cn(
        "bg-white border rounded-xl shadow-sm transition-transform duration-200",
        "hover:shadow-md hover:translate-y-[1px]",
        "focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 focus-within:ring-offset-background"
      )}
    >
      <CardContent className="p-6">
        {/* 1. PROJECT NAME + LOCATION */}
        <div className="mb-4">
          <h3 id={`project-title-${project.id}`} className="text-lg font-semibold text-gray-900 mb-1">
            {project.name}
          </h3>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            {project.location}
          </div>
        </div>

        {/* 2. STATUS BADGE */}
        <div className="mb-4">
          <Badge aria-label={`Estado: ${statusInfo.label}`} className={cn("text-xs", statusInfo.color)}>
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
          aria-label={`Abrir proyecto ${project.name}`}
          onClick={() => onNavigate?.(project.id)}
          className="w-full focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          size="sm"
        >
          Continuar Trabajo
        </Button>

        {/* 6. OVERFLOW MENU (MINIMAL) */}
        <div className="mt-3 flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-label="Más acciones" variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
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

export function ProjectCardSkeleton() {
  return (
    <Card className="bg-white border rounded-xl">
      <CardContent className="p-6 space-y-4">
        <div>
          <Skeleton className="h-5 w-3/4" />
          <div className="mt-2 flex items-center space-x-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
        <div>
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-10" />
          </div>
          <Skeleton className="h-2 w-full" />
        </div>
        <div>
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-3 w-24 mt-2" />
        </div>
        <Skeleton className="h-9 w-full" />
      </CardContent>
    </Card>
  );
}

export function ProjectCardsSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-7 w-44" />
          <Skeleton className="h-4 w-64 mt-2" />
        </div>
        <Skeleton className="h-9 w-32" />
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: count }).map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

interface ProjectCardsProps {
  onNavigate?: (projectId: string) => void;
  showHeader?: boolean;
  isLoading?: boolean;
  limit?: number;
}

export function ProjectCards({ onNavigate, showHeader = true, isLoading = false, limit }: ProjectCardsProps) {
  // Use realistic mock data
  const projects = mockProjects;

  if (isLoading) {
    return <ProjectCardsSkeleton />;
  }

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
      {showHeader && (
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
      )}
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {(limit ? projects.slice(0, limit) : projects).map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: idx * 0.03 }}
          >
            <ProjectCard
              project={project}
              onNavigate={onNavigate}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}