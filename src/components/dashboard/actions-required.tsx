"use client";

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
  FileText, 
  Clock,
  AlertTriangle,
  ArrowRight,
  MoreHorizontal,
  CheckCircle2,
  Calendar,
  User,
  Filter,
  Flame,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { mockActionsRequired, mockProjects, type ActionItem as MockActionItem } from "@/lib/mock-data";

// Use the ActionItem interface from mock-data
type ActionItem = MockActionItem;

type FilterType = "all" | "high" | "medium" | "low" | "overdue";
type SortType = "urgency" | "date" | "project" | "type";

const actionConfig = {
  chat_ready: {
    icon: MessageSquare,
    color: "text-blue-600",
    bgColor: "bg-gradient-to-r from-blue-500 to-cyan-500",
    borderColor: "border-blue-200",
    cardBg: "bg-blue-50",
    primaryAction: "Continuar Chat",
    secondaryAction: "Ver Conversación",
    description: "Chat AI listo para completar"
  },
  engineering_ready: {
    icon: Clock,
    color: "text-emerald-600", 
    bgColor: "bg-gradient-to-r from-emerald-500 to-green-500",
    borderColor: "border-emerald-200",
    cardBg: "bg-emerald-50",
    primaryAction: "Ver Progreso",
    secondaryAction: "Chat del Proyecto",
    description: "Fase de ingeniería puede continuar"
  },
  payment_required: {
    icon: AlertTriangle,
    color: "text-red-600",
    bgColor: "bg-gradient-to-r from-red-500 to-rose-500",
    borderColor: "border-red-200",
    cardBg: "bg-red-50", 
    primaryAction: "Procesar Pago",
    secondaryAction: "Ver Detalles",
    description: "Pago pendiente para continuar"
  },
  approval_needed: {
    icon: FileText,
    color: "text-orange-600",
    bgColor: "bg-gradient-to-r from-orange-500 to-amber-500",
    borderColor: "border-orange-200",
    cardBg: "bg-orange-50",
    primaryAction: "Revisar",
    secondaryAction: "Comentarios",
    description: "Requiere aprobación para proceder"
  },
  review_pending: {
    icon: AlertCircle,
    color: "text-cyan-600",
    bgColor: "bg-gradient-to-r from-cyan-500 to-teal-500",
    borderColor: "border-cyan-200",
    cardBg: "bg-cyan-50",
    primaryAction: "Revisar",
    secondaryAction: "Programar",
    description: "Revisión técnica pendiente"
  },
  deadline_approaching: {
    icon: Flame,
    color: "text-red-600",
    bgColor: "bg-gradient-to-r from-red-500 to-pink-500",
    borderColor: "border-red-200",
    cardBg: "bg-red-50",
    primaryAction: "Ver Proyecto",
    secondaryAction: "Extender Plazo",
    description: "Fecha límite próxima"
  },
  procurement_ready: {
    icon: FileText,
    color: "text-indigo-600",
    bgColor: "bg-gradient-to-r from-indigo-500 to-purple-500",
    borderColor: "border-indigo-200",
    cardBg: "bg-indigo-50",
    primaryAction: "Iniciar Procurement",
    secondaryAction: "Ver BOM",
    description: "Listo para procurement"
  },
  selection_required: {
    icon: FileText,
    color: "text-purple-600",
    bgColor: "bg-gradient-to-r from-purple-500 to-violet-500",
    borderColor: "border-purple-200",
    cardBg: "bg-purple-50",
    primaryAction: "Seleccionar Equipos",
    secondaryAction: "Ver Opciones",
    description: "Selección de equipos pendiente"
  }
};

const statusColors = {
  proposal: "bg-warning text-warning-foreground",
  engineering: "bg-success text-success-foreground", 
  procurement: "bg-primary text-primary-foreground"
};

function ActionItem({ 
  item, 
  isSelected, 
  onSelect, 
  onComplete 
}: { 
  item: ActionItem;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onComplete: (id: string) => void;
}) {
  const config = actionConfig[item.type];
  const IconComponent = config.icon;
  const project = mockProjects.find(p => p.id === item.projectId);
  
  const isOverdue = item.dueDate && new Date() > item.dueDate;
  const urgencyColor = {
    high: "border-destructive bg-destructive/5",
    medium: "border-warning bg-warning/5",
    low: "border-muted bg-muted/5"
  };

  return (
    <Card className={cn(
      "card-premium card-premium-hover animate-slide-up transition-all duration-200 min-w-0",
      config.cardBg,
      config.borderColor,
      "border",
      isSelected && "ring-2 ring-primary/50",
      isOverdue && "border-destructive bg-destructive/10 pulse-critical",
      item.urgency === "high" && "shadow-lg",
      item.clientFacing && "ring-1 ring-primary/30"
    )}>
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-start space-x-2 sm:space-x-3 min-w-0">
          <div className="flex items-center pt-1">
            <Checkbox 
              checked={isSelected}
              onCheckedChange={() => onSelect(item.id)}
              className="mr-3"
            />
          </div>
          
          <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${config.bgColor} border ${config.borderColor}`}>
            <IconComponent className={`h-5 w-5 ${config.color}`} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-sm whitespace-normal break-words sm:truncate" title={item.projectName}>{item.projectName}</h3>
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
                <Badge variant="outline" className="text-xs" title={project?.status}>
                  {project?.status === "proposal"
                    ? "Propuesta"
                    : project?.status === "engineering"
                    ? "Ingeniería"
                    : project?.status === "procurement"
                    ? "Procurement"
                    : ""}
                </Badge>
              </div>
              
              <div className="flex-shrink-0">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onComplete(item.id)}>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Marcar como completado
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Calendar className="h-4 w-4 mr-2" />
                    Posponer
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="h-4 w-4 mr-2" />
                    Asignar a otro
                  </DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
              </div>
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
                {item.dueDate && (
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>Vence {item.dueDate.toLocaleDateString('es-ES', { timeZone: 'America/Mexico_City' })}</span>
                  </div>
                )}
                {item.assignedTo && item.assignedTo.length > 0 && (
                  <div className="flex items-center space-x-1">
                    <User className="h-3 w-3" />
                    <span>{item.assignedTo.join(", ")}</span>
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

            <div className="flex flex-wrap gap-2 sm:space-x-2">
              <Button 
                size="sm" 
                asChild
                className="h-7 text-xs whitespace-nowrap"
              >
                <Link href={`/projects/${item.projectId}`}>
                  <Zap className="h-3 w-3 mr-1.5" />
                  <span className="hidden sm:inline">{config.primaryAction}</span>
                  <span className="sm:hidden">Ver</span>
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                asChild
                className="h-7 text-xs whitespace-nowrap"
              >
                <Link href={`/projects/${item.projectId}/chat`}>
                  <MessageSquare className="h-3 w-3 mr-1.5" />
                  <span className="hidden sm:inline">{config.secondaryAction}</span>
                  <span className="sm:hidden">Chat</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ActionsRequired() {
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [sortBy, setSortBy] = useState<SortType>("urgency");
  
  // Use realistic mock data
  const actions: ActionItem[] = mockActionsRequired;
  
  const handleSelectAction = (id: string) => {
    setSelectedActions(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };
  
  const handleCompleteAction = (id: string) => {
    // In real app, this would update the backend
    console.log(`Completing action: ${id}`);
    setSelectedActions(prev => prev.filter(a => a !== id));
  };
  
  const handleBulkComplete = () => {
    selectedActions.forEach(id => handleCompleteAction(id));
    setSelectedActions([]);
  };
  
  const filteredActions = actions.filter(action => {
    if (filter === "all") return true;
    if (filter === "overdue") return action.dueDate && new Date() > action.dueDate;
    return action.urgency === filter;
  });
  
  const sortedActions = [...filteredActions].sort((a, b) => {
    switch (sortBy) {
      case "urgency":
        const urgencyOrder = { high: 3, medium: 2, low: 1 };
        return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
      case "date":
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.getTime() - b.dueDate.getTime();
      case "project":
        return a.projectName.localeCompare(b.projectName);
      case "type":
        return a.type.localeCompare(b.type);
      default:
        return 0;
    }
  });

  if (sortedActions.length === 0) {
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
                ? "No hay acciones pendientes en este momento. ¡Excelente trabajo!" 
                : `No hay acciones con filtro "${filter}" actualmente.`
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

  const urgentCount = sortedActions.filter(a => a.urgency === "high").length;
  const overdueCount = sortedActions.filter(a => a.dueDate && new Date() > a.dueDate).length;

  return (
    <Card className="card-premium">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-4">
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <span>Requieren tu Atención</span>
            <Badge variant={urgentCount > 0 ? "destructive" : "secondary"} className="ml-2">
              {sortedActions.length}
            </Badge>
          </CardTitle>
          
          <div className="flex items-center space-x-2">
            {selectedActions.length > 0 && (
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
                   filter === "high" ? "Urgente" :
                   filter === "medium" ? "Medio" :
                   filter === "low" ? "Bajo" : "Vencidos"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setFilter("all")}>
                  Todos ({actions.length})
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("high")}>
                  <Flame className="h-4 w-4 mr-2 text-destructive" />
                  Urgente ({actions.filter(a => a.urgency === "high").length})
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("overdue")}>
                  <AlertCircle className="h-4 w-4 mr-2 text-destructive" />
                  Vencidos ({overdueCount})
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setFilter("medium")}>
                  Prioridad Media ({actions.filter(a => a.urgency === "medium").length})
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("low")}>
                  Prioridad Baja ({actions.filter(a => a.urgency === "low").length})
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="ghost" size="sm" asChild className="h-8">
              <Link href="/actions">
                Ver todos
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
        
        {(urgentCount > 0 || overdueCount > 0) && (
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
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-3">
        {sortedActions.slice(0, 5).map((action) => (
          <ActionItem 
            key={action.id} 
            item={action}
            isSelected={selectedActions.includes(action.id)}
            onSelect={handleSelectAction}
            onComplete={handleCompleteAction}
          />
        ))}
        
        {sortedActions.length > 5 && (
          <div className="pt-2 text-center">
            <Button variant="outline" size="sm" asChild>
              <Link href="/actions">
                Ver {sortedActions.length - 5} acciones más
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}