import { motion } from "framer-motion";
import { Monitor, Shield, User } from "lucide-react";
import React from "react";

const tabs = [
  { id: "profile", label: "General Profile", icon: User },
  { id: "account", label: "Security & Account", icon: Shield },
  { id: "appearance", label: "Display & Theme", icon: Monitor },
];

export default function NavBar({ paramsUrl, searchParams, setSearchParams }) {
  return (
    <nav className="lg:col-span-3 flex flex-row lg:flex-col gap-2 bg-surface lg:bg-transparent px-2 py-1.5 lg:p-0 rounded-md">
      {tabs.map((t) => {
        let tab = searchParams.get("tab") || "profile";
        const Icon = t.icon;
        const isActive = t.id === tab;

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
            className={`w-full relative flex items-center gap-3 px-5 py-3 rounded-md transition-all duration-200 ${
              isActive
                ? "bg-surfaceSoft text-textPrimary shadow-[0_4px_14px_rgba(0,0,0,0.6)]"
                : "text-textMuted hover:text-textPrimary hover:bg-boxHover"
            }`}
          >
            {/* Animated Left Indicator */}
            {isActive && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 lg:left-0 h-[100%] bg-transparent flex items-center justify-start"
              >
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[3px] lg:left-0 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0 lg:w-[3px] lg:h-[70%] bg-accent rounded-ss-full lg:rounded-ee-full" />
              </motion.div>
            )}

            <Icon
              size={18}
              className={`relative z-10 ${
                isActive ? "text-accent" : "text-textMuted"
              }`}
            />
            <span className="relative z-10">{t.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
