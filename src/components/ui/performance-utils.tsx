"use client"

import React, { Suspense, lazy, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { ContextCard } from './context-card'

/**
 * Performance Optimization Utilities for shadcn/ui + Tailwind
 * Implements code splitting, lazy loading, and efficient rendering patterns
 */

// LAZY LOADING WRAPPER - Optimized for shadcn components
interface LazyComponentProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  className?: string
  errorBoundary?: React.ComponentType<{ children: React.ReactNode }>
}

export const LazyWrapper = React.memo<LazyComponentProps>(({ 
  children, 
  fallback, 
  className,
  errorBoundary: ErrorBoundary 
}) => {
  const defaultFallback = useMemo(() => (
    <div className={cn("animate-pulse", className)}>
      <Skeleton className="h-40 w-full rounded-xl" />
    </div>
  ), [className])

  const content = (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  )

  if (ErrorBoundary) {
    return <ErrorBoundary>{content}</ErrorBoundary>
  }

  return content
})
LazyWrapper.displayName = "LazyWrapper"

// VIRTUAL SCROLLING for large datasets (using react-window optimization)
interface VirtualListProps {
  items: unknown[]
  itemHeight: number
  renderItem: (index: number, item: unknown) => React.ReactNode
  containerHeight?: number
  className?: string
  gap?: number
}

export const VirtualList = React.memo<VirtualListProps>(({ 
  items, 
  itemHeight, 
  renderItem, 
  containerHeight = 400,
  gap = 0,
  className 
}) => {
  const [scrollTop, setScrollTop] = React.useState(0)
  const [containerRef, setContainerRef] = React.useState<HTMLDivElement | null>(null)
  
  const visibleRange = useMemo(() => {
    if (!containerRef) return { start: 0, end: Math.min(10, items.length) }
    
    const start = Math.floor(scrollTop / (itemHeight + gap))
    const visibleCount = Math.ceil(containerHeight / (itemHeight + gap))
    const end = Math.min(start + visibleCount + 2, items.length) // +2 for buffer
    
    return { start: Math.max(0, start - 1), end } // -1 for buffer
  }, [scrollTop, itemHeight, gap, containerHeight, items.length])

  const totalHeight = items.length * (itemHeight + gap)
  const offsetY = visibleRange.start * (itemHeight + gap)

  const handleScroll = React.useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop)
  }, [])

  return (
    <div
      ref={setContainerRef}
      className={cn("overflow-auto", className)}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div 
          style={{ 
            transform: `translateY(${offsetY}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          {items.slice(visibleRange.start, visibleRange.end).map((item, index) => {
            const actualIndex = visibleRange.start + index
            return (
              <div 
                key={actualIndex}
                style={{ 
                  height: itemHeight,
                  marginBottom: gap 
                }}
              >
                {renderItem(actualIndex, item)}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
})
VirtualList.displayName = "VirtualList"

// INTERSECTION OBSERVER - For lazy loading images and components
interface IntersectionWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  rootMargin?: string
  threshold?: number
  className?: string
  onIntersect?: () => void
}

export const IntersectionWrapper = React.memo<IntersectionWrapperProps>(({
  children,
  fallback,
  rootMargin = "50px",
  threshold = 0.1,
  className,
  onIntersect
}) => {
  const [isVisible, setIsVisible] = React.useState(false)
  const [hasIntersected, setHasIntersected] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasIntersected) {
          setIsVisible(true)
          setHasIntersected(true)
          onIntersect?.()
        }
      },
      { rootMargin, threshold }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [rootMargin, threshold, hasIntersected, onIntersect])

  return (
    <div ref={ref} className={className}>
      {isVisible ? children : (fallback || <Skeleton className="h-20 w-full" />)}
    </div>
  )
})
IntersectionWrapper.displayName = "IntersectionWrapper"

// MEMOIZED CARD GRID - Optimized for large datasets
interface MemoizedCardGridProps {
  items: Array<{
    id: string
    title: string
    description?: string
    data?: Record<string, unknown>
  }>
  renderCard: (item: MemoizedCardGridProps['items'][0], index: number) => React.ReactNode
  columns?: 1 | 2 | 3 | 4 | 6
  gap?: 2 | 3 | 4 | 6 | 8
  className?: string
  virtualized?: boolean
  itemHeight?: number
}

export const MemoizedCardGrid = React.memo<MemoizedCardGridProps>(({
  items,
  renderCard,
  columns = 3,
  gap = 4,
  className,
  virtualized = false,
  itemHeight = 200
}) => {
  const gridClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    6: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
  }

  const gapClasses = {
    2: "gap-2",
    3: "gap-3", 
    4: "gap-4",
    6: "gap-6",
    8: "gap-8"
  }

  if (virtualized && items.length > 50) {
    return (
      <VirtualList
        items={items}
        itemHeight={itemHeight}
        renderItem={(index, item) => renderCard(item as typeof items[0], index)}
        className={className}
      />
    )
  }

  return (
    <div className={cn("grid", gridClasses[columns], gapClasses[gap], className)}>
      {items.map((item, index) => (
        <React.Fragment key={item.id}>
          {renderCard(item, index)}
        </React.Fragment>
      ))}
    </div>
  )
}, (prevProps, nextProps) => {
  // Custom comparison for better performance
  return (
    prevProps.items.length === nextProps.items.length &&
    prevProps.columns === nextProps.columns &&
    prevProps.gap === nextProps.gap &&
    prevProps.className === nextProps.className &&
    // Deep comparison only for changed items
    prevProps.items.every((item, index) => 
      nextProps.items[index] && 
      item.id === nextProps.items[index].id &&
      item.title === nextProps.items[index].title
    )
  )
})
MemoizedCardGrid.displayName = "MemoizedCardGrid"

// DEBOUNCED INPUT - For search and filtering
interface DebouncedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onDebouncedChange: (value: string) => void
  debounceMs?: number
}

export const DebouncedInput = React.memo<DebouncedInputProps>(({
  onDebouncedChange,
  debounceMs = 300,
  ...props
}) => {
  const [value, setValue] = React.useState(props.value || '')
  const timeoutRef = React.useRef<NodeJS.Timeout>()

  React.useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      onDebouncedChange(value as string)
    }, debounceMs)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [value, debounceMs, onDebouncedChange])

  React.useEffect(() => {
    setValue(props.value || '')
  }, [props.value])

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
})
DebouncedInput.displayName = "DebouncedInput"

// OPTIMIZED IMAGE - With lazy loading and WebP support
interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  fallback?: string
  webpSrc?: string
  priority?: boolean
  onLoad?: () => void
  onError?: () => void
}

export const OptimizedImage = React.memo<OptimizedImageProps>(({
  src,
  alt,
  fallback,
  webpSrc,
  priority = false,
  onLoad,
  onError,
  className,
  ...props
}) => {
  const [imageSrc, setImageSrc] = React.useState<string>()
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [hasError, setHasError] = React.useState(false)
  const imgRef = React.useRef<HTMLImageElement>(null)

  React.useEffect(() => {
    if (priority) {
      setImageSrc(webpSrc || src)
    }
  }, [src, webpSrc, priority])

  const handleIntersect = React.useCallback(() => {
    if (!imageSrc && !priority) {
      setImageSrc(webpSrc || src)
    }
  }, [imageSrc, priority, src, webpSrc])

  const handleLoad = React.useCallback(() => {
    setIsLoaded(true)
    onLoad?.()
  }, [onLoad])

  const handleError = React.useCallback(() => {
    if (webpSrc && imageSrc === webpSrc) {
      // Fallback to regular image if WebP fails
      setImageSrc(src)
    } else if (fallback) {
      setImageSrc(fallback)
    } else {
      setHasError(true)
    }
    onError?.()
  }, [webpSrc, imageSrc, src, fallback, onError])

  if (hasError && !fallback) {
    return (
      <div className={cn("bg-muted flex items-center justify-center text-muted-foreground text-sm", className)}>
        Image failed to load
      </div>
    )
  }

  const imageElement = (
    <>
      {!isLoaded && (
        <Skeleton className={cn("absolute inset-0", className)} />
      )}
      {imageSrc && (
        <img
          ref={imgRef}
          src={imageSrc}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "transition-opacity duration-200",
            isLoaded ? "opacity-100" : "opacity-0",
            className
          )}
          {...props}
        />
      )}
    </>
  )

  if (priority) {
    return (
      <div className="relative">
        {imageElement}
      </div>
    )
  }

  return (
    <IntersectionWrapper onIntersect={handleIntersect}>
      <div className="relative">
        {imageElement}
      </div>
    </IntersectionWrapper>
  )
})
OptimizedImage.displayName = "OptimizedImage"

// PERFORMANCE MONITOR - Development helper
interface PerformanceMonitorProps {
  name: string
  children: React.ReactNode
  enabled?: boolean
}

export const PerformanceMonitor = React.memo<PerformanceMonitorProps>(({
  name,
  children,
  enabled = process.env.NODE_ENV === 'development'
}) => {
  React.useEffect(() => {
    if (!enabled) return

    const startTime = performance.now()
    
    return () => {
      const endTime = performance.now()
      console.log(`[Performance] ${name} rendered in ${(endTime - startTime).toFixed(2)}ms`)
    }
  }, [name, enabled])

  return <>{children}</>
})
PerformanceMonitor.displayName = "PerformanceMonitor"