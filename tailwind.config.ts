import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#644841",
        "primary-content": "#dcccc8",
        "primary-dark": "#45322d",
        "primary-light": "#835e55",

        secondary: "#4b6441",
        "secondary-content": "#cedcc8",
        "secondary-dark": "#34452d",
        "secondary-light": "#628355",

        background: "#f1efef",
        foreground: "#fbfbfb",
        border: "#e2dedd",

        copy: "#292523",
        "copy-light": "#6e615e",
        "copy-lighter": "#958784",

        success: "#416441",
        warning: "#646441",
        error: "#644141",

        "success-content": "#c8dcc8",
        "warning-content": "#dcdcc8",
        "error-content": "#dcc8c8",
      },
    },
  },
  plugins: [],
} satisfies Config;
