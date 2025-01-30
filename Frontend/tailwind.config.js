/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'yellow': '#fbbf24',
      'white': '#ffffff',
      'black': '#0c0a09',
      'grey': '#f3f4f6',
      'orange':'#f97316',
      
    },
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}