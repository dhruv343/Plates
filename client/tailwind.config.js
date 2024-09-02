/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",  // Root level App files
    "./app/**/*.{js,jsx,ts,tsx}",  // All JS/TS files within the app directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
