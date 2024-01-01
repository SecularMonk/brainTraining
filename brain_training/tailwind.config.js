/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
const colours = require("tailwindcss/colors");

const brandColour = colours.cyan;

module.exports = {
   content: ["./pages/**/*.{js, jsx, ts, tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
   theme: {
      colours: {
         brand: brandColour,
      },
      extend: {},
      container: {
         center: true,
         padding: "2rem",
      },
   },
   plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
