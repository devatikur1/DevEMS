import React, { useState } from "react";
import ListPlaceholder from "./DynamicContent/ListPlaceholder";

export default function DynamicContent({ currentView }) {
    const [arr] = useState([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ]);
  return (
    <section className="mt-8 mb-20">
      <h1 className="pb-5 us">Projects</h1>
      {currentView === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Grid Placeholder Cards */}
          {arr.map((i) => (
            <div
              key={i}
              className="h-44 border border-white/10 rounded-xl bg-white/[0.02] p-5 hover:border-white/20 transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-full bg-accentA/20 mb-4 border border-accentA/30"></div>
              <h3 className="font-semibold text-[1rem]">Dev Team {i}</h3>
              <p className="text-zinc-500 text-xs mt-1">4 Members • Active</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col bg-surface border border-border rounded-lg">
          {/* List Placeholder Rows */}
          {arr.map((i) => (
            <ListPlaceholder key={i} isBorder={arr.length !== i} i={i} />
          ))}
        </div>
      )}
    </section>
  );
}
