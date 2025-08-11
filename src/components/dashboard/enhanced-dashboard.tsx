"use client";

import React, { Suspense, lazy, useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Grid3X3, 
  List, 
  BarChart3, 
  Settings,
  Download,
  RefreshCw,
  Eye,
  EyeOff
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  DashboardProvider, 
  useDashboard, 
  useDashboardFeatures, 
  useDashboardLayout, 
  useDashboardPermissions,
  type DashboardType 
} from "@/contexts/dashboard-context";

/**
 * Enhanced Dashboard with:
 * - Lazy loading for performance
 * - Code splitting by context
 * - Progressive disclosure
 * - Context-aware rendering
 * - Performance optimizations
 */

// Lazy load components for code splitting
const EnhancedMetrics = lazy(() => 
  import('./enhanced-metrics').then(module => ({ default: module.EnhancedMetrics }))
);

const EnhancedProjectCards = lazy(() => 
  import('./enhanced-project-cards').then(module => ({ default: module.EnhancedProjectCards }))
);

const EnhancedActionsRequired = lazy(() => 
  import('./enhanced-actions-required').then(module => ({ default: module.EnhancedActionsRequired }))
);

// Loading skeletons for better UX
const MetricsSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {[1, 2, 3].map(i => (
      <div key={i} className="card-premium animate-pulse">
        <div className="p-4">
          <div className="flex items-center space-x-3 mb-3">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-6 w-16" />
            </div>
          </div>
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    ))}
  </div>
);

const ProjectsSkeleton = () => (
  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
    {[1, 2, 3, 4, 5, 6].map(i => (
      <div key={i} className="card-premium animate-pulse">
        <div className="p-4">
          <div className="flex items-center space-x-3 mb-4">
            <Skeleton className="h-12 w-12 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <div className="space-y-3">
            <Skeleton className="h-2 w-full" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
            <div className="flex space-x-2">
              <Skeleton className="h-9 flex-1" />
              <Skeleton className="h-9 w-9" />
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const ActionsSkeleton = () => (
  <div className="card-premium animate-pulse">
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-8 w-24" />
      </div>
      <div className="space-y-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex items-center space-x-3 p-3 border rounded-lg">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-8 w-8 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-48" />
            </div>
            <Skeleton className="h-7 w-20" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

type ViewMode = "cards" | "list" | "analytics";

interface DashboardContentProps {
  onNavigateToProject?: (projectId: string) => void;
}

function DashboardContent({ onNavigateToProject }: DashboardContentProps) {
  const { config } = useDashboard();
  const features = useDashboardFeatures();
  const layout = useDashboardLayout();
  const permissions = useDashboardPermissions();
  const router = useRouter();
  
  const [viewMode, setViewMode] = useState<ViewMode>("cards");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleNavigateToProject = (projectId: string) => {
    onNavigateToProject?.(projectId);
    router.push(`/projects/${projectId}`);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  // Determine which sections to show based on context
  const visibleSections = useMemo(() => ({
    metrics: true,
    actions: features.showBulkActions,
    projects: true,
    analytics: features.showAnalytics && viewMode === "analytics"
  }), [features, viewMode]);

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Page Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="min-w-0 flex-1">
          <div className="flex items-center space-x-3">
            <h1 className="text-display-md whitespace-normal break-words">
              {config.title}
            </h1>
            <Badge 
              variant="secondary" 
              className={cn(
                "text-xs",
                config.type === 'executive' && "bg-blue-100 text-blue-800",
                config.type === 'project-manager' && "bg-green-100 text-green-800",
                config.type === 'engineering' && "bg-purple-100 text-purple-800",
                config.type === 'client-portal' && "bg-orange-100 text-orange-800"
              )}
            >
              {config.type.replace('-', ' ').toUpperCase()}
            </Badge>
          </div>
          <p className="text-body-lg mt-2 text-muted-foreground">
            {config.subtitle}
          </p>
        </div>
        
        <div className="flex flex-shrink-0 items-center space-x-3">
          {/* Advanced Controls */}
          {features.showAdvancedMetrics && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="h-8 text-xs"
            >
              {showAdvanced ? <EyeOff className="h-3 w-3 mr-1.5" /> : <Eye className="h-3 w-3 mr-1.5" />}
              <span className="hidden sm:inline">
                {showAdvanced ? 'Vista simple' : 'Vista avanzada'}
              </span>
              <span className="sm:hidden">
                {showAdvanced ? 'Simple' : 'Avanzada'}
              </span>
            </Button>
          )}

          {/* Refresh Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="h-8"
          >
            <RefreshCw className={cn("h-3 w-3 mr-1.5", isRefreshing && "animate-spin")} />
            <span className="hidden sm:inline">Actualizar</span>
          </Button>

          {/* Export Button */}
          {features.showAnalytics && (
            <Button variant="outline" size="sm" className="h-8 text-xs">
              <Download className="h-3 w-3 mr-1.5" />
              <span className="hidden sm:inline">Exportar</span>
            </Button>
          )}

          {/* Create Project Button */}
          {permissions.canCreateProjects && (
            <Button asChild className="whitespace-nowrap">
              <Link href="/projects/create">
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Nuevo Proyecto</span>
                <span className="sm:hidden">Nuevo</span>
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Metrics Section */}
      {visibleSections.metrics && (
        <section className={cn(
          "space-y-4",
          config.density === 'minimal' && "space-y-3",
          config.density === 'comfortable' && "space-y-6"
        )}>
          <Suspense fallback={<MetricsSkeleton />}>
            <EnhancedMetrics className="animate-fade-in" />
          </Suspense>
        </section>
      )}

      {/* Actions Required Section */}
      {visibleSections.actions && (
        <section>
          <Suspense fallback={<ActionsSkeleton />}>
            <EnhancedActionsRequired />
          </Suspense>
        </section>
      )}

      {/* Projects Section */}
      {visibleSections.projects && (
        <section className="space-y-4 md:space-y-6">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <h2 className="text-heading-xl min-w-0 flex-1 whitespace-normal break-words">
              Todos los Proyectos
            </h2>
            
            {/* View Toggle */}
            <div className="flex flex-shrink-0 items-center space-x-1 rounded-lg border p-1">
              {layout.enableGridView && (
                <Button
                  variant={viewMode === "cards" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("cards")}
                  className="h-8 px-2 sm:px-3"
                >
                  <Grid3X3 className="h-4 w-4" />
                  <span className="sr-only">Vista de tarjetas</span>
                </Button>
              )}
              
              {layout.enableListView && (
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="h-8 px-2 sm:px-3"
                >
                  <List className="h-4 w-4" />
                  <span className="sr-only">Vista de lista</span>
                </Button>
              )}
              
              {layout.enableAnalyticsView && (
                <Button
                  variant={viewMode === "analytics" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("analytics")}
                  className="h-8 px-2 sm:px-3"
                >
                  <BarChart3 className="h-4 w-4" />
                  <span className="sr-only">Vista de analytics</span>
                </Button>
              )}
            </div>
          </div>

          {/* Projects Content */}
          <div className="min-w-0">
            {viewMode === "cards" && (
              <Suspense fallback={<ProjectsSkeleton />}>
                <EnhancedProjectCards 
                  onNavigate={handleNavigateToProject}
                  className="animate-fade-in" 
                />
              </Suspense>
            )}
            
            {viewMode === "list" && (
              <div className="card-premium p-4 sm:p-6">
                <p className="text-center text-muted-foreground">
                  Vista de lista - Por implementar
                </p>
              </div>
            )}
            
            {viewMode === "analytics" && visibleSections.analytics && (
              <div className="card-premium p-4 sm:p-6">
                <p className="text-center text-muted-foreground">
                  Vista de analytics - Por implementar
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Advanced Settings Panel (if enabled) */}
      {showAdvanced && (
        <section className="space-y-4">
          <div className="card-premium p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Configuración Avanzada</h3>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/settings/dashboard">
                  <Settings className="h-4 w-4 mr-2" />
                  Personalizar
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-medium mb-1">Densidad de Vista</p>
                <p className="text-muted-foreground capitalize">{config.density}</p>
              </div>
              <div>
                <p className="font-medium mb-1">Layout de Métricas</p>
                <p className="text-muted-foreground capitalize">{layout.metricsLayout}</p>
              </div>
              <div>
                <p className="font-medium mb-1">Proyectos Visibles</p>
                <p className="text-muted-foreground">{layout.maxVisibleProjects}</p>
              </div>
              <div>
                <p className="font-medium mb-1">Variante de Tema</p>
                <p className="text-muted-foreground capitalize">{config.theme.cardVariant}</p>
              </div>
              <div>
                <p className="font-medium mb-1">Métricas Avanzadas</p>
                <p className="text-muted-foreground">{features.showAdvancedMetrics ? 'Habilitadas' : 'Deshabilitadas'}</p>
              </div>
              <div>
                <p className="font-medium mb-1">Tiempo Real</p>
                <p className="text-muted-foreground">{features.enableRealTime ? 'Activo' : 'Inactivo'}</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export interface EnhancedDashboardProps {
  dashboardType?: DashboardType;
  onNavigateToProject?: (projectId: string) => void;
  className?: string;
}

export function EnhancedDashboard({ 
  dashboardType = 'executive',
  onNavigateToProject,
  className 
}: EnhancedDashboardProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <DashboardProvider dashboardType={dashboardType}>
        <DashboardContent onNavigateToProject={onNavigateToProject} />
      </DashboardProvider>
    </div>
  );
}