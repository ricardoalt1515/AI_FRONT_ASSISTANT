"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare,
  FileText,
  Settings,
  Zap,
  Plus,
  BarChart3,
  ShoppingCart,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockProjects, mockActionsRequired } from "@/lib/mock-data";
import { useDeviceType } from "@/hooks/use-mobile";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface ContextualFABProps {
  projectId?: string;
  className?: string;
}

const fabActions = {
  dashboard: [
    {
      id: 'new-project',
      label: 'Nuevo Proyecto',
      icon: Plus,
      href: '/projects/create',
      color: 'bg-primary text-primary-foreground hover:bg-primary/90',
      urgent: false
    }
  ],
  proposal: [
    {
      id: 'continue-chat',
      label: 'Continuar Chat',
      icon: MessageSquare,
      href: (projectId: string) => `/projects/${projectId}/chat`,
      color: 'bg-blue-600 text-white hover:bg-blue-700',
      urgent: true
    },
    {
      id: 'generate-proposal',
      label: 'Generar Propuesta',
      icon: FileText,
      href: (projectId: string) => `/projects/${projectId}/proposal`,
      color: 'bg-amber-600 text-white hover:bg-amber-700',
      urgent: false
    }
  ],
  engineering: [
    {
      id: 'review-engineering',
      label: 'Revisar Ingeniería',
      icon: Settings,
      href: (projectId: string) => `/projects/${projectId}/engineering`,
      color: 'bg-emerald-600 text-white hover:bg-emerald-700',
      urgent: false
    },
    {
      id: 'view-progress',
      label: 'Ver Progreso',
      icon: BarChart3,
      href: (projectId: string) => `/projects/${projectId}/progress`,
      color: 'bg-green-600 text-white hover:bg-green-700',
      urgent: false
    }
  ],
  procurement: [
    {
      id: 'select-equipment',
      label: 'Seleccionar Equipos',
      icon: ShoppingCart,
      href: (projectId: string) => `/projects/${projectId}/procurement`,
      color: 'bg-purple-600 text-white hover:bg-purple-700',
      urgent: true
    },
    {
      id: 'purchase-orders',
      label: 'Órdenes de Compra',
      icon: CheckCircle,
      href: (projectId: string) => `/projects/${projectId}/orders`,
      color: 'bg-indigo-600 text-white hover:bg-indigo-700',
      urgent: false
    }
  ]
};

export function ContextualFAB({ projectId, className }: ContextualFABProps) {
  const deviceType = useDeviceType();
  const pathname = usePathname();

  // Don't show on mobile due to limited screen space
  if (deviceType === 'mobile') {
    return null;
  }

  // Determine context and get relevant actions
  let context: 'dashboard' | 'proposal' | 'engineering' | 'procurement' = 'dashboard';
  let actions = fabActions.dashboard;
  let project = null;
  let urgentAction = null;

  if (projectId) {
    project = mockProjects.find(p => p.id === projectId);
    if (project) {
      context = project.status as 'proposal' | 'engineering' | 'procurement';
      actions = fabActions[context] || fabActions.dashboard;
      
      // Check for urgent actions based on mockActionsRequired
      const projectActions = mockActionsRequired.filter(a => a.projectId === projectId);
      urgentAction = projectActions.find(a => a.urgency === 'high');
    }
  }

  // For dashboard context
  if (pathname === '/dashboard') {
    context = 'dashboard';
    actions = fabActions.dashboard;
  }

  const primaryAction = actions[0];
  const secondaryActions = actions.slice(1);

  const getPrimaryActionHref = () => {
    if (typeof primaryAction.href === 'function' && projectId) {
      return primaryAction.href(projectId);
    }
    return primaryAction.href as string;
  };

  const getSecondaryActionHref = (action: typeof actions[0]) => {
    if (typeof action.href === 'function' && projectId) {
      return action.href(projectId);
    }
    return action.href as string;
  };

  const shouldPulse = urgentAction && primaryAction.urgent;

  return (
    <div className={cn(
      "fixed bottom-6 right-6 flex flex-col items-end space-y-3 z-50",
      className
    )}>
      {/* Secondary Actions - shown on hover/focus */}
      {secondaryActions.length > 0 && (
        <div className="flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {secondaryActions.map((action) => {
            const ActionIcon = action.icon;
            return (
              <Button
                key={action.id}
                size="sm"
                asChild
                className={cn(
                  "h-10 px-4 shadow-lg",
                  action.color
                )}
              >
                <Link href={getSecondaryActionHref(action)}>
                  <ActionIcon className="h-4 w-4 mr-2" />
                  {action.label}
                </Link>
              </Button>
            );
          })}
        </div>
      )}

      {/* Primary FAB */}
      <div className="group">
        <Button
          size="lg" 
          asChild
          className={cn(
            "h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group",
            primaryAction.color,
            shouldPulse && "animate-pulse"
          )}
        >
          <Link href={getPrimaryActionHref()}>
            <primaryAction.icon className="h-6 w-6" />
          </Link>
        </Button>

        {/* Urgent badge */}
        {urgentAction && (
          <Badge 
            className="absolute -top-2 -left-2 bg-red-500 text-white border-2 border-background animate-pulse"
          >
            <AlertTriangle className="h-3 w-3 mr-1" />
            Urgente
          </Badge>
        )}

        {/* Progress indicator for project actions */}
        {project && context !== 'dashboard' && (
          <div className="absolute -bottom-1 -right-1">
            <div className="h-6 w-6 rounded-full bg-background border-2 border-primary flex items-center justify-center">
              <span className="text-xs font-bold text-primary">
                {Math.round((project.progress.proposal + project.progress.engineering + project.progress.procurement) / 3)}%
              </span>
            </div>
          </div>
        )}

        {/* Tooltip on hover */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="bg-gray-900 text-white text-xs rounded-md px-2 py-1 whitespace-nowrap">
            {primaryAction.label}
            {urgentAction && (
              <div className="text-red-300 font-semibold">
                Acción requerida
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contextual information - shown on large screens */}
      {deviceType === 'large' && project && (
        <div className="absolute bottom-full right-0 mb-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="bg-white border border-border rounded-lg shadow-lg p-4 w-64">
            <div className="flex items-center space-x-2 mb-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-sm font-medium">{project.name}</span>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>Estado: {project.status}</div>
              <div>Progreso: {Math.round((project.progress.proposal + project.progress.engineering + project.progress.procurement) / 3)}%</div>
              <div>Última actividad: {project.lastActivity}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}