import { heroui } from "@heroui/react"

/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [
    heroui({
      themes: {
        dark: {
          colors: {
            background: "#101426",
            default: "#1F2852",
          },
        },
        light: {
          colors: {
            background: "#FCFAF9",
          }
        },
      },
    }),
  ],
};
