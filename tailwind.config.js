/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sillitha: {
          950: '#070709',
          900: '#0B0B0E',
          850: '#0F0F14',
          800: '#14141B',
          750: '#1A1A24',
          700: '#232332',
          600: '#343448',
          card: '#111117',
          cardHover: '#161620',
          border: '#1F1F2C',
        },
        electric: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5', // Primary brand electric blue/violet
          700: '#4338CA',
          accent: '#5B50F6',
          cyan: '#00F0FF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Fira Code', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'glow-electric': '0 0 30px -4px rgba(79, 70, 229, 0.55)',
        'glow-electric-lg': '0 0 50px -5px rgba(91, 80, 246, 0.65)',
        'glow-cyan': '0 0 30px -4px rgba(0, 240, 255, 0.45)',
      },
      animation: {
        'spider-pulse': 'spiderPulse 3s ease-in-out infinite',
        'web-shimmer': 'webShimmer 4s ease-in-out infinite',
      },
      keyframes: {
        spiderPulse: {
          '0%, 100%': { transform: 'scale(1)', filter: 'drop-shadow(0 0 12px rgba(79, 70, 229, 0.6))' },
          '50%': { transform: 'scale(1.05)', filter: 'drop-shadow(0 0 24px rgba(91, 80, 246, 0.9))' },
        },
        webShimmer: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.85' },
        }
      }
    },
  },
  plugins: [],
}
