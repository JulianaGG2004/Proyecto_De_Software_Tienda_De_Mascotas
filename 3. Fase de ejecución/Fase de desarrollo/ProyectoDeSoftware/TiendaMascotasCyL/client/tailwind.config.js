/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        "primary-100" : "#F5F5F5",//no exist FFBG00 claro
        "primary-200" : "#A8E1EA",//no exist FFBG00 claro
        "primary-300" : "#00AFC4",
        "primary-400" : "#0098AA", //FFC929 in yellow medio
        "primary-500" : "#007c92", //FFC929 in yellow oscuro
        
        "secondary-200" : "#007E98", //00B050 is green
        "secondary-100" : "#007C92" //0B1A78 is blue
      }
    },
  },
  plugins: [],
}

