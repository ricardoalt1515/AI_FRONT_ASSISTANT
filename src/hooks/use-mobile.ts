import * as React from "react"

// Professional breakpoints for H₂O Allegiant platform
const MOBILE_BREAKPOINT = 768   // Mobile: < 768px
const TABLET_BREAKPOINT = 1024  // Tablet: 768px - 1023px
const DESKTOP_BREAKPOINT = 1280 // Desktop: 1024px - 1279px
                                // Large: >= 1280px

export type DeviceType = 'mobile' | 'tablet' | 'desktop' | 'large'
// Simplified sidebar states
export type SidebarState = 'expanded' | 'collapsed' | 'auto'

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

// Simplified sidebar persistence with localStorage + cookie fallback
const SIDEBAR_STORAGE_KEY = 'h2o-sidebar-state'
const SIDEBAR_COOKIE_NAME = 'sidebar_state'

export function useSidebarPersistence() {
  const [state, setState] = React.useState<SidebarState>('auto')
  const deviceType = useDeviceType()
  const isMobile = useIsMobile()

  // Load persisted state on mount
  React.useEffect(() => {
    const loadPersistedState = () => {
      try {
        // Try localStorage first
        const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY)
        if (stored && ['expanded', 'collapsed', 'auto'].includes(stored)) {
          setState(stored as SidebarState)
          return
        }
      } catch {
        // Fallback to cookies if localStorage fails
        const cookieValue = document.cookie
          .split('; ')
          .find(row => row.startsWith(SIDEBAR_COOKIE_NAME + '='))
          ?.split('=')[1]
        
        if (cookieValue && ['expanded', 'collapsed', 'auto'].includes(cookieValue)) {
          setState(cookieValue as SidebarState)
          return
        }
      }
      
      // Default to auto for responsive behavior
      setState('auto')
    }

    loadPersistedState()
  }, [])

  // Persist state changes
  const setPersistedState = React.useCallback((newState: SidebarState) => {
    setState(newState)
    
    try {
      localStorage.setItem(SIDEBAR_STORAGE_KEY, newState)
    } catch {
      // Fallback to cookie
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${newState}; path=/; max-age=${60 * 60 * 24 * 7}`
    }
  }, [])

  // Resolve actual state based on preference and device
  const resolvedState = React.useMemo((): SidebarState => {
    if (state === 'auto') {
      // Auto mode: responsive behavior
      if (isMobile) return 'collapsed'
      if (deviceType === 'tablet') return 'collapsed'
      return 'expanded'
    }
    
    // Respect user preference, but collapse on mobile regardless
    if (isMobile) return 'collapsed'
    return state
  }, [state, deviceType, isMobile])

  return {
    state: resolvedState,
    userPreference: state,
    deviceType,
    isMobile,
    setState: setPersistedState
  }
}
