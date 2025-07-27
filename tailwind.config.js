const { keyframes } = require("framer-motion");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes:{
        shake:{
          '0%,100%':{transform:'translateX(0)'},
          '25%':{transform:'translateX(-6px)'},
          '50%':{transform:'translateX(6px)'},
          '75%':{transform:'translateX(-4px)'}
        },
         'rotate-pop': {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(1.15) rotate(5deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)' },
        },
      },
      animation:{
        shake:'shake 0.4s ease-in-out',
        'rotate-pop': 'rotate-pop 0.5s ease-in-out',
      }
    },
  },
  plugins: [],
}
