/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'very-peri': {
          DEFAULT: '#6868AC',
          light: '#8b8bcc',
          lightness: '#c1c1f1',
          dark: '#49498d',
          darkness: '#323273',
        }
      },
      height: {
        'screen-half': '50vh'
      },
      margin: {
        '10-per': '10%'
      }
    },
  },
  plugins: [],
}
