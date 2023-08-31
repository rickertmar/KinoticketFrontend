/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily:{
      'nunito':['"nunito sans"', 'sans-serif'],
    },
    extend: {
      colors:{
        'primary':{
          10 : '#0b0c0d',
          20 : '#212326',
          30 : '#373b40',
          40 : '#4d5259',
          50 : '#646a73',
        },
        'accent':{
          10 : '#2e464d',
          20 : '#456873',
          30 : '#547f8c',
          40 : '#6396a6',
          50 : '#73adbf',
        }, 
        'harmonic': '#6090bf'
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}

