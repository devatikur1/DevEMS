import clsx from "clsx";
import { LayoutGrid, LayoutList, ListFilter, Plus, Search } from "lucide-react";
import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { AnimatePresence } from "framer-motion";
import FilterQuickMenu from "./Toolbar/FilterQuickMenu";
import { useNavigate } from "react-router-dom";

export default function Toolbar({ currentView, updateView }) {
  // 🔹 useContext context
  const { authId } = useContext(AppContext);
  const { userDt } = authId;

  // 🔹 State && useNavigate
  const navigate = useNavigate();
  const [showFilterMenuBar, setShowFilterMenuBar] = useState(false);

  // ---------------------
  // ✅ Render
  // ---------------------
  return (
    <>
      {/* Toolbar Main Part */}
      <section className="w-full h-[42px] flex flex-row items-center gap-1 md:gap-2 lg:gap-3">
        {/* 🔍 Search Input Area */}
        <article className="flex-1 h-full relative rounded-md bg-surface border border-boxHover focus-within:border-border transition-all group">
          <div className="absolute left-3 h-full flex items-center pointer-events-none">
            <Search
              size={16}
              className="text-smtext/80 group-focus-within:text-text transition-colors"
            />
          </div>
          <input
            id="Search"
            type="text"
            placeholder="Search Workspaces..."
            className="bg-transparent w-full h-full pl-10 pr-4 text-sm text-white placeholder:text-zinc-500 outline-none"
          />
        </article>

        {/* ⏳ Filter Button */}
        <button
          onClick={() => setShowFilterMenuBar(!showFilterMenuBar)}
          className="h-full px-3 rounded-md bg-surface border border-boxHover hover:bg-white/[0.08] transition-all flex items-center justify-center group active:scale-95"
        >
          <ListFilter
            size={18}
            className="text-smtext/80 group-hover:text-text transition-colors duration-300"
          />
        </button>

        {/* 🔲 View Switcher Toggle (Fixed Logic) */}
        <div className="h-full p-1 rounded-md bg-surface border border-boxHover hidden md:flex items-center gap-1">
          <button
            onClick={() => updateView("grid")}
            title="Grid View"
            className={clsx(
              "h-full px-2.5 flex items-center rounded-sm transition-all duration-200 cursor-pointer",
              currentView === "grid"
                ? "bg-boxHover text-white shadow-sm"
                : "bg-surface hover:text-zinc-300"
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
                ? "bg-boxHover text-white shadow-sm"
                : "bg-surface hover:text-zinc-300"
            )}
          >
            <LayoutList size={16} />
          </button>
        </div>

        {userDt?.role === "admin" && (
          <>
            {/* ➕ Create Workspace Button */}
            <button
              onClick={() => navigate("/create-workspace")}
              className="h-full px-4 rounded-md bg-text text-bg hover:bg-subtext transition-all flex items-center gap-2 active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            >
              <span className="hidden md:flex text-[0.85rem] font-bold whitespace-nowrap">
                Create Workspace
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
