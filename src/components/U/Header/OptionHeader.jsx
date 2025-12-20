import clsx from "clsx";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion"; // Framer motion install thakle

export default function OptionHeader({ navItems }) {
  const [hoveredTab, setHoveredTab] = useState(null);

  return (
    <article className="sticky top-0 z-[100] w-full border-b border-white/10 select-none pt-2.5">
      <section
        className="relative flex items-center gap-2 mx-3"
        onMouseLeave={() => setHoveredTab(null)}
      >
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onMouseEnter={() => setHoveredTab(item.name)}
            className={({ isActive }) =>
              clsx(
                "relative z-20 text-[0.85rem] px-3 pt-2 pb-3 transition-colors duration-300 h-full",
                isActive ? "text-white" : "text-white/50 hover:text-white"
              )
            }
          >
            {({ isActive }) => (
              <>
                <span>{item.name}</span>

                {/* Hover Background + Smooth Slide */}
                {hoveredTab === item.name && (
                  <motion.div
                    layoutId="hoverBox"
                    className="absolute bottom-1.5 inset-0 bg-white/10 rounded-md z-[-1]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}

                {/* Active Underline */}
                {isActive && (
                  <motion.div
                    layoutId="activeBar"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-white z-30"
                    transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </section>
    </article>
  );
}
