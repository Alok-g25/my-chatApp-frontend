module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Your JS/TS files
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")], // Optional: If you're using DaisyUI
};
