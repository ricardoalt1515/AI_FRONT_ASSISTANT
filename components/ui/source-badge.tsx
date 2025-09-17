"use client"

import { Badge } from "./badge"
import { getBadgeColor } from "@/lib/design-tokens"
import { FileText, User, Bot } from "lucide-react"
import { cn } from "@/lib/utils"

interface SourceBadgeProps {
  source: 'manual' | 'imported' | 'ai'
  className?: string
  showIcon?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const sourceLabels = {
  manual: 'Manual',
  imported: 'Importado',
  ai: 'IA'
}

const sourceIcons = {
  manual: User,
  imported: FileText,
  ai: Bot
}

export function SourceBadge({
  source,
  className,
  showIcon = true,
  size = 'sm'
}: SourceBadgeProps) {
  const colors = getBadgeColor(source)
  const Icon = sourceIcons[source]

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  }

  return (
    <Badge
      variant="outline"
      className={cn(
        colors.bg,
        colors.text,
        colors.border,
        sizeClasses[size],
        "font-medium gap-1.5 transition-all hover:scale-105",
        className
      )}
    >
      {showIcon && <Icon className="h-3 w-3" />}
      {sourceLabels[source]}
    </Badge>
  )
}