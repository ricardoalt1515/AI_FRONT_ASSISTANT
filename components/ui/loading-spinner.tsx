"use client"

import { cn } from "@/lib/utils"
import { Loader2, Droplets } from "lucide-react"

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'primary' | 'water'
  className?: string
  text?: string
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12'
}

const variantClasses = {
  default: 'text-muted-foreground',
  primary: 'text-primary',
  water: 'text-blue-500'
}

export function LoadingSpinner({
  size = 'md',
  variant = 'default',
  className,
  text
}: LoadingSpinnerProps) {
  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      {variant === 'water' ? (
        <Droplets className={cn(
          sizeClasses[size],
          variantClasses[variant],
          "animate-pulse"
        )} />
      ) : (
        <Loader2 className={cn(
          sizeClasses[size],
          variantClasses[variant],
          "animate-spin"
        )} />
      )}
      {text && (
        <p className="text-sm text-muted-foreground animate-pulse">
          {text}
        </p>
      )}
    </div>
  )
}

export function PageLoader({ text = "Cargando..." }: { text?: string }) {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <LoadingSpinner size="xl" variant="primary" text={text} />
    </div>
  )
}

export function InlineLoader({ text }: { text?: string }) {
  return (
    <div className="flex items-center justify-center p-8">
      <LoadingSpinner variant="primary" text={text} />
    </div>
  )
}