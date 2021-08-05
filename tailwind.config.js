const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './renderer/src/components/**/*.{js,ts,jsx,tsx}',
    './renderer/src/layouts/**/*.{js,ts,jsx,tsx}',
    './renderer/src/modules/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: '#0068E2',
      secondary: '#151515',
      success: '#32C000',
      error: '#FF4A4A',
      validation: '#FFE5E5',
      white: colors.white,
      light: '#E4F1FF',
      gray: colors.trueGray,
      dark: '#333333',
      black: colors.black,
      green: colors.green,
      yellow: colors.amber,
      red: colors.red,
    },
    extend: {
      fontSize: {
        xxs: '.65rem',
      },
      height: {
        editor: 'calc(-7.25rem + 100vh)',
      },
    },
  },
  variants: {
    extend: {
      display: ['group-hover'],
    },
    width: ['first', 'last'],
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
