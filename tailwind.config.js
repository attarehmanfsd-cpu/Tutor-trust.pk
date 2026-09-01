/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B4B43',
          hover: '#153A34',
        },
        accent: '#D98C3F',
        background: '#FFFFFF',
        surface: '#F7F7F8',
        text: {
          primary: '#16181B',
          secondary: '#5B6167',
        },
        border: '#E4E4E7',
        success: '#2C7A4B',
        warning: '#B4581F',
        error: '#B3261E',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        urdu: ['Noto Nastaliq Urdu', 'serif'],
      },
    },
  },
  plugins: [],
}
