/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  safelist: ['grid-cols-mosaic'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eaf3ff',
          100: '#d6e5ff',
          200: '#adcaff',
          300: '#84aeff',
          400: '#5b93ff',
          500: '#3278ff',
          600: '#2960cc',
          700: '#204899',
          800: '#183066',
          900: '#0f1833',
        },
        secondary: {
          50: '#ffeaea',
          100: '#ffd6d6',
          200: '#ffadad',
          300: '#ff8484',
          400: '#ff5b5b',
          500: '#ff3232',
          600: '#cc2828',
          700: '#991e1e',
          800: '#661414',
          900: '#330a0a',
        },
      },
      gridTemplateColumns: {
        mosaic: 'repeat(auto-fill,minmax(180px,1fr))',
      },
      boxShadow: {
        card: '0 10px 20px rgba(0,0,0,.15)',
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
