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
        // Paleta principal unificada de H₂O Allegiant
        h2o: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // Colores técnicos secundarios
        teal: {
          50: '#eefcfa',
          100: '#d5f6f2',
          200: '#aeeee5',
          300: '#74e1d5',
          400: '#43d1c4',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        // Azul profundo para datos importantes
        deep: {
          50: '#eff5fb',
          100: '#dae7f6',
          200: '#b3cfed',
          300: '#84aedf',
          400: '#5586ce',
          500: '#3b68b8',
          600: '#2d4e96',
          700: '#243c74',
          800: '#1e3260',
          900: '#1e3a8a',
        },
        // Naranja técnico para alertas
        alert: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
      },
      animation: {
        // Animaciones de agua unificadas
        'water-ripple': 'water-ripple 2s linear infinite',
        'water-wave': 'water-wave 3s ease-in-out infinite',
        'water-float': 'water-float 15s ease-in-out infinite',
        'water-pulse': 'water-pulse 10s ease-in-out infinite',
        'water-sine': 'water-sine 4s ease-in-out infinite',
        'progress-bar': 'progress-bar 2s ease-out forwards',
        'droplet-bounce': 'droplet-bounce 2s ease-in-out infinite',
        'micro-bubbles': 'micro-bubbles 3s ease-in-out infinite',
        'enhanced-pulse': 'enhanced-pulse 3s ease-in-out infinite',
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
        'droplet-bounce': {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-5px) scale(1.05)' },
        },
        'micro-bubbles': {
          '0%': { opacity: '0.4', transform: 'translateY(0) scale(1)' },
          '50%': { opacity: '0.7', transform: 'translateY(-10px) scale(0.8)' },
          '100%': { opacity: '0', transform: 'translateY(-20px) scale(0.6)' },
        },
        'enhanced-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.5', boxShadow: '0 0 10px rgba(56, 189, 248, 0.3)' },
          '50%': { transform: 'scale(1.05)', opacity: '0.7', boxShadow: '0 0 25px rgba(56, 189, 248, 0.5)' },
        },
      },
      boxShadow: {
        'water-sm': '0 2px 10px rgba(7, 89, 133, 0.08)',
        'water-md': '0 5px 20px rgba(7, 89, 133, 0.12)',
        'water-lg': '0 10px 30px rgba(7, 89, 133, 0.18)',
        'water-glow': '0 0 20px rgba(56, 189, 248, 0.3)',
        'water-glow-lg': '0 0 30px rgba(56, 189, 248, 0.4)',
      },
      backgroundImage: {
        'water-pattern': 'radial-gradient(circle at 25% 25%, rgba(125, 211, 252, 0.2) 1%, transparent 8%), radial-gradient(circle at 75% 44%, rgba(125, 211, 252, 0.2) 2%, transparent 10%)',
        'gradient-water': 'linear-gradient(135deg, var(--tw-gradient-stops))',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
