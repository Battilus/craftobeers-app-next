/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        whiteSmoke: '#F4F4F4',
        silver: '#BCBCBC',
        matterhorn: '#575757',
        purple: colors.violet,
      },
      screens: {
        's': '470px',
      },
      width: {
        '6.5': '1.625rem',
      },
    },
  },
  plugins: [],
}
