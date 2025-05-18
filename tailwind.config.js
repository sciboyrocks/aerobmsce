/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'jet-black': '#121212',
        'titanium-gray': '#7A7D7F',
        'deep-sky-blue': '#0077B6',
        'control-panel-green': '#00B894',
        'afterburner-orange': '#FD7014',
        'radar-green': '#4ADE80',
        'sky-blue': '#f0f8ff',
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'sans-serif'],
        'rajdhani': ['Rajdhani', 'sans-serif'],
        'eurostile': ['Eurostile', 'sans-serif'],
      },
      animation: {
        'radar-sweep': 'radar-sweep 4s linear infinite',
        'thruster': 'thruster 1.5s ease-in-out infinite',
        'blink': 'blink 1.5s ease-in-out infinite',
      },
      keyframes: {
        'radar-sweep': {
          '0%': { transform: 'rotate(0deg)', opacity: '0.3' },
          '100%': { transform: 'rotate(360deg)', opacity: '0.3' },
        },
        'thruster': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(0.95)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        'blink': {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
}
