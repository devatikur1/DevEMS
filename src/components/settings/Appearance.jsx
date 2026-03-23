import React from "react";
import { Sun, Moon, CircleCheckBig } from "lucide-react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

const THEME_OPTIONS = [
  {
    id: "light",
    label: "Light theme",
    icon: Sun,
    des: "Brighter and more vibrant display",
    bg: "bg-gradient-to-br from-gray-100 to-gray-200",
  },
  {
    id: "dark",
    label: "Dark theme",
    icon: Moon,
    des: "Eye-friendly interface for low-light environments",
    bg: "bg-gradient-to-br from-gray-900 to-black",
  },
];

const ACCENT_COLOR_OPTIONS = [
  { id: "sky-blue", label: "Sky Blue", hex: "#3b82f6" },
  { id: "emerald-green", label: "Emerald Green", hex: "#10b981" },
  { id: "royal-violet", label: "Royal Violet", hex: "#8b5cf6" },
  { id: "rose-pink", label: "Rose Pink", hex: "#f43f5e" },
  { id: "amber-gold", label: "Amber Gold", hex: "#f59e0b" },
];

const FONT_OPTIONS = [
  { id: "inter", label: "Inter", fontClass: "font1" },
  { id: "google-sans", label: "Google Sans", fontClass: "font2" },
  { id: "montserrat", label: "Montserrat", fontClass: "font3" },
  { id: "arimo", label: "Arimo", fontClass: "font4" },
];

export default function Appearance({
  theme,
  accent,
  font,
  setAccent,
  handleThemeChange,
  handleFontChange,
}) {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* 1. Select Theme Section */}
      <section>
        <header className="mb-6">
          <h2 className="text-lg font-semibold text-textPrimary mb-1">
            Select Theme
          </h2>
          <p className="text-xs text-textMuted">
            Personalize your workspace appearance
          </p>
        </header>

        <div className="flex gap-4">
          {THEME_OPTIONS.map(({ id, label, icon: Icon, des, bg }) => {
            const isActive = theme === id;
            return (
              <button
                key={id}
                onClick={() => handleThemeChange(id)}
                className={clsx(
                  "flex-1 text-left border rounded-xl p-4 transition-all duration-300 relative overflow-hidden",
                  isActive
                    ? "border-accent ring-1 ring-accent bg-accent/5 scale-[1.02]"
                    : "border-border hover:border-accent/40",
                )}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Icon
                        size={16}
                        className={isActive ? "text-accent" : ""}
                      />
                      <span className="font-medium text-sm text-textPrimary">
                        {label}
                      </span>
                    </div>
                    <p className="text-[10px] text-textMuted">{des}</p>
                  </div>
                  {isActive && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <CircleCheckBig size={18} className="text-accent" />
                    </motion.div>
                  )}
                </div>
                <div className={clsx("h-16 rounded-lg shadow-inner", bg)} />
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. Accent Color Section */}
      <section className="flex justify-between items-center py-4 border-t border-border/50">
        <article>
          <h2 className="text-md font-semibold text-textPrimary">
            Accent color
          </h2>
          <p className="text-[11px] text-textMuted">
            Choose your primary brand color
          </p>
        </article>
        <div className="flex items-center gap-3">
          {ACCENT_COLOR_OPTIONS.map(({ id, label, hex }) => {
            const isActive = accent === id;
            return (
              <button
                key={id}
                title={label}
                onClick={() => setAccent(id)}
                className="relative flex items-center justify-center w-7 h-7 group"
              >
                {/* Outer Ring */}
                <div
                  className={clsx(
                    "absolute inset-0 rounded-full border-2 transition-all duration-300",
                    isActive ? "opacity-100 scale-110" : "opacity-0 scale-50",
                  )}
                  style={{ borderColor: hex }}
                />
                {/* Inner Circle */}
                <div
                  style={{ backgroundColor: hex }}
                  className={clsx(
                    "w-5 h-5 rounded-full transition-transform duration-300 shadow-md",
                    isActive ? "scale-90" : "group-hover:scale-110",
                  )}
                />
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Font Style Section */}
      <section className="flex justify-between items-center py-4 border-t border-border/50">
        <article>
          <h2 className="text-md font-semibold text-textPrimary">Font style</h2>
          <p className="text-[11px] text-textMuted">
            Choose your preferred typography
          </p>
        </article>
        <div className="flex items-center gap-3">
          {FONT_OPTIONS.map(({ id, label, fontClass }) => {
            const isActive = font === id;
            return (
              <button
                key={id}
                title={label}
                onClick={() =>
                  handleFontChange(id, fontClass, { id, label, fontClass })
                }
                className={clsx(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-200 border",
                  fontClass,
                  isActive
                    ? "bg-accent text-textPrimary border-accent shadow-md scale-105"
                    : "bg-bg text-textMuted border-border hover:bg-secondary/40",
                )}
              >
                Aa
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}