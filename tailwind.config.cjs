/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        eventflow: {
          base: '#B20D5D',
          primary: '#4A0AB4',
          black: '#04000A',
          gray: '#7C7B7B',
          extra: '#F8F8F8',
          white: '#ffffff',
          border: '#CCCCCC',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        heading: ['Inter', 'sans-serif'],
      },
      fontSize: {
        base: ['16px', '26px'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '15px',
          sm: '20px',
          lg: '30px',
          xl: '40px',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1200px',
          '2xl': '1320px',
        },
      },
      animation: {
        'float-bob-y': 'float-bob-y 3s linear infinite',
        'float-bob-x': 'float-bob-x 2s linear infinite',
        'zoom-in-out': 'zoom-in-out 5s infinite',
      },
      keyframes: {
        'float-bob-y': {
          '0%, 100%': { transform: 'translateY(-20px)' },
          '50%': { transform: 'translateY(20px)' },
        },
        'float-bob-x': {
          '0%, 100%': { transform: 'translateX(-10px)' },
          '50%': { transform: 'translateX(10px)' },
        },
        'zoom-in-out': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
