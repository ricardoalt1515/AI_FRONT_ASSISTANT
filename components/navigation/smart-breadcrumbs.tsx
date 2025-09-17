"use client"

import { usePathname } from "next/navigation"
import { ChevronDown, SlashIcon, Home } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

interface BreadcrumbConfig {
  [key: string]: {
    label: string
    href?: string
    dropdown?: Array<{ label: string; href: string }>
    icon?: React.ComponentType<{ className?: string }>
  }
}

const breadcrumbConfig: BreadcrumbConfig = {
  "dashboard": {
    label: "Dashboard",
    href: "/dashboard",
    icon: Home
  },
  "projects": {
    label: "Proyectos",
    href: "/projects",
    dropdown: [
      { label: "Todos los proyectos", href: "/projects" },
      { label: "Proyectos activos", href: "/projects?status=active" },
      { label: "Completados", href: "/projects?status=completed" },
      { label: "En pausa", href: "/projects?status=paused" }
    ]
  },
  "proposals": {
    label: "Propuestas",
    href: "/proposals",
    dropdown: [
      { label: "Todas las propuestas", href: "/proposals" },
      { label: "Pendientes de revisión", href: "/proposals?status=pending" },
      { label: "Aprobadas", href: "/proposals?status=approved" }
    ]
  },
  "technical": {
    label: "Datos Técnicos",
    href: "/technical"
  },
  "generate": {
    label: "Generar Propuesta",
    href: "/generate"
  },
  "versions": {
    label: "Versiones",
    href: "/versions"
  },
  "analytics": {
    label: "Análisis",
    href: "/analytics"
  },
  "settings": {
    label: "Configuración",
    href: "/settings"
  },
  "team": {
    label: "Equipo",
    href: "/team"
  }
}

interface SmartBreadcrumbsProps {
  maxItems?: number
  showHome?: boolean
  className?: string
}

export function SmartBreadcrumbs({
  maxItems = 4,
  showHome = true,
  className
}: SmartBreadcrumbsProps) {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  // Si estamos en home, no mostrar breadcrumbs
  if (pathname === "/" || pathname === "/dashboard") {
    return null
  }

  const generateBreadcrumbItems = () => {
    const items = []

    // Home item
    if (showHome) {
      items.push({
        type: "home",
        label: "Inicio",
        href: "/dashboard",
        isLast: false
      })
    }

    // Generar items para cada segmento
    segments.forEach((segment, index) => {
      const config = breadcrumbConfig[segment]
      const isLast = index === segments.length - 1
      const href = "/" + segments.slice(0, index + 1).join("/")

      if (config) {
        items.push({
          type: "configured",
          label: config.label,
          href: config.href || href,
          dropdown: config.dropdown,
          icon: config.icon,
          isLast
        })
      } else {
        // Para segmentos no configurados (como IDs)
        items.push({
          type: "dynamic",
          label: segment.charAt(0).toUpperCase() + segment.slice(1),
          href,
          isLast
        })
      }
    })

    return items
  }

  const breadcrumbItems = generateBreadcrumbItems()

  // Si hay demasiados items, mostrar ellipsis
  const displayItems = breadcrumbItems.length > maxItems
    ? [
        ...breadcrumbItems.slice(0, 1),
        { type: "ellipsis" as const },
        ...breadcrumbItems.slice(-2)
      ]
    : breadcrumbItems

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {displayItems.map((item, index) => {
          // Handle ellipsis
          if (item.type === "ellipsis") {
            return (
              <div key="ellipsis" className="flex items-center">
                <BreadcrumbItem>
                  <BreadcrumbEllipsis className="h-4 w-4" />
                </BreadcrumbItem>
                {index < displayItems.length - 1 && (
                  <BreadcrumbSeparator>
                    <SlashIcon className="h-4 w-4" />
                  </BreadcrumbSeparator>
                )}
              </div>
            )
          }

          const showSeparator = index < displayItems.length - 1

          return (
            <div key={item.href || index} className="flex items-center">
              <BreadcrumbItem>
                {item.isLast ? (
                  <BreadcrumbPage className="max-w-20 truncate md:max-w-none font-medium">
                    {item.label}
                  </BreadcrumbPage>
                ) : item.dropdown ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1 hover:text-primary transition-colors">
                      {item.icon && <item.icon className="h-4 w-4" />}
                      {item.label}
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {item.dropdown.map((dropdownItem) => (
                        <DropdownMenuItem key={dropdownItem.href} asChild>
                          <Link href={dropdownItem.href}>
                            {dropdownItem.label}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      href={item.href}
                      className="max-w-20 truncate md:max-w-none hover:text-primary transition-colors flex items-center gap-1"
                    >
                      {item.icon && <item.icon className="h-4 w-4" />}
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {showSeparator && (
                <BreadcrumbSeparator>
                  <SlashIcon className="h-4 w-4" />
                </BreadcrumbSeparator>
              )}
            </div>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}