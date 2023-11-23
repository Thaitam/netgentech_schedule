/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/*.ejs',
    './views/**/*.ejs',
    './views/**/**/*.ejs',
    './views/**/**/**/*.ejs',
    './views/**/**/**/**/*.ejs',
    './views/components/*/*.ejs'
  ],
  theme: {
  extend: {},
  },
  plugins: [
  {
  tailwindcss: {},
  autoprefixer: {},
  },
  ],
  };