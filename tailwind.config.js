/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ===== Base Backgrounds =====
        bg: "#000000",
        bgSoft: "#f9f9f9",
        surface: "#0a0a0a",
        surfaceSoft: "#111111",
        surfaceHard: "#080808",

        // ===== Text =====
        textPrimary: "#f9f9f9",
        textMuted: "#7e7e7e",
        textDark: "#000000",

        // ===== Accent / Brand =====
        accent: "#3b82f6",
        accentSoft: "#60a5fa",
        accentHover: "#2563eb",

        // ===== UI States =====
        hover: "#454545",
        border: "#2d2d2d",
        boxHover: "#141414",

        // ===== Status Colors =====
        success: "#10b981",
        successSoft: "#14532d",
        warning: "#ffb300",
        warningSoft: "#78350f",
        error: "#ef4444",
        errorSoft: "#881337",
        info: "#38BDF8",
        infoSoft: "#0B2A3A",

        // ===== Extra / Legacy =====
        text: "#f9f9f9",
        subtext: "#7e7e7e",
        smtext: "#525252",
        blue: "#0082fb",
        purple: "#9333ea",
        shadow: "#000000",
      },
    },
  },
  plugins: [],
};
