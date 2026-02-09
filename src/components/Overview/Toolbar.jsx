import clsx from "clsx";
import { LayoutGrid, LayoutList, ListFilter, Plus, Search } from "lucide-react";
import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { AnimatePresence } from "framer-motion";
import SortQuickMenu from "./Toolbar/SortQuickMenu";
import { useNavigate } from "react-router-dom";

export default function Toolbar({
  currentView,
  currentSort,
  updateView,
  updateSort,
  currentDirection,
  updateDirection,
  showSortMenuBar,
  setShowSortMenuBar,
  searchParams,
  handleSearchChange,
}) {
  // 🔹 useContext context
  const { authId } = useContext(AppContext);
  const { userDt } = authId;

  // 🔹 useNavigate && State
  const navigate = useNavigate();
  const [sortQuickDt, setSortQuickDt] = useState({});

  // ---------------------
  // ✅ Render
  // ---------------------
  return (
    <>
      {/* Toolbar Main Part */}
      <section className="w-full h-[42px] flex flex-row items-center gap-1 md:gap-2 lg:gap-3">
        <article className="flex-1 h-full relative rounded-md bg-surface border border-border focus-within:border-hover transition-all group">
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
            placeholder="Search Workspaces..."
            className="bg-transparent w-full h-full pl-10 pr-4 text-sm text-textPrimary placeholder:text-textMuted outline-none"
          />
        </article>

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

        <article className="h-full p-1 rounded-md bg-surface border border-border focus-within:border-hover transition-all hidden md:flex items-center gap-1">
          <button
            onClick={() => updateView("grid")}
            title="Grid View"
            className={clsx(
              "h-full px-2.5 flex items-center rounded-sm transition-all duration-200 cursor-pointer",
              currentView === "grid"
                ? "bg-boxHover text-textPrimary shadow-sm"
                : "bg-transparent hover:bg-boxHover hover:text-textPrimary/80"
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
                ? "bg-surfaceSoft text-textPrimary shadow-sm"
                : "bg-surface hover:bg-boxHover hover:text-textMuted"
            )}
          >
            <LayoutList size={16} />
          </button>
        </article>

        {userDt?.role === "admin" && (
          <button
            onClick={() => navigate("/create-workspace")}
            className="h-full px-4 rounded-md bg-bgSoft text-bg hover:bg-bgSoft/90 transition-all flex items-center gap-2 active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          >
            <span className="hidden md:flex text-[0.85rem] font-bold whitespace-nowrap">
              Create Workspace
            </span>
            <Plus size={16} strokeWidth={3} />
          </button>
        )}
      </section>

      <AnimatePresence>
        {showSortMenuBar && (
          <SortQuickMenu
            sortQuickDt={sortQuickDt}
            setShowSortMenuBar={setShowSortMenuBar}
            currentDirection={currentDirection}
            updateDirection={updateDirection}
            currentSort={currentSort}
            updateSort={updateSort}
            currentView={currentView}
            updateView={updateView}
          />
        )}
      </AnimatePresence>
    </>
  );
}
