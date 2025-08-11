"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Context-aware Card System using shadcn compound component pattern
 * Leverages CVA for context variants and progressive disclosure
 */

// Context-aware card variants using CVA
const cardVariants = cva(
  // Base styles - shared across all contexts
  [
    "rounded-xl border bg-card text-card-foreground",
    "transition-all duration-200 ease-out",
    "overflow-hidden relative",
    "group/card"
  ],
  {
    variants: {
      // Context variants for different dashboard types
      context: {
        executive: [
          "bg-gradient-to-br from-card via-card to-card/95",
          "border-context-executive-500/20 hover:border-context-executive-500/40",
          "shadow-premium hover:shadow-premium-md",
          "hover:bg-context-executive-50/30"
        ],
        project: [
          "bg-gradient-to-br from-context-project-50 to-white",
          "border-context-project-500/20 hover:border-context-project-500/40", 
          "shadow-premium hover:shadow-premium-md",
          "hover:bg-context-project-50/50"
        ],
        technical: [
          "bg-gradient-to-br from-context-technical-50 to-white",
          "border-context-technical-500/20 hover:border-context-technical-500/40",
          "shadow-premium hover:shadow-premium-md", 
          "hover:bg-context-technical-50/50"
        ],
        client: [
          "bg-gradient-to-br from-context-client-50 to-white",
          "border-context-client-500/20 hover:border-context-client-500/40",
          "shadow-premium hover:shadow-premium-md",
          "hover:bg-context-client-50/50"
        ],
        neutral: [
          "bg-card hover:bg-muted/30",
          "border-border hover:border-border/80",
          "shadow-premium hover:shadow-premium-md"
        ]
      },
      
      // Size variants for progressive disclosure
      size: {
        sm: "p-4",
        md: "p-6", 
        lg: "p-8",
        auto: "p-0" // For compound components to control their own padding
      },

      // Elevation for visual hierarchy  
      elevation: {
        flat: "shadow-none border",
        low: "shadow-premium border-border/50",
        medium: "shadow-premium-md border-border/30", 
        high: "shadow-premium-lg border-border/20",
        floating: "shadow-premium-lg border-0 bg-white/95 backdrop-blur-sm"
      },

      // Interactive states
      interactive: {
        none: "",
        hover: "hover:scale-[1.02] cursor-pointer",
        press: "hover:scale-[1.02] active:scale-[0.98] cursor-pointer transition-transform"
      },

      // Loading state
      loading: {
        false: "",
        true: "animate-pulse pointer-events-none"
      }
    },
    defaultVariants: {
      context: "neutral",
      size: "md",
      elevation: "low", 
      interactive: "none",
      loading: false
    },
  }
)

const cardHeaderVariants = cva(
  [
    "flex flex-col space-y-1.5 p-0",
    "group-data-[size=sm]/card:pb-3 group-data-[size=md]/card:pb-4 group-data-[size=lg]/card:pb-5"
  ],
  {
    variants: {
      align: {
        start: "items-start",
        center: "items-center text-center",
        end: "items-end text-end"
      }
    },
    defaultVariants: {
      align: "start"
    }
  }
)

const cardContentVariants = cva("p-0", {
  variants: {
    spacing: {
      none: "",
      sm: "space-y-3",
      md: "space-y-4", 
      lg: "space-y-6"
    }
  },
  defaultVariants: {
    spacing: "md"
  }
})

const cardFooterVariants = cva(
  [
    "flex items-center p-0",
    "group-data-[size=sm]/card:pt-3 group-data-[size=md]/card:pt-4 group-data-[size=lg]/card:pt-5"
  ],
  {
    variants: {
      justify: {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
        between: "justify-between"
      }
    },
    defaultVariants: {
      justify: "start"
    }
  }
)

// Context Card Root Component
export interface ContextCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean
}

const ContextCard = React.forwardRef<HTMLDivElement, ContextCardProps>(
  ({ className, context, size, elevation, interactive, loading, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "div"
    
    return (
      <Comp
        ref={ref}
        className={cn(cardVariants({ context, size, elevation, interactive, loading }), className)}
        data-context={context}
        data-size={size}
        {...props}
      />
    )
  }
)
ContextCard.displayName = "ContextCard"

// Card Header with context awareness
export interface ContextCardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardHeaderVariants> {
  icon?: React.ReactNode
  badge?: React.ReactNode
  actions?: React.ReactNode
}

const ContextCardHeader = React.forwardRef<HTMLDivElement, ContextCardHeaderProps>(
  ({ className, align, icon, badge, actions, children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={cn(cardHeaderVariants({ align }), className)} 
        {...props}
      >
        <div className="flex items-center justify-between w-full min-w-0">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            {icon && (
              <div className="flex-shrink-0 p-2 rounded-xl bg-muted/50 group-hover/card:bg-background/80 transition-colors">
                {icon}
              </div>
            )}
            <div className="min-w-0 flex-1">
              {children}
            </div>
            {badge && (
              <div className="flex-shrink-0">
                {badge}
              </div>
            )}
          </div>
          {actions && (
            <div className="flex-shrink-0 ml-4">
              {actions}
            </div>
          )}
        </div>
      </div>
    )
  }
)
ContextCardHeader.displayName = "ContextCardHeader"

// Card Title with responsive sizing
const ContextCardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn("font-semibold leading-none tracking-tight", "text-heading-xl sm:text-display-sm", className)} 
    {...props}
  >
    {children}
  </div>
))
ContextCardTitle.displayName = "ContextCardTitle"

// Card Description with muted styling
const ContextCardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn("text-body-sm text-muted-foreground leading-relaxed", className)} 
    {...props}
  >
    {children}
  </div>
))
ContextCardDescription.displayName = "ContextCardDescription"

// Card Content with spacing variants
export interface ContextCardContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardContentVariants> {}

const ContextCardContent = React.forwardRef<HTMLDivElement, ContextCardContentProps>(
  ({ className, spacing, ...props }, ref) => (
    <div 
      ref={ref} 
      className={cn(cardContentVariants({ spacing }), className)} 
      {...props} 
    />
  )
)
ContextCardContent.displayName = "ContextCardContent"

// Card Footer with layout variants
export interface ContextCardFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardFooterVariants> {}

const ContextCardFooter = React.forwardRef<HTMLDivElement, ContextCardFooterProps>(
  ({ className, justify, ...props }, ref) => (
    <div 
      ref={ref} 
      className={cn(cardFooterVariants({ justify }), className)} 
      {...props} 
    />
  )
)
ContextCardFooter.displayName = "ContextCardFooter"

// Export compound component
export {
  ContextCard,
  ContextCardHeader, 
  ContextCardFooter,
  ContextCardTitle,
  ContextCardDescription,
  ContextCardContent,
  cardVariants,
  cardHeaderVariants,
  cardContentVariants,
  cardFooterVariants
}

// Convenience type for external use
export type ContextCardComponent = typeof ContextCard & {
  Header: typeof ContextCardHeader
  Title: typeof ContextCardTitle
  Description: typeof ContextCardDescription
  Content: typeof ContextCardContent
  Footer: typeof ContextCardFooter
}