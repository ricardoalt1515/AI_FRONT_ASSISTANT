"use client";

import {
  LayoutDashboard,
  FolderOpen,
  FileText,
  Settings,
  MessageSquare,
  HelpCircle,
  Plus,
  ChevronLeft,
  Building2,
  Droplets,
  BarChart3,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mockProjects } from "@/lib/mock-data";
import { useSidebarState } from "@/hooks/use-mobile";
import { useSidebar } from "@/components/ui/sidebar";

// Use realistic mock data
const recentProjects = mockProjects.map(p => ({
  id: p.id,
  name: p.name,
  status: p.status,
  progress: Math.round((p.progress.proposal + p.progress.engineering + p.progress.procurement) / 3),
  location: p.location,
  priority: p.priority,
  lastActivity: p.lastActivity
}));

const statusConfig = {
  proposal: { 
    color: "bg-gradient-to-r from-amber-400 to-orange-400", 
    textColor: "text-amber-700",
    label: "Propuesta",
    badgeClass: "badge-status-proposal"
  },
  engineering: { 
    color: "bg-gradient-to-r from-emerald-400 to-green-400", 
    textColor: "text-emerald-700",
    label: "Ingeniería",
    badgeClass: "badge-status-engineering"
  },
  procurement: { 
    color: "bg-gradient-to-r from-purple-400 to-indigo-400", 
    textColor: "text-purple-700",
    label: "Procurement",
    badgeClass: "badge-status-procurement"
  },
  execution: { 
    color: "bg-gradient-to-r from-blue-400 to-cyan-400", 
    textColor: "text-blue-700",
    label: "Ejecución",
    badgeClass: "badge-status-proposal"
  },
  completed: { 
    color: "bg-gradient-to-r from-green-500 to-emerald-500", 
    textColor: "text-green-700",
    label: "Completado",
    badgeClass: "badge-status-engineering"
  },
  paused: { 
    color: "bg-gradient-to-r from-red-400 to-rose-400", 
    textColor: "text-red-700",
    label: "Pausado",
    badgeClass: "status-error"
  },
};

interface AppSidebarProps {
  type?: "dashboard" | "project";
  projectId?: string;
  className?: string;
}

export function AppSidebar({ type = "dashboard", projectId, className }: AppSidebarProps) {
  const pathname = usePathname();
  const { adaptiveState, deviceType } = useSidebarState();
  const { state: sidebarState } = useSidebar();

  if (type === "project") {
    return <ProjectSidebar projectId={projectId} />;
  }

  // Determine sidebar behavior based on adaptive state
  const isMinimized = adaptiveState === 'task-minimized' && sidebarState === 'collapsed';
  const isProjectFocused = adaptiveState === 'project-focused';
  const isDashboardExpanded = adaptiveState === 'dashboard-expanded';

  return (
    <Sidebar 
      variant="inset" 
      className={cn(
        "layout-sidebar transition-all duration-300 ease-out",
        // Dashboard-specific styling
        "sidebar-dashboard bg-gradient-to-b from-background via-background/95 to-background/90",
        "border-r border-border/60 shadow-sm",
        adaptiveState === 'mobile-overlay' && "z-50",
        className
      )}
      data-adaptive-state={adaptiveState}
      data-device={deviceType}
      data-sidebar-type="dashboard"
    >
      <SidebarHeader className={cn(
        isMinimized ? "section-padding-xs" : "section-padding-sm",
        "bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border/40"
      )}>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              size={isMinimized ? "default" : "lg"} 
              asChild
              className={cn(
                isMinimized && "justify-center px-2",
                "transition-all duration-200 hover:bg-primary/10"
              )}
            >
              <Link href="/dashboard">
                <div className={cn(
                  "flex aspect-square items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-lg transition-all duration-200",
                  isMinimized ? "size-6" : "size-10"
                )}>
                  <Droplets className={cn(isMinimized ? "size-3" : "size-5")} />
                </div>
                {!isMinimized && (
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="font-bold text-foreground whitespace-normal break-words sm:truncate" title="H₂O Allegiant">H₂O Allegiant</span>
                    <span className="text-xs text-primary font-medium whitespace-normal break-words sm:truncate" title="Dashboard Central">Dashboard Central</span>
                  </div>
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          {!isMinimized && <SidebarGroupLabel>Navegación</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  className={cn(
                    pathname === "/dashboard" && "bg-sidebar-accent",
                    isMinimized && "justify-center px-2"
                  )}
                  tooltip={isMinimized ? "Dashboard" : undefined}
                >
                  <Link href="/dashboard">
                    <LayoutDashboard className="h-4 w-4" />
                    {!isMinimized && <span>Dashboard</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Projects Section */}
        <SidebarGroup>
          {!isMinimized && <SidebarGroupLabel>Proyectos</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  className={cn(isMinimized && "justify-center px-2")}
                  tooltip={isMinimized ? "Nuevo Proyecto" : undefined}
                >
                  <Link href="/projects/create">
                    <Plus className="h-4 w-4" />
                    {!isMinimized && <span>Nuevo Proyecto</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Recent Projects */}
        <SidebarGroup className={cn(isMinimized && "hidden")}>
          <SidebarGroupLabel>Proyectos Recientes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {recentProjects.map((project) => {
                const status = statusConfig[project.status as keyof typeof statusConfig];
                const priorityColor = project.priority === 'high' ? 'text-red-600' : 
                                    project.priority === 'medium' ? 'text-yellow-600' : 
                                    'text-green-600';
                return (
                  <SidebarMenuItem key={project.id}>
                    <SidebarMenuButton asChild className="hover:bg-sidebar-accent/50 transition-colors">
                      <Link href={`/projects/${project.id}`}>
                        <div className="flex items-center space-x-3 w-full">
                          <Building2 className={cn("h-4 w-4", status?.textColor || "text-muted-foreground")} />
                          <div className="flex-1 min-w-0">
                            <span className="text-sm font-medium whitespace-normal break-words sm:truncate" title={project.name}>{project.name}</span>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs text-muted-foreground whitespace-normal break-words sm:truncate" title={project.location}>{project.location}</span>
                              <span className={cn("text-xs font-medium", priorityColor)}>•</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end space-y-1">
                            <div 
                              className={cn(
                                "h-2 w-2 rounded-full shadow-sm",
                                status?.color || "bg-muted"
                              )}
                            />
                            <span className="text-xs text-muted-foreground">{project.lastActivity}</span>
                          </div>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Tools Section */}
        <SidebarGroup>
          {!isMinimized && <SidebarGroupLabel>Herramientas</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  className={cn(
                    pathname === "/documents" && "bg-sidebar-accent",
                    isMinimized && "justify-center px-2"
                  )}
                  tooltip={isMinimized ? "Documentos" : undefined}
                >
                  <Link href="/documents">
                    <FileText className="h-4 w-4" />
                    {!isMinimized && <span>Documentos</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  className={cn(
                    pathname === "/reports" && "bg-sidebar-accent",
                    isMinimized && "justify-center px-2"
                  )}
                  tooltip={isMinimized ? "Reportes" : undefined}
                >
                  <Link href="/reports">
                    <BarChart3 className="h-4 w-4" />
                    {!isMinimized && <span>Reportes</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  className={cn(
                    pathname === "/settings" && "bg-sidebar-accent",
                    isMinimized && "justify-center px-2"
                  )}
                  tooltip={isMinimized ? "Configuración" : undefined}
                >
                  <Link href="/settings">
                    <Settings className="h-4 w-4" />
                    {!isMinimized && <span>Configuración</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className={cn(isMinimized && "px-2")}>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild
              className={cn(isMinimized && "justify-center px-2")}
              tooltip={isMinimized ? "Chat IA Global" : undefined}
            >
              <Link href="/chat">
                <MessageSquare className="h-4 w-4" />
                {!isMinimized && <span>Chat IA Global</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild
              className={cn(isMinimized && "justify-center px-2")}
              tooltip={isMinimized ? "Ayuda" : undefined}
            >
              <Link href="/help">
                <HelpCircle className="h-4 w-4" />
                {!isMinimized && <span>Ayuda</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

// Project-specific sidebar
function ProjectSidebar({ projectId }: { projectId?: string }) {
  const pathname = usePathname();
  
  // Get project data from mock data
  const project = mockProjects.find(p => p.id === projectId) || {
    id: projectId,
    name: "Sistema Los Mochis",
    status: "proposal" as const,
    progress: { proposal: 90, engineering: 0, procurement: 0 },
    client: "Industrias del Pacífico",
    location: "Los Mochis, Sinaloa"
  };

  return (
    <Sidebar 
      variant="inset" 
      className={cn(
        "layout-sidebar transition-all duration-300 ease-out",
        // Project-specific styling - more focused and engineering-oriented
        "sidebar-project bg-gradient-to-b from-slate-50 via-background to-background",
        "border-r-2 border-gradient-to-b from-primary/20 to-accent/20 shadow-md"
      )}
      data-sidebar-type="project"
    >
      <SidebarHeader className="section-padding-sm bg-gradient-to-br from-primary/10 via-accent/5 to-background border-b border-primary/20">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="sm" className="hover:bg-primary/10">
              <Link href="/dashboard">
                <ChevronLeft className="h-4 w-4" />
                <span>← Dashboard Central</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-white via-primary/5 to-accent/5 border-2 border-primary/10 shadow-sm">
          <div className="flex items-start space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg">
              <Building2 className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-foreground whitespace-normal break-words sm:truncate" title={project.name}>{project.name}</h3>
              <p className="text-sm text-muted-foreground font-medium whitespace-normal break-words sm:truncate" title={project.client}>{project.client}</p>
              <p className="text-xs text-muted-foreground/80 mb-2">{project.location}</p>
              <div>
                <span className={cn(
                  "inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold border",
                  statusConfig[project.status]?.color?.includes('amber') && "bg-amber-50 text-amber-700 border-amber-200",
                  statusConfig[project.status]?.color?.includes('emerald') && "bg-emerald-50 text-emerald-700 border-emerald-200",
                  statusConfig[project.status]?.color?.includes('purple') && "bg-purple-50 text-purple-700 border-purple-200",
                  !statusConfig[project.status]?.color && "bg-muted text-muted-foreground border-muted-foreground/20"
                )}>
                  {statusConfig[project.status]?.label || project.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Project Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  className={cn(pathname === `/projects/${projectId}` && "bg-sidebar-accent")}
                >
                  <Link href={`/projects/${projectId}`}>
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Vista General</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  className={cn(pathname === `/projects/${projectId}/chat` && "bg-sidebar-accent")}
                >
                  <Link href={`/projects/${projectId}/chat`}>
                    <MessageSquare className="h-4 w-4" />
                    <span>Chat Proyecto</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  className={cn(pathname === `/projects/${projectId}/documents` && "bg-sidebar-accent")}
                >
                  <Link href={`/projects/${projectId}/documents`}>
                    <FileText className="h-4 w-4" />
                    <span>Documentos</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  className={cn(pathname === `/projects/${projectId}/progress` && "bg-sidebar-accent")}
                >
                  <Link href={`/projects/${projectId}/progress`}>
                    <BarChart3 className="h-4 w-4" />
                    <span>Progreso</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-2" />

        {/* Project Phases */}
        <SidebarGroup>
          <SidebarGroupLabel>Fases del Proyecto</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton disabled={project.progress.proposal === 0}>
                  <div className={cn(
                    "h-2 w-2 rounded-full",
                    project.progress.proposal === 100 ? "bg-success shadow-sm" :
                    project.progress.proposal > 0 ? "bg-warning animate-water-pulse" :
                    "bg-muted"
                  )} />
                  <span>Propuesta</span>
                  <Badge 
                    variant={project.progress.proposal === 100 ? "default" : "outline"} 
                    className="ml-auto text-xs"
                  >
                    {project.progress.proposal === 100 ? "Completa" : 
                     project.progress.proposal > 0 ? `${project.progress.proposal}%` : "Pendiente"}
                  </Badge>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton disabled={project.progress.engineering === 0}>
                  <div className={cn(
                    "h-2 w-2 rounded-full",
                    project.progress.engineering === 100 ? "bg-success shadow-sm" :
                    project.progress.engineering > 0 ? "bg-warning animate-water-pulse" :
                    "bg-muted"
                  )} />
                  <span>Ingeniería</span>
                  <Badge 
                    variant={project.progress.engineering === 100 ? "default" : "outline"} 
                    className="ml-auto text-xs"
                  >
                    {project.progress.engineering === 100 ? "Completa" : 
                     project.progress.engineering > 0 ? `${project.progress.engineering}%` : "Pendiente"}
                  </Badge>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton disabled={project.progress.procurement === 0}>
                  <div className={cn(
                    "h-2 w-2 rounded-full",
                    project.progress.procurement === 100 ? "bg-success shadow-sm" :
                    project.progress.procurement > 0 ? "bg-warning animate-water-pulse" :
                    "bg-muted"
                  )} />
                  <span>Procurement</span>
                  <Badge 
                    variant={project.progress.procurement === 100 ? "default" : "outline"} 
                    className="ml-auto text-xs"
                  >
                    {project.progress.procurement === 100 ? "Completa" : 
                     project.progress.procurement > 0 ? `${project.progress.procurement}%` : "Pendiente"}
                  </Badge>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-2" />

        {/* Project Tools */}
        <SidebarGroup>
          <SidebarGroupLabel>Herramientas</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  className={cn(pathname === `/projects/${projectId}/settings` && "bg-sidebar-accent")}
                >
                  <Link href={`/projects/${projectId}/settings`}>
                    <Settings className="h-4 w-4" />
                    <span>Configuración</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  className={cn(pathname === `/projects/${projectId}/team` && "bg-sidebar-accent")}
                >
                  <Link href={`/projects/${projectId}/team`}>
                    <Users className="h-4 w-4" />
                    <span>Equipo</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}