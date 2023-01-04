/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '300px',
      md: '390px',
    },
    extend: {},
  },
  plugins: [],
}
