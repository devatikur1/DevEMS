import { TypeIcon } from "lucide-react";
import React from "react";

export default function WorkspaceName({ tite }) {
  const { title, setTitle } = tite;
  return (
    <div className="w-full">
      <div className="flex flex-col gap-2">
        <label className="text-[13px] font-medium text-textMuted mx-1 flex justify-between items-center">
          <span>Workspace Name</span>
          <span className="text-[0.7rem]">{title.split("").length}/50</span>
        </label>
        <div className="group relative rounded-lg">
          <TypeIcon
            size={18}
            className="absolute left-4 top-3.5 text-textMuted group-focus-within:text-accent transition-colors"
          />
          <input
            value={title}
            onChange={(e) =>
              setTitle(e.target.value.split("").slice(0, 50).join(""))
            }
            type="text"
            placeholder="e.g. Design Squad"
            className="w-full bg-surfaceSoft border border-border hover:border-hover focus:border-accent/50 rounded-xl pl-12 pr-4 py-3 text-sm text-textPrimary placeholder:text-textMuted outline-none transition-all"
          />
        </div>
      </div>
    </div>
  );
}
