import { ChevronDown, LayoutGrid } from "lucide-react";
import React from "react";

export default function RoleSelector({ role, setRole }) {
  const categories = ["admin", "employe"];
  return (
    <section>
      <article className="w-full flex flex-col gap-2">
        <label className="text-[13px] font-medium text-text/80 ml-1">
          Workspace Category
        </label>
        <div className="relative flex items-center group">
          <LayoutGrid
            size={18}
            className="absolute left-4 text-smtext group-focus-within:text-accent transition-colors"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-surface w-full pl-12 pr-10 py-3 text-sm text-white border border-boxHover rounded-lg outline-none appearance-none cursor-pointer focus:border-accent/50 transition-all"
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories.sort().map((item) => (
              <option key={item} value={item} className="bg-surface">
                {item}
              </option>
            ))}
          </select>

          <ChevronDown
            size={16}
            className="absolute right-4 text-smtext pointer-events-none"
          />
        </div>
      </article>
      <div className="flex justify-center items-center pt-5 *:select-none">
        <button
          disabled={role === ""}
          onClick={async () => await handlePrUpdate()}
          type="button"
          className="bg-accent hover:bg-accent px-14 py-2 rounded-lg active:scale-[1.2] transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none"
        >
          {updateLod ? (
            <Loader2 size={25} className="animate-spin" />
          ) : (
            <span className="text-bg">Update</span>
          )}
        </button>
      </div>
    </section>
  );
}
