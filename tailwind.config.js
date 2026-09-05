/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          950: '#030712',
          900: '#090d1a',
          850: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          neon: '#00f2fe',
          cyan: '#06b6d4',
          emerald: '#10b981',
          purple: '#a855f7',
          pink: '#ec4899',
          amber: '#f59e0b',
        },
        ayush: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#16a34a',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          gold: '#d97706',
          'gold-light': '#fef3c7',
          amber: '#f59e0b',
          teal: '#0d9488',
        },
        allopathy: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        homeopathy: {
          50: '#fdf4ff',
          100: '#fae8ff',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
        },
        ayurveda: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
        medtech: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
        },
        triage: {
          red: '#dc2626',
          'red-bg': '#fef2f2',
          yellow: '#d97706',
          'yellow-bg': '#fffbeb',
          green: '#16a34a',
          'green-bg': '#f0fdf4',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'pulse-fast': 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'strobe': 'strobe 1.5s ease-in-out infinite',
        'scanline': 'scanline 4s linear infinite',
      },
      keyframes: {
        strobe: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      }
    },
  },
  plugins: [],
}
