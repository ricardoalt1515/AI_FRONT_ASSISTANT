"use client";

import React, { memo, useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { 
  Zap, 
  MessageSquare, 
  Clock,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Calendar,
  User,
  Filter,
  Flame,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { mockActionsRequired, type ActionItem as MockActionItem } from "@/lib/mock-data";
import { useDashboardFeatures, useDashboardLayout } from "@/contexts/dashboard-context";

/**
 * Enhanced Actions Required with:
 * - Progressive disclosure (show only 3 urgent items by default)
 * - Smart prioritization algorithm
 * - Bulk actions for efficiency
 * - Context-aware filtering
 * - Performance optimizations
 */

type ActionItem = MockActionItem;
type FilterType = "all" | "urgent" | "overdue" | "today";

// Action configuration with performance optimizations
const ACTION_CONFIG = {
  chat_ready: {
    icon: MessageSquare,
    color: "text-blue-600",
    bgColor: "bg-gradient-to-r from-blue-500 to-cyan-500",
    borderColor: "border-blue-200",
    cardBg: "bg-blue-50",
    priority: 8,
    actionText: "Continuar Chat"
  },
  payment_required: {
    icon: AlertTriangle,
    color: "text-red-600",
    bgColor: "bg-gradient-to-r from-red-500 to-rose-500",
    borderColor: "border-red-200",
    cardBg: "bg-red-50",
    priority: 10,
    actionText: "Procesar Pago"
  },
  approval_needed: {
    icon: Clock,
    color: "text-orange-600",
    bgColor: "bg-gradient-to-r from-orange-500 to-amber-500",
    borderColor: "border-orange-200",
    cardBg: "bg-orange-50",
    priority: 9,
    actionText: "Aprobar"
  },
  deadline_approaching: {
    icon: Flame,
    color: "text-red-600",
    bgColor: "bg-gradient-to-r from-red-500 to-pink-500",
    borderColor: "border-red-200",
    cardBg: "bg-red-50",
    priority: 10,
    actionText: "Ver Urgente"
  },
  engineering_ready: {
    icon: CheckCircle2,
    color: "text-emerald-600", 
    bgColor: "bg-gradient-to-r from-emerald-500 to-green-500",
    borderColor: "border-emerald-200",
    cardBg: "bg-emerald-50",
    priority: 6,
    actionText: "Continuar"
  },
  procurement_ready: {
    icon: Clock,
    color: "text-indigo-600",
    bgColor: "bg-gradient-to-r from-indigo-500 to-purple-500",
    borderColor: "border-indigo-200",
    cardBg: "bg-indigo-50",
    priority: 7,
    actionText: "Iniciar Procurement"
  },
  selection_required: {
    icon: AlertCircle,
    color: "text-purple-600",
    bgColor: "bg-gradient-to-r from-purple-500 to-violet-500",
    borderColor: "border-purple-200",
    cardBg: "bg-purple-50",
    priority: 8,
    actionText: "Seleccionar"
  },
  review_pending: {
    icon: Eye,
    color: "text-cyan-600",
    bgColor: "bg-gradient-to-r from-cyan-500 to-teal-500",
    borderColor: "border-cyan-200",
    cardBg: "bg-cyan-50",
    priority: 5,
    actionText: "Revisar"
  }
} as const;

// Smart prioritization algorithm
const calculateActionPriority = (action: ActionItem): number => {
  const config = ACTION_CONFIG[action.type];
  let priority = config.priority;
  
  // Boost priority based on urgency
  if (action.urgency === "high") priority += 3;
  else if (action.urgency === "medium") priority += 1;
  
  // Critical boost for overdue items
  if (action.dueDate && new Date() > action.dueDate) {
    priority += 5;
  }
  
  // Boost for items due today or tomorrow
  if (action.dueDate) {
    const daysUntilDue = Math.ceil((action.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    if (daysUntilDue <= 1) priority += 2;
  }
  
  // Boost for client-facing actions
  if (action.clientFacing) priority += 1;
  
  return priority;
};

// Memoized action item component
const ActionItemCard = memo(({ 
  item, 
  isSelected, 
  onSelect, 
  onComplete,
  variant = 'full'
}: { 
  item: ActionItem;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onComplete: (id: string) => void;
  variant?: 'compact' | 'full';
}) => {
  const config = ACTION_CONFIG[item.type];
  const IconComponent = config.icon;
  
  const isOverdue = item.dueDate && new Date() > item.dueDate;
  const daysUntilDue = item.dueDate ? 
    Math.ceil((item.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : null;

  if (variant === 'compact') {
    return (
      <Card className={cn(
        "card-premium transition-all duration-200 cursor-pointer hover:shadow-md",
        config.cardBg,
        config.borderColor,
        "border-l-4",
        isSelected && "ring-2 ring-primary/50",
        isOverdue && "border-destructive bg-destructive/10",
        item.urgency === "high" && "shadow-md"
      )}>
        <CardContent className="p-3">
          <div className="flex items-center space-x-3">
            <Checkbox 
              checked={isSelected}
              onCheckedChange={() => onSelect(item.id)}
            />
            
            <div className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0",
              config.bgColor
            )}>
              <IconComponent className="h-4 w-4 text-white" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-sm truncate" title={item.projectName}>
                  {item.projectName}
                </h4>
                <div className="flex items-center space-x-1">
                  {item.urgency === "high" && (
                    <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                      URGENTE
                    </Badge>
                  )}
                  {isOverdue && (
                    <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                      VENCIDO
                    </Badge>
                  )}
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground truncate mb-2" title={item.message}>
                {item.message}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                  {daysUntilDue !== null && (
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {daysUntilDue < 0 ? `${Math.abs(daysUntilDue)}d vencido` :
                         daysUntilDue === 0 ? 'Hoy' :
                         daysUntilDue === 1 ? 'Mañana' :
                         `${daysUntilDue}d restantes`}
                      </span>
                    </div>
                  )}
                  {item.estimatedTime && (
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{item.estimatedTime}</span>
                    </div>
                  )}
                </div>
                
                <Button 
                  size="sm" 
                  className="h-6 text-xs"
                  asChild
                >
                  <Link href={`/projects/${item.projectId}`}>
                    {config.actionText}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Full variant (original detailed view)
  return (
    <Card className={cn(
      "card-premium card-premium-hover animate-slide-up transition-all duration-200",
      config.cardBg,
      config.borderColor,
      "border",
      isSelected && "ring-2 ring-primary/50",
      isOverdue && "border-destructive bg-destructive/10 pulse-critical",
      item.urgency === "high" && "shadow-lg"
    )}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className="flex items-center pt-1">
            <Checkbox 
              checked={isSelected}
              onCheckedChange={() => onSelect(item.id)}
              className="mr-3"
            />
          </div>
          
          <div className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg",
            config.bgColor,
            "border",
            config.borderColor
          )}>
            <IconComponent className="h-5 w-5 text-white" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-sm truncate" title={item.projectName}>
                    {item.projectName}
                  </h3>
                  {item.urgency === "high" && (
                    <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                      URGENTE
                    </Badge>
                  )}
                  {isOverdue && (
                    <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                      VENCIDO
                    </Badge>
                  )}
                </div>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <CheckCircle2 className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onComplete(item.id)}>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Completar
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Calendar className="h-4 w-4 mr-2" />
                    Posponer
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="h-4 w-4 mr-2" />
                    Reasignar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
              {item.message}
            </p>
            
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                {item.estimatedTime && (
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{item.estimatedTime}</span>
                  </div>
                )}
                {daysUntilDue !== null && (
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {daysUntilDue < 0 ? `${Math.abs(daysUntilDue)} días vencido` :
                       daysUntilDue === 0 ? 'Vence hoy' :
                       daysUntilDue === 1 ? 'Vence mañana' :
                       `Vence en ${daysUntilDue} días`}
                    </span>
                  </div>
                )}
              </div>
              
              {item.progress !== undefined && (
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{item.progress}%</span>
                </div>
              )}
            </div>

            <div className="flex space-x-2">
              <Button 
                size="sm" 
                className="h-7 text-xs"
                asChild
              >
                <Link href={`/projects/${item.projectId}`}>
                  <Zap className="h-3 w-3 mr-1.5" />
                  {config.actionText}
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="h-7 text-xs"
                asChild
              >
                <Link href={`/projects/${item.projectId}/chat`}>
                  <MessageSquare className="h-3 w-3 mr-1.5" />
                  Chat
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

ActionItemCard.displayName = 'ActionItemCard';

export function EnhancedActionsRequired() {
  const features = useDashboardFeatures();
  const layout = useDashboardLayout();
  
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [showAll, setShowAll] = useState(false);
  
  // Smart prioritization and filtering
  const processedActions = useMemo(() => {
    const actionsWithPriority = mockActionsRequired.map(action => ({
      ...action,
      computedPriority: calculateActionPriority(action)
    }));
    
    // Sort by priority (highest first)
    return actionsWithPriority.sort((a, b) => b.computedPriority - a.computedPriority);
  }, []);

  const filteredActions = useMemo(() => {
    let filtered = processedActions;
    
    switch (filter) {
      case "urgent":
        filtered = filtered.filter(a => a.urgency === "high" || a.computedPriority >= 10);
        break;
      case "overdue":
        filtered = filtered.filter(a => a.dueDate && new Date() > a.dueDate);
        break;
      case "today":
        filtered = filtered.filter(a => {
          if (!a.dueDate) return false;
          const today = new Date();
          return a.dueDate.toDateString() === today.toDateString();
        });
        break;
    }
    
    return filtered;
  }, [processedActions, filter]);

  const visibleActions = useMemo(() => {
    if (showAll) return filteredActions;
    return filteredActions.slice(0, layout.maxVisibleActions);
  }, [filteredActions, showAll, layout.maxVisibleActions]);

  const urgentCount = processedActions.filter(a => a.urgency === "high" || a.computedPriority >= 10).length;
  const overdueCount = processedActions.filter(a => a.dueDate && new Date() > a.dueDate).length;
  const todayCount = processedActions.filter(a => {
    if (!a.dueDate) return false;
    const today = new Date();
    return a.dueDate.toDateString() === today.toDateString();
  }).length;

  const handleSelectAction = (id: string) => {
    setSelectedActions(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };
  
  const handleCompleteAction = (id: string) => {
    console.log(`Completing action: ${id}`);
    setSelectedActions(prev => prev.filter(a => a !== id));
  };
  
  const handleBulkComplete = () => {
    selectedActions.forEach(id => handleCompleteAction(id));
    setSelectedActions([]);
  };

  if (filteredActions.length === 0) {
    return (
      <Card className="card-premium">
        <CardContent className="p-6 text-center">
          <div className="flex flex-col items-center space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
              <CheckCircle2 className="h-6 w-6 text-success" />
            </div>
            <h3 className="font-semibold">Todo al día</h3>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              {filter === "all" 
                ? "No hay acciones pendientes. ¡Excelente trabajo!" 
                : `No hay acciones ${
                    filter === "urgent" ? "urgentes" :
                    filter === "overdue" ? "vencidas" :
                    "para hoy"
                  } en este momento.`
              }
            </p>
            {filter !== "all" && (
              <Button variant="outline" size="sm" onClick={() => setFilter("all")}>
                Ver todas las acciones
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-premium">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-4">
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className={cn(
              "h-5 w-5",
              urgentCount > 0 ? "text-destructive" : "text-warning"
            )} />
            <span>Acciones Requeridas</span>
            <Badge variant={urgentCount > 0 ? "destructive" : "secondary"} className="ml-2">
              {visibleActions.length}
              {!showAll && filteredActions.length > layout.maxVisibleActions && 
                ` de ${filteredActions.length}`
              }
            </Badge>
          </CardTitle>
          
          <div className="flex items-center space-x-2">
            {selectedActions.length > 0 && features.showBulkActions && (
              <Button size="sm" onClick={handleBulkComplete} className="h-8">
                <CheckCircle2 className="h-3 w-3 mr-2" />
                Completar ({selectedActions.length})
              </Button>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                  <Filter className="h-3 w-3 mr-2" />
                  {filter === "all" ? "Todos" :
                   filter === "urgent" ? "Urgentes" :
                   filter === "overdue" ? "Vencidas" : "Hoy"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setFilter("all")}>
                  Todos ({processedActions.length})
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("urgent")}>
                  <Flame className="h-4 w-4 mr-2 text-destructive" />
                  Urgentes ({urgentCount})
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("overdue")}>
                  <AlertCircle className="h-4 w-4 mr-2 text-destructive" />
                  Vencidas ({overdueCount})
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("today")}>
                  <Calendar className="h-4 w-4 mr-2 text-primary" />
                  Hoy ({todayCount})
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Summary indicators */}
        {(urgentCount > 0 || overdueCount > 0 || todayCount > 0) && (
          <div className="flex items-center space-x-4 text-sm">
            {urgentCount > 0 && (
              <div className="flex items-center space-x-1 text-destructive">
                <Flame className="h-4 w-4" />
                <span>{urgentCount} urgente{urgentCount > 1 ? 's' : ''}</span>
              </div>
            )}
            {overdueCount > 0 && (
              <div className="flex items-center space-x-1 text-destructive">
                <AlertCircle className="h-4 w-4" />
                <span>{overdueCount} vencida{overdueCount > 1 ? 's' : ''}</span>
              </div>
            )}
            {todayCount > 0 && (
              <div className="flex items-center space-x-1 text-primary">
                <Calendar className="h-4 w-4" />
                <span>{todayCount} para hoy</span>
              </div>
            )}
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-3">
        {visibleActions.map((action) => (
          <ActionItemCard
            key={action.id}
            item={action}
            isSelected={selectedActions.includes(action.id)}
            onSelect={handleSelectAction}
            onComplete={handleCompleteAction}
            variant={showAll ? 'full' : 'compact'}
          />
        ))}
        
        {filteredActions.length > layout.maxVisibleActions && (
          <div className="pt-2 flex justify-center">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowAll(!showAll)}
              className="flex items-center space-x-2"
            >
              {showAll ? (
                <>
                  <EyeOff className="h-3 w-3" />
                  <span>Mostrar menos</span>
                  <ChevronUp className="h-3 w-3" />
                </>
              ) : (
                <>
                  <Eye className="h-3 w-3" />
                  <span>Ver {filteredActions.length - layout.maxVisibleActions} acciones más</span>
                  <ChevronDown className="h-3 w-3" />
                </>
              )}
            </Button>
          </div>
        )}
        
        {showAll && (
          <div className="pt-2 text-center">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/actions">
                <ArrowRight className="h-4 w-4 mr-1" />
                Ver página completa de acciones
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}