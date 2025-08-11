"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  ChevronDown, 
  ChevronRight, 
  Info, 
  MoreHorizontal, 
  Maximize2,
  Eye,
  EyeOff
} from "lucide-react"

/**
 * Progressive Disclosure System using shadcn components
 * Implements layered information architecture with context awareness
 */

// Disclosure variants for different interaction patterns
const disclosureVariants = cva(
  "group/disclosure transition-all duration-200",
  {
    variants: {
      variant: {
        inline: "border rounded-lg bg-card",
        minimal: "border-l-2 pl-4 bg-muted/30",
        card: "border rounded-xl bg-card shadow-premium",
        floating: "border rounded-xl bg-card shadow-premium-lg backdrop-blur-sm"
      },
      level: {
        1: "border-primary/20",
        2: "border-muted-foreground/20",
        3: "border-border/50"
      }
    },
    defaultVariants: {
      variant: "card",
      level: 1
    }
  }
)

const triggerVariants = cva(
  [
    "flex items-center justify-between w-full",
    "text-left font-medium transition-all",
    "group-hover/disclosure:text-primary"
  ],
  {
    variants: {
      size: {
        sm: "text-sm py-2",
        md: "text-base py-3",
        lg: "text-lg py-4"
      },
      interactive: {
        hover: "hover:bg-muted/50 rounded-md px-3",
        subtle: "hover:text-primary/80",
        none: ""
      }
    },
    defaultVariants: {
      size: "md",
      interactive: "subtle"
    }
  }
)

// LAYER 1: INLINE COLLAPSIBLE - Simple expand/collapse
export interface InlineDisclosureProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof disclosureVariants> {
  trigger: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  icon?: React.ReactNode
  badge?: React.ReactNode
}

export const InlineDisclosure = React.forwardRef<HTMLDivElement, InlineDisclosureProps>(
  ({ 
    trigger, 
    children, 
    defaultOpen = false, 
    onOpenChange,
    icon,
    badge,
    variant,
    level,
    className,
    ...props 
  }, ref) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen)

    const handleOpenChange = (open: boolean) => {
      setIsOpen(open)
      onOpenChange?.(open)
    }

    return (
      <div 
        ref={ref}
        className={cn(disclosureVariants({ variant, level }), className)}
        {...props}
      >
        <Collapsible open={isOpen} onOpenChange={handleOpenChange}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={triggerVariants({ size: "md", interactive: "hover" })}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {icon}
                <span className="min-w-0 flex-1 text-left">{trigger}</span>
                {badge}
              </div>
              <ChevronRight 
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  isOpen && "rotate-90"
                )}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="px-4 pb-4">
            <div className="pt-2 animate-fade-in-up">
              {children}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    )
  }
)
InlineDisclosure.displayName = "InlineDisclosure"

// LAYER 2: HOVER CARD - Quick preview on demand  
export interface HoverDisclosureProps {
  trigger: React.ReactNode
  title?: string
  description?: string
  children: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  className?: string
}

export const HoverDisclosure = React.forwardRef<HTMLDivElement, HoverDisclosureProps>(
  ({ trigger, title, description, children, side = "top", align = "center", className }, ref) => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div ref={ref} className={cn("cursor-help", className)}>
          {trigger}
        </div>
      </HoverCardTrigger>
      <HoverCardContent 
        side={side} 
        align={align}
        className="w-80 animate-fade-in-up"
      >
        <div className="space-y-3">
          {title && (
            <div className="space-y-1">
              <h4 className="text-heading-lg">{title}</h4>
              {description && (
                <p className="text-body-sm text-muted-foreground">{description}</p>
              )}
            </div>
          )}
          <Separator />
          <div className="text-body-sm">
            {children}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
)
HoverDisclosure.displayName = "HoverDisclosure"

// LAYER 3: SHEET DISCLOSURE - Full drill-down experience
export interface SheetDisclosureProps {
  trigger: React.ReactNode
  title: string
  description?: string
  children: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
  size?: "sm" | "md" | "lg" | "xl" | "full"
  className?: string
}

export const SheetDisclosure = React.forwardRef<HTMLDivElement, SheetDisclosureProps>(
  ({ trigger, title, description, children, side = "right", size = "lg", className }, ref) => {
    const sizeClasses = {
      sm: "max-w-sm",
      md: "max-w-md", 
      lg: "max-w-lg",
      xl: "max-w-xl",
      full: "max-w-full"
    }

    return (
      <Sheet>
        <SheetTrigger asChild>
          <div ref={ref} className={cn("cursor-pointer", className)}>
            {trigger}
          </div>
        </SheetTrigger>
        <SheetContent side={side} className={cn("overflow-y-auto", sizeClasses[size])}>
          <SheetHeader className="space-y-3">
            <SheetTitle className="text-display-md">{title}</SheetTitle>
            {description && (
              <SheetDescription className="text-body">
                {description}
              </SheetDescription>
            )}
          </SheetHeader>
          <Separator className="my-6" />
          <div className="space-y-6">
            {children}
          </div>
        </SheetContent>
      </Sheet>
    )
  }
)
SheetDisclosure.displayName = "SheetDisclosure"

// COMPOSITE: LAYERED METRIC - Demonstrates progressive disclosure in action
interface LayeredMetricProps {
  // Layer 0: Always visible
  title: string
  value: string | number
  subtitle?: string
  
  // Layer 1: Hover preview
  hoverContent?: React.ReactNode
  
  // Layer 2: Inline expandable  
  expandableContent?: React.ReactNode
  
  // Layer 3: Full drill-down
  drillDownContent?: React.ReactNode
  
  context?: "executive" | "project" | "technical" | "client"
  showLayers?: Array<1 | 2 | 3>
  className?: string
}

export const LayeredMetric = React.forwardRef<HTMLDivElement, LayeredMetricProps>(
  ({ 
    title, 
    value, 
    subtitle,
    hoverContent,
    expandableContent,
    drillDownContent,
    context = "executive",
    showLayers = [1, 2, 3],
    className 
  }, ref) => {
    const contextColors = {
      executive: "border-context-executive-500/20 bg-context-executive-50/30",
      project: "border-context-project-500/20 bg-context-project-50/30",
      technical: "border-context-technical-500/20 bg-context-technical-50/30", 
      client: "border-context-client-500/20 bg-context-client-50/30"
    }

    const baseMetric = (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-caption text-muted-foreground uppercase tracking-wide">
            {title}
          </h3>
          <div className="flex items-center gap-2">
            {showLayers.includes(1) && hoverContent && (
              <HoverDisclosure
                trigger={<Info className="h-4 w-4 text-muted-foreground hover:text-primary" />}
                title={title}
                description="Vista previa rápida"
              >
                {hoverContent}
              </HoverDisclosure>
            )}
            {showLayers.includes(3) && drillDownContent && (
              <SheetDisclosure
                trigger={<Maximize2 className="h-4 w-4 text-muted-foreground hover:text-primary" />}
                title={`Análisis completo: ${title}`}
                description="Vista detallada con métricas avanzadas"
              >
                {drillDownContent}
              </SheetDisclosure>
            )}
          </div>
        </div>
        
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold tracking-tight">{value}</span>
          {subtitle && (
            <span className="text-body-sm text-muted-foreground">{subtitle}</span>
          )}
        </div>
      </div>
    )

    if (showLayers.includes(2) && expandableContent) {
      return (
        <div ref={ref} className={cn("border rounded-xl p-4", contextColors[context], className)}>
          <InlineDisclosure
            trigger={baseMetric}
            variant="minimal"
            level={2}
          >
            {expandableContent}
          </InlineDisclosure>
        </div>
      )
    }

    return (
      <div ref={ref} className={cn("border rounded-xl p-4", contextColors[context], className)}>
        {baseMetric}
      </div>
    )
  }
)
LayeredMetric.displayName = "LayeredMetric"

// UTILITY: Disclosure State Manager
interface DisclosureGroup {
  id: string
  title: string
  defaultOpen?: boolean
}

interface DisclosureManagerProps {
  groups: DisclosureGroup[]
  children: (groupId: string, isOpen: boolean, toggle: () => void) => React.ReactNode
  allowMultiple?: boolean
  className?: string
}

export const DisclosureManager = React.forwardRef<HTMLDivElement, DisclosureManagerProps>(
  ({ groups, children, allowMultiple = true, className }, ref) => {
    const [openGroups, setOpenGroups] = React.useState<Set<string>>(
      new Set(groups.filter(g => g.defaultOpen).map(g => g.id))
    )

    const toggle = React.useCallback((groupId: string) => {
      setOpenGroups(prev => {
        const newSet = new Set(prev)
        if (newSet.has(groupId)) {
          newSet.delete(groupId)
        } else {
          if (!allowMultiple) {
            newSet.clear()
          }
          newSet.add(groupId)
        }
        return newSet
      })
    }, [allowMultiple])

    return (
      <div ref={ref} className={cn("space-y-4", className)}>
        {groups.map(group => children(group.id, openGroups.has(group.id), () => toggle(group.id)))}
      </div>
    )
  }
)
DisclosureManager.displayName = "DisclosureManager"

// Export all variants for customization
export { 
  disclosureVariants, 
  triggerVariants 
}