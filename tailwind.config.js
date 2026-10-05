/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#070707',
          900: '#0c0c0c',
          850: '#111111',
          800: '#161616',
          700: '#1e1e1e',
          600: '#2a2a2a',
        },
        orange: {
          400: '#FF9F45',
          500: '#FF7A1A',
          600: '#F06400',
        },
        safety: {
          400: '#B8F14D',
          500: '#9EE619',
          600: '#7FBE0F',
        },
        line: {
          DEFAULT: 'rgba(255,255,255,0.10)',
          soft: 'rgba(255,255,255,0.05)',
        },
      },
      fontFamily: {
        display: ['"TT Hoves Pro Bold"', 'system-ui', 'sans-serif'],
        sans: ['"TT Hoves Pro Light"', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      letterSpacing: {
        industrial: '-0.01em',
        tightest: '-0.02em',
      },
      boxShadow: {
        'orange-glow': '0 0 0 1px rgba(255,122,26,0.6), 0 8px 30px -8px rgba(255,122,26,0.55)',
        'green-glow': '0 0 0 1px rgba(158,230,25,0.5), 0 8px 30px -8px rgba(158,230,25,0.45)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'pulse-line': {
          '0%,100%': { opacity: '0.25' },
          '50%': { opacity: '0.6' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out both',
        'fade-in': 'fade-in 0.6s ease-out both',
        'scale-in': 'scale-in 0.35s cubic-bezier(.2,.8,.2,1) both',
        'pulse-line': 'pulse-line 2.4s ease-in-out infinite',
        float: 'float 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
