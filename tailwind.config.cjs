/** @type {import('tailwindcss').Config} */
module.exports = {
  // This tells Tailwind to scan all your JS/JSX files
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      // This adds the custom pixel font
      fontFamily: {
        'press-start': ['"Press Start 2P"', 'cursive'],
      },
    },
  },
  plugins: [],
}