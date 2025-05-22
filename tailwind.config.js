/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF8E8',
          100: '#FFE9BB',
          200: '#FFD98E',
          300: '#FFC85E',
          400: '#FFB72D',
          500: '#FFA500', // Main primary color - Orange
          600: '#E17E00',
          700: '#C25700',
          800: '#A43B00',
          900: '#861F00',
        },
        secondary: {
          50: '#EFFAF5',
          100: '#D6F5E8',
          200: '#ADEBD4',
          300: '#84E1C0',
          400: '#5BD6AC',
          500: '#32CC98', // Main secondary color - Teal
          600: '#2AA37A',
          700: '#227A5C',
          800: '#1A523E',
          900: '#12291F',
        },
        accent: {
          50: '#FDF2F8',
          100: '#FCE7F3',
          200: '#FBCFE8',
          300: '#F9A8D4',
          400: '#F472B6',
          500: '#EC4899', // Main accent color - Pink
          600: '#DB2777',
          700: '#BE185D',
          800: '#9D174D',
          900: '#831843',
        },
        spice: {
          50: '#FFF5F5',
          100: '#FFE0E0',
          200: '#FFBCBC',
          300: '#FF9797',
          400: '#FF7272',
          500: '#FF4D4D', // Spicy red
          600: '#E53E3E',
          700: '#C53030',
          800: '#9B2C2C',
          900: '#742A2A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Poppins', 'ui-sans-serif', 'system-ui'],
        cursive: ['Caveat', 'cursive']
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      boxShadow: {
        'recipe': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card': '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
};