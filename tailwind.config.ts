import type { Config } from 'tailwindcss';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0FA3B1",
        secondary: "#B5E2FA",
        tertiary: "#F7A072",
        background: "#F9F7F3",
        backgroundSecondary: "#DDD",
        accent: "#EDDEA4"
      }
    },
  },
  plugins: [],
} satisfies Config
