/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pcmc: {
          50: '#F0F9F5',
          100: '#D9F2E7',
          200: '#B3E4CF',
          300: '#7DCFB1',
          400: '#46B491',
          500: '#239B78',
          600: '#176B52', // Specified Primary Green
          700: '#11523E',
          800: '#0E3E30',
          900: '#0B3026',
          950: '#051914',
        },
        civic: {
          surface: '#FFFFFF',
          bg: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
          dark: '#0F172A',
          muted: '#64748B',
          warning: '#D97706',
          error: '#DC2626',
          success: '#16A34A',
          info: '#2563EB',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
