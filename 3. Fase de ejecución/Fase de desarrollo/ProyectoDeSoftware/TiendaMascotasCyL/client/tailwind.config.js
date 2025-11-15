/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        "primary-200" : "#A8E1EA",//no exist FFBG00
        "primary-100" : "#007c92", //FFC929 in yellow
        "primary-500" : "#0098AA", //FFC929 in yellow
        "secondary-200" : "#007E98", //00B050 is green
        "secondary-100" : "#007C92" //0B1A78 is blue
      }
    },
  },
  plugins: [],
}

