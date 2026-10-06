/** @type {import('tailwindcss').Config} */
// Reprend à l'identique la configuration qui était déclarée dans index.html
// (Tailwind est désormais compilé au build au lieu d'être chargé depuis cdn.tailwindcss.com).
export default {
  content: ['./index.html', './App.tsx', './index.tsx', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f2fcf0',
          100: '#e1f7db',
          200: '#c5ecc0',
          300: '#9bda95',
          400: '#6bc163',
          500: '#5fab3b', // Vert Feuille Naturel (Logo)
          600: '#46852b',
          700: '#396a24',
          800: '#315322',
          900: '#29441f',
          950: '#13240f',
        },
        secondary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9', // Bleu Azur (Océan du logo)
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e', // Bleu Profond (Continents/Ombre du logo)
          950: '#082f49',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};
