/**
 * H₂O Allegiant Design System Tokens
 * Extended design tokens for professional water treatment interfaces
 */

// Spacing System
export const spacing = {
  // Base spacing units
  px: '1px',
  0: '0px',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  11: '2.75rem',    // 44px
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  28: '7rem',       // 112px
  32: '8rem',       // 128px
  36: '9rem',       // 144px
  40: '10rem',      // 160px
  44: '11rem',      // 176px
  48: '12rem',      // 192px
  52: '13rem',      // 208px
  56: '14rem',      // 224px
  60: '15rem',      // 240px
  64: '16rem',      // 256px
  72: '18rem',      // 288px
  80: '20rem',      // 320px
  96: '24rem',      // 384px

  // Layout specific
  sidebar: {
    collapsed: '4rem',    // 64px
    expanded: '16rem',    // 256px
    mobile: '100%'
  },
  header: '4rem',         // 64px
  breadcrumb: '3rem',     // 48px
} as const

// Typography System
export const typography = {
  fontFamilies: {
    sans: ['Geist Sans', 'Inter', 'system-ui', 'sans-serif'],
    mono: ['Geist Mono', 'Fira Code', 'monospace'],
    display: ['Geist Sans', 'Inter', 'system-ui', 'sans-serif']
  },
  fontSizes: {
    xs: ['0.75rem', { lineHeight: '1rem' }],      // 12px
    sm: ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
    base: ['1rem', { lineHeight: '1.5rem' }],     // 16px
    lg: ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
    xl: ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
    '2xl': ['1.5rem', { lineHeight: '2rem' }],    // 24px
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 36px
    '5xl': ['3rem', { lineHeight: '1' }],         // 48px
    '6xl': ['3.75rem', { lineHeight: '1' }],      // 60px
    '7xl': ['4.5rem', { lineHeight: '1' }],       // 72px
    '8xl': ['6rem', { lineHeight: '1' }],         // 96px
    '9xl': ['8rem', { lineHeight: '1' }]          // 128px
  },
  fontWeights: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900'
  }
} as const

// Color System Extended
export const colors = {
  // Water Treatment Theme - Emerald Palette
  primary: {
    50: '#ecfdf5',   // Very light emerald
    100: '#d1fae5',  // Light emerald
    200: '#a7f3d0',  // Lighter emerald
    300: '#6ee7b7',  // Light-medium emerald
    400: '#34d399',  // Medium emerald
    500: '#10b981',  // Base emerald (current secondary)
    600: '#059669',  // Darker emerald (current primary)
    700: '#047857',  // Much darker emerald
    800: '#065f46',  // Very dark emerald
    900: '#064e3b',  // Darkest emerald
    950: '#022c22'   // Ultra dark emerald
  },

  // Technical Data Colors
  technical: {
    ph: '#3b82f6',        // Blue for pH
    conductivity: '#8b5cf6', // Purple for conductivity
    turbidity: '#f59e0b',    // Amber for turbidity
    temperature: '#ef4444',  // Red for temperature
    flow: '#06b6d4',        // Cyan for flow rates
    pressure: '#84cc16'     // Lime for pressure
  },

  // Status Colors
  status: {
    draft: '#6b7280',       // Gray
    inProgress: '#f59e0b',  // Amber
    review: '#8b5cf6',      // Purple
    approved: '#10b981',    // Emerald
    rejected: '#ef4444',    // Red
    archived: '#64748b'     // Slate
  },

  // Semantic Colors
  semantic: {
    info: '#3b82f6',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    neutral: '#6b7280'
  },

  // Background System
  backgrounds: {
    page: 'hsl(0 0% 100%)',
    card: 'hsl(210 40% 98%)',
    muted: 'hsl(210 40% 96%)',
    accent: 'hsl(210 40% 94%)',
    overlay: 'rgba(15, 23, 42, 0.5)',
    glass: 'rgba(255, 255, 255, 0.8)',
  },

  // Dark mode variants
  dark: {
    backgrounds: {
      page: 'hsl(222.2 84% 4.9%)',
      card: 'hsl(217.2 32.6% 17.5%)',
      muted: 'hsl(215 27.9% 16.9%)',
      accent: 'hsl(215 27.9% 16.9%)',
      overlay: 'rgba(15, 23, 42, 0.7)',
      glass: 'rgba(30, 41, 59, 0.8)',
    }
  }
} as const

// Border Radius System
export const borderRadius = {
  none: '0px',
  sm: '0.125rem',    // 2px
  base: '0.25rem',   // 4px
  md: '0.375rem',    // 6px
  lg: '0.5rem',      // 8px
  xl: '0.75rem',     // 12px (current default)
  '2xl': '1rem',     // 16px
  '3xl': '1.5rem',   // 24px
  full: '9999px'
} as const

// Shadow System
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',

  // Specialized shadows
  glow: {
    sm: '0 0 10px rgba(16, 185, 129, 0.3)',
    md: '0 0 20px rgba(16, 185, 129, 0.4)',
    lg: '0 0 30px rgba(16, 185, 129, 0.5)'
  }
} as const

// Animation System
export const animations = {
  durations: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms'
  },
  easings: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
  }
} as const

// Z-Index System
export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800
} as const

// Breakpoints
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
} as const