/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta de colores hydrous directamente definida sin usar variables
        'hydrous-50': '#f0f9ff',
        'hydrous-100': '#e0f2fe',
        'hydrous-200': '#bae6fd',
        'hydrous-300': '#7dd3fc',
        'hydrous-400': '#38bdf8',
        'hydrous-500': '#0ea5e9',
        'hydrous-600': '#0284c7',
        'hydrous-700': '#0369a1',
        'hydrous-800': '#075985',
        'hydrous-900': '#0c4a6e',

        // Colores adicionales para contrastes y efectos
        'blue-50': '#eff6ff',
        'blue-100': '#dbeafe',
        'blue-200': '#bfdbfe',
        'blue-300': '#93c5fd',
        'blue-400': '#60a5fa',
        'blue-500': '#3b82f6',
        'blue-600': '#2563eb',

        'teal-50': '#f0fdfa',
        'teal-100': '#ccfbf1',
        'teal-200': '#99f6e4',
        'teal-300': '#5eead4',
        'teal-400': '#2dd4bf',
        'teal-500': '#14b8a6',
        'teal-600': '#0d9488',
        'teal-700': '#0f766e',

        'emerald-50': '#ecfdf5',
        'emerald-100': '#d1fae5',
        'emerald-200': '#a7f3d0',
        'emerald-300': '#6ee7b7',
        'emerald-400': '#34d399',
        'emerald-500': '#10b981',
        'emerald-600': '#059669',
        'emerald-700': '#047857',
      },
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        'water-ripple': 'water-ripple 2s linear infinite',
        'water-wave': 'water-wave 3s ease-in-out infinite',
        'water-float': 'water-float 15s ease-in-out infinite',
        'water-pulse': 'water-pulse 10s ease-in-out infinite',
        'water-sine': 'water-sine 4s ease-in-out infinite',
        'progress-bar': 'progress-bar 2s ease-out forwards',
        'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        'counter': 'counter-animation 1s ease-out forwards',
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
        'water-sine': {
          '0%, 100%': { transform: 'translateY(0) skewX(0)' },
          '25%': { transform: 'translateY(-5px) skewX(2deg)' },
          '50%': { transform: 'translateY(0) skewX(0)' },
          '75%': { transform: 'translateY(5px) skewX(-2deg)' },
        },
        'progress-bar': {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.9' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.2)' },
        },
        'counter-animation': {
          'from': { opacity: '0', transform: 'translateY(10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-dots': 'radial-gradient(circle, currentColor 1px, transparent 1px)',
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0, 0, 0, 0.05)',
        'water': '0 4px 20px rgba(14, 165, 233, 0.15)',
        'inner-water': 'inset 0 2px 4px rgba(7, 89, 133, 0.06)',
        'blue': '0 4px 14px rgba(59, 130, 246, 0.25)',
        'teal': '0 4px 14px rgba(20, 184, 166, 0.25)',
        'emerald': '0 4px 14px rgba(16, 185, 129, 0.25)',
      },
    },
  },
  // Aquí está la clave: no usar safelist sino directamente poner todos los colores en el content
  plugins: [require("tailwindcss-animate")],
  safelist: [
    // Colores Hydrous
    'bg-hydrous-50', 'bg-hydrous-100', 'bg-hydrous-200', 'bg-hydrous-300', 'bg-hydrous-400',
    'bg-hydrous-500', 'bg-hydrous-600', 'bg-hydrous-700', 'bg-hydrous-800', 'bg-hydrous-900',
    'text-hydrous-50', 'text-hydrous-100', 'text-hydrous-200', 'text-hydrous-300', 'text-hydrous-400',
    'text-hydrous-500', 'text-hydrous-600', 'text-hydrous-700', 'text-hydrous-800', 'text-hydrous-900',
    'border-hydrous-50', 'border-hydrous-100', 'border-hydrous-200', 'border-hydrous-300', 'border-hydrous-400',
    'border-hydrous-500', 'border-hydrous-600', 'border-hydrous-700', 'border-hydrous-800', 'border-hydrous-900',
    'from-hydrous-50', 'from-hydrous-100', 'from-hydrous-200', 'from-hydrous-300', 'from-hydrous-400',
    'from-hydrous-500', 'from-hydrous-600', 'from-hydrous-700', 'from-hydrous-800', 'from-hydrous-900',
    'to-hydrous-50', 'to-hydrous-100', 'to-hydrous-200', 'to-hydrous-300', 'to-hydrous-400',
    'to-hydrous-500', 'to-hydrous-600', 'to-hydrous-700', 'to-hydrous-800', 'to-hydrous-900',
    'via-hydrous-50', 'via-hydrous-100', 'via-hydrous-200', 'via-hydrous-300', 'via-hydrous-400',
    'via-hydrous-500', 'via-hydrous-600', 'via-hydrous-700', 'via-hydrous-800', 'via-hydrous-900',

    // Colores azules
    'bg-blue-50', 'bg-blue-100', 'bg-blue-200', 'bg-blue-300', 'bg-blue-400',
    'bg-blue-500', 'bg-blue-600',
    'text-blue-50', 'text-blue-100', 'text-blue-200', 'text-blue-300', 'text-blue-400',
    'text-blue-500', 'text-blue-600', 'text-blue-700', 'text-blue-800',
    'border-blue-50', 'border-blue-100', 'border-blue-200', 'border-blue-300', 'border-blue-400',
    'border-blue-500', 'border-blue-600',
    'from-blue-50', 'from-blue-100', 'from-blue-200', 'from-blue-300', 'from-blue-400',
    'from-blue-500', 'from-blue-600',
    'to-blue-50', 'to-blue-100', 'to-blue-200', 'to-blue-300', 'to-blue-400',
    'to-blue-500', 'to-blue-600',

    // Colores teal
    'bg-teal-50', 'bg-teal-100', 'bg-teal-200', 'bg-teal-300', 'bg-teal-400',
    'bg-teal-500', 'bg-teal-600', 'bg-teal-700',
    'text-teal-50', 'text-teal-100', 'text-teal-200', 'text-teal-300', 'text-teal-400',
    'text-teal-500', 'text-teal-600', 'text-teal-700',
    'border-teal-50', 'border-teal-100', 'border-teal-200', 'border-teal-300', 'border-teal-400',
    'border-teal-500', 'border-teal-600', 'border-teal-700',
    'from-teal-50', 'from-teal-100', 'from-teal-200', 'from-teal-300', 'from-teal-400',
    'from-teal-500', 'from-teal-600', 'from-teal-700',
    'to-teal-50', 'to-teal-100', 'to-teal-200', 'to-teal-300', 'to-teal-400',
    'to-teal-500', 'to-teal-600', 'to-teal-700',

    // Colores emerald
    'bg-emerald-50', 'bg-emerald-100', 'bg-emerald-200', 'bg-emerald-300', 'bg-emerald-400',
    'bg-emerald-500', 'bg-emerald-600', 'bg-emerald-700',
    'text-emerald-50', 'text-emerald-100', 'text-emerald-200', 'text-emerald-300', 'text-emerald-400',
    'text-emerald-500', 'text-emerald-600', 'text-emerald-700',
    'border-emerald-50', 'border-emerald-100', 'border-emerald-200', 'border-emerald-300', 'border-emerald-400',
    'border-emerald-500', 'border-emerald-600', 'border-emerald-700',
    'from-emerald-50', 'from-emerald-100', 'from-emerald-200', 'from-emerald-300', 'from-emerald-400',
    'from-emerald-500', 'from-emerald-600', 'from-emerald-700',
    'to-emerald-50', 'to-emerald-100', 'to-emerald-200', 'to-emerald-300', 'to-emerald-400',
    'to-emerald-500', 'to-emerald-600', 'to-emerald-700',

    // Sombras
    'shadow-hydrous-100', 'shadow-hydrous-200', 'shadow-hydrous-300', 'shadow-hydrous-400', 'shadow-hydrous-500',
    'shadow-blue-100', 'shadow-blue-200', 'shadow-teal-100', 'shadow-teal-200', 'shadow-emerald-100', 'shadow-emerald-200',
    'shadow-inner', 'shadow-lg', 'shadow-xl', 'shadow-2xl',

    // Animaciones
    'animate-water-ripple', 'animate-water-wave', 'animate-water-float', 'animate-water-pulse',
    'animate-water-sine', 'animate-progress-bar', 'animate-pulse-subtle', 'animate-pulse-slow',
    'animation-delay-150', 'animation-delay-500', 'animation-delay-1000', 'animation-delay-1500', 'animation-delay-2000',
  ],
}
