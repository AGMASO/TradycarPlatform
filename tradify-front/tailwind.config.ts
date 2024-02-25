import type { Config } from 'tailwindcss'
import {nextui} from "@nextui-org/react";

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        lila: "#6239f7",
        lilaSuave: "#9c96f8",
      },

      gradientColorStops: {
        "gradient-1-start": "#6239f7",
        "gradient-1-end": "#deddf9",
        "gradient-2-start": "#3850b0",
        "gradient-2-end": "#bcf4e8",
        "gradient-3-start": "#3850b0",
        "gradient-3-end": "#d72a23",
        "gradient-4-end": "#171354",
      },

      keyframes: {
        "gradient-foreground-1": {
          "from, 16.667%, to": {
            opacity: '1',
          },
          "33.333%, 83.333%": {
            opacity: '0',
          },
        },
        "gradient-background-1": {
          "from, 16.667%, to": {
            opacity: '0',
          },
          "25%, 91.667%": {
            opacity: '1',
          },
        },
        "gradient-foreground-2": {
          "from, to": {
            opacity: '0',
          },
          "33.333%, 50%": {
            opacity: '1',
          },
          "16.667%, 66.667%": {
            opacity: '0',
          },
        },
        "gradient-background-2": {
          "from, to": {
            opacity: '1',
          },
          "33.333%, 50%": {
            opacity: '0',
          },
          "25%, 58.333%": {
            opacity: '1',
          },
        },
        "gradient-foreground-3": {
          "from, 50%, to": {
            opacity: '0',
          },
          "66.667%, 83.333%": {
            opacity: '1',
          },
        },
        "gradient-background-3": {
          "from, 58.333%, 91.667%, to": {
            opacity: '1',
          },
          "66.667%, 83.333%": {
            opacity: '0',
          },
        },
        typewriter: {
          "0%": { width: "0" },
          "100%": { width: "22ch" },
        },
        typewriter2: {
          "0%": { width: "0" },
          "100%": { width: "30ch" },
        },
        cursor: {
          "0%": { "border-right-color": "rgba(255,255,255,0.7)" },
          "100%": { "border-right-color": "transparent" },
        },
        fullSpin: {
          "100%": {
            transform: " rotate(-360deg)",
          },
        },
        fullSpin2: {
          "100%": {
            transform: " rotate(360deg)",
          },
        },
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
      animation: {
        fullSpin: " fullSpin 5s linear infinite",
        fullSpin2: " fullSpin2 5s linear infinite",
        text: "text 5s ease infinite",
        typewriter: "typewriter 1s linear infinite",
        typewriter2: "typewriter2 1s linear infinite",
        cursor: "cursor 1s linear infinite",
        "gradient-background-1": "gradient-background-1 8s infinite",
        "gradient-foreground-1": "gradient-foreground-1 8s infinite",
        "gradient-background-2": "gradient-background-2 8s infinite",
        "gradient-foreground-2": "gradient-foreground-2 8s infinite",
        "gradient-background-3": "gradient-background-3 8s infinite",
        "gradient-foreground-3": "gradient-foreground-3 8s infinite",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()]
  
}
export default config
