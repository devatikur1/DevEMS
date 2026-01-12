import clsx from "clsx";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion"; // Framer motion install thakle

export default function OptionHeader({ navItems, isScrolled }) {
  const [hoveredTab, setHoveredTab] = useState(null);

  return (
    <article className="sticky top-0 z-[100] w-full bg-surface border-b border-border/85 select-none pt-2.5 overflow-x-auto scrollVeiwNone touch-pan-x bax">
      <section
        className="relative flex items-center gap-2 mx-4 transition-all duration-300"
        onMouseLeave={() => setHoveredTab(null)}
      >
        <article
          className={clsx(
            "h-full flex justify-center items-center pb-1.5 mr-1 transition-all duration-300",
            isScrolled && "scale-[1] flex",
            !isScrolled && "scale-0 hidden"
          )}
        >
          <Link to={"/"} className="min-w-5 min-h-5">
            <svg
              width="20"
              height="20"
              viewBox="0 0 76 65"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M38 0L76 65H0L38 0Z" fill="white" />
            </svg>
          </Link>
        </article>

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
