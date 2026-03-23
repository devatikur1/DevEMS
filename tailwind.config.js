/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        bgSoft: "rgb(var(--bgSoft) / <alpha-value>)",

        surface: "rgb(var(--surface) / <alpha-value>)",
        surfaceSoft: "rgb(var(--surfaceSoft) / <alpha-value>)",
        surfaceHard: "rgb(var(--surfaceHard) / <alpha-value>)",

        textPrimary: "rgb(var(--textPrimary) / <alpha-value>)",
        textMuted: "rgb(var(--textMuted) / <alpha-value>)",
        textDark: "rgb(var(--textDark) / <alpha-value>)",

        accent: "rgb(var(--accent) / <alpha-value>)",
        accentSoft: "rgb(var(--accentSoft) / <alpha-value>)",
        accentHover: "rgb(var(--accentHover) / <alpha-value>)",

        hover: "rgb(var(--hover) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        boxHover: "rgb(var(--boxHover) / <alpha-value>)",

        success: "rgb(var(--success) / <alpha-value>)",
        successSoft: "rgb(var(--successSoft) / <alpha-value>)",

        warning: "rgb(var(--warning) / <alpha-value>)",
        warningSoft: "rgb(var(--warningSoft) / <alpha-value>)",

        error: "rgb(var(--error) / <alpha-value>)",
        errorSoft: "rgb(var(--errorSoft) / <alpha-value>)",

        info: "rgb(var(--info) / <alpha-value>)",
        infoSoft: "rgb(var(--infoSoft) / <alpha-value>)",
      },

      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        glow: "var(--shadow-glow)",
      },
    },
  },

  plugins: [],
};
