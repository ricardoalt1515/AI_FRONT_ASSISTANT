"use client";

import {
  LayoutDashboard,
  FolderOpen,
  FileText,
  Settings,
  MessageSquare,
  HelpCircle,
  Plus,
  Building2,
  BarChart3,
  Bot
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
  SidebarRail,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mockProjects } from "@/lib/mock-data";

// Simple status dot component
const StatusDot = ({ status }: { status: string }) => {
  const colors = {
    proposal: "bg-amber-500",
    engineering: "bg-blue-500", 
    procurement: "bg-purple-500",
    execution: "bg-green-500",
    completed: "bg-emerald-600",
    paused: "bg-red-500"
  };
  
  return (
    <div className={cn("h-2 w-2 rounded-full", colors[status as keyof typeof colors] || "bg-gray-400")} />
  );
};

// Main navigation items - Fixed top section
const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard
  },
  {
    title: "Proyectos",
    href: "/projects", 
    icon: FolderOpen,
    badge: mockProjects.length
  },
  {
    title: "AI Agents",
    href: "/agents",
    icon: Bot
  },
  {
    title: "Reportes",
    href: "/reports", 
    icon: BarChart3
  }
];

// Quick actions - Fixed bottom section
const quickActions = [
  {
    title: "Nuevo Proyecto",
    href: "/projects/create",
    icon: Plus
  },
  {
    title: "Chat Global", 
    href: "/chat",
    icon: MessageSquare
  }
];

interface AppSidebarProps {
  className?: string;
  type?: "dashboard" | "project";
  projectId?: string;
}

export function AppSidebar({ className, type = "dashboard", projectId }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <Sidebar variant="inset" collapsible="icon" className={cn("border-r", className)}>
      {/* Fixed Header */}
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold">H₂O Allegiant</span>
            <span className="text-xs text-muted-foreground">Water Treatment AI</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="flex flex-col">
        {/* Fixed Main Navigation */}
        <SidebarGroup className="flex-shrink-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href || pathname.startsWith(item.href + "/")}
                    tooltip={item.title}
                    className="w-full"
                  >
                    <Link href={item.href} className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </div>
                      {item.badge && (
                        <Badge 
                          variant="secondary" 
                          className="ml-auto h-5 w-5 flex items-center justify-center text-xs p-0 group-data-[collapsible=icon]:hidden"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Context Section - Fixed */}
        {type === "project" && projectId && (
          <SidebarGroup className="flex-shrink-0">
            <SidebarGroupLabel>Contexto Actual</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="px-2 py-1 text-sm text-muted-foreground bg-muted/50 rounded-md mx-2">
                Proyecto Activo
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Scrollable Projects Section */}
        <SidebarGroup className="flex-1 min-h-0">
          <SidebarGroupLabel>Proyectos Recientes</SidebarGroupLabel>
          <SidebarGroupContent className="flex-1 min-h-0">
            <ScrollArea className="h-full">
              <SidebarMenu className="px-1">
                {mockProjects.slice(0, 8).map((project) => (
                  <SidebarMenuItem key={project.id}>
                    <SidebarMenuButton
                      asChild
                      className="w-full justify-start"
                      isActive={pathname.includes(`/projects/${project.id}`)}
                      tooltip={project.name}
                    >
                      <Link href={`/projects/${project.id}`}>
                        <StatusDot status={project.status} />
                        <span className="truncate">{project.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                
                {mockProjects.length > 8 && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="text-muted-foreground" tooltip="Ver todos los proyectos">
                      <Link href="/projects">
                        <span className="text-sm">Ver todos ({mockProjects.length})...</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </SidebarMenu>
            </ScrollArea>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Fixed Quick Actions */}
        <SidebarGroup className="flex-shrink-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {quickActions.map((action) => (
                <SidebarMenuItem key={action.href}>
                  <SidebarMenuButton asChild tooltip={action.title}>
                    <Link href={action.href}>
                      <action.icon className="h-4 w-4" />
                      <span>{action.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Fixed Footer */}
      <SidebarFooter className="border-t border-sidebar-border flex-shrink-0">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Configuración">
              <Link href="/settings" className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span>Config</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Ayuda">
              <Link href="/help" className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  <span>Ayuda</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}