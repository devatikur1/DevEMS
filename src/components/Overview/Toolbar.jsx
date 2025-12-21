import clsx from "clsx";
import { LayoutGrid, LayoutList, ListFilter, Plus, Search } from "lucide-react";
import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { AnimatePresence } from "framer-motion";
import FilterQuickMenu from "./Toolbar/FilterQuickMenu";

export default function Toolbar({ currentView, updateView }) {
  // 🔹 useContext context
  const { authId } = useContext(AppContext);
  const { userDt } = authId;

  // 🔹 State
  const [showFilterMenuBar, setShowFilterMenuBar] = useState(false);

  // ---------------------
  // ✅ Render
  // ---------------------
  return (
    <>
      {/* Toolbar Main Part */}
      <section className="w-full h-[42px] flex flex-row items-center gap-3">
        {/* 🔍 Search Input Area */}
        <article className="flex-1 h-full relative rounded-md bg-surface border border-border focus-within:border-white/20 transition-all group">
          <div className="absolute left-3 h-full flex items-center pointer-events-none">
            <Search
              size={16}
              className="text-zinc-500 group-focus-within:text-zinc-300 transition-colors"
            />
          </div>
          <input
            id="Search"
            type="text"
            placeholder="Search Teams..."
            className="bg-transparent w-full h-full pl-10 pr-4 text-sm text-white placeholder:text-zinc-500 outline-none"
          />
        </article>

        {/* ⏳ Filter Button */}
        <button
          onClick={() => setShowFilterMenuBar(!showFilterMenuBar)}
          className="h-full px-3 rounded-md bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] transition-all flex items-center justify-center group active:scale-95"
        >
          <ListFilter
            size={18}
            className="text-zinc-400 group-hover:text-white"
          />
        </button>

        {/* 🔲 View Switcher Toggle (Fixed Logic) */}
        <div className="h-full p-1 rounded-md bg-white/[0.03] border border-white/10 hidden md:flex items-center gap-1">
          <button
            onClick={() => updateView("grid")}
            title="Grid View"
            className={clsx(
              "h-full px-2.5 flex items-center rounded-sm transition-all duration-200 cursor-pointer",
              currentView === "grid"
                ? "bg-white/10 text-white shadow-sm"
                : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            <LayoutGrid size={16} />
          </button>

          <button
            onClick={() => updateView("list")}
            title="List View"
            className={clsx(
              "h-full px-2.5 flex items-center rounded-sm transition-all duration-200 cursor-pointer",
              currentView === "list"
                ? "bg-white/10 text-white shadow-sm"
                : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            <LayoutList size={16} />
          </button>
        </div>

        {userDt?.role === "admin" && (
          <>
            {/* ➕ Create Team Button */}
            <button className="h-full px-4 rounded-md bg-text/80 text-black hover:bg-text transition-all flex items-center gap-2 active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              <span className="hidden md:flex text-[0.85rem] font-bold whitespace-nowrap">
                Create Team
              </span>
              <Plus size={16} strokeWidth={3} />
            </button>
          </>
        )}
      </section>

      <AnimatePresence>
        {showFilterMenuBar && (
          <FilterQuickMenu setShowFilterMenuBar={setShowFilterMenuBar} />
        )}
      </AnimatePresence>
    </>
  );
}
