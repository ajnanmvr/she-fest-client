import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "h-line": "url('/img/horizonadal-lines.png')",
        "v-line": "url('/img/vertical-lines.png')",
      },
      colors: {

        brown: "#B34418",
        yellow: "#F8AD1D",
        primary:"#008000"
      },
    },
  },
  plugins: [],
};

export default config;
