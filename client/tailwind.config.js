/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: '#E2F0F9', // light sky blue
        secondary: '#B0BDDE4', // Green blue mix
        accent: '#DF4C73', //pink
        background: '#FFFFFF', // white
        text: '#286FB4', // blue
      },
    },
  },
  plugins: [],
}

