/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "node_modules/daisyui/dist/**/*.js",
    "node_modules/react-daisyui/dist/**/*.js",
  ],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#9267d6",
          "primary-focus": "#7149b5",
          "primary-content": "#fcfcfc",

          secondary: "#5e7ac9",
          "secondary-focus": "#3b5da8",
          "secondary-content": "#fcfcfc",

          accent: "#df4262",
          "accent-focus": "#ba1846",
          "accent-content": "#fcfcfc",

          neutral: "#3b424e",
          "neutral-focus": "#2a2e37",
          "neutral-content": "#fcfcfc",

          "base-100": "#fcfcfc",
          "base-200": "#f9fafb",
          "base-300": "#ced3d9",
          "base-content": "#1e2734",

          info: "#1c92f2",
          success: "#009485",
          warning: "#ff9900",
          error: "#ff5724",

          "--rounded-box": ".75rem",
          "--rounded-btn": ".75rem",
          "--rounded-badge": "1rem",

          "--animation-btn": ".25s",
          "--animation-input": ".2s",

          "--btn-text-case": "uppercase",
          "--navbar-padding": ".5rem",
          "--border-btn": "1px",
        },
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp"), require("daisyui")],
};
