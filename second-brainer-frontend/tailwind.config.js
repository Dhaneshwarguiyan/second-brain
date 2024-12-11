/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        "inter":["Inter"],
        "roboto":["Roboto"],
        "questrial":["Questrial"]
      },
      colors:{
        black:{
          300:"#FFFFFF",
          500:"#CACACA",
          700:"#27272A",
          900:"#09090B"
        }
      }
    },
  },
  plugins: [],
}