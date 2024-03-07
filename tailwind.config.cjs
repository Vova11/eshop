/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  // daisyUI config (optional - here are the default values)
  daisyui: {
    themes: ['winter','dracula']
  }
  
};