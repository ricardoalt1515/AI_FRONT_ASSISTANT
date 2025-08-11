"use client"

// =============================================================================
// H₂O Allegiant - Component System Provider
// =============================================================================

import React, { createContext, useContext, ReactNode } from 'react'
import { designTokens, componentConfig, getResponsiveClasses } from '@/lib/component-config'
import { useDeviceType } from '@/hooks/use-mobile'
import type { DeviceType } from '@/hooks/use-mobile'

interface ComponentContextValue {
  designTokens: typeof designTokens
  componentConfig: typeof componentConfig
  deviceType: DeviceType
  responsiveClasses: string
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isLarge: boolean
}

const ComponentContext = createContext<ComponentContextValue | undefined>(undefined)

interface ComponentProviderProps {
  children: ReactNode
}

export function ComponentProvider({ children }: ComponentProviderProps) {
  const deviceType = useDeviceType()
  const responsiveClasses = getResponsiveClasses(deviceType)
  
  const value: ComponentContextValue = {
    designTokens,
    componentConfig,
    deviceType,
    responsiveClasses,
    isMobile: deviceType === 'mobile',
    isTablet: deviceType === 'tablet', 
    isDesktop: deviceType === 'desktop',
    isLarge: deviceType === 'large',
  }

  return (
    <ComponentContext.Provider value={value}>
      <div className={responsiveClasses} data-device={deviceType}>
        {children}
      </div>
    </ComponentContext.Provider>
  )
}

export function useComponentContext() {
  const context = useContext(ComponentContext)
  if (context === undefined) {
    throw new Error('useComponentContext must be used within a ComponentProvider')
  }
  return context
}

// Convenience hooks
export function useResponsive() {
  const { isMobile, isTablet, isDesktop, isLarge, deviceType } = useComponentContext()
  return { isMobile, isTablet, isDesktop, isLarge, deviceType }
}

export function useDesignTokens() {
  const { designTokens } = useComponentContext()
  return designTokens
}

export function useComponentConfig() {
  const { componentConfig } = useComponentContext()
  return componentConfig
}