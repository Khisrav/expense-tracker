import withMT from "@material-tailwind/html/utils/withMT";

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        'swamp-green': '#121911',
        'swamp-red': '#191111',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
})

