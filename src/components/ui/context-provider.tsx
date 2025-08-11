"use client";

import { createContext, useContext, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

// Context types for different dashboard views
export type DashboardContext = 'executive' | 'project' | 'technical' | 'client';

interface DashboardContextProviderProps {
  context: DashboardContext;
  children: ReactNode;
}

interface DashboardContextType {
  context: DashboardContext;
  theme: {
    primary: string;
    accent: string;
    background: string;
    cardBackground: string;
    border: string;
  };
  layout: {
    spacing: string;
    cardSize: string;
    typography: string;
  };
}

// Create context
const DashboardContextContext = createContext<DashboardContextType | null>(null);

// Context configurations
const contextConfigs: Record<DashboardContext, DashboardContextType['theme']> = {
  executive: {
    primary: 'oklch(0.15 0.01 240)', // Deep navy
    accent: 'oklch(0.75 0.18 75)',   // Gold
    background: 'oklch(0.98 0.005 240)',
    cardBackground: 'oklch(1 0 0)',
    border: 'oklch(0.9 0.01 240)'
  },
  project: {
    primary: 'oklch(0.55 0.18 220)', // Water blue
    accent: 'oklch(0.65 0.15 190)',  // Teal
    background: 'oklch(0.995 0.002 220)',
    cardBackground: 'oklch(1 0 0)',
    border: 'oklch(0.92 0.01 220)'
  },
  technical: {
    primary: 'oklch(0.45 0.15 150)', // Technical green
    accent: 'oklch(0.55 0.18 120)',  // Emerald
    background: 'oklch(0.98 0.005 150)',
    cardBackground: 'oklch(0.99 0.002 150)',
    border: 'oklch(0.9 0.01 150)'
  },
  client: {
    primary: 'oklch(0.5 0.2 280)',   // Professional purple
    accent: 'oklch(0.6 0.15 260)',   // Indigo
    background: 'oklch(0.985 0.005 280)',
    cardBackground: 'oklch(1 0 0)',
    border: 'oklch(0.92 0.01 280)'
  }
};

const layoutConfigs: Record<DashboardContext, DashboardContextType['layout']> = {
  executive: {
    spacing: 'space-y-8',
    cardSize: 'h-32',
    typography: 'text-display-lg'
  },
  project: {
    spacing: 'space-y-6',
    cardSize: 'h-28',
    typography: 'text-display-md'
  },
  technical: {
    spacing: 'space-y-4',
    cardSize: 'h-24',
    typography: 'text-display-sm'
  },
  client: {
    spacing: 'space-y-6',
    cardSize: 'h-28',
    typography: 'text-display-md'
  }
};

// Context variants for shadcn-style components
export const contextVariants = cva(
  "transition-all duration-300 ease-out",
  {
    variants: {
      context: {
        executive: [
          "bg-gradient-to-br from-slate-950 to-slate-900",
          "text-slate-50",
          "border-l-4 border-l-amber-500"
        ],
        project: [
          "bg-gradient-to-br from-blue-50 to-cyan-50", 
          "text-slate-900",
          "border-l-4 border-l-blue-500"
        ],
        technical: [
          "bg-gradient-to-br from-emerald-50 to-green-50",
          "text-slate-900", 
          "border-l-4 border-l-emerald-500"
        ],
        client: [
          "bg-gradient-to-br from-purple-50 to-indigo-50",
          "text-slate-900",
          "border-l-4 border-l-purple-500"
        ]
      },
      elevation: {
        flat: "shadow-none",
        low: "shadow-sm",
        medium: "shadow-md hover:shadow-lg",
        high: "shadow-lg hover:shadow-xl"
      }
    },
    defaultVariants: {
      context: "executive",
      elevation: "medium"
    }
  }
);

export type ContextVariantProps = VariantProps<typeof contextVariants>;

// Provider component
export function DashboardContextProvider({ 
  context, 
  children 
}: DashboardContextProviderProps) {
  const contextValue: DashboardContextType = {
    context,
    theme: contextConfigs[context],
    layout: layoutConfigs[context]
  };

  return (
    <DashboardContextContext.Provider value={contextValue}>
      <div 
        className={contextVariants({ context })}
        style={{
          '--context-primary': contextValue.theme.primary,
          '--context-accent': contextValue.theme.accent,
          '--context-background': contextValue.theme.background,
          '--context-card-bg': contextValue.theme.cardBackground,
          '--context-border': contextValue.theme.border,
        } as React.CSSProperties}
      >
        {children}
      </div>
    </DashboardContextContext.Provider>
  );
}

// Custom hook to use dashboard context
export function useDashboardContext() {
  const context = useContext(DashboardContextContext);
  
  if (!context) {
    throw new Error('useDashboardContext must be used within DashboardContextProvider');
  }
  
  return context;
}

// Utility function for context-aware styling
export function getContextClasses(context: DashboardContext, variant?: string) {
  const base = contextVariants({ context });
  
  const contextSpecific = {
    executive: {
      card: "bg-slate-900/50 border-amber-500/20 text-slate-50",
      button: "bg-amber-500 hover:bg-amber-600 text-slate-900",
      text: "text-slate-50",
      accent: "text-amber-400"
    },
    project: {
      card: "bg-white border-blue-500/20 text-slate-900",
      button: "bg-blue-500 hover:bg-blue-600 text-white", 
      text: "text-slate-900",
      accent: "text-blue-600"
    },
    technical: {
      card: "bg-white border-emerald-500/20 text-slate-900",
      button: "bg-emerald-500 hover:bg-emerald-600 text-white",
      text: "text-slate-900", 
      accent: "text-emerald-600"
    },
    client: {
      card: "bg-white border-purple-500/20 text-slate-900",
      button: "bg-purple-500 hover:bg-purple-600 text-white",
      text: "text-slate-900",
      accent: "text-purple-600"
    }
  };

  return variant 
    ? contextSpecific[context][variant as keyof typeof contextSpecific[DashboardContext]] 
    : base;
}