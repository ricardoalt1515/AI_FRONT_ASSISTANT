// =============================================================================
// H₂O Allegiant - Component Configuration System
// =============================================================================

import type { DeviceType, SidebarState } from '@/hooks/use-mobile'
import type { ProjectStatus } from '@/lib/mock-data'

// Design System Tokens
export const designTokens = {
  // Professional Water Treatment Color Palette (OKLCH)
  colors: {
    primary: {
      50: 'oklch(96.42% 0.008 241.81)',
      100: 'oklch(92.43% 0.019 241.39)',
      500: 'oklch(63.09% 0.176 241.72)',
      600: 'oklch(54.63% 0.184 241.69)',
      900: 'oklch(25.41% 0.104 242.33)',
    },
    accent: {
      50: 'oklch(96.78% 0.007 179.66)',
      100: 'oklch(93.08% 0.016 179.31)',
      500: 'oklch(70.89% 0.118 179.29)',
      600: 'oklch(63.55% 0.123 178.84)',
    },
    water: {
      light: 'oklch(87.24% 0.074 208.33)',
      medium: 'oklch(72.06% 0.142 225.83)',
      deep: 'oklch(45.2% 0.176 241.72)',
    }
  },
  
  // Professional Breakpoints for Water Treatment Industry
  breakpoints: {
    mobile: { min: 0, max: 767 },
    tablet: { min: 768, max: 1023 },
    desktop: { min: 1024, max: 1535 },
    large: { min: 1536, max: Infinity },
  },
  
  // Spacing Scale (optimized for engineering interfaces)
  spacing: {
    xs: '0.5rem',   // 8px
    sm: '0.75rem',  // 12px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    xl: '2rem',     // 32px
    '2xl': '3rem',  // 48px
  },
  
  // Typography Scale (professional/technical)
  typography: {
    display: {
      lg: 'text-4xl font-bold tracking-tight',
      md: 'text-3xl font-bold tracking-tight',
      sm: 'text-2xl font-bold tracking-tight',
    },
    heading: {
      lg: 'text-xl font-semibold',
      md: 'text-lg font-semibold',
      sm: 'text-base font-semibold',
    },
    body: {
      lg: 'text-base',
      md: 'text-sm',
      sm: 'text-xs',
    }
  }
} as const

// Component Variants System
export const componentVariants = {
  // Status-based styling for water treatment projects
  status: {
    proposal: {
      color: 'bg-gradient-to-r from-amber-400 to-orange-400',
      textColor: 'text-amber-700',
      bgLight: 'bg-amber-50',
      borderColor: 'border-amber-200',
    },
    engineering: {
      color: 'bg-gradient-to-r from-emerald-400 to-green-400',
      textColor: 'text-emerald-700',
      bgLight: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
    },
    procurement: {
      color: 'bg-gradient-to-r from-purple-400 to-indigo-400',
      textColor: 'text-purple-700',
      bgLight: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
    execution: {
      color: 'bg-gradient-to-r from-blue-400 to-cyan-400',
      textColor: 'text-blue-700',
      bgLight: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    completed: {
      color: 'bg-gradient-to-r from-green-500 to-emerald-500',
      textColor: 'text-green-700',
      bgLight: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    paused: {
      color: 'bg-gradient-to-r from-red-400 to-rose-400',
      textColor: 'text-red-700',
      bgLight: 'bg-red-50',
      borderColor: 'border-red-200',
    },
  },
  
  // Priority system for engineering projects
  priority: {
    low: { color: 'text-green-600', emoji: '🟢', bg: 'bg-green-50' },
    medium: { color: 'text-yellow-600', emoji: '🟡', bg: 'bg-yellow-50' },
    high: { color: 'text-orange-600', emoji: '🔴', bg: 'bg-orange-50' },
    critical: { color: 'text-red-600', emoji: '🚨', bg: 'bg-red-50' },
  },
} as const

// Adaptive Layout Configuration
export const layoutConfig = {
  sidebar: {
    'dashboard-expanded': {
      width: 'w-80',
      padding: 'p-6',
      showLabels: true,
      showProjects: true,
      showMetrics: true,
    },
    'project-focused': {
      width: 'w-72',
      padding: 'p-4',
      showLabels: true,
      showProjects: false,
      showMetrics: false,
    },
    'task-minimized': {
      width: 'w-16',
      padding: 'p-2',
      showLabels: false,
      showProjects: false,
      showMetrics: false,
    },
    'mobile-overlay': {
      width: 'w-80',
      padding: 'p-4',
      showLabels: true,
      showProjects: true,
      showMetrics: true,
    },
  } as Record<SidebarState, {
    width: string
    padding: string
    showLabels: boolean
    showProjects: boolean
    showMetrics: boolean
  }>,
  
  // Content padding based on context
  content: {
    dashboard: {
      mobile: 'px-4 py-3',
      tablet: 'px-6 py-5',
      desktop: 'px-8 py-6',
    },
    project: {
      mobile: 'px-4 py-3',
      tablet: 'px-6 py-4',
      desktop: 'px-8 py-5',
    },
  } as Record<string, Record<DeviceType, string>>,
} as const

// Component-specific configurations
export const componentConfig = {
  // Metrics cards configuration
  metricsCard: {
    kpis: [
      { key: 'activeProjects', label: 'Proyectos Activos', icon: 'Building2' },
      { key: 'totalValue', label: 'Valor Total', icon: 'DollarSign' },
      { key: 'averageProgress', label: 'Progreso Promedio', icon: 'TrendingUp' },
    ],
    animations: {
      duration: 300,
      easing: 'ease-out',
    },
  },
  
  // Chat configuration
  chat: {
    maxMessages: 100,
    typing: {
      duration: 1000,
      dots: 3,
    },
    avatar: {
      size: 32,
      fallback: 'H₂O',
    },
  },
  
  // Project cards configuration
  projectCard: {
    showMetrics: ['progress', 'financial', 'status'],
    truncateAt: 60,
    showTeam: true,
  },
} as const

// Utility functions for component configuration
export const getStatusConfig = (status: ProjectStatus) => {
  return componentVariants.status[status] || componentVariants.status.proposal
}

export const getLayoutConfig = (state: SidebarState) => {
  return layoutConfig.sidebar[state] || layoutConfig.sidebar['dashboard-expanded']
}

export const getContentPadding = (context: string, deviceType: DeviceType) => {
  return layoutConfig.content[context]?.[deviceType] || layoutConfig.content.dashboard[deviceType]
}

export const formatCurrency = (value: number): string => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`
  return `$${value.toLocaleString()}`
}

export const getResponsiveClasses = (deviceType: DeviceType) => {
  switch (deviceType) {
    case 'mobile':
      return 'mobile-layout text-sm space-y-3'
    case 'tablet':
      return 'tablet-layout text-base space-y-4'
    case 'desktop':
      return 'desktop-layout text-base space-y-6'
    case 'large':
      return 'large-layout text-lg space-y-8'
    default:
      return 'desktop-layout text-base space-y-6'
  }
}