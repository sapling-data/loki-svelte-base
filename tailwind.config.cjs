/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  mode: 'jit',
  plugins: [],
  theme: {
    extend: {
      fontSize: {
        xxs: '12px'
      }
    }
  },
  content: ["./index.html",'./src/**/*.{svelte,js,ts}'], // for unused CSS
  variants: {
    extend: {},
  },
}
