// H₂O Allegiant Design System
// Centralized design tokens for consistent UI

export const colors = {
  // Phase-specific colors
  discovery: {
    50: '#eff6ff',
    100: '#dbeafe', 
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    900: '#1e3a8a'
  },
  proposal: {
    50: '#f0fdf4',
    100: '#dcfce7',
    500: '#22c55e', 
    600: '#16a34a',
    700: '#15803d',
    900: '#14532d'
  },
  engineering: {
    50: '#faf5ff',
    100: '#f3e8ff',
    500: '#a855f7',
    600: '#9333ea', 
    700: '#7c3aed',
    900: '#581c87'
  },
  procurement: {
    50: '#fff7ed',
    100: '#ffedd5',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c', 
    900: '#9a3412'
  },
  // Status colors
  success: {
    50: '#f0fdf4',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d'
  },
  warning: {
    50: '#fffbeb', 
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309'
  },
  error: {
    50: '#fef2f2',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c'
  }
} as const;

export const spacing = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px  
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
  '3xl': '4rem'     // 64px
} as const;

export const typography = {
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px  
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem'  // 30px
  },
  fontWeight: {
    normal: '400',
    medium: '500', 
    semibold: '600',
    bold: '700'
  }
} as const;

export const borderRadius = {
  sm: '0.125rem',    // 2px
  md: '0.375rem',    // 6px
  lg: '0.5rem',      // 8px
  xl: '0.75rem'      // 12px
} as const;

// Phase color utilities
export function getPhaseColors(phase: 'discovery' | 'proposal' | 'engineering' | 'procurement') {
  switch (phase) {
    case 'discovery':
      return colors.discovery;
    case 'proposal': 
      return colors.proposal;
    case 'engineering':
      return colors.engineering;
    case 'procurement':
      return colors.procurement;
    default:
      return colors.discovery;
  }
}

// Status utilities
export function getStatusColor(status: 'completed' | 'in_progress' | 'pending' | 'blocked') {
  switch (status) {
    case 'completed':
      return colors.success;
    case 'in_progress':
      return colors.discovery;
    case 'pending':
      return colors.warning;
    case 'blocked':
      return colors.error;
    default:
      return colors.warning;
  }
}

// Semantic class generators
export function getPhaseTabClasses(phase: 'discovery' | 'proposal' | 'engineering' | 'procurement', isActive: boolean = false) {
  const phaseColors = getPhaseColors(phase);
  
  return {
    base: "flex items-center justify-center gap-1 lg:gap-2 text-xs lg:text-sm transition-colors",
    active: `bg-${phase}-50 text-${phase}-700 border-${phase}-200`,
    inactive: "text-gray-600 hover:text-gray-900"
  };
}

export function getProgressBarClasses(phase: 'discovery' | 'proposal' | 'engineering' | 'procurement') {
  return `bg-${phase}-500`;
}

export function getStatusBadgeClasses(status: 'completed' | 'in_progress' | 'pending' | 'blocked') {
  const statusColor = getStatusColor(status);
  
  switch (status) {
    case 'completed':
      return "bg-green-100 text-green-800 border-green-300";
    case 'in_progress': 
      return "bg-blue-100 text-blue-800 border-blue-300";
    case 'pending':
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case 'blocked':
      return "bg-red-100 text-red-800 border-red-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
}