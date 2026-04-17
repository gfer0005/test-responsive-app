/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        belfius: '#C30045',
        'belfius-secondary': '#51626F',
        'belfius-light-grey': '#E8EBED',
      },
      fontFamily: {
        belfius: ['Belfius21', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
