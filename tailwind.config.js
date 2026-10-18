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
          950: '#000000',
          900: '#000000',
          850: '#000000',
          800: '#000000',
          750: '#000000',
          700: '#000000',
          600: '#000000',
          card: '#000000',
          cardHover: '#000000',
          border: '#404040',
        },
        electric: {
          50: '#FFFFFF',
          100: '#F5F5F5',
          200: '#D0D0D0',
          300: '#E0E0E0',
          400: '#FFFFFF',
          500: '#A0A0A0',
          600: '#707070', // Primary monochrome action color
          700: '#808080',
          accent: '#FFFFFF',
          cyan: '#E0E0E0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Fira Code', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'glow-electric': '0 0 30px -4px rgba(255, 255, 255, 0.55)',
        'glow-electric-lg': '0 0 50px -5px rgba(255, 255, 255, 0.65)',
        'glow-cyan': '0 0 30px -4px rgba(224, 224, 224, 0.45)',
      },
      animation: {
        'spider-pulse': 'spiderPulse 3s ease-in-out infinite',
        'web-shimmer': 'webShimmer 4s ease-in-out infinite',
      },
      keyframes: {
        spiderPulse: {
          '0%, 100%': { transform: 'scale(1)', filter: 'drop-shadow(0 0 12px rgba(255, 255, 255, 0.6))' },
          '50%': { transform: 'scale(1.05)', filter: 'drop-shadow(0 0 24px rgba(255, 255, 255, 0.9))' },
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
