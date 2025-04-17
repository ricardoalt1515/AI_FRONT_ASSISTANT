
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        hydrous: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#b9e6fe',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
      },
      animation: {
        'water-ripple': 'water-ripple 2s linear infinite',
        'water-wave': 'water-wave 3s ease-in-out infinite',
        'water-float': 'water-float 15s ease-in-out infinite',
        'water-pulse': 'water-pulse 10s ease-in-out infinite',
      },
      keyframes: {
        'water-ripple': {
          '0%': { transform: 'scale(0.95)', opacity: '1' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        'water-wave': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'water-float': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(15px, -10px)' },
          '50%': { transform: 'translate(5px, 10px)' },
          '75%': { transform: 'translate(-10px, -7px)' },
        },
        'water-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.5' },
          '50%': { transform: 'scale(1.1)', opacity: '0.7' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

