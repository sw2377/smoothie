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
        // gray3: "#828282",
        // gray4: "#BDBDBD",
      },
    },
  },
  plugins: [],
};
