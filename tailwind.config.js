/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      keyframes: {
        "bounce-in-smooth": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "50%": { opacity: "1", transform: "scale(1.03)" },
          "75%": { transform: "scale(0.97)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "bounce-in-smooth":
          "bounce-in-smooth 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
    },
  },
  plugins: [],
};
