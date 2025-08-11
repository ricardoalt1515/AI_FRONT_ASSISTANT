"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Bell,
  Settings,
  User,
  LogOut,
  Droplets
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useDeviceType } from "@/hooks/use-mobile";
import Link from "next/link";

interface AppHeaderProps {
  className?: string;
}

export function AppHeader({ className }: AppHeaderProps) {
  const deviceType = useDeviceType();
  
  // Mock user data
  const user = {
    name: "Ricardo Altamirano",
    email: "ricardo@h2o-allegiant.com",
    role: "Project Manager",
    initials: "RA"
  };

  // Mock notifications count
  const notificationsCount = 3;

  return (
    <header className={cn(
      "bg-white border-b border-border px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between sticky top-0 z-50 backdrop-blur-sm bg-white/95",
      className
    )}>
      {/* Left Side - Logo & Search */}
      <div className="flex items-center space-x-4">
        {/* Logo - Only visible on large screens */}
        {deviceType === 'large' && (
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Droplets className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground">H₂O Allegiant</span>
              <span className="text-xs text-muted-foreground">Water Treatment Platform</span>
            </div>
          </Link>
        )}

        {/* Global Search - Desktop+ */}
        {(deviceType === 'desktop' || deviceType === 'large') && (
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar proyectos, documentos..."
              className="pl-10 bg-muted/50 border-0 focus:bg-background focus:ring-2 focus:ring-primary/20"
            />
          </div>
        )}
      </div>

      {/* Right Side - Actions & User */}
      <div className="flex items-center space-x-3">
        {/* Search Icon for Mobile/Tablet */}
        {(deviceType === 'mobile' || deviceType === 'tablet') && (
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
            <Search className="h-4 w-4" />
          </Button>
        )}

        {/* Notifications */}
        <div className="relative">
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
            <Bell className="h-4 w-4" />
            {notificationsCount > 0 && (
              <Badge 
                className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-red-500 text-white border-2 border-background"
              >
                {notificationsCount > 9 ? '9+' : notificationsCount}
              </Badge>
            )}
          </Button>
        </div>

        {/* Settings - Desktop+ */}
        {(deviceType === 'desktop' || deviceType === 'large') && (
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0" asChild>
            <Link href="/settings">
              <Settings className="h-4 w-4" />
            </Link>
          </Button>
        )}

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-9 px-3 space-x-2">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {user.initials}
                </AvatarFallback>
              </Avatar>
              {(deviceType === 'desktop' || deviceType === 'large') && (
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">{user.name}</span>
                  <span className="text-xs text-muted-foreground">{user.role}</span>
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium">{user.name}</span>
                <span className="text-xs text-muted-foreground">{user.email}</span>
                <span className="text-xs text-muted-foreground">{user.role}</span>
              </div>
            </DropdownMenuLabel>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem asChild>
              <Link href="/profile">
                <User className="h-4 w-4 mr-2" />
                Mi Perfil
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild>
              <Link href="/settings">
                <Settings className="h-4 w-4 mr-2" />
                Configuración
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem className="text-destructive">
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}