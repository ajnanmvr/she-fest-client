import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#186F65', // Change this to your primary color code
        primaryDark: '#104a43', // Change this to your primary color code
        secondary: '#d5e5e3',
      },
    },
  },
  plugins: [],
}

export default config