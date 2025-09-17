"use client"

import { Bell, Search, MessageCircle, Command } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface TopNavigationProps {
  showSearch?: boolean
  showNotifications?: boolean
}

export function TopNavigation({
  showSearch = true,
  showNotifications = true
}: TopNavigationProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4 w-full">
        <SidebarTrigger className="-ml-1" />

        {/* Search */}
        {showSearch && (
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar proyectos, propuestas..."
              className="pl-10 bg-background/50 border-border/50 focus:bg-background focus:border-primary/50 transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground opacity-100">
                <Command className="h-3 w-3" />
                K
              </kbd>
            </div>
          </div>
        )}

        <div className="ml-auto flex items-center gap-2">
          {/* Quick Actions */}
          <Button
            variant="ghost"
            size="sm"
            className="hidden md:inline-flex h-9 px-3 text-sm hover:bg-primary/10 hover:text-primary transition-colors"
          >
            Nuevo Proyecto
          </Button>

          {/* Notifications */}
          {showNotifications && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-9 w-9 hover:bg-primary/10 transition-colors"
                >
                  <Bell className="h-4 w-4" />
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs animate-pulse"
                  >
                    3
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                  <div className="font-medium text-sm">
                    Propuesta generada exitosamente
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Proyecto: Sistema de Filtración Industrial - hace 2 min
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                  <div className="font-medium text-sm">
                    Parámetros fuera de rango
                  </div>
                  <div className="text-xs text-muted-foreground">
                    pH detectado en 9.2 - Proyecto PTAR Municipal - hace 15 min
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                  <div className="font-medium text-sm">
                    Nuevo miembro del equipo
                  </div>
                  <div className="text-xs text-muted-foreground">
                    María García se unió al equipo - hace 1 hora
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-center text-sm text-primary">
                  Ver todas las notificaciones
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Chat Assistant Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="relative h-9 w-9 hover:bg-primary/10 hover:text-primary transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-pulse" />
          </Button>
        </div>
      </div>
    </header>
  )
}