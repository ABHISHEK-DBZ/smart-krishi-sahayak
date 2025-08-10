/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        agriculture: {
          soil: '#8B4513',
          crop: '#228B22',
          water: '#4169E1',
          sun: '#FFD700',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in-scale': 'fadeInScale 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-in-up': 'slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'spin-slow': 'spin 2s linear infinite',
      },
      keyframes: {
        fadeInScale: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.9)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)'
          }
        },
        slideInUp: {
          '0%': {
            opacity: '0',
            transform: 'translate3d(0, 100%, 0)'
          },
          '100%': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)'
          }
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(22, 163, 74, 0.15)',
        'hover': '0 8px 30px rgba(22, 163, 74, 0.25)',
        'glow': '0 0 20px rgba(22, 163, 74, 0.3)',
      },
      scale: {
        '102': '1.02',
      }
    },
  },
  plugins: [],
}
