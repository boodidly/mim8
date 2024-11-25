/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#252728',
        surface: '#2F3133',
        primary: '#3B82F6',
        'primary-hover': '#2563EB',
        'surface-dark': '#1E1F20',
      },
      boxShadow: {
        glow: '0 0 20px rgba(0, 0, 0, 0.3), 0 0 8px rgba(59, 130, 246, 0.1)',
      }
    },
  },
  plugins: [],
};