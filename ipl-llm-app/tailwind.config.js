/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'ipl-purple': '#6B46C1',
        'ipl-blue': '#3182CE',
        'ipl-green': '#38A169',
        'ipl-red': '#E53E3E',
        'ipl-yellow': '#ECC94B',
        'ipl-gold': '#D4AF37',
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /^bg-(gray|red|blue|green|yellow|purple|pink|indigo|teal|orange|amber|emerald|lime|cyan|sky|violet|fuchsia|rose)-(50|100|200|300|400|500|600|700|800|900)/,
    },
  ],
}

