/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ], theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#D1A054",

          "secondary": "#835D23",

        //   "accent": "#00ffff",

          "neutral": "#1f2937",

        //   "base-100": "#ff00ff",

        //   "info": "#0000ff",

        //   "success": "#00ff00",

        //   "warning": "#00ff00",

        //   "error": "#ff0000",
        },
      },
    ],
  },
  plugins: [
    require('daisyui'),
  ],

}

