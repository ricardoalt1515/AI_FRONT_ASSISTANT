import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import {
  spacing,
  typography,
  colors,
  borderRadius,
  shadows,
  animations,
  zIndex,
  breakpoints
} from "./components/design-system/tokens/design-tokens";

const config: Config = {
    darkMode: "class",
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // Override default breakpoints with our system
    screens: breakpoints,

    // Override default spacing with our system
    spacing,

    // Typography system
    fontFamily: typography.fontFamilies,
    fontSize: typography.fontSizes,
    fontWeight: typography.fontWeights,

    extend: {
      // Maintain shadcn/ui compatibility
      colors: {
        // Keep existing shadcn tokens
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          // Add extended primary scale
          50: colors.primary[50],
          100: colors.primary[100],
          200: colors.primary[200],
          300: colors.primary[300],
          400: colors.primary[400],
          500: colors.primary[500],
          600: colors.primary[600],
          700: colors.primary[700],
          800: colors.primary[800],
          900: colors.primary[900],
          950: colors.primary[950]
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        },

        // Add our extended color system
        technical: colors.technical,
        status: colors.status,
        semantic: colors.semantic,
      },

      // Extended border radius system
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        ...borderRadius
      },

      // Enhanced shadow system
      boxShadow: {
        ...shadows,
        'glow-sm': shadows.glow.sm,
        'glow-md': shadows.glow.md,
        'glow-lg': shadows.glow.lg
      },

      // Animation system
      transitionDuration: animations.durations,
      transitionTimingFunction: animations.easings,

      // Z-index system
      zIndex,

      // Layout specific spacing
      width: {
        'sidebar-collapsed': spacing.sidebar.collapsed,
        'sidebar-expanded': spacing.sidebar.expanded
      },
      height: {
        header: spacing.header,
        breadcrumb: spacing.breadcrumb
      },

      // Custom animations
      animation: {
        'shimmer': 'shimmer 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out'
      },

      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(5, 150, 105, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(5, 150, 105, 0.5)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    }
  },
  plugins: [animate],
};
export default config;
