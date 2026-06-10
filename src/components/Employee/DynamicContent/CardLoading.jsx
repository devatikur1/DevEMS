import React from "react";
import { ChevronRight, Mail, MapPin, MoreVertical } from "lucide-react";

export default function CardLoading() {
  return (
    <div className="group relative bg-surface border border-border rounded-2xl overflow-hidden flex flex-col animate-pulse">
      {/* Header */}
      <div className="h-16 bg-surfaceHard border-b border-border relative">
        <button className="absolute top-3 right-3 text-textMuted">
          <MoreVertical size={16} />
        </button>
      </div>

      {/* Profile */}
      <div className="px-5 relative flex justify-between items-end -mt-8 mb-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-xl bg-boxHover border border-border"></div>

          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-surface bg-boxHover"></div>
        </div>

        <div className="flex flex-col gap-2 items-end">
          <div className="h-5 w-16 rounded bg-boxHover"></div>
          <div className="h-5 w-20 rounded bg-boxHover"></div>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 flex-1 flex flex-col">
        {/* Name */}
        <div className="h-5 w-36 rounded bg-boxHover"></div>

        {/* Position */}
        <div className="h-3 w-28 rounded bg-boxHover mt-3"></div>

        {/* Description */}
        <div className="mt-4 space-y-2">
          <div className="h-2.5 w-full rounded bg-boxHover"></div>
          <div className="h-2.5 w-[85%] rounded bg-boxHover"></div>
        </div>

        {/* Performance */}
        <div className="mt-auto pt-4 mb-4">
          <div className="flex justify-between mb-2">
            <div className="h-3 w-20 rounded bg-boxHover"></div>
            <div className="h-3 w-12 rounded bg-boxHover"></div>
          </div>

          <div className="h-1.5 w-full rounded-full bg-boxHover"></div>

          <div className="flex items-center justify-between pt-4">
            <div>
              <div className="h-2 w-12 rounded bg-boxHover mb-2"></div>
              <div className="h-3 w-20 rounded bg-boxHover"></div>
            </div>

            <div className="w-px h-6 bg-border"></div>

            <div className="text-right">
              <div className="h-2 w-24 rounded bg-boxHover mb-2"></div>
              <div className="h-3 w-20 rounded bg-boxHover"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-border bg-surfaceHard/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Mail size={14} className="text-textMuted" />
          <MapPin size={14} className="text-textMuted" />
        </div>

        <button className="text-xs text-textMuted flex items-center gap-1">
          View <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
