/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-600": "#243c5a",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        bigphone: "425px",
      },
      borderRadius: {
        big: "2rem",
        large: "4rem",
        xlarge: "5rem",
      },
      fontSize: {
        lt: "12px",
        tn: "9px",
      },
      transitionTimingFunction: {
        "slow-to-speed":
          "cubic-bezier(0.73, 0, 0, 1)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0E0123",
          secondary: "#3F127A",
          accent: "#ECE1FC",
          fourth: "#EEEEEE",
          neutral: "#2b3440",
          "base-100": "#ffffff",
          info: "#1A8181",
          success: "#127A29",
          warning: "#DBC712",
          error: "#7A1212",
        },
      },
    ],
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },
};
