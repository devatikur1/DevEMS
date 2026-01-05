/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ===== Base Backgrounds =====
        bg: "#000000",
        bgSoft: "#f9f9f9",
        surface: "#151515",
        surfaceSoft: "#1f1f1f",
        surfaceHard: "#2b2b2b",

        // ===== Text =====
        textPrimary: "#f9f9f9",
        textMuted: "#7e7e7e",
        textDark: "#000000",

        // ===== Accent / Brand =====
        accent: "#3b82f6",
        accentSoft: "#60a5fa",
        accentHover: "#2563eb",
        accentA: "#2b2b2b",

        // ===== UI States =====
        hover: "#181818",
        border: "#2d2d2d",
        boxHover: "#1f1f1f",

        // ===== Status Colors =====
        success: "#10b981",
        successSoft: "#14532d",
        warning: "#ffb300",
        warningSoft: "#78350f",
        error: "#ef4444",
        errorSoft: "#881337",

        // ===== Extra / Legacy =====
        text: "#f9f9f9",
        subtext: "#7e7e7e",
        smtext: "#525252",
        info: "#0ea5e9",
        blue: "#0082fb",
        purple: "#9333ea",
      },
    },
  },
  plugins: [],
};
