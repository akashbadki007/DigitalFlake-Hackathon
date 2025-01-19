/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "custom-purple": "#5C218B",
        'cust-purple': '#662671',  
        'custom-silver': '#8F8F8F',
        'light-gray':'#F4F4F4',
        'light-yellow':'#E1D67B'
      }
    },
  },
  plugins: [],
}

