/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'yellow': '#FFA500',
      'white': '#ffffff',
      'black': '#0c0a09',
      'grey': '#f3f4f6',
      'orange':'#f97316',
      'red':'#f87171',
      'green':'#34d399',
      'blue':'#3b82f6',
      'purple':'#8b5cf6',
      
      'white': '#ffffff',
      'black': '#0c0a09',
      'grey': '#f3f4f6',
      'orange':'#f97316',
      'red':'#f87171',
      'green':'#34d399',
      'blue':'#3b82f6',
      'purple':'#8b5cf6',
      
      
    },
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}
