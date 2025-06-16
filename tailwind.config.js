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
        'brand-red': '#C8102E',
        'brand-blue': '#003E7E',
        'brand-blue-light': '#2C5FB8',
        'brand-blue-dark': '#002B58',
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
