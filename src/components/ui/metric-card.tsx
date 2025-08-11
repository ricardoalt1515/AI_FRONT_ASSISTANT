"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  ContextCard,
  ContextCardHeader, 
  ContextCardContent,
  ContextCardFooter 
} from "./context-card"
import { TrendingUp, TrendingDown, Minus, Info, ChevronRight } from "lucide-react"

/**
 * Metric Card - Progressive disclosure component with context awareness
 * Demonstrates shadcn compound pattern for KPI display
 */

const metricVariants = cva(
  [
    "flex items-center justify-between p-0 transition-all duration-200"
  ],
  {
    variants: {
      trend: {
        up: "text-emerald-700",
        down: "text-red-600", 
        neutral: "text-muted-foreground",
        none: ""
      },
      emphasis: {
        low: "",
        medium: "font-medium",
        high: "font-semibold text-lg"
      }
    },
    defaultVariants: {
      trend: "none",
      emphasis: "medium"
    }
  }
)

const metricValueVariants = cva(
  "font-bold tracking-tight transition-all duration-200",
  {
    variants: {
      size: {
        sm: "text-xl",
        md: "text-2xl",
        lg: "text-3xl",
        xl: "text-4xl"
      },
      status: {
        default: "",
        success: "text-emerald-600",
        warning: "text-amber-600", 
        error: "text-red-600",
        info: "text-blue-600"
      }
    },
    defaultVariants: {
      size: "lg",
      status: "default"
    }
  }
)

// Trend indicator component
interface TrendIndicatorProps {
  trend: "up" | "down" | "neutral"
  value?: string | number
  className?: string
}

const TrendIndicator = React.forwardRef<HTMLDivElement, TrendIndicatorProps>(
  ({ trend, value, className }, ref) => {
    const TrendIcon = {
      up: TrendingUp,
      down: TrendingDown, 
      neutral: Minus
    }[trend]

    const trendColors = {
      up: "text-emerald-600 bg-emerald-50",
      down: "text-red-600 bg-red-50",
      neutral: "text-muted-foreground bg-muted"
    }

    return (
      <div 
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium",
          trendColors[trend],
          className
        )}
      >
        <TrendIcon className="h-3 w-3" />
        {value && <span>{value}</span>}
      </div>
    )
  }
)
TrendIndicator.displayName = "TrendIndicator"

// Progressive disclosure content
interface ProgressiveContentProps {
  isExpanded: boolean
  summary: React.ReactNode
  details: React.ReactNode
  className?: string
}

const ProgressiveContent = React.forwardRef<HTMLDivElement, ProgressiveContentProps>(
  ({ isExpanded, summary, details, className }, ref) => (
    <div ref={ref} className={cn("space-y-3", className)}>
      <div>{summary}</div>
      {isExpanded && (
        <div className="animate-fade-in-up border-t border-border/50 pt-3">
          {details}
        </div>
      )}
    </div>
  )
)
ProgressiveContent.displayName = "ProgressiveContent"

// Main Metric Card Component
export interface MetricCardProps extends VariantProps<typeof metricVariants> {
  // Core metric data
  title: string
  value: string | number
  subtitle?: string
  icon?: React.ReactNode
  
  // Trend and status
  trend?: "up" | "down" | "neutral"
  trendValue?: string | number
  status?: "default" | "success" | "warning" | "error" | "info"
  
  // Context and styling
  context?: "executive" | "project" | "technical" | "client" | "neutral"
  size?: "sm" | "md" | "lg" | "xl"
  
  // Progressive disclosure
  expandable?: boolean
  defaultExpanded?: boolean
  details?: React.ReactNode
  
  // Actions
  actions?: React.ReactNode
  onClick?: () => void
  onExpand?: (expanded: boolean) => void
  
  className?: string
}

export const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps>(
  ({ 
    title,
    value, 
    subtitle,
    icon,
    trend = "neutral",
    trendValue,
    status = "default",
    context = "neutral",
    size = "lg",
    expandable = false,
    defaultExpanded = false,
    details,
    actions,
    onClick,
    onExpand,
    className,
    ...props 
  }, ref) => {
    const [isExpanded, setIsExpanded] = React.useState(defaultExpanded)

    const handleExpand = React.useCallback(() => {
      const newExpanded = !isExpanded
      setIsExpanded(newExpanded)
      onExpand?.(newExpanded)
    }, [isExpanded, onExpand])

    const handleCardClick = React.useCallback((e: React.MouseEvent) => {
      // Prevent event bubbling if clicking expand button
      if ((e.target as HTMLElement).closest('[data-expand-trigger]')) {
        return
      }
      onClick?.()
    }, [onClick])

    return (
      <ContextCard
        ref={ref}
        context={context}
        elevation="medium"
        interactive={onClick ? "hover" : "none"}
        className={cn("group/metric", className)}
        onClick={onClick ? handleCardClick : undefined}
        {...props}
      >
        <ContextCardHeader
          icon={icon}
          actions={
            <div className="flex items-center gap-2">
              {actions}
              {expandable && (
                <Button
                  variant="ghost"
                  size="sm"
                  data-expand-trigger
                  onClick={handleExpand}
                  className="h-8 w-8 p-0 opacity-0 group-hover/metric:opacity-100 transition-opacity"
                >
                  <ChevronRight 
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      isExpanded && "rotate-90"
                    )}
                  />
                </Button>
              )}
            </div>
          }
        >
          <div className="min-w-0">
            <div className="text-caption text-muted-foreground mb-1">
              {title}
            </div>
            <div className="flex items-baseline gap-3">
              <span className={metricValueVariants({ size, status })}>
                {value}
              </span>
              {trend !== "neutral" && trendValue && (
                <TrendIndicator trend={trend} value={trendValue} />
              )}
            </div>
          </div>
        </ContextCardHeader>

        <ContextCardContent spacing="sm">
          {expandable && details ? (
            <ProgressiveContent 
              isExpanded={isExpanded}
              summary={subtitle && (
                <p className="text-body-sm text-muted-foreground">{subtitle}</p>
              )}
              details={details}
            />
          ) : (
            subtitle && (
              <p className="text-body-sm text-muted-foreground">{subtitle}</p>
            )
          )}
        </ContextCardContent>
      </ContextCard>
    )
  }
)
MetricCard.displayName = "MetricCard"

// Compound Metric Grid for responsive layouts
interface MetricGridProps {
  context?: "executive" | "project" | "technical" | "client" | "neutral"
  density?: "comfortable" | "compact" | "minimal"
  children: React.ReactNode
  className?: string
}

export const MetricGrid = React.forwardRef<HTMLDivElement, MetricGridProps>(
  ({ context, density = "comfortable", children, className }, ref) => {
    const gridClasses = {
      comfortable: "grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3",
      compact: "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      minimal: "grid gap-3 grid-cols-1 sm:grid-cols-3"
    }

    return (
      <div
        ref={ref}
        className={cn(
          "w-full",
          gridClasses[density],
          context && `context-${context}`,
          className
        )}
        data-context={context}
        data-density={density}
      >
        {children}
      </div>
    )
  }
)
MetricGrid.displayName = "MetricGrid"

// Quick KPI component for executive dashboards
interface QuickKPIProps {
  kpis: Array<{
    id: string
    title: string
    value: string | number
    trend?: "up" | "down" | "neutral"
    trendValue?: string | number
    status?: "default" | "success" | "warning" | "error" | "info"
  }>
  context?: MetricCardProps["context"]
  onKPIClick?: (kpiId: string) => void
  className?: string
}

export const QuickKPI = React.forwardRef<HTMLDivElement, QuickKPIProps>(
  ({ kpis, context = "executive", onKPIClick, className }, ref) => (
    <MetricGrid ref={ref} context={context} density="compact" className={className}>
      {kpis.map((kpi) => (
        <MetricCard
          key={kpi.id}
          title={kpi.title}
          value={kpi.value}
          trend={kpi.trend}
          trendValue={kpi.trendValue}
          status={kpi.status}
          context={context}
          size="md"
          onClick={() => onKPIClick?.(kpi.id)}
        />
      ))}
    </MetricGrid>
  )
)
QuickKPI.displayName = "QuickKPI"

// Export variants for external customization
export { metricVariants, metricValueVariants, TrendIndicator, ProgressiveContent }