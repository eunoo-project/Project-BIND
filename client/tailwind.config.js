/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        red: '#ED4956',
        black: '#222222',
        white: '#fefefe',
        'gray-fill': 'rgba(119, 119, 119)',
        'gray-bg': 'rgba(119, 119, 119, .8)',
        'gray-border': 'rgba(190, 190, 190, .7)',
      },
      boxShadow: {
        light: '2px 2px 4px rgba(0, 0, 0, 0.8)',
        dark: '2px 2px 4px rgba(255, 255, 255, 0.8)',
      },
    },
  },
  plugins: [require('tailwindcss-safe-area')],
};
