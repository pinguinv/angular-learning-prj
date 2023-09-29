/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        teal: {
          550: "#0fA99C",
        },
        slate: {
          450: "#7B8BA3",
          550: "#57657A",
          650: "#3E4C60",
        },
      },
    },
  },
  plugins: [],
};
