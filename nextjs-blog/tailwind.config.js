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
          35 : '#40444a',
          40 : '#4d5259',
          50 : '#646a73',
        },
        'accent':{
          20 : '#345057',
          30 : '#537f8a',
          40 : '#71aebd',
          50 : '#90ddf0',
        }, 
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
      require('@tailwindcss/forms'),
  ],
}

