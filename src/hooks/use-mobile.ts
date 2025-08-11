import * as React from "react"

// Professional breakpoints for H₂O Allegiant platform
const MOBILE_BREAKPOINT = 768   // Mobile: < 768px
const TABLET_BREAKPOINT = 1024  // Tablet: 768px - 1023px
const DESKTOP_BREAKPOINT = 1280 // Desktop: 1024px - 1279px
                                // Large: >= 1280px

export type DeviceType = 'mobile' | 'tablet' | 'desktop' | 'large'
export type SidebarState = 'dashboard-expanded' | 'project-focused' | 'task-minimized' | 'mobile-overlay'

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

export function useDeviceType(): DeviceType {
  const [deviceType, setDeviceType] = React.useState<DeviceType>('desktop')

  React.useEffect(() => {
    const updateDeviceType = () => {
      const width = window.innerWidth
      if (width < MOBILE_BREAKPOINT) {
        setDeviceType('mobile')
      } else if (width < TABLET_BREAKPOINT) {
        setDeviceType('tablet')
      } else if (width < DESKTOP_BREAKPOINT) {
        setDeviceType('desktop')
      } else {
        setDeviceType('large')
      }
    }

    // Set initial value
    updateDeviceType()

    // Create media query listeners for all breakpoints
    const mobileQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const tabletQuery = window.matchMedia(`(min-width: ${MOBILE_BREAKPOINT}px) and (max-width: ${TABLET_BREAKPOINT - 1}px)`)
    const desktopQuery = window.matchMedia(`(min-width: ${TABLET_BREAKPOINT}px) and (max-width: ${DESKTOP_BREAKPOINT - 1}px)`)
    const largeQuery = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`)

    // Add listeners
    mobileQuery.addEventListener("change", updateDeviceType)
    tabletQuery.addEventListener("change", updateDeviceType)
    desktopQuery.addEventListener("change", updateDeviceType)
    largeQuery.addEventListener("change", updateDeviceType)

    // Cleanup
    return () => {
      mobileQuery.removeEventListener("change", updateDeviceType)
      tabletQuery.removeEventListener("change", updateDeviceType)
      desktopQuery.removeEventListener("change", updateDeviceType)
      largeQuery.removeEventListener("change", updateDeviceType)
    }
  }, [])

  return deviceType
}

export function useSidebarState(): {
  suggestedState: SidebarState
  adaptiveState: SidebarState
  deviceType: DeviceType
  isMobile: boolean
} {
  const deviceType = useDeviceType()
  const isMobile = useIsMobile()
  
  const suggestedState = React.useMemo((): SidebarState => {
    if (deviceType === 'mobile') {
      return 'mobile-overlay'
    }
    
    if (deviceType === 'tablet') {
      return 'task-minimized'
    }
    
    if (deviceType === 'desktop') {
      return 'project-focused'
    }
    
    // Large screens get full dashboard experience
    return 'dashboard-expanded'
  }, [deviceType])

  return {
    suggestedState,
    adaptiveState: suggestedState,
    deviceType,
    isMobile
  }
}
