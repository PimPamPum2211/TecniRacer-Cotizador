/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'brand-red': '#C8102E',
        'brand-red-light': '#f36',
        'brand-blue': '#003E7E',
        'brand-blue-light': '#1e60aa',
        'brand-blue-dark': '#002752'
      },
      boxShadow: {
        card: '0 10px 20px rgba(0,0,0,.15)'
      },
      gridTemplateColumns: {
        mosaic: 'repeat(auto-fill, minmax(280px,1fr))',
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
