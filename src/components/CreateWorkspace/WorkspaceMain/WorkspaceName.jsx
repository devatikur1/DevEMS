import { TypeIcon } from "lucide-react";
import React from "react";

export default function WorkspaceName({ tite }) {
  const { title, setTitle } = tite;
  return (
    <div className="w-full mb-6">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-text ml-1 flex items-center justify-between">
          <span>Workspace Name</span>
          <span className="text-sm text-smtext">
            {title.split("").length}/50
          </span>
        </label>
        <div className="relative flex items-center rounded-lg bg-surface border border-boxHover focus-within:border-accent/50 transition-all">
          <TypeIcon size={18} className="absolute left-4 text-smtext" />
          <input
            value={title}
            onChange={(e) =>
              setTitle(e.target.value.split("").slice(0, 50).join(""))
            }
            type="text"
            placeholder="e.g. Design Squad"
            className="bg-transparent w-full pl-12 pr-4 py-3 text-sm text-white outline-none"
          />
        </div>
      </div>
    </div>
  );
}
