/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors')

export default {
  mode: 'jit',
  darkMode: 'class',
  plugins: [],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.neutral,
      green: colors.emerald,
      purple: colors.indigo,
      yellow: colors.yellow,
      red: colors.rose,
      blue: colors.blue,
      'off-black': '#030303'
    },
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
