"use client"

import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  Droplets,
  Building,
  FileText,
  BarChart3,
  Users,
  HelpCircle,
  ChevronDown,
  User2,
  ChevronUp,
  Plus
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar
} from "@/components/ui/sidebar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Menu items principales para H₂O Allegiant
const mainMenuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    badge: null
  },
  {
    title: "Proyectos",
    url: "/projects",
    icon: Droplets,
    badge: "12"
  },
  {
    title: "Propuestas",
    url: "/proposals",
    icon: FileText,
    badge: "3"
  },
  {
    title: "Análisis",
    url: "/analytics",
    icon: BarChart3,
    badge: null
  },
]

// Menu de gestión
const managementItems = [
  {
    title: "Equipo",
    url: "/team",
    icon: Users,
  },
  {
    title: "Configuración",
    url: "/settings",
    icon: Settings,
  },
]

// Datos del usuario (en producción vendría de contexto/API)
const user = {
  name: "Ingeniero",
  email: "ing@h2o-allegiant.com",
  avatar: "/avatars/01.png",
  initials: "IA"
}

export function AppSidebar() {
  const { state } = useSidebar()

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard" className="font-semibold">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg gradient-primary text-sidebar-primary-foreground">
                  <Droplets className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold gradient-text">H₂O Allegiant</span>
                  <span className="truncate text-xs text-sidebar-accent-foreground">
                    Water Treatment Hub
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Menú Principal */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-accent-foreground font-medium">
            Navegación Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className="h-11 transition-all duration-200 hover:bg-sidebar-accent group"
                  >
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className="size-4 text-sidebar-primary group-hover:text-sidebar-primary transition-colors" />
                      <span className="flex-1 font-medium">{item.title}</span>
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className="ml-auto bg-primary/10 text-primary hover:bg-primary/20 font-medium"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Acciones Rápidas */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-accent-foreground font-medium">
            Acciones Rápidas
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="h-11 bg-primary/5 hover:bg-primary/10 border border-primary/20 transition-all duration-200 modern-card"
                >
                  <a href="/projects/new" className="flex items-center gap-3">
                    <Plus className="size-4 text-primary" />
                    <span className="font-medium text-primary">Nuevo Proyecto</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Gestión */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-accent-foreground font-medium">
            Gestión
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {managementItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className="h-10 transition-all duration-200 hover:bg-sidebar-accent"
                  >
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className="size-4 text-sidebar-foreground/70" />
                      <span className="font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Soporte */}
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip="Ayuda y Soporte"
                  className="h-10 transition-all duration-200 hover:bg-sidebar-accent"
                >
                  <a href="/help" className="flex items-center gap-3">
                    <HelpCircle className="size-4 text-sidebar-foreground/70" />
                    <span className="font-medium">Ayuda</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground transition-all duration-200 h-12"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-lg bg-primary text-primary-foreground font-medium">
                      {user.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="truncate text-xs text-sidebar-accent-foreground">
                      {user.email}
                    </span>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side={state === "collapsed" ? "right" : "bottom"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem>
                  <User2 className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configuración</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}