/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'soft-white': '#F7F7F7',
        'emerald-green': '#2E8B57',
        'mustard-yellow': '#FFD700',
        'light-brown': '#8B4513',
        'dark-grey': '#333333',
        'medium-grey': '#666666',
      }
    },
  },
  plugins: [],
}