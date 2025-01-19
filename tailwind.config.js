/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'play': ['Playfair Display', 'sans-serif'],
      },
      height: {
        'screen-minus-12': 'calc(100vh - 3rem)', // Custom utility
      },
    },
  },
  plugins: [],
}

