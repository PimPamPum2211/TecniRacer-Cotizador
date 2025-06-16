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
        'brand-blue': '#003E7E',
      },
      gridTemplateColumns: {
        mosaic: 'repeat(auto-fill, minmax(260px,1fr))',
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
