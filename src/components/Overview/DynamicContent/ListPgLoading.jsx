import clsx from "clsx";
import { Briefcase, Layers, Users, MoreHorizontal } from "lucide-react";
import React from "react";

export default function ListPgLoading({ isFast, isLast }) {
  return (
    <li
      className={clsx(
        "group relative list-none grid grid-cols-2 lg:grid-cols-3 gap-3.5 p-4 lg:pl-6 lg:pr-7 bg-surface border border-border transition-all duration-300 w-full overflow-hidden",
        isFast && "rounded-t-lg",
        isLast && "rounded-b-lg"
      )}
    >
  
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
      <div className="col-start-1 col-end-2 relative z-10 flex items-center gap-4 min-w-0">

        <div className="h-10 w-10 rounded-lg bg-accentA shrink-0 shimmer"></div>

        <div className="flex flex-col gap-2 flex-1 min-w-0">
      
          <div className="h-3.5 w-32 bg-accentA rounded shimmer"></div>

          <div className="flex items-center gap-2">
          
            <div className="h-2.5 w-20 bg-boxHover rounded shimmer"></div>
          </div>
        </div>
      </div>

      {/* 2. Category Placeholder */}
      <div className="col-start-1 col-end-2 row-start-2 row-end-3 pt-1 lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2 relative z-10 flex items-center justify-start lg:justify-center">
        <div className="flex flex-col gap-1.5 items-start lg:items-center">
         
          <div className="hidden lg:block h-2 w-12 bg-border rounded mb-1"></div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-md border border-border lg:border-none bg-accentA/30 shimmer min-w-[100px]">
            <Layers size={13} className="text-smtext" />
            <div className="h-2.5 w-16 bg-boxHover/50 rounded"></div>
          </div>
        </div>
      </div>

      {/* 3. Performance & Actions */}
      <div className="col-start-2 col-end-3 lg:col-start-3 lg:col-end-4 relative z-10 flex justify-end items-center gap-6">

        <div className="hidden lg:flex flex-col items-start gap-1.5">
          <div className="h-2 w-12 bg-border rounded"></div>
          <div className="flex items-center gap-1.5 text-smtext">
            <Users size={13} />
            <div className="h-3 w-8 bg-boxHover rounded shimmer"></div>
          </div>
        </div>

    
        <div className="h-8 w-8 rounded-full border-2 border-accentA shimmer"></div>

    
        <div className="text-smtext">
          <MoreHorizontal size={18} />
        </div>
      </div>

      {/* 4. Mobile Layout Extensions */}
      <div className="col-span-2 flex lg:hidden flex-col gap-3 mt-2 border-t border-border pt-3">
        <div className="h-3 w-full bg-accentA/40 rounded shimmer"></div>

        <div className="flex items-center justify-between text-smtext">
          <div className="flex items-center gap-1.5">
            <Users size={12} />
            <div className="h-2.5 w-10 bg-boxHover rounded shimmer"></div>
          </div>
          <div className="flex items-center gap-1.5">
            <Briefcase size={12} />
            <div className="h-2.5 w-14 bg-boxHover rounded shimmer"></div>
          </div>
        </div>
      </div>
    </li>
  );
}
