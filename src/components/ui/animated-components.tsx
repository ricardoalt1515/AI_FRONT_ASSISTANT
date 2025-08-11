"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Droplet, Zap, ArrowRight, Check, X } from "lucide-react"

/**
 * Modern Animations & Microinteractions using Tailwind CSS
 * Implements elegant transitions, water-themed animations, and delightful UX
 */

// ANIMATED CONTAINER - Entry animations with stagger
const animatedContainerVariants = cva(
  "transition-all duration-300 ease-out",
  {
    variants: {
      animation: {
        "fade-in": "animate-fade-in-up",
        "slide-up": "animate-slide-in",
        "scale": "animate-in zoom-in-95",
        "water-flow": "animate-water-flow",
        "pulse-gentle": "animate-pulse-gentle"
      },
      stagger: {
        none: "",
        sm: "[animation-delay:0.1s]",
        md: "[animation-delay:0.2s]",
        lg: "[animation-delay:0.3s]"
      }
    },
    defaultVariants: {
      animation: "fade-in",
      stagger: "none"
    }
  }
)

export interface AnimatedContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof animatedContainerVariants> {
  children: React.ReactNode
  delay?: number
}

export const AnimatedContainer = React.forwardRef<HTMLDivElement, AnimatedContainerProps>(
  ({ className, animation, stagger, delay, children, style, ...props }, ref) => {
    const customStyle = delay 
      ? { ...style, animationDelay: `${delay}ms` }
      : style

    return (
      <div
        ref={ref}
        className={cn(animatedContainerVariants({ animation, stagger }), className)}
        style={customStyle}
        {...props}
      >
        {children}
      </div>
    )
  }
)
AnimatedContainer.displayName = "AnimatedContainer"

// STAGGERED GRID - Children animate in sequence
interface StaggeredGridProps {
  children: React.ReactNode[]
  staggerDelay?: number
  columns?: 1 | 2 | 3 | 4
  gap?: number
  className?: string
}

export const StaggeredGrid = React.forwardRef<HTMLDivElement, StaggeredGridProps>(
  ({ children, staggerDelay = 100, columns = 3, gap = 4, className }, ref) => {
    const gridClasses = {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2", 
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    }

    return (
      <div 
        ref={ref}
        className={cn("grid", gridClasses[columns], `gap-${gap}`, className)}
      >
        {children.map((child, index) => (
          <AnimatedContainer
            key={index}
            animation="fade-in"
            delay={index * staggerDelay}
          >
            {child}
          </AnimatedContainer>
        ))}
      </div>
    )
  }
)
StaggeredGrid.displayName = "StaggeredGrid"

// FLOATING ACTION BUTTON - Context-aware with animations
const fabVariants = cva(
  [
    "fixed bottom-6 right-6 z-50",
    "rounded-full shadow-premium-lg",
    "transition-all duration-300 ease-out",
    "hover:scale-110 active:scale-95",
    "group/fab"
  ],
  {
    variants: {
      context: {
        executive: "bg-context-executive-500 hover:bg-context-executive-600 text-white",
        project: "bg-context-project-500 hover:bg-context-project-600 text-white",
        technical: "bg-context-technical-500 hover:bg-context-technical-600 text-white",
        client: "bg-context-client-500 hover:bg-context-client-600 text-white",
        primary: "bg-primary hover:bg-primary/90 text-primary-foreground"
      },
      size: {
        sm: "h-12 w-12",
        md: "h-14 w-14", 
        lg: "h-16 w-16"
      },
      state: {
        idle: "translate-y-0 opacity-100",
        hidden: "translate-y-16 opacity-0 pointer-events-none",
        pulsing: "animate-pulse-gentle"
      }
    },
    defaultVariants: {
      context: "primary",
      size: "md",
      state: "idle"
    }
  }
)

export interface FloatingActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof fabVariants> {
  icon: React.ReactNode
  label?: string
  showLabel?: boolean
  hideOnScroll?: boolean
}

export const FloatingActionButton = React.forwardRef<HTMLButtonElement, FloatingActionButtonProps>(
  ({ 
    className, 
    context, 
    size, 
    state: stateProp, 
    icon, 
    label, 
    showLabel = false,
    hideOnScroll = false,
    ...props 
  }, ref) => {
    const [isHidden, setIsHidden] = React.useState(false)
    const [lastScrollY, setLastScrollY] = React.useState(0)

    React.useEffect(() => {
      if (!hideOnScroll) return

      const handleScroll = () => {
        const currentScrollY = window.scrollY
        setIsHidden(currentScrollY > lastScrollY && currentScrollY > 100)
        setLastScrollY(currentScrollY)
      }

      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
    }, [hideOnScroll, lastScrollY])

    const state = stateProp || (isHidden ? 'hidden' : 'idle')

    return (
      <button
        ref={ref}
        className={cn(fabVariants({ context, size, state }), className)}
        {...props}
      >
        <div className="flex items-center gap-2">
          <div className="transition-transform group-hover/fab:rotate-12">
            {icon}
          </div>
          {showLabel && label && (
            <span className="whitespace-nowrap font-medium text-sm">
              {label}
            </span>
          )}
        </div>
        
        {/* Ripple effect */}
        <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-active/fab:scale-100 transition-transform duration-150" />
      </button>
    )
  }
)
FloatingActionButton.displayName = "FloatingActionButton"

// ANIMATED METRIC - Numbers count up with water theme
interface AnimatedMetricProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
  formatter?: (value: number) => string
}

export const AnimatedMetric = React.forwardRef<HTMLDivElement, AnimatedMetricProps>(
  ({ value, suffix, prefix, duration = 1000, className, formatter }, ref) => {
    const [displayValue, setDisplayValue] = React.useState(0)
    const [isAnimating, setIsAnimating] = React.useState(false)

    React.useEffect(() => {
      setIsAnimating(true)
      const startTime = Date.now()
      const startValue = displayValue

      const animate = () => {
        const now = Date.now()
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentValue = startValue + (value - startValue) * easeOutQuart

        setDisplayValue(currentValue)

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          setIsAnimating(false)
        }
      }

      requestAnimationFrame(animate)
    }, [value, duration, displayValue])

    const formatValue = (val: number) => {
      if (formatter) return formatter(val)
      return Math.round(val).toLocaleString()
    }

    return (
      <div 
        ref={ref}
        className={cn(
          "tabular-nums transition-all duration-200",
          isAnimating && "animate-pulse-gentle",
          className
        )}
      >
        {prefix}{formatValue(displayValue)}{suffix}
      </div>
    )
  }
)
AnimatedMetric.displayName = "AnimatedMetric"

// LOADING STATES - Various animated loading indicators
const loadingVariants = cva(
  "animate-spin",
  {
    variants: {
      variant: {
        spinner: "border-2 border-current border-t-transparent rounded-full",
        dots: "flex space-x-1",
        pulse: "animate-pulse-gentle",
        water: "animate-water-flow"
      },
      size: {
        sm: "h-4 w-4",
        md: "h-6 w-6",
        lg: "h-8 w-8"
      }
    },
    defaultVariants: {
      variant: "spinner",
      size: "md"
    }
  }
)

export interface LoadingIndicatorProps
  extends VariantProps<typeof loadingVariants> {
  className?: string
}

export const LoadingIndicator = React.forwardRef<HTMLDivElement, LoadingIndicatorProps>(
  ({ variant, size, className }, ref) => {
    if (variant === "dots") {
      return (
        <div ref={ref} className={cn("flex space-x-1", className)}>
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className={cn(
                "rounded-full bg-current",
                size === "sm" ? "h-1.5 w-1.5" : size === "lg" ? "h-3 w-3" : "h-2 w-2",
                "animate-bounce"
              )}
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      )
    }

    if (variant === "water") {
      return (
        <div ref={ref} className={cn("relative", className)}>
          <Droplet className={cn(loadingVariants({ size }), "animate-water-flow text-blue-500")} />
        </div>
      )
    }

    return (
      <div 
        ref={ref}
        className={cn(loadingVariants({ variant, size }), className)}
      />
    )
  }
)
LoadingIndicator.displayName = "LoadingIndicator"

// SUCCESS/ERROR FEEDBACK - Animated state transitions
interface FeedbackProps {
  type: "success" | "error" | "loading"
  message?: string
  duration?: number
  onComplete?: () => void
  className?: string
}

export const AnimatedFeedback = React.forwardRef<HTMLDivElement, FeedbackProps>(
  ({ type, message, duration = 3000, onComplete, className }, ref) => {
    const [isVisible, setIsVisible] = React.useState(true)

    React.useEffect(() => {
      if (type !== "loading" && duration > 0) {
        const timer = setTimeout(() => {
          setIsVisible(false)
          setTimeout(() => onComplete?.(), 300) // Wait for exit animation
        }, duration)

        return () => clearTimeout(timer)
      }
    }, [type, duration, onComplete])

    const icons = {
      success: <Check className="h-5 w-5 text-emerald-600" />,
      error: <X className="h-5 w-5 text-red-600" />,
      loading: <LoadingIndicator variant="spinner" size="sm" />
    }

    const colors = {
      success: "bg-emerald-50 border-emerald-200 text-emerald-800",
      error: "bg-red-50 border-red-200 text-red-800", 
      loading: "bg-blue-50 border-blue-200 text-blue-800"
    }

    return (
      <div
        ref={ref}
        className={cn(
          "fixed bottom-4 right-4 z-50",
          "flex items-center gap-3 px-4 py-3 rounded-lg border",
          "transform transition-all duration-300 ease-out",
          isVisible 
            ? "translate-x-0 opacity-100 scale-100" 
            : "translate-x-full opacity-0 scale-95",
          colors[type],
          className
        )}
      >
        <div className="flex-shrink-0">
          {icons[type]}
        </div>
        {message && (
          <p className="text-sm font-medium">{message}</p>
        )}
      </div>
    )
  }
)
AnimatedFeedback.displayName = "AnimatedFeedback"

// INTERACTIVE BUTTON - Enhanced hover states
const interactiveButtonVariants = cva(
  [
    "relative overflow-hidden",
    "transition-all duration-200 ease-out",
    "transform-gpu", // Hardware acceleration
    "group/btn"
  ],
  {
    variants: {
      effect: {
        none: "",
        glow: "hover:shadow-lg hover:shadow-primary/25",
        lift: "hover:shadow-premium-md hover:-translate-y-0.5",
        shimmer: "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] hover:before:animate-shimmer",
        ripple: "after:absolute after:inset-0 after:bg-white/20 after:scale-0 after:rounded-full active:after:scale-100 after:transition-transform after:duration-150"
      },
      context: {
        executive: "border-context-executive-500/20 hover:border-context-executive-500/40 hover:bg-context-executive-50/30",
        project: "border-context-project-500/20 hover:border-context-project-500/40 hover:bg-context-project-50/30",
        technical: "border-context-technical-500/20 hover:border-context-technical-500/40 hover:bg-context-technical-50/30",
        client: "border-context-client-500/20 hover:border-context-client-500/40 hover:bg-context-client-50/30"
      }
    },
    defaultVariants: {
      effect: "lift",
      context: "executive"
    }
  }
)

export interface InteractiveButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof interactiveButtonVariants> {
  children: React.ReactNode
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
}

export const InteractiveButton = React.forwardRef<HTMLButtonElement, InteractiveButtonProps>(
  ({ 
    className, 
    effect, 
    context, 
    children, 
    icon, 
    iconPosition = "left",
    ...props 
  }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          interactiveButtonVariants({ effect, context }),
          "border",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2">
          {icon && iconPosition === "left" && (
            <span className="transition-transform group-hover/btn:scale-110">
              {icon}
            </span>
          )}
          <span>{children}</span>
          {icon && iconPosition === "right" && (
            <span className="transition-transform group-hover/btn:translate-x-0.5">
              {icon}
            </span>
          )}
        </div>
      </Button>
    )
  }
)
InteractiveButton.displayName = "InteractiveButton"

// WATER ANIMATION - Theme-specific animated background
export const WaterBackground = React.forwardRef<HTMLDivElement, { className?: string }>(
  ({ className }, ref) => (
    <div 
      ref={ref}
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
    >
      <div className="absolute -top-1/2 -left-1/2 w-96 h-96 bg-gradient-radial from-water-200/20 to-transparent animate-water-flow" />
      <div className="absolute -bottom-1/2 -right-1/2 w-96 h-96 bg-gradient-radial from-water-300/15 to-transparent animate-water-flow [animation-delay:2s]" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-radial from-water-400/10 to-transparent animate-pulse-gentle [animation-delay:1s]" />
    </div>
  )
)
WaterBackground.displayName = "WaterBackground"

// Export all variants for external customization
export {
  animatedContainerVariants,
  fabVariants,
  loadingVariants,
  interactiveButtonVariants
}