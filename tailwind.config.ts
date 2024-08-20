import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        twitterWhite: "#e7e9ea",
        twitterBlue: "#1da1f2",
        twitterDarkBlue: "#2795d9",
        twitterBorder: "#2f3336",
        twitterLightGray: "#71767b",
        twitterDarkGray: "#657786",
      },
    },
  },
  plugins: [],
};
export default config;
