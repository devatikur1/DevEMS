import clsx from "clsx";
import { Layers, MoreHorizontal, Users } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import PerformanceGauge from "./PerformanceGauge";

export default function ListPlaceholder({ project, isFast, isLast }) {
  if (!project) return null;
  return (
    <li
      className={clsx(
        "group relative parent-grid gap-2 lg:gap-4 p-4 bg-surface border border-boxHover hover:border-smtext/40 transition-all duration-300 w-full",
        isFast === true && "rounded-t-lg",
        isLast === true && "rounded-b-lg"
      )}
    >
      {/* 🔗 Overlay Link */}
      <Link
        to={`/u/workspaces/${project.id}`}
        className="absolute inset-0 z-0"
      />

      {/* 1. Logo & Name */}
      <div className="item-1 relative z-10 flex items-center gap-4 flex-1 min-w-0">
        <div className="h-10 w-10 rounded-lg border border-zinc-800 bg-zinc-900 flex items-center justify-center overflow-hidden shrink-0">
          <img
            src={project.favicon}
            alt="logo"
            className="w-7 h-7 object-cover opacity-90 group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="flex flex-col min-w-0">
          <h3 className="text-text font-semibold text-[13px] lg:text-[15px] truncate">
            {project.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-[10.2px] lg:text-[11px] text-zinc-500">
              By {project.leadName}
            </span>
            <span
              className={`h-1 w-1 rounded-full ${
                project.status === "Active" ? "bg-success" : "bg-warning"
              }`}
            ></span>
            <span className="text-[9px] lg:text-[10px] text-zinc-500 uppercase">
              {project.status}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Stats (Hidden on mobile) */}
      <div className="item-2 relative z-10 flex items-center justify-start lg:justify-center gap-8 flex-1">
        <div className="flex items-center lg:items-start gap-2 lg:gap-1 bg-boxHover/50 lg:bg-transparent  border border-border lg:border-none px-3 py-1 rounded-md text-[11px] text-text/80 lg:flex lg:flex-col ">
          <span className="hidden lg:inline text-[10px] text-zinc-600 uppercase tracking-wider">
            Category
          </span>
          <div className="flex items-center gap-1.5 text-text/80 text-[12px]">
            <Layers size={13} className="text-smtext" />
            <span className="truncate max-w-[120px]">{project.category}</span>
          </div>
        </div>
      </div>

      {/* 3. Performance & Actions */}
      <div className="item-3 relative z-10 flex justify-end gap-6">
        <div className="hidden lg:flex flex-col justify-center items-start gap-1">
          <span className="text-[10px] text-zinc-600 uppercase tracking-wider">
            Team Size
          </span>
          <div className="flex items-center gap-1.5 text-zinc-400 text-[12px]">
            <Users size={13} />
            <span>
              {project.members}/{project.maxMembers}
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-center  gap-1 text-[11px]">
          <PerformanceGauge score={project.performance} size={30} />
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="text-zinc-600 hover:text-white p-1.5"
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* 4. Optional Section: Team Size */}
      <div className="item-4 relative flex lg:hidden flex-col justify-center items-end gap-1">
        <span className="text-[10px] text-zinc-600 uppercase tracking-wider">
          Team Size
        </span>
        <div className="flex items-center gap-1.5 text-zinc-400 text-[12px]">
          <Users size={13} />
          <span>
            {project.members}/{project.maxMembers}
          </span>
        </div>
      </div>

      <div className="item-5 flex lg:hidden flex-col justify-start">
        <p class="text-subtext/70 text-[13px] line-clamp-1 leading-relaxed">
          Building scalable microservices and robust database architectures.
        </p>
        <div class="relative z-10 flex items-center justify-start pt-3 text-[11px] text-zinc-500">
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-users"
                aria-hidden="true"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <circle cx="9" cy="7" r="4"></circle>
              </svg>
              <span>1/25</span>
            </div>
            <div class="flex items-center gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-briefcase"
                aria-hidden="true"
              >
                <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                <rect width="20" height="14" x="2" y="6" rx="2"></rect>
              </svg>
              <span>0 Projects</span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
