"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  ChevronRight,
  Home,
  FolderOpen,
  FileText,
  BarChart3,
  Settings,
  HelpCircle,
  Droplets
} from 'lucide-react'

interface BreadcrumbItem {
  title: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
}

interface BreadcrumbsProps {
  className?: string
  items?: BreadcrumbItem[]
  maxItems?: number
}

const routeIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'dashboard': Home,
  'projects': FolderOpen,
  'proposals': FileText,
  'analytics': BarChart3,
  'settings': Settings,
  'help': HelpCircle,
  'technical': Droplets
}

function getRouteSegments(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs: BreadcrumbItem[] = []

  // Always start with dashboard
  breadcrumbs.push({
    title: 'Dashboard',
    href: '/dashboard',
    icon: Home
  })

  let currentPath = ''

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`

    // Skip if it's already dashboard
    if (segment === 'dashboard' && index === 0) {
      return
    }

    // Get segment title and icon
    const title = getSegmentTitle(segment, segments, index)
    const icon = routeIconMap[segment] || routeIconMap[segments[0]]

    breadcrumbs.push({
      title,
      href: currentPath,
      icon
    })
  })

  return breadcrumbs
}

function getSegmentTitle(segment: string, allSegments: string[], index: number): string {
  // Special cases for known routes
  const titleMap: Record<string, string> = {
    'projects': 'Proyectos',
    'proposals': 'Propuestas',
    'analytics': 'Análisis',
    'settings': 'Configuración',
    'help': 'Ayuda',
    'dashboard': 'Dashboard',
    'mine': 'Mis proyectos',
    'shared': 'Compartidos',
    'templates': 'Plantillas',
    'generate': 'Generar',
    'history': 'Historial',
    'technical': 'Parámetros técnicos',
    'reports': 'Reportes',
    'trends': 'Tendencias',
    'profile': 'Perfil',
    'company': 'Empresa',
    'integrations': 'Integraciones',
    'docs': 'Documentación',
    'tutorials': 'Tutoriales',
    'support': 'Soporte'\n  }\n\n  // Check if it's a known route\n  if (titleMap[segment]) {\n    return titleMap[segment]\n  }\n\n  // If it looks like an ID (UUID or similar), try to get a better name\n  if (segment.match(/^[a-f0-9-]{36}$/i) || segment.match(/^[a-f0-9]{24}$/)) {\n    const parent = allSegments[index - 1]\n    if (parent === 'projects') {\n      return 'Proyecto'\n    }\n    if (parent === 'proposals') {\n      return 'Propuesta'\n    }\n    return 'Detalle'\n  }\n\n  // Capitalize and format the segment\n  return segment\n    .split('-')\n    .map(word => word.charAt(0).toUpperCase() + word.slice(1))\n    .join(' ')\n}\n\nexport function Breadcrumbs({ className, items, maxItems = 5 }: BreadcrumbsProps) {\n  const pathname = usePathname()\n  const breadcrumbItems = items || getRouteSegments(pathname)\n  \n  // Limit the number of items if specified\n  const displayItems = breadcrumbItems.length > maxItems\n    ? [\n        breadcrumbItems[0], // Always show first\n        { title: '...', href: '', icon: undefined },\n        ...breadcrumbItems.slice(-(maxItems - 2)) // Show last items\n      ]\n    : breadcrumbItems\n\n  if (breadcrumbItems.length <= 1) {\n    return null\n  }\n\n  return (\n    <nav\n      className={cn('flex items-center space-x-1 text-sm text-muted-foreground', className)}\n      aria-label=\"Breadcrumb\"\n    >\n      <ol className=\"flex items-center space-x-1\">\n        {displayItems.map((item, index) => {\n          const isLast = index === displayItems.length - 1\n          const isEllipsis = item.title === '...'\n          const Icon = item.icon\n\n          return (\n            <li key={`${item.href}-${index}`} className=\"flex items-center\">\n              {index > 0 && (\n                <ChevronRight className=\"h-3 w-3 mx-1 text-muted-foreground/60\" />\n              )}\n              \n              {isEllipsis ? (\n                <span className=\"px-1\">...</span>\n              ) : (\n                <div className=\"flex items-center\">\n                  {Icon && (\n                    <Icon className=\"h-3 w-3 mr-1.5\" />\n                  )}\n                  {isLast ? (\n                    <span className=\"font-medium text-foreground\">\n                      {item.title}\n                    </span>\n                  ) : (\n                    <Link\n                      href={item.href}\n                      className=\"hover:text-foreground transition-colors\"\n                    >\n                      {item.title}\n                    </Link>\n                  )}\n                </div>\n              )}\n            </li>\n          )\n        })}\n      </ol>\n    </nav>\n  )\n}"