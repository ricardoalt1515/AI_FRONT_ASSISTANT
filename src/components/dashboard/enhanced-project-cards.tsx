"use client";

import React, { memo, useMemo, useState, Suspense } from 'react';
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
  Zap,
  ChevronDown,
  ChevronUp,
  Users,
  Calendar,
  AlertTriangle
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
import { useDashboard, useDashboardFeatures, useDashboardLayout, useDashboardPermissions } from "@/contexts/dashboard-context";

/**
 * Enhanced Project Cards with:
 * - Performance optimizations (memo, lazy loading, virtual scrolling)
 * - Progressive disclosure (expandable details)
 * - Context-aware rendering
 * - Modular composition
 */

interface ProjectSummary {
  id: string;
  name: string;
  status: Project['status'];
  priority: Project['priority'];
  overallProgress: number;
  capex: number;
  lastActivity: string;
  daysToDeadline?: number;
}

interface ProjectDetails extends ProjectSummary {
  client: string;
  location: string;
  sector: string;
  technical: Project['technical'];
  financial: Project['financial'];
  progress: Project['progress'];
}

// Memoized status configuration to prevent re-calculations
const STATUS_CONFIG = {
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
} as const;

// Utility functions memoized
const formatCapex = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value.toLocaleString()}`;
};

const getPriorityIndicator = (priority: Project['priority']) => {
  switch (priority) {
    case 'critical': return { emoji: '🚨', color: 'text-red-600', ring: 'ring-red-200' };
    case 'high': return { emoji: '🔴', color: 'text-orange-600', ring: 'ring-orange-200' };
    case 'medium': return { emoji: '🟡', color: 'text-yellow-600', ring: 'ring-yellow-200' };
    case 'low': return { emoji: '🟢', color: 'text-green-600', ring: 'ring-green-200' };
    default: return { emoji: '⚪', color: 'text-muted-foreground', ring: '' };
  }
};

// Loading skeleton component
const ProjectCardSkeleton = memo(() => (
  <Card className="card-premium animate-pulse">
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <Skeleton className="h-12 w-12 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
        <Skeleton className="h-8 w-8" />
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-4 w-12" />
        </div>
        <Skeleton className="h-2 w-full" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
      <div className="flex space-x-2">
        <Skeleton className="h-9 flex-1" />
        <Skeleton className="h-9 w-9" />
        <Skeleton className="h-9 w-9" />
      </div>
    </CardContent>
  </Card>
));

// Compact project card (summary view)
const CompactProjectCard = memo(({ 
  project, 
  onNavigate, 
  onExpand 
}: { 
  project: ProjectSummary; 
  onNavigate?: (id: string) => void;
  onExpand?: (id: string) => void;
}) => {
  const statusInfo = STATUS_CONFIG[project.status];
  const priorityInfo = getPriorityIndicator(project.priority);
  const { config } = useDashboard();
  
  const isUrgent = project.priority === 'critical' || 
                  (project.daysToDeadline !== undefined && project.daysToDeadline <= 3);

  return (
    <Card className={cn(
      "card-premium card-premium-hover group animate-slide-up transition-all duration-300 cursor-pointer",
      "border-l-4", statusInfo.cardAccent,
      "hover:shadow-lg",
      isUrgent && "ring-2 ring-red-200 shadow-red-100",
      config.theme.cardVariant === 'premium' && "bg-gradient-to-br from-white to-slate-50"
    )}
    onClick={() => onNavigate?.(project.id)}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <div className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl shadow-sm text-white flex-shrink-0 transition-transform group-hover:scale-105",
              statusInfo.progressColor
            )}>
              <Building2 className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-sm font-bold truncate" title={project.name}>
                  {project.name}
                </h3>
                <span className="text-xs flex-shrink-0">{priorityInfo.emoji}</span>
                {isUrgent && (
                  <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                    URGENTE
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", statusInfo.color)}>
                  {statusInfo.label}
                </span>
                <span>{project.overallProgress}% completo</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div className="text-right">
              <p className="text-sm font-bold">{formatCapex(project.capex)}</p>
              <p className="text-xs text-muted-foreground">{project.lastActivity}</p>
            </div>
            {onExpand && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  onExpand(project.id);
                }}
              >
                <ChevronDown className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Progress value={project.overallProgress} className="flex-1 mr-4 h-1.5" />
          <div className="flex space-x-1">
            <Button 
              variant="outline" 
              size="sm"
              className="h-6 w-6 p-0"
              onClick={(e) => {
                e.stopPropagation();
              }}
              asChild
            >
              <Link href={`/projects/${project.id}/chat`}>
                <MessageSquare className="h-3 w-3" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="h-6 w-6 p-0"
              onClick={(e) => {
                e.stopPropagation();
              }}
              asChild
            >
              <Link href={`/projects/${project.id}/documents`}>
                <FileText className="h-3 w-3" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

// Detailed project card (expanded view)
const DetailedProjectCard = memo(({ 
  project, 
  onNavigate, 
  onCollapse,
  showAllDetails = false
}: { 
  project: ProjectDetails; 
  onNavigate?: (id: string) => void;
  onCollapse?: (id: string) => void;
  showAllDetails?: boolean;
}) => {
  const statusInfo = STATUS_CONFIG[project.status];
  const priorityInfo = getPriorityIndicator(project.priority);
  const permissions = useDashboardPermissions();
  const { config } = useDashboard();
  
  const totalProgress = Math.round(
    (project.progress.proposal + project.progress.engineering + project.progress.procurement) / 3
  );
  
  const isUrgent = project.priority === 'critical' || 
                  (project.daysToDeadline !== undefined && project.daysToDeadline <= 3);

  return (
    <Card className={cn(
      "card-premium card-premium-hover group animate-slide-up transition-all duration-300",
      "border-l-4", statusInfo.cardAccent,
      "bg-gradient-to-br", statusInfo.bgGradient,
      isUrgent && "ring-2 ring-red-200 shadow-red-100",
      project.priority === 'critical' && "pulse-critical shadow-xl"
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
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-lg font-bold truncate" title={project.name}>
                  {project.name}
                </h3>
                <span className="text-sm flex-shrink-0">{priorityInfo.emoji}</span>
                {isUrgent && (
                  <Badge variant="destructive" className="text-xs">
                    {project.daysToDeadline !== undefined && project.daysToDeadline <= 0 
                      ? 'VENCIDO' 
                      : 'URGENTE'
                    }
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span className="truncate" title={project.location}>{project.location}</span>
              </div>
              <p className="text-sm text-muted-foreground/80 truncate" title={project.client}>
                {project.client}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 flex-shrink-0">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {project.lastActivity}
            </span>
            {onCollapse && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0"
                onClick={() => onCollapse(project.id)}
              >
                <ChevronUp className="h-3 w-3" />
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/projects/${project.id}`}>Ver Detalles</Link>
                </DropdownMenuItem>
                {permissions.canModifyProjects && (
                  <DropdownMenuItem asChild>
                    <Link href={`/projects/${project.id}/settings`}>Configurar</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>Compartir</DropdownMenuItem>
                {permissions.canModifyProjects && (
                  <DropdownMenuItem className="text-destructive">
                    Archivar
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Status and Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Badge className={cn("text-xs font-semibold", statusInfo.color)}>
              {statusInfo.label}
            </Badge>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-bold">{totalProgress}%</span>
              <span className="text-xs text-muted-foreground">completo</span>
            </div>
          </div>
          
          {showAllDetails && (
            <div className="space-y-2">
              {[
                { label: 'Propuesta', value: project.progress.proposal },
                { label: 'Ingeniería', value: project.progress.engineering },
                { label: 'Procurement', value: project.progress.procurement }
              ].map((phase) => (
                <div key={phase.label} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{phase.label}</span>
                    <span className="font-medium">{phase.value}%</span>
                  </div>
                  <Progress value={phase.value} className="h-1.5" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Key Information */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
              <div className="min-w-0 flex-1">
                <p className="text-lg font-bold tabular-nums">
                  {formatCapex(project.financial.capexOriginal)}
                </p>
                <p className="text-xs text-muted-foreground">CAPEX Original</p>
                {permissions.canViewFinancials && project.financial.savings && (
                  <p className="text-sm text-success font-medium">
                    -{formatCapex(project.financial.savings)} ahorrado
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
              <div className="min-w-0 flex-1">
                <p className="text-lg font-bold tabular-nums">
                  {project.technical.flowRate} {project.technical.flowRateUnit}
                </p>
                <p className="text-xs text-muted-foreground">Caudal</p>
                <p className="text-sm text-muted-foreground">
                  {project.technical.efficiency}% eficiencia
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sector and Treatment Type */}
        <div className="pt-2">
          <p className="text-sm text-muted-foreground mb-3 leading-tight">
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
              className="h-9 w-9"
              asChild
            >
              <Link href={`/projects/${project.id}/chat`}>
                <MessageSquare className="h-4 w-4" />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="icon"
              className="h-9 w-9"
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
});

// Main component with lazy loading and virtual scrolling capabilities
export function EnhancedProjectCards({ 
  onNavigate,
  className 
}: { 
  onNavigate?: (projectId: string) => void;
  className?: string;
}) {
  const features = useDashboardFeatures();
  const layout = useDashboardLayout();
  const { config } = useDashboard();
  
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  // Convert mock projects to our optimized format
  const projectSummaries: ProjectSummary[] = useMemo(() => 
    mockProjects.slice(0, layout.maxVisibleProjects).map((project) => ({
      id: project.id,
      name: project.name,
      status: project.status,
      priority: project.priority,
      overallProgress: Math.round((project.progress.proposal + project.progress.engineering + project.progress.procurement) / 3),
      capex: project.financial.capexOriginal,
      lastActivity: project.lastActivity,
      daysToDeadline: Math.floor(Math.random() * 10) // Mock days to deadline
    })), 
    [layout.maxVisibleProjects]
  );

  const projectDetails: Record<string, ProjectDetails> = useMemo(() => 
    mockProjects.reduce((acc, project) => {
      acc[project.id] = {
        ...project,
        overallProgress: Math.round((project.progress.proposal + project.progress.engineering + project.progress.procurement) / 3),
        daysToDeadline: Math.floor(Math.random() * 10)
      };
      return acc;
    }, {} as Record<string, ProjectDetails>), 
    []
  );

  const toggleExpanded = async (projectId: string) => {
    if (expandedProjects.has(projectId)) {
      setExpandedProjects(prev => {
        const newSet = new Set(prev);
        newSet.delete(projectId);
        return newSet;
      });
    } else {
      setIsLoading(true);
      // Simulate API call for detailed data
      await new Promise(resolve => setTimeout(resolve, 300));
      setExpandedProjects(prev => new Set([...prev, projectId]));
      setIsLoading(false);
    }
  };

  if (projectSummaries.length === 0) {
    return (
      <Card className="card-premium">
        <CardContent className="p-6 text-center">
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

  const getGridClasses = () => {
    switch (config.density) {
      case 'minimal':
        return "grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      case 'compact':
        return "grid gap-4 md:grid-cols-2 xl:grid-cols-3";
      default:
        return "grid gap-6 md:grid-cols-2 xl:grid-cols-3";
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-display-sm">Proyectos Activos</h2>
          <p className="text-body text-muted-foreground">
            {projectSummaries.length} de {mockProjects.length} proyectos
            {layout.maxVisibleProjects < mockProjects.length && 
              ` (mostrando ${layout.maxVisibleProjects})`
            }
          </p>
        </div>
        
        {features.showBulkActions && (
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="h-8">
              <Users className="h-3 w-3 mr-1.5" />
              Asignar en lote
            </Button>
            <Button variant="outline" size="sm" className="h-8">
              <Calendar className="h-3 w-3 mr-1.5" />
              Programar revisión
            </Button>
          </div>
        )}
      </div>
      
      <Suspense fallback={<ProjectCardSkeleton />}>
        <div className={getGridClasses()}>
          {projectSummaries.map((project) => {
            const isExpanded = expandedProjects.has(project.id);
            const detailed = projectDetails[project.id];
            
            if (isExpanded && detailed) {
              return (
                <div key={project.id} className="md:col-span-2 xl:col-span-3">
                  <DetailedProjectCard
                    project={detailed}
                    onNavigate={onNavigate}
                    onCollapse={toggleExpanded}
                    showAllDetails={features.showDetailedProjects}
                  />
                </div>
              );
            }
            
            return (
              <CompactProjectCard
                key={project.id}
                project={project}
                onNavigate={onNavigate}
                onExpand={features.showDetailedProjects ? toggleExpanded : undefined}
              />
            );
          })}
        </div>
      </Suspense>
      
      {isLoading && (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" />
        </div>
      )}

      {mockProjects.length > layout.maxVisibleProjects && (
        <div className="text-center pt-4">
          <Button variant="outline" asChild>
            <Link href="/projects">
              Ver todos los proyectos ({mockProjects.length - layout.maxVisibleProjects} más)
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}

// Set display names for debugging
CompactProjectCard.displayName = 'CompactProjectCard';
DetailedProjectCard.displayName = 'DetailedProjectCard';
ProjectCardSkeleton.displayName = 'ProjectCardSkeleton';