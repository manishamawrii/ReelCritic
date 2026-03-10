/** @type {import('tailwindcss').Config} */


// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: "#D4AF37",
        "gold-light": "#E6C45A",
        border: "#2c2c36",
        muted: "#9CA3AF",
      },
    },
  },
}