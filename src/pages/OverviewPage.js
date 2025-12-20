import clsx from "clsx";
import { LayoutGrid, LayoutList, ListFilter, Plus, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function OverviewPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentView, setCurrentView] = useState(
    searchParams.get("view") || "grid"
  );

  // ---------------------
  // ✅ Change 
  // ---------------------
  useEffect(() => {
    setSearchParams({ view: currentView });
  }, [currentView, setSearchParams]);

  // ---------------------
  // ✅ Render
  // ---------------------
  return (
    <main className="w-full flex justify-center text-white min-h-screen bg-black">
      <div className="w-[95%] xl:w-[90%] 2xl:w-[71%] pt-10">
        {/* 🛠️ Toolbar Section */}
        <section className="w-full h-[42px] flex flex-row items-center gap-3">
          {/* 🔍 Search Input Area */}
          <article className="flex-1 h-full relative rounded-md bg-white/[0.03] border border-white/10 focus-within:border-white/20 transition-all group">
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
          <button className="h-full px-3 rounded-md bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] transition-all flex items-center justify-center group active:scale-95">
            <ListFilter
              size={18}
              className="text-zinc-400 group-hover:text-white"
            />
          </button>

          {/* 🔲 View Switcher Toggle (Fixed Logic) */}
          <div className="h-full p-1 rounded-md bg-white/[0.03] border border-white/10 flex items-center gap-1">
            <button
              onClick={() => setCurrentView("grid")}
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
              onClick={() => setCurrentView("list")}
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

          {/* ➕ Create Team Button */}
          <button className="h-full px-4 rounded-md bg-white text-black hover:bg-zinc-200 transition-all flex items-center gap-2 active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            <span className="text-[0.85rem] font-bold whitespace-nowrap">
              Create Team
            </span>
            <Plus size={16} strokeWidth={3} />
          </button>
        </section>

        {/* 📑 Dynamic Content Area */}
        <section className="mt-10 mb-20">
          {currentView === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Grid Placeholder Cards */}
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-44 border border-white/10 rounded-xl bg-white/[0.02] p-5 hover:border-white/20 transition-all cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-full bg-accentA/20 mb-4 border border-accentA/30"></div>
                  <h3 className="font-semibold text-[1rem]">Dev Team {i}</h3>
                  <p className="text-zinc-500 text-xs mt-1">
                    4 Members • Active
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {/* List Placeholder Rows */}
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-[65px] border border-white/10 rounded-lg bg-white/[0.02] px-5 flex items-center justify-between hover:bg-white/[0.04] transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded bg-zinc-800 border border-white/10"></div>
                    <div>
                      <h3 className="text-sm font-medium">Design System {i}</h3>
                      <p className="text-[10px] text-zinc-500 italic">
                        Updated 2h ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-xs text-zinc-400">Public</span>
                    <button className="text-zinc-500 hover:text-white transition-colors">
                      •••
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
