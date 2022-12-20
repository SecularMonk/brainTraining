/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
const colours = require("tailwindcss/colors");

const brandColour = colours.cyan;

module.exports = {
   content: ["./pages/**/*.{js, jsx, ts, tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         colours: {
            brand: brandColour,
         },
      },
   },
   plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
