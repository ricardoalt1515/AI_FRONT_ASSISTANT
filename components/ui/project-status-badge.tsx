"use client"

import { Badge } from "./badge"
import { getStatusColor } from "@/lib/design-tokens"
import {
  Clock,
  Play,
  Eye,
  CheckCircle,
  Pause,
  CircleDot
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ProjectStatusBadgeProps {
  status: string
  className?: string
  showIcon?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outline'
}

const statusIcons = {
  'planning': Clock,
  'in-progress': Play,
  'review': Eye,
  'completed': CheckCircle,
  'on-hold': Pause,
  'default': CircleDot
}

const statusLabels = {
  'planning': 'Planificación',
  'in-progress': 'En Progreso',
  'review': 'En Revisión',
  'completed': 'Completado',
  'on-hold': 'En Pausa'
}

export function ProjectStatusBadge({
  status,
  className,
  showIcon = true,
  size = 'sm',
  variant = 'default'
}: ProjectStatusBadgeProps) {
  const normalizedStatus = status.toLowerCase().replace(/\s+/g, '-')
  const statusColor = getStatusColor(status)

  const IconComponent = statusIcons[normalizedStatus as keyof typeof statusIcons] || statusIcons.default
  const label = statusLabels[normalizedStatus as keyof typeof statusLabels] || status

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  }

  return (
    <Badge
      variant={variant}
      className={cn(
        statusColor,
        sizeClasses[size],
        "font-medium gap-1.5 transition-all",
        showIcon && "pl-2",
        className
      )}
    >
      {showIcon && <IconComponent className="h-3 w-3" />}
      {label}
    </Badge>
  )
}