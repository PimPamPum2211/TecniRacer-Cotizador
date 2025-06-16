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
      },
      gridTemplateColumns: {
        mosaic: 'repeat(auto-fill, minmax(180px,1fr))',
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
