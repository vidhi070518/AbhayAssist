/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          50: '#f0f6ff',
          100: '#e0edfe',
          200: '#bae0fd',
          500: '#2563eb',
          600: '#1d4ed8',
          700: '#1e40af',
          800: '#1e3a8a',
          900: '#172554',
        },
        risk: {
          high: '#dc2626',
          highLight: '#fef2f2',
          highBorder: '#fecaca',
          moderate: '#d97706',
          moderateLight: '#fffbeb',
          moderateBorder: '#fde68a',
          low: '#16a34a',
          lowLight: '#f0fdf4',
          lowBorder: '#bbf7d0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
