/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      fontWeight: {
        'extra-thin': '100',
        'extra-bold': '800',
      },
      transitionProperty: {
        'navbar': 'opacity, transform, background-color, color',
        'gallery': 'transform, background-color',
        'layout': 'width, height, transform, opacity',
        'scale': 'transform, opacity',
        'card': 'all',
      },
      aspectRatio: {
        '3/4': '3 / 4',
        'square': '1 / 1'
      },
      boxShadow: {
        'nav': '0 2px 10px rgba(0, 0, 0, 0.1)',
      },
      screens: {
        'xs': '400px',
        '3xl': '1600px',
      },
      gridTemplateColumns: {
        'fluid': 'repeat(auto-fit, minmax(300px, 1fr))',
      },
      spacing: {
        'grid-gap': '1rem', // Временная замена для теста
        '0.5': '2px',
        '1.5': '6px',
        '7.5': '30px',
      },
      zIndex: {
        '60': '60',
        '70': '70',
      },
      padding: {
        '0.5': '2px',
      },
      gap: {
        '0.5': '2px',
        '1.5': '6px',
      },
    },
  },
  plugins: [],
};