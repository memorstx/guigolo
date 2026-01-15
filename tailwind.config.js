/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  extend: {
    colors: {
      "neutral-black-900": "#101010",
      "neutral-black-800": "#161616",

      "neutral-white": "#ededed",

      "neutral-gray-600": "#3c3c3c",
      "neutral-gray-500": "#4c4c4c",

      "accent-lilac": "#6900ea",

      "accent-cyan-10": "rgba(20,177,255,0.10)",
      "accent-lime": "#C6FF00",
    },

    fontFamily: {
      display: ["var(--font-unbounded)"],
      body: ["var(--font-unbounded)"],
      accent: ["var(--font-anta)"],
    },
    fontSize: {
      "heading-xl": ["36px", { lineHeight: "125%" }],
      "heading-lg": ["24px", { lineHeight: "28.8px" }],
      "heading-md": ["16px", { lineHeight: "19.2px" }],

      "body-lg": ["14px", { lineHeight: "15px" }],
      "body-md": ["12px", { lineHeight: "13.75px" }],
      "body-sm": ["11px", { lineHeight: "12.5px" }],

      "label-xl": ["32px", { lineHeight: "38.4px" }],
      "label-sm": ["12px", { lineHeight: "14.4px" }],
    },
    letterSpacing: {
      "heading-lg": "1.92px",
      "label-sm": "0.96px",
    },


  },
},
  plugins: [],
};
