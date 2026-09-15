/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        braxtar: { 50:"#f1f7ff", 100:"#dcecff", 600:"#0b63ce", 700:"#084d9f", 900:"#082c55" }
      }
    }
  },
  plugins: []
}
