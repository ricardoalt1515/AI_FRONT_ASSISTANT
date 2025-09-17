"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FolderOpen,
  FileText,
  Settings,
  Users,
  BarChart3,
  Droplets
} from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Resumen general"
  },
  {
    name: "Proyectos",
    href: "/projects",
    icon: FolderOpen,
    description: "Gestionar proyectos"
  },
  {
    name: "Propuestas",
    href: "/proposals",
    icon: FileText,
    description: "Documentos generados"
  },
  {
    name: "Reportes",
    href: "/reports",
    icon: BarChart3,
    description: "Análisis y métricas"
  },
  {
    name: "Equipo",
    href: "/team",
    icon: Users,
    description: "Gestión de usuarios"
  },
  {
    name: "Configuración",
    href: "/settings",
    icon: Settings,
    description: "Preferencias"
  }
]

export function MainNavigation() {
  const pathname = usePathname()

  return (
    <nav className="space-y-1">
      {navigation.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
              isActive
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            <div className="flex flex-col">
              <span>{item.name}</span>
              <span className="text-xs text-muted-foreground">
                {item.description}
              </span>
            </div>
          </Link>
        )
      })}
    </nav>
  )
}