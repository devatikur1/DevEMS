import { MoreHorizontal, ShieldCheck, Clock, Layers } from "lucide-react";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

export default function GridPlaceholder({ project }) {
  if (!project) return null;
  const getMemberLevel = (count) => {
    const members = Number(count);

    if (members >= 20) return "High"; 
    if (members >= 10) return "Medium";
    return "Low"; 
  };
  return (
    <div className="group relative flex flex-col gap-5 p-5 bg-surface border border-boxHover rounded-xl hover:border-smtext/40 transition-all duration-300">
      {/* 🔗 Card Overly Link */}
      <Link
        to={`/u/workspaces/${project.id}`}
        className="absolute inset-0 z-0"
      />

      {/* 1. Header Section */}
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex gap-4">
          <div className="h-10 w-10 rounded-lg border border-zinc-800 bg-zinc-900 flex items-center justify-center overflow-hidden shrink-0">
            <img
              src={project.favicon}
              alt="logo"
              className="w-7 h-7 object-contain opacity-90 group-hover:scale-110 transition-transform duration-300"
            />
          </div>

          <div className="flex flex-col min-w-0">
            <h3 className="text-text font-semibold text-[15px] leading-tight truncate">
              {project.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-1">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  project.status === "Active" ? "bg-success" : "bg-warning"
                }`}
              ></span>
              <span className="text-[11px] text-zinc-500 font-medium uppercase tracking-wider">
                {project.status}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="relative z-20 text-zinc-600 hover:text-white p-1.5"
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* 2. Category Pill (GitHub Repo-r poriborte) */}
      <div className="relative z-10 flex items-center">
        <div className="flex items-center gap-2 bg-boxHover/50 border border-border px-3 py-1 rounded-md text-[12px] text-text/80">
          <Layers size={13} className="text-smtext" />
          <span className="truncate">{project.category}</span>
        </div>
      </div>

      {/* 3. Description & Meta */}
      <div className="relative z-10 flex flex-col gap-3">
        <p className="text-subtext/70 text-[13px] line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        <div className="flex items-center justify-between border-t border-boxHover pt-3 text-[11px] text-zinc-500">
          <div className="flex items-center gap-1.5">
            <Clock size={12} />
            <span>
              Updated{" "}
              {moment(project.lastUpdate)
                .fromNow()
                .replace("a ", "1 ")
                .replace("an ", "1 ")}
            </span>
          </div>

          <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-boxHover/80 text-zinc-400 border border-zinc-800">
            <ShieldCheck size={12} className="text-blue-500" />
            <span>{getMemberLevel(project.members)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
