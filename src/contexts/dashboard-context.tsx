"use client";

import React, { createContext, useContext, ReactNode } from 'react';

/**
 * Dashboard Context Types & Configuration
 * Provides modular architecture for different dashboard variants
 */

export type DashboardType = 
  | 'executive' 
  | 'project-manager' 
  | 'engineering' 
  | 'client-portal';

export type ViewDensity = 'comfortable' | 'compact' | 'minimal';
export type MetricsLayout = 'grid' | 'horizontal' | 'minimal';

export interface DashboardConfig {
  type: DashboardType;
  title: string;
  subtitle: string;
  density: ViewDensity;
  
  // Feature flags for progressive disclosure
  features: {
    showAdvancedMetrics: boolean;
    showDetailedProjects: boolean;
    showBulkActions: boolean;
    showAnalytics: boolean;
    enableRealTime: boolean;
  };
  
  // Layout configuration
  layout: {
    metricsLayout: MetricsLayout;
    maxVisibleProjects: number;
    maxVisibleActions: number;
    enableGridView: boolean;
    enableListView: boolean;
    enableAnalyticsView: boolean;
  };
  
  // Theme and styling
  theme: {
    primaryColor: string;
    accentColor: string;
    backgroundGradient: string;
    cardVariant: 'default' | 'premium' | 'minimal';
  };
  
  // Permissions and access control
  permissions: {
    canCreateProjects: boolean;
    canModifyProjects: boolean;
    canViewFinancials: boolean;
    canAccessAnalytics: boolean;
  };
}

// Pre-configured dashboard types
const DASHBOARD_CONFIGS: Record<DashboardType, DashboardConfig> = {
  'executive': {
    type: 'executive',
    title: 'Dashboard Ejecutivo',
    subtitle: 'Vista general estratégica de todos los proyectos',
    density: 'comfortable',
    features: {
      showAdvancedMetrics: true,
      showDetailedProjects: false,
      showBulkActions: true,
      showAnalytics: true,
      enableRealTime: true,
    },
    layout: {
      metricsLayout: 'grid',
      maxVisibleProjects: 6,
      maxVisibleActions: 3,
      enableGridView: true,
      enableListView: true,
      enableAnalyticsView: true,
    },
    theme: {
      primaryColor: 'bg-water-primary',
      accentColor: 'bg-water-accent',
      backgroundGradient: 'from-slate-50 to-blue-50',
      cardVariant: 'premium',
    },
    permissions: {
      canCreateProjects: true,
      canModifyProjects: true,
      canViewFinancials: true,
      canAccessAnalytics: true,
    },
  },
  
  'project-manager': {
    type: 'project-manager',
    title: 'Dashboard de Gestión',
    subtitle: 'Gestiona proyectos activos y seguimiento operacional',
    density: 'compact',
    features: {
      showAdvancedMetrics: true,
      showDetailedProjects: true,
      showBulkActions: true,
      showAnalytics: false,
      enableRealTime: true,
    },
    layout: {
      metricsLayout: 'horizontal',
      maxVisibleProjects: 8,
      maxVisibleActions: 5,
      enableGridView: true,
      enableListView: true,
      enableAnalyticsView: false,
    },
    theme: {
      primaryColor: 'bg-emerald-600',
      accentColor: 'bg-emerald-500',
      backgroundGradient: 'from-emerald-50 to-green-50',
      cardVariant: 'default',
    },
    permissions: {
      canCreateProjects: true,
      canModifyProjects: true,
      canViewFinancials: false,
      canAccessAnalytics: false,
    },
  },
  
  'engineering': {
    type: 'engineering',
    title: 'Dashboard Técnico',
    subtitle: 'Seguimiento técnico y especificaciones de ingeniería',
    density: 'compact',
    features: {
      showAdvancedMetrics: false,
      showDetailedProjects: true,
      showBulkActions: false,
      showAnalytics: false,
      enableRealTime: false,
    },
    layout: {
      metricsLayout: 'minimal',
      maxVisibleProjects: 6,
      maxVisibleActions: 3,
      enableGridView: true,
      enableListView: true,
      enableAnalyticsView: false,
    },
    theme: {
      primaryColor: 'bg-indigo-600',
      accentColor: 'bg-indigo-500',
      backgroundGradient: 'from-indigo-50 to-purple-50',
      cardVariant: 'default',
    },
    permissions: {
      canCreateProjects: false,
      canModifyProjects: true,
      canViewFinancials: false,
      canAccessAnalytics: false,
    },
  },
  
  'client-portal': {
    type: 'client-portal',
    title: 'Portal de Cliente',
    subtitle: 'Seguimiento del progreso de sus proyectos',
    density: 'minimal',
    features: {
      showAdvancedMetrics: false,
      showDetailedProjects: false,
      showBulkActions: false,
      showAnalytics: false,
      enableRealTime: false,
    },
    layout: {
      metricsLayout: 'minimal',
      maxVisibleProjects: 4,
      maxVisibleActions: 2,
      enableGridView: true,
      enableListView: false,
      enableAnalyticsView: false,
    },
    theme: {
      primaryColor: 'bg-blue-600',
      accentColor: 'bg-blue-500',
      backgroundGradient: 'from-blue-50 to-slate-50',
      cardVariant: 'minimal',
    },
    permissions: {
      canCreateProjects: false,
      canModifyProjects: false,
      canViewFinancials: false,
      canAccessAnalytics: false,
    },
  },
};

interface DashboardContextType {
  config: DashboardConfig;
  updateDensity: (density: ViewDensity) => void;
  updateMetricsLayout: (layout: MetricsLayout) => void;
  toggleFeature: (feature: keyof DashboardConfig['features']) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

interface DashboardProviderProps {
  children: ReactNode;
  dashboardType?: DashboardType;
  customConfig?: Partial<DashboardConfig>;
}

export function DashboardProvider({ 
  children, 
  dashboardType = 'executive',
  customConfig = {}
}: DashboardProviderProps) {
  const baseConfig = DASHBOARD_CONFIGS[dashboardType];
  
  // Merge base config with custom overrides
  const [config, setConfig] = React.useState<DashboardConfig>({
    ...baseConfig,
    ...customConfig,
    features: { ...baseConfig.features, ...customConfig.features },
    layout: { ...baseConfig.layout, ...customConfig.layout },
    theme: { ...baseConfig.theme, ...customConfig.theme },
    permissions: { ...baseConfig.permissions, ...customConfig.permissions },
  });

  const updateDensity = React.useCallback((density: ViewDensity) => {
    setConfig(prev => ({ ...prev, density }));
  }, []);

  const updateMetricsLayout = React.useCallback((metricsLayout: MetricsLayout) => {
    setConfig(prev => ({ 
      ...prev, 
      layout: { ...prev.layout, metricsLayout } 
    }));
  }, []);

  const toggleFeature = React.useCallback((feature: keyof DashboardConfig['features']) => {
    setConfig(prev => ({ 
      ...prev, 
      features: { 
        ...prev.features, 
        [feature]: !prev.features[feature] 
      } 
    }));
  }, []);

  const contextValue: DashboardContextType = {
    config,
    updateDensity,
    updateMetricsLayout,
    toggleFeature,
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}

// Utility hooks for common operations
export function useDashboardFeatures() {
  const { config } = useDashboard();
  return config.features;
}

export function useDashboardLayout() {
  const { config } = useDashboard();
  return config.layout;
}

export function useDashboardTheme() {
  const { config } = useDashboard();
  return config.theme;
}

export function useDashboardPermissions() {
  const { config } = useDashboard();
  return config.permissions;
}

// Utility function for route-based context detection
export function getDashboardTypeFromRoute(pathname: string): DashboardType {
  if (pathname.includes('/executive')) return 'executive';
  if (pathname.includes('/engineering')) return 'engineering';
  if (pathname.includes('/client')) return 'client-portal';
  return 'project-manager'; // default
}