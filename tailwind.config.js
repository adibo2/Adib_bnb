/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    colors: {

      'body': '#ffffff',

    },
  },
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'shadow': '0 0 0 2px #002',
      }
    },

  },
  plugins: [
    require("tailwind-scrollbar-hide")
  ],
}
