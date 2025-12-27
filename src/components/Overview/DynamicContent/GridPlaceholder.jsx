import {
  MoreHorizontal,
  ShieldCheck,
  Layers,
  Users,
  Briefcase,
} from "lucide-react";
import { Link } from "react-router-dom";
import HighlightText from "./HighlightText";

export default function GridPlaceholder({ project, role, searchParams }) {
  if (!project) return null;
  
  const getMemberLevel = (count) => {
    if (count === "Unlimited") {
      return "High";
    } else {
      const members = Number(count);
      if (members >= 20) return "High";
      if (members >= 10) return "Medium";
      return "Low";
    }
  };
  return (
    <li className="group relative flex flex-col gap-5 p-5 bg-surface border border-boxHover rounded-xl hover:border-smtext/40 transition-all duration-300">
      {/* 🔗 Card Overly Link */}
      <Link
        to={`/u/workspaces/${project.id}`}
        className="absolute inset-0 z-30 w-full h-full"
      />

      {/* 1. Header Section */}
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex gap-4 min-w-0">
          <div className="h-10 w-10 rounded-lg border border-zinc-800 bg-zinc-900 flex items-center justify-center overflow-hidden shrink-0">
            <img
              src={project.favicon}
              alt="logo"
              className="w-7 h-7 object-cover opacity-90 group-hover:scale-110 transition-transform duration-300"
            />
          </div>

          <div className="flex flex-col min-w-0">
            <HighlightText
              text={project.name}
              highlight={searchParams.get("q") || ""}
            />
            <div className="flex items-center gap-2 mt-1">
              {role !== "employee" && (
                <>
                  <span className="text-[11px] text-smtext font-medium">
                    By{" "}
                    <Link to={`/${project.leadUserName}`} className="text-subtext">
                      {project.lead}
                    </Link>
                  </span>
                  <span className="text-zinc-700 text-[10px]">•</span>
                </>
              )}

              <div className="flex items-center gap-1">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    project.status === "Active" ? "bg-success" : "bg-warning"
                  }`}
                ></span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-tighter">
                  {project.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="relative z-50 text-zinc-600 hover:text-white p-1.5"
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* 2. Category & Performance */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 bg-boxHover/50 border border-border px-3 py-1 rounded-md text-[11px] text-text/80">
          <Layers size={12} className="text-smtext" />
          <span className="truncate">{project.category}</span>
        </div>
        <div className="text-[11px] font-medium text-success/80">
          Score: {project.performance}
        </div>
      </div>

      {/* 3. Description */}
      <div className="relative z-10">
        <p className="text-subtext/70 text-[13px] line-clamp-2 leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* 4. Tags Section */}
      <div className="relative z-10 flex flex-wrap gap-1.5">
        {project.tags?.slice(0, 4).map((tag, index) => (
          <span
            key={index}
            className="px-2 py-0.5 bg-zinc-900/50 border border-zinc-800 text-zinc-500 text-[10px] rounded"
          >
            {tag}
          </span>
        ))}
        {project.tags?.length > 4 && (
          <span className="text-[10px] text-zinc-600 self-center">
            +{project.tags.length - 4} more
          </span>
        )}
      </div>

      {/* 5. Footer Stats */}
      <div className="relative z-10 flex items-center justify-between border-t border-boxHover pt-3 text-[11px] text-zinc-500">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Users size={12} />
            <span>
              {project.members}/{project.maxMembers}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Briefcase size={12} />
            <span>{project.projectsCount} Projects</span>
          </div>
        </div>

        <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-boxHover/80 text-zinc-400 border border-zinc-800">
          <ShieldCheck size={12} className="text-blue-500" />
          <span>{getMemberLevel(project.maxMembers)}</span>
        </div>
      </div>
    </li>
  );
}
