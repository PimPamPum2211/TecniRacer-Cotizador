/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#1e3a8a',
        secondary: '#047857',
        'gray-soft': '#f3f4f6',
        brand: {
          DEFAULT: '#FF0000',
          dark: '#B30000',
          slate: '#2E6177',
          neutral: '#1F1F1F'
        }
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
