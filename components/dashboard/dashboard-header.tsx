"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Plus, Search, Settings, User, LogOut, HelpCircle, Moon, Sun, Droplets } from "lucide-react"
import { mockUser } from "@/lib/mock-data"
import { useState } from "react"
import { useTheme } from "next-themes"

export function DashboardHeader() {
  const [searchQuery, setSearchQuery] = useState("")
  const { theme, setTheme } = useTheme()
  const [notifications] = useState(3)

  return (
    <header className="glass-effect border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-4">
              <div className="relative w-12 h-12 gradient-primary rounded-xl flex items-center justify-center pulse-glow">
                <Droplets className="w-6 h-6 text-white" />
                <div className="absolute inset-0 rounded-xl shimmer opacity-30"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  H2O Allegiant
                </h1>
                <p className="text-sm text-muted-foreground font-medium">Ingeniería de Tratamiento de Aguas</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 transition-colors group-focus-within:text-primary" />
              <Input
                placeholder="Buscar proyectos, clientes, propuestas..."
                className="pl-12 w-80 h-11 transition-all duration-300 focus:w-96 focus:shadow-lg focus:shadow-primary/20 border-border/50 focus:border-primary/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border/50 rounded-xl shadow-xl z-50 overflow-hidden">
                  <div className="p-4">
                    <div className="text-xs font-medium text-muted-foreground mb-3">RESULTADOS DE BÚSQUEDA</div>
                    <div className="space-y-2">
                      <div className="p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                        <div className="font-medium text-sm">Proyecto Planta Potabilizadora Norte</div>
                        <div className="text-xs text-muted-foreground">Cliente: Municipalidad de San José</div>
                      </div>
                      <div className="p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                        <div className="font-medium text-sm">Sistema de Filtración Industrial</div>
                        <div className="text-xs text-muted-foreground">Cliente: Industrias del Pacífico</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Button
              size="sm"
              className="gap-2 h-11 px-6 bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
            >
              <Plus className="h-4 w-4" />
              Nuevo Proyecto
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="relative h-11 w-11 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 bg-transparent"
            >
              <Bell className="h-4 w-4" />
              {notifications > 0 && (
                <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground animate-pulse">
                  {notifications}
                </Badge>
              )}
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="h-11 w-11 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 bg-transparent"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-11 w-11 rounded-full hover:ring-2 hover:ring-primary/30 transition-all duration-300 hover:scale-105"
                >
                  <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                    <AvatarImage src={mockUser.avatar || "/placeholder.svg"} alt={mockUser.name} />
                    <AvatarFallback className="gradient-primary text-white font-semibold">
                      {mockUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72 glass-effect border-border/50" align="end" forceMount>
                <DropdownMenuLabel className="font-normal p-4">
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={mockUser.avatar || "/placeholder.svg"} alt={mockUser.name} />
                        <AvatarFallback className="gradient-primary text-white">
                          {mockUser.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold leading-none">{mockUser.name}</p>
                        <p className="text-xs leading-none text-muted-foreground mt-1">{mockUser.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs font-medium">
                        {mockUser.role}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {mockUser.company}
                      </Badge>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer p-3 hover:bg-primary/10 transition-colors">
                  <User className="mr-3 h-4 w-4" />
                  <span>Mi Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer p-3 hover:bg-primary/10 transition-colors">
                  <Settings className="mr-3 h-4 w-4" />
                  <span>Configuración</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer p-3 hover:bg-primary/10 transition-colors">
                  <HelpCircle className="mr-3 h-4 w-4" />
                  <span>Ayuda y Soporte</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer p-3 text-destructive hover:bg-destructive/10 focus:text-destructive transition-colors">
                  <LogOut className="mr-3 h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
