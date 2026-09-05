/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ayur: {
          50: '#f2f9f5',
          100: '#e1f2e8',
          200: '#c5e5d3',
          300: '#99d1b4',
          400: '#64b68e',
          500: '#3e9b70',
          600: '#2e7d58',
          700: '#266448',
          800: '#21503b',
          900: '#1c4232',
          950: '#0e251c',
        },
        herb: {
          50: '#fbf9f1',
          100: '#f5f0de',
          200: '#ebdcb9',
          300: '#dfc28d',
          400: '#d1a461',
          500: '#c68b42',
          600: '#b47436',
          700: '#965a2f',
          800: '#7a482b',
          900: '#653c26',
        }
      },
    },
  },
  plugins: [],
}
