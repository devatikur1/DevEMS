import { Briefcase, Ellipsis, Users } from "lucide-react";
import React from "react";

export default function GridPgLoading() {
  return (
    <li className="relative list-none flex flex-col gap-5 p-5 bg-surface border border-border rounded-xl transition-all duration-300 overflow-hidden">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .shimmer-box {
          position: relative;
          overflow: hidden;
        }
        .shimmer-box::after {
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

      {/* 1. Header Section */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex flex-row gap-4 flex-1">
          {/* Logo Placeholder */}
          <div className="h-10 w-10 rounded-lg bg-accentA shrink-0 shimmer-box"></div>

          <div className="flex flex-1 flex-col justify-center gap-2">
            {/* Project Name */}
            <div className="h-3.5 w-28 bg-accentA rounded shimmer-box"></div>
            {/* Lead Name */}
            <div className="h-2.5 w-20 bg-boxHover rounded shimmer-box"></div>
          </div>
        </div>

        <div className="text-zinc-800">
          <Ellipsis size={18} />
        </div>
      </div>

      {/* 2. Category & Performance */}
      <div className="flex items-center justify-between gap-2">
        {/* Category Pill */}
        <div className="h-7 w-32 bg-accentA/50 border border-border rounded-md shimmer-box"></div>

        {/* Performance Score */}
        <div className="flex items-center gap-2">
          <div className="h-3 w-10 bg-boxHover rounded shimmer-box"></div>
        </div>
      </div>

      {/* 3. Description */}
      <div className="flex flex-col gap-2.5">
        <div className="h-3 w-full bg-accentA/60 rounded shimmer-box"></div>
        <div className="h-3 w-[70%] bg-accentA/40 rounded shimmer-box"></div>
      </div>

      {/* 4. Tags Section */}
      <div className="flex flex-wrap gap-2">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="h-5 w-14 bg-boxHover border border-border rounded shimmer-box"
          ></div>
        ))}
      </div>

      {/* 5. Footer Section */}
      <div className="relative z-10 flex items-center justify-between border-t border-border pt-4 mt-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Users size={13} className="text-zinc-800" />
            <div className="h-3 w-4 bg-boxHover rounded shimmer-box"></div>
          </div>
          <div className="flex items-center gap-1.5">
            <Briefcase size={13} className="text-zinc-800" />
            <div className="h-3 w-4 bg-boxHover rounded shimmer-box"></div>
          </div>
        </div>

        {/* Capacity Level Badge */}
        <div className="h-5 w-14 rounded-md bg-accentA border border-border shimmer-box"></div>
      </div>
    </li>
  );
}
