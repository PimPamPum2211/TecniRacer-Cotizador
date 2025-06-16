/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e3a8a',
        secondary: '#047857',
        'gray-soft': '#f3f4f6'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      screens: {
        xs: '480px'
      }
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
