/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // OKLCH-based color system for H₂O Allegiant
      colors: {
        // Context-aware color tokens
        context: {
          executive: {
            50: "oklch(0.98 0.01 240)",
            100: "oklch(0.95 0.02 240)",
            500: "oklch(0.55 0.18 220)",
            600: "oklch(0.5 0.2 220)",
            700: "oklch(0.45 0.22 220)",
            900: "oklch(0.2 0.15 240)",
          },
          project: {
            50: "oklch(0.98 0.01 150)",
            100: "oklch(0.95 0.02 150)", 
            500: "oklch(0.6 0.15 150)",
            600: "oklch(0.55 0.17 150)",
            700: "oklch(0.5 0.19 150)",
            900: "oklch(0.25 0.12 150)",
          },
          technical: {
            50: "oklch(0.98 0.01 280)",
            100: "oklch(0.95 0.02 280)",
            500: "oklch(0.6 0.16 280)",
            600: "oklch(0.55 0.18 280)", 
            700: "oklch(0.5 0.2 280)",
            900: "oklch(0.25 0.13 280)",
          },
          client: {
            50: "oklch(0.98 0.01 190)",
            100: "oklch(0.95 0.02 190)",
            500: "oklch(0.65 0.15 190)",
            600: "oklch(0.6 0.17 190)",
            700: "oklch(0.55 0.19 190)",
            900: "oklch(0.25 0.12 190)",
          }
        },
        
        // Enhanced semantic color system  
        water: {
          50: "oklch(0.985 0.01 210)",
          100: "oklch(0.97 0.02 210)",
          200: "oklch(0.92 0.04 210)",
          300: "oklch(0.85 0.08 210)",
          400: "oklch(0.75 0.12 210)",
          500: "oklch(0.65 0.15 190)",
          600: "oklch(0.6 0.17 190)",
          700: "oklch(0.55 0.19 190)",
          800: "oklch(0.45 0.15 190)",
          900: "oklch(0.35 0.12 190)",
          950: "oklch(0.25 0.08 190)",
        },

        // Enhanced system colors using CSS variables with OKLCH fallbacks
        border: "hsl(var(--border, 214.3 31.8% 91.4%))",
        input: "hsl(var(--input, 214.3 31.8% 91.4%))",
        ring: "hsl(var(--ring, 222.2 84% 4.9%))",
        background: "hsl(var(--background, 0 0% 100%))",
        foreground: "hsl(var(--foreground, 222.2 84% 4.9%))",
        primary: {
          DEFAULT: "hsl(var(--primary, 222.2 47.4% 11.2%))",
          foreground: "hsl(var(--primary-foreground, 210 40% 98%))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary, 210 40% 96%))",
          foreground: "hsl(var(--secondary-foreground, 222.2 84% 4.9%))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive, 0 84.2% 60.2%))",
          foreground: "hsl(var(--destructive-foreground, 210 40% 98%))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted, 210 40% 96%))",
          foreground: "hsl(var(--muted-foreground, 215.4 16.3% 46.9%))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent, 210 40% 96%))",
          foreground: "hsl(var(--accent-foreground, 222.2 84% 4.9%))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover, 0 0% 100%))",
          foreground: "hsl(var(--popover-foreground, 222.2 84% 4.9%))",
        },
        card: {
          DEFAULT: "hsl(var(--card, 0 0% 100%))",
          foreground: "hsl(var(--card-foreground, 222.2 84% 4.9%))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar, 220 13% 91%))",
          foreground: "hsl(var(--sidebar-foreground, 220 9% 46%))",
          primary: "hsl(var(--sidebar-primary, 224 71% 4%))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground, 210 20% 98%))",
          accent: "hsl(var(--sidebar-accent, 220 13% 91%))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground, 220 9% 46%))",
          border: "hsl(var(--sidebar-border, 220 13% 91%))",
          ring: "hsl(var(--sidebar-ring, 217.2 91.2% 59.8%))",
        },
      },
      
      // Enhanced border radius system
      borderRadius: {
        lg: "var(--radius, 0.75rem)",
        md: "calc(var(--radius, 0.75rem) - 2px)",
        sm: "calc(var(--radius, 0.75rem) - 4px)",
        xl: "calc(var(--radius, 0.75rem) + 4px)",
      },

      // Typography enhancements for technical precision
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "Consolas", "monospace"],
      },

      fontSize: {
        "display-lg": ["2.25rem", { lineHeight: "2.5rem", fontWeight: "700", letterSpacing: "-0.025em" }],
        "display-md": ["1.875rem", { lineHeight: "2.25rem", fontWeight: "700", letterSpacing: "-0.025em" }],
        "display-sm": ["1.5rem", { lineHeight: "2rem", fontWeight: "600", letterSpacing: "-0.025em" }],
        "heading-xl": ["1.25rem", { lineHeight: "1.75rem", fontWeight: "600", letterSpacing: "-0.025em" }],
        "heading-lg": ["1.125rem", { lineHeight: "1.75rem", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.75rem", fontWeight: "400" }],
        "body": ["1rem", { lineHeight: "1.625rem", fontWeight: "400" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5rem", fontWeight: "400" }],
        "caption": ["0.75rem", { lineHeight: "1rem", fontWeight: "500", letterSpacing: "0.05em", textTransform: "uppercase" }],
      },

      // Advanced spacing system for technical layouts
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
        "144": "36rem",
      },

      // Professional shadow system
      boxShadow: {
        "premium": "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        "premium-md": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "premium-lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        "glass": "inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
        "inner-subtle": "inset 0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      },

      // Animation system for water treatment theme
      keyframes: {
        "water-flow": {
          "0%, 100%": { 
            transform: "translateX(0%) translateY(0%)",
            opacity: "0.7"
          },
          "50%": { 
            transform: "translateX(100%) translateY(-10%)",
            opacity: "1"
          },
        },
        "pulse-gentle": {
          "0%, 100%": { 
            opacity: "1",
            transform: "scale(1)"
          },
          "50%": { 
            opacity: "0.8",
            transform: "scale(1.02)"
          },
        },
        "slide-in": {
          "0%": { 
            opacity: "0",
            transform: "translateY(16px)"
          },
          "100%": { 
            opacity: "1",
            transform: "translateY(0)"
          },
        },
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "shimmer": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" }
        }
      },
      
      animation: {
        "water-flow": "water-flow 3s ease-in-out infinite",
        "pulse-gentle": "pulse-gentle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "slide-in": "slide-in 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-in-up": "fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "shimmer": "shimmer 2s infinite"
      },

      // Enhanced backdrop blur for glass morphism
      backdropBlur: {
        xs: "2px",
      }
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
    
    // Context-aware utility plugin
    function({ addUtilities, addComponents, theme }) {
      // Context-based component variants
      addComponents({
        // Executive context styling
        '.context-executive': {
          '--context-primary': theme('colors.context.executive.500'),
          '--context-primary-light': theme('colors.context.executive.100'),
          '--context-primary-dark': theme('colors.context.executive.700'),
          backgroundColor: 'var(--context-primary-light)',
          borderColor: 'var(--context-primary)',
          color: theme('colors.context.executive.900'),
        },
        
        // Project context styling  
        '.context-project': {
          '--context-primary': theme('colors.context.project.500'),
          '--context-primary-light': theme('colors.context.project.100'),
          '--context-primary-dark': theme('colors.context.project.700'),
          backgroundColor: 'var(--context-primary-light)',
          borderColor: 'var(--context-primary)',
          color: theme('colors.context.project.900'),
        },

        // Technical context styling
        '.context-technical': {
          '--context-primary': theme('colors.context.technical.500'), 
          '--context-primary-light': theme('colors.context.technical.100'),
          '--context-primary-dark': theme('colors.context.technical.700'),
          backgroundColor: 'var(--context-primary-light)',
          borderColor: 'var(--context-primary)',
          color: theme('colors.context.technical.900'),
        },

        // Client context styling
        '.context-client': {
          '--context-primary': theme('colors.context.client.500'),
          '--context-primary-light': theme('colors.context.client.100'), 
          '--context-primary-dark': theme('colors.context.client.700'),
          backgroundColor: 'var(--context-primary-light)',
          borderColor: 'var(--context-primary)',
          color: theme('colors.context.client.900'),
        }
      });

      // Glass morphism utilities
      addUtilities({
        '.glass': {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px) saturate(200%)',
          borderRadius: theme('borderRadius.lg'),
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
        
        '.glass-card': {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(8px) saturate(150%)',
          borderRadius: theme('borderRadius.xl'),
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
        }
      });
    }
  ],
}