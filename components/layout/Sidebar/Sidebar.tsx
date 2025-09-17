"use client"

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Home,
  FolderOpen,
  FileText,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Droplets,
  BarChart3,
  Users,
  BookOpen,
  Bell,
  Search
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarProps {
  className?: string
  isCollapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
}

interface NavigationItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string | number
  children?: NavigationItem[]
}

const navigationItems: NavigationItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Home
  },
  {
    title: 'Proyectos',
    href: '/projects',
    icon: FolderOpen,
    badge: 5,
    children: [
      { title: 'Todos los proyectos', href: '/projects', icon: FolderOpen },
      { title: 'Mis proyectos', href: '/projects/mine', icon: FolderOpen },
      { title: 'Compartidos', href: '/projects/shared', icon: Users },
      { title: 'Plantillas', href: '/projects/templates', icon: BookOpen }
    ]
  },
  {
    title: 'Propuestas',
    href: '/proposals',
    icon: FileText,
    badge: 3,
    children: [
      { title: 'Generar propuesta', href: '/proposals/generate', icon: FileText },
      { title: 'Mis propuestas', href: '/proposals/mine', icon: FileText },
      { title: 'Historial', href: '/proposals/history', icon: BookOpen }
    ]
  },
  {
    title: 'Análisis',
    href: '/analytics',
    icon: BarChart3,
    children: [
      { title: 'Parámetros técnicos', href: '/analytics/technical', icon: Droplets },
      { title: 'Reportes', href: '/analytics/reports', icon: BarChart3 },
      { title: 'Tendencias', href: '/analytics/trends', icon: BarChart3 }
    ]
  },
  {
    title: 'Configuración',
    href: '/settings',
    icon: Settings,
    children: [
      { title: 'Perfil', href: '/settings/profile', icon: Settings },
      { title: 'Empresa', href: '/settings/company', icon: Users },
      { title: 'Integraciones', href: '/settings/integrations', icon: Settings }
    ]
  },
  {
    title: 'Ayuda',
    href: '/help',
    icon: HelpCircle,
    children: [
      { title: 'Documentación', href: '/help/docs', icon: BookOpen },
      { title: 'Tutoriales', href: '/help/tutorials', icon: BookOpen },
      { title: 'Soporte', href: '/help/support', icon: HelpCircle }
    ]
  }
]

function NavigationItemComponent({
  item,
  isCollapsed,
  level = 0
}: {
  item: NavigationItem
  isCollapsed: boolean
  level?: number
}) {
  const pathname = usePathname()
  const [isExpanded, setIsExpanded] = useState(false)
  const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
  const hasChildren = item.children && item.children.length > 0

  const Icon = item.icon

  return (
    <div className="w-full">
      <Button
        variant={isActive ? 'secondary' : 'ghost'}
        className={cn(
          'w-full justify-start text-left font-normal h-auto py-2 px-3',
          level > 0 && 'ml-4 w-[calc(100%-1rem)]',
          isCollapsed && 'px-2',
          isActive && 'bg-primary/10 text-primary hover:bg-primary/20'
        )}
        asChild={!hasChildren}
        onClick={hasChildren ? () => setIsExpanded(!isExpanded) : undefined}
      >
        {hasChildren ? (
          <div className="flex items-center w-full">
            <Icon className={cn('h-4 w-4 shrink-0', isCollapsed ? 'mx-auto' : 'mr-3')} />
            {!isCollapsed && (
              <>
                <span className="flex-1 text-sm">{item.title}</span>
                {item.badge && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {item.badge}
                  </Badge>
                )}
                {hasChildren && (
                  <ChevronRight
                    className={cn(
                      'h-3 w-3 transition-transform ml-1',
                      isExpanded && 'rotate-90'
                    )}
                  />
                )}
              </>
            )}
          </div>
        ) : (
          <Link href={item.href} className="flex items-center w-full">
            <Icon className={cn('h-4 w-4 shrink-0', isCollapsed ? 'mx-auto' : 'mr-3')} />
            {!isCollapsed && (
              <>
                <span className="flex-1 text-sm">{item.title}</span>
                {item.badge && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {item.badge}
                  </Badge>
                )}
              </>
            )}
          </Link>
        )}
      </Button>

      {/* Render children */}
      {hasChildren && isExpanded && !isCollapsed && (
        <div className="mt-1 space-y-1">
          {item.children?.map((child) => (
            <NavigationItemComponent
              key={child.href}
              item={child}
              isCollapsed={isCollapsed}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function Sidebar({ className, isCollapsed = false, onCollapsedChange }: SidebarProps) {
  const handleToggleCollapse = () => {
    onCollapsedChange?.(!isCollapsed)
  }

  return (
    <div
      className={cn(
        'flex flex-col bg-card border-r transition-all duration-300',
        isCollapsed ? 'w-sidebar-collapsed' : 'w-sidebar-expanded',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Droplets className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-sm">H₂O Allegiant</h2>
              <p className="text-xs text-muted-foreground">Engineering Hub</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggleCollapse}
          className="h-8 w-8"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Quick Actions */}
      {!isCollapsed && (
        <div className="p-4 space-y-2 border-b">
          <Button size="sm" className="w-full justify-start">
            <FileText className="h-4 w-4 mr-2" />
            Nueva propuesta
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <FolderOpen className="h-4 w-4 mr-2" />
            Nuevo proyecto
          </Button>
        </div>
      )}

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-2">
          {navigationItems.map((item) => (
            <NavigationItemComponent
              key={item.href}
              item={item}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
            Sistema operativo
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            API: Conectado • v2.1.0
          </div>
        </div>
      )}
    </div>
  )
}