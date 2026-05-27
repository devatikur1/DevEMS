import { motion } from "framer-motion";
import { Monitor, User } from "lucide-react";
import React from "react";

const tabs = [
  { id: "profile", label: "General Profile", icon: User },
  { id: "appearance", label: "Display & Theme", icon: Monitor },
];

export default function NavBar({ paramsUrl, searchParams, setSearchParams }) {
  const activeTab = searchParams.get("tab") || "profile";

  return (
    <nav className="lg:col-span-3 flex flex-row lg:flex-col gap-2 bg-surface border border-border/35 lg:border-none lg:bg-transparent p-2 lg:p-0 rounded-xl">
      {tabs.map((t) => {
        const Icon = t.icon;
        const isActive = t.id === activeTab;

        return (
          <button
            key={t.id}
            onClick={() =>
              paramsUrl({
                get: searchParams,
                set: setSearchParams,
                key: "tab",
                value: t.id,
              })
            }
            className={`relative overflow-hidden w-full flex items-center gap-3 pl-7 pr-5 py-3.5 rounded-md transition-all duration-300 group ${
              isActive
                ? "bg-surfaceSoft text-textPrimary shadow-[0_4px_20px_rgba(0,0,0,0.45)]"
                : "text-textMuted hover:text-textPrimary hover:bg-boxHover"
            }`}
          >
            {/* Desktop Active Indicator */}
            {isActive && (
              <motion.div
                layoutId="desktopActiveIndicator"
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 28,
                }}
                className="absolute hidden left-0.5 lg:flex w-[3px] h-full justify-center items-center"
              >
                <div className="w-full h-[80%] bg-accent rounded-full shadow-[0_0_12px_rgb(var(--accent)/0.6)]" />
              </motion.div>
            )}

            {/* Icon */}
            <Icon
              className={`hidden md:flex size-[18px] relative z-10 transition-all duration-300 ${
                isActive
                  ? "text-accent"
                  : "text-textMuted group-hover:text-textPrimary"
              }`}
            />

            {/* Label */}
            <span className="relative z-10 text-[11px] sm:text-sm font-medium tracking-[0.01em]">
              {t.label}
            </span>

            {/* Active Glow */}
            {isActive && (
              <div className="absolute inset-0 rounded-md border border-accent/10 pointer-events-none" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
