import { error } from 'console';
import type { Config } from 'tailwindcss';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'main-background-gradient': 'linear-gradient(to right, #DDD 0%, #F9F7F3 20%, #F9F7F3 80%, #DDD 100%)'
      },
      colors: {
        primary: "#0FA3B1",
        secondary: "#B5E2FA",
        tertiary: "#F7A072",
        background: "#F9F7F3",
        backgroundSecondary: "#DDD",
        accent: "#EDDEA4",
        'error-text': '#F21616',
        'error-border': '#CB0000',
        'error-bg': '#FCBFBF',
      }
    },
  },
  plugins: [],
} satisfies Config
