/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['Jost', 'sans-serif']
      },

      boxShadow: {
        'th-shadow': '0 6px 15px rgba(64,79,104,.05)'
      }
    }
  },
  plugins: []
}
