import { ListFilter, Search } from "lucide-react";
import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { AnimatePresence } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import SortQuickMenu from "./Toolbar/SortQuickMenu";

export default function Toolbar({
  updateFC,
  updateSort,
  updateDirection,
  
  showSortMenuBar,
  setShowSortMenuBar,
  handleSearchChange,
}) {
  // 🔹 useNavigate && State
  const [sortQuickDt, setSortQuickDt] = useState({});
  const [searchParams] = useSearchParams();

  // ---------------------
  // ✅ Render
  // ---------------------
  return (
    <>
      {/* Toolbar Main Part */}
      <section className="w-full h-[42px] flex flex-row items-center gap-1 md:gap-2 lg:gap-3">
        {/* Search Filter */}
        <article className="flex-1 h-full transition-all group relative rounded-md">
          <div className="absolute left-3 h-full flex items-center pointer-events-none">
            <Search
              size={16}
              className="text-textMuted group-focus-within:text-textPrimary transition-colors"
            />
          </div>
          <input
            id="Search"
            type="text"
            value={searchParams.get("q") || ""}
            onChange={handleSearchChange}
            placeholder="Search Employees..."
            className="w-full h-full bg-surface border border-border hover:border-hover focus:border-accent/50 rounded-md pl-10 pr-4 text-sm text-textPrimary placeholder:text-textMuted outline-none transition-all"
          />
        </article>

        {/* Filter */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            const rect = e.currentTarget.getBoundingClientRect();
            const isMobile = window.innerWidth < 640;

            setShowSortMenuBar(!showSortMenuBar);
            setSortQuickDt({
              isMobile,
              x: isMobile ? undefined : rect.top + rect.height + 4,
              y: isMobile ? undefined : Math.max(8, rect.right - 240),
            });
          }}
          className="h-full px-3 rounded-md bg-surface border border-border focus-within:border-hover transition-all flex items-center justify-center group active:scale-95"
        >
          <ListFilter
            size={18}
            className="text-textMuted group-focus-within:text-textPrimary transition-colors"
          />
        </button>
      </section>

      <AnimatePresence>
        {showSortMenuBar && (
          <SortQuickMenu
            sortQuickDt={sortQuickDt}
            setShowSortMenuBar={setShowSortMenuBar}
            updateFC={updateFC}
            updateSort={updateSort}
            updateDirection={updateDirection}
            searchParams={searchParams}
          />
        )}
      </AnimatePresence>
    </>
  );
}
