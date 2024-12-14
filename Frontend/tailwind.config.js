// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       fontFamily:{
//         "inter":["Inter"],
//         "roboto":["Roboto"],
//         "questrial":["Questrial"]
//       },
//       colors:{
//         black:{
//           300:"#FFFFFF",
//           500:"#CACACA",
//           700:"#27272A",
//           900:"#09090B"
//         }
//       }
//     },
//   },
//   plugins: [],
// }


import defaultTheme from "tailwindcss/defaultTheme";

import colors from "tailwindcss/colors";
import { default as flattenColorPalette } from "tailwindcss/lib/util/flattenColorPalette";

/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{ts,tsx}"];
export const darkMode = "class";
export const theme = {
  extend: {
    fontFamily: {
      "inter": ["Inter"],
      "roboto": ["Roboto"],
      "questrial": ["Questrial"]
    },
    colors: {
      black: {
        300: "#FFFFFF",
        500: "#CACACA",
        700: "#27272A",
        900: "#09090B"
      }
    }
  }
  // rest of the code
};
export const plugins = [addVariablesForColors];

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
