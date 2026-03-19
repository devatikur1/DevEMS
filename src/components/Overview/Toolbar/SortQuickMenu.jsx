import { motion } from "framer-motion";
import {
  ArrowUpAZ,
  ArrowUpZA,
  CalendarFold,
  Check,
  LayoutGrid,
  LayoutList,
  Medal,
  User,
} from "lucide-react";
import React from "react";

export default function SortQuickMenu({
  sortQuickDt,
  setShowSortMenuBar,
  updateDirection,
  updateSort,
  updateView,
  searchParams
}) {
  return (
    <>
      <div className="fixed inset-0 z-[40] h-[100vh] overflow-y-auto">
        {/* Backdrop-BG */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setShowSortMenuBar(false)}
          className="absolute inset-0 bg-surface/35 sm:bg-transparent"
        />

        {/* Modal-Content */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
            height: 0,
            ...(sortQuickDt.isMobile
              ? {}
              : { top: sortQuickDt.x, left: sortQuickDt.y }),
          }}
          animate={{
            opacity: 1,
            scale: 1,
            height: "auto",
            ...(sortQuickDt.isMobile
              ? {}
              : { top: sortQuickDt.x, left: sortQuickDt.y }),
          }}
          exit={{
            opacity: 0,
            scale: 0.95,
            height: 0,
            ...(sortQuickDt.isMobile
              ? {}
              : { top: sortQuickDt.x, left: sortQuickDt.y }),
          }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          drag={"y"}
          dragConstraints={{ top: 0, bottom: -20 }}
          dragElastic={{ top: 0, bottom: 0.4 }}
          onDragEnd={(e, info) => {
            if (info.offset.y > 10) {
              setShowSortMenuBar(false);
            }
          }}
          className="absolute z-[110] -bottom-20 sm:bottom-auto sm:top-[185px] sm:right-[370px] sm:mx-0 w-[99.9%] sm:w-[240px] bg-surface backdrop-blur-2xl border border-border rounded-xl sm:rounded-2xl shadow-2xl p-2 overflow-hidden pb-24 sm:pb-0"
        >
          <div className="w-full flex sm:hidden justify-center">
            <div className="rounded-full bg-textMuted h-1 w-10"></div>
          </div>
          <div className="flex flex-col gap-1 px-1.5 py-2">
            <h1 className="text-[12px] text-textMuted mb-2 ml-1">Direction</h1>
            {/* Ascending Direction */}
            <button
              onClick={() => updateDirection("asc")}
              className="w-full text-left text-[0.8rem] md:text-[0.85rem] text-textPrimary/65 hover:text-textPrimary hover:bg-boxHover transition-all flex items-center justify-between px-3 py-2.5 rounded-[6px] group"
            >
              <div className="flex items-center gap-3">
                <ArrowUpAZ
                  size={16.5}
                  className="sm:group-hover:rotate-180 transition-transform duration-300"
                />
                <span>
                  Ascending {"  "}{" "}
                  <small className="text-textMuted">{"(A-Z)"}</small>
                </span>
              </div>
              <div>
                {searchParams.get("direction") === "asc" && (
                  <Check size={16.5} className="text-textMuted" />
                )}
              </div>
            </button>
            {/* Descending Direction */}
            <button
              onClick={() => updateDirection("desc")}
              className="w-full text-left text-[0.8rem] md:text-[0.85rem] text-textPrimary/65 hover:text-textPrimary hover:bg-boxHover transition-all flex items-center justify-between px-3 py-2.5 rounded-[6px] group"
            >
              <div className="flex items-center gap-3">
                <ArrowUpZA
                  size={16.5}
                  className="sm:group-hover:rotate-180 transition-transform duration-300"
                />
                <span>
                  Descending {"  "}{" "}
                  <small className="text-textMuted">{"(Z-A)"}</small>
                </span>
              </div>
              <div>
                {searchParams.get("direction") === "desc" && (
                  <Check size={16.5} className="text-textMuted" />
                )}
              </div>
            </button>
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-textMuted to-transparent" />{" "}
          <div className="flex flex-col gap-1 px-1.5 py-2">
            <h1 className="text-[12px] text-textMuted mb-2 ml-1">Sort by</h1>
            {/* Date View */}
            <button
              onClick={() => updateSort("date")}
              className="w-full text-left text-[0.8rem] md:text-[0.85rem] text-textPrimary/65 hover:text-textPrimary hover:bg-boxHover transition-all flex items-center justify-between px-3 py-2.5 rounded-[6px] group"
            >
              <div className="flex items-center gap-3">
                <CalendarFold
                  size={16.5}
                  className="sm:group-hover:scale-110 transition-transform"
                />
                <span>Date</span>
              </div>
              <div>
                {searchParams.get("sort") === "date" && (
                  <Check size={16.5} className="text-textMuted" />
                )}
              </div>
            </button>
            {/* Name View */}
            <button
              onClick={() => updateSort("name")}
              className="w-full text-left text-[0.8rem] md:text-[0.85rem] text-textPrimary/65 hover:text-textPrimary hover:bg-boxHover transition-all flex items-center justify-between px-3 py-2.5 rounded-[6px] group"
            >
              <div className="flex items-center gap-3">
                <User
                  size={16.5}
                  className="sm:group-hover:scale-110 transition-transform"
                />
                <span>Name</span>
              </div>
              <div>
                {searchParams.get("sort") === "name" && (
                  <Check size={16.5} className="text-textMuted" />
                )}
              </div>
            </button>
            {/* Score View */}
            <button
              onClick={() => updateSort("score")}
              className="w-full text-left text-[0.8rem] md:text-[0.85rem] text-textPrimary/65 hover:text-textPrimary hover:bg-boxHover transition-all flex items-center justify-between px-3 py-2.5 rounded-[6px] group"
            >
              <div className="flex items-center gap-3">
                <Medal
                  size={16.5}
                  className="sm:group-hover:scale-110 transition-transform"
                />
                <span>Score</span>
              </div>
              <div>
                {searchParams.get("sort") === "score" && (
                  <Check size={16.5} className="text-textMuted" />
                )}
              </div>
            </button>
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-textMuted to-transparent" />{" "}
          <div className="flex md:hidden flex-col gap-1 px-1.5 py-2">
            {/* View Header */}
            <h1 className="text-[12px] text-textMuted mb-2 ml-1">View</h1>
            {/* Grid View */}
            <button
              onClick={() => updateView("grid")}
              className="w-full text-left text-[0.8rem] md:text-[0.85rem] text-textPrimary/65 hover:text-textPrimary hover:bg-boxHover transition-all flex items-center justify-between px-3 py-2.5 rounded-[6px] group"
            >
              <div className="flex items-center gap-3">
                <LayoutGrid
                  size={16.5}
                  className="sm:group-hover:scale-110 transition-transform"
                />
                <span>Grid View</span>
              </div>
              <div>
                {searchParams.get("view") === "grid" && (
                  <Check size={16.5} className="text-textMuted" />
                )}
              </div>
            </button>
            {/* List View */}
            <button
              onClick={() => updateView("list")}
              className="w-full text-left text-[0.8rem] md:text-[0.85rem] text-textPrimary/65 hover:text-textPrimary hover:bg-boxHover transition-all flex items-center justify-between px-3 py-2.5 rounded-[6px] group"
            >
              <div className="flex items-center gap-3">
                <LayoutList
                  size={16.5}
                  className="sm:group-hover:scale-110 transition-transform"
                />
                <span>List View</span>
              </div>
              <div>
                {searchParams.get("view") === "list" && (
                  <Check size={16.5} className="text-textMuted" />
                )}
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
