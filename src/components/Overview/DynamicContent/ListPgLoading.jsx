import clsx from "clsx";
import { Briefcase, Layers, Users } from "lucide-react";
import React from "react";

export default function ListPgLoading({ isFast, isLast }) {
  return (
    <li
      className={clsx(
        "group relative list-none parent-grid gap-2 lg:gap-4 p-4 bg-surface border border-border transition-all duration-300 w-full overflow-hidden",
        isFast && "rounded-t-lg",
        isLast && "rounded-b-lg"
      )}
    >
      {/* ১. শিমার এনিমেশন স্টাইল */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .shimmer {
          position: relative;
          overflow: hidden;
          background-color: #1f1f1f; /* boxHover color */
        }
        .shimmer::after {
          content: '';
          position: absolute;
          inset: 0;
          transform: translateX(-100%);
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.03), 
            transparent
          );
          animation: shimmer 1.5s infinite;
        }
      `,
        }}
      />

      {/* 1. Logo & Name Placeholder */}
      <div className="item-1 relative z-10 flex items-center gap-4 flex-1 min-w-0">
        <div className="h-10 w-10 rounded-lg bg-accentA shrink-0 shimmer"></div>
        <div className="flex flex-col gap-2 min-w-0">
          <div className="h-3.5 w-24 lg:w-32 bg-accentA rounded shimmer"></div>
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-16 bg-boxHover rounded shimmer"></div>
            <div className="h-1 w-1 rounded-full bg-border"></div>
            <div className="h-2 w-10 bg-boxHover rounded shimmer"></div>
          </div>
        </div>
      </div>

      {/* 2. Stats (Category) */}
      <div className="item-2 relative z-10 flex items-center justify-start lg:justify-center gap-8 flex-1">
        <div className="flex flex-col gap-1.5">
          <div className="hidden lg:block h-2 w-12 bg-border rounded shimmer"></div>
          <div className="flex items-center gap-1.5 px-3 py-1 lg:px-0 rounded-md border border-border lg:border-none">
            <Layers size={13} className="text-zinc-800" />
            <div className="h-3 w-20 bg-accentA rounded shimmer"></div>
          </div>
        </div>
      </div>

      {/* 3. Performance & Actions */}
      <div className="item-3 relative z-10 flex justify-end gap-6">
        {/* Team Size (Desktop) */}
        <div className="hidden lg:flex flex-col justify-center items-start gap-1.5">
          <div className="h-2 w-12 bg-border rounded shimmer"></div>
          <div className="flex items-center gap-1.5">
            <Users size={13} className="text-zinc-800" />
            <div className="h-3 w-8 bg-boxHover rounded shimmer"></div>
          </div>
        </div>

        {/* Performance Gauge Placeholder */}
        <div className="flex flex-col justify-center">
          <div className="h-8 w-8 rounded-full border-2 border-accentA shimmer"></div>
        </div>

        {/* More Button Placeholder */}
        <div className="flex items-center">
          <div className="h-5 w-5 rounded bg-boxHover shimmer"></div>
        </div>
      </div>

      {/* 4. Team Size (Mobile only) */}
      <div className="item-4 relative flex lg:hidden flex-col justify-center items-end gap-1.5">
        <div className="h-2 w-12 bg-border rounded shimmer"></div>
        <div className="flex items-center gap-1.5">
          <Users size={13} className="text-zinc-800" />
          <div className="h-3 w-8 bg-boxHover rounded shimmer"></div>
        </div>
      </div>

      {/* 5. Optional Section (Mobile only description) */}
      <div className="item-5 flex lg:hidden flex-col justify-start gap-3 mt-2 border-t border-border pt-3">
        <div className="h-3 w-full bg-accentA/50 rounded shimmer"></div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Users size={12} className="text-zinc-800" />
            <div className="h-2.5 w-6 bg-boxHover rounded shimmer"></div>
          </div>
          <div className="flex items-center gap-1.5">
            <Briefcase size={12} className="text-zinc-800" />
            <div className="h-2.5 w-12 bg-boxHover rounded shimmer"></div>
          </div>
        </div>
      </div>
    </li>
  );
}
