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
          'black-dark': '#0F0F1E',
          gray: '#7C7B7B',
          'gray-dark': '#8A8A8A',
          extra: '#1A1A2E',
          white: '#ffffff',
          border: '#CCCCCC',
          'border-dark': '#333333',
        },
        luxury: {
          gold: '#D4AF37',
          'rose-gold': '#B76E79',
          champagne: '#F7E7CE',
          pearl: '#F8F6F0',
          midnight: '#0A0A1A',
          'accent-warm': '#FF6B9D',
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
        'border-round': 'border-round 3s ease infinite',
        'ripple': 'ripple 3s infinite',
        'top-bottom': 'top-bottom 3s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
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
        'border-round': {
          '0%': {
            borderColor: 'rgba(74, 10, 180, 0.5)',
            boxShadow: '0 0 10px rgba(74, 10, 180, 0.3)'
          },
          '50%': {
            borderColor: 'rgba(178, 13, 93, 0.7)',
            boxShadow: '0 0 20px rgba(178, 13, 93, 0.5)'
          },
          '100%': {
            borderColor: 'rgba(74, 10, 180, 0.5)',
            boxShadow: '0 0 10px rgba(74, 10, 180, 0.3)'
          },
        },
        'ripple': {
          '0%': { boxShadow: '0 0 0 0 rgba(178, 13, 93, 0.6)' },
          '70%': { boxShadow: '0 0 0 70px rgba(178, 13, 93, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(178, 13, 93, 0)' },
        },
        'top-bottom': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 15px rgba(74, 10, 180, 0.4)',
            opacity: '1'
          },
          '50%': {
            boxShadow: '0 0 30px rgba(74, 10, 180, 0.8)',
            opacity: '0.8'
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
