/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        disaster: {
          dark: '#0a0f1d',
          surface: '#111827',
          card: '#1e293b',
          border: '#334155',
          text: '#f8fafc',
          muted: '#94a3b8',
          high: '#ef4444',
          highBg: 'rgba(239, 68, 68, 0.15)',
          moderate: '#f59e0b',
          moderateBg: 'rgba(245, 158, 11, 0.15)',
          low: '#10b981',
          lowBg: 'rgba(16, 185, 129, 0.15)',
          safe: '#06b6d4',
          safeBg: 'rgba(6, 182, 212, 0.15)',
          sachet: '#ea580c',
          sachetBg: 'rgba(234, 88, 12, 0.15)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
