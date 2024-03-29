/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#16433E",
        secondary: "#FFFBEA",
        info: "#2F80ED",
        success: "#27AE60",
        warning: "#E2B93B",
        error: "#EB5757",
        gray_1: "#333333",
        gray_2: "#4F4F4F",
        gray_3: "#828282",
        gray_4: "#BDBDBD",
        gray_5: "#E0E0E0",
      },
    },
  },
  plugins: [],
};
