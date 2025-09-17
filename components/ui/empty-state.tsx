"use client"

import { Button } from "./button"
import { Card, CardContent } from "./card"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
    variant?: "default" | "outline" | "secondary"
  }
  secondaryAction?: {
    label: string
    onClick: () => void
    variant?: "default" | "outline" | "secondary"
  }
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showCard?: boolean
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  secondaryAction,
  className,
  size = 'md',
  showCard = true
}: EmptyStateProps) {
  const sizeClasses = {
    sm: {
      container: "py-8",
      icon: "h-8 w-8",
      title: "text-lg",
      description: "text-sm",
      spacing: "space-y-3"
    },
    md: {
      container: "py-12",
      icon: "h-12 w-12",
      title: "text-xl",
      description: "text-base",
      spacing: "space-y-4"
    },
    lg: {
      container: "py-16",
      icon: "h-16 w-16",
      title: "text-2xl",
      description: "text-lg",
      spacing: "space-y-6"
    }
  }

  const classes = sizeClasses[size]

  const content = (
    <div className={cn(
      "text-center",
      classes.container,
      classes.spacing,
      className
    )}>
      {Icon && (
        <div className="flex justify-center">
          <div className="p-3 rounded-full bg-muted">
            <Icon className={cn(classes.icon, "text-muted-foreground")} />
          </div>
        </div>
      )}

      <div className="space-y-2">
        <h3 className={cn("font-semibold", classes.title)}>
          {title}
        </h3>
        {description && (
          <p className={cn("text-muted-foreground max-w-md mx-auto", classes.description)}>
            {description}
          </p>
        )}
      </div>

      {(action || secondaryAction) && (
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          {action && (
            <Button
              onClick={action.onClick}
              variant={action.variant || "default"}
              size={size === 'lg' ? 'lg' : 'default'}
            >
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              onClick={secondaryAction.onClick}
              variant={secondaryAction.variant || "outline"}
              size={size === 'lg' ? 'lg' : 'default'}
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  )

  if (!showCard) {
    return content
  }

  return (
    <Card className="border-dashed">
      <CardContent className="p-0">
        {content}
      </CardContent>
    </Card>
  )
}