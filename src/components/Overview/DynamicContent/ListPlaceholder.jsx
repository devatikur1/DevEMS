import clsx from "clsx";
import { Briefcase, Layers, MoreHorizontal, Users } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import PerformanceGauge from "./PerformanceGauge";
import HighlightText from "./HighlightText";
import { AnimatePresence } from "framer-motion";
import OptionBar from "./OptionBar";

export default function ListPlaceholder({
  project,
  isFast,
  isLast,
  role,
  searchParams,
  deleteWorksplace,
}) {
  const [showOptionBar, setShowOptionBar] = useState(false);
  const [optionBarDt, setOptionBarDt] = useState([]);
  if (!project) return null;
  return (
    <li className="static sm:relative">
      <div
        className={clsx(
          "group relative parent-grid gap-2 lg:gap-4 p-4 bg-surface border border-boxHover hover:border-smtext/40 transition-all duration-300 w-full",
          isFast === true && "rounded-t-lg",
          isLast === true && "rounded-b-lg"
        )}
      >
        {/* 1. Logo & Name */}
        <Link
          to={`/u/workspaces/${project.id}`}
          className="item-1 relative z-10 flex items-center gap-4 flex-1 min-w-0"
        >
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
            <div className="flex items-center gap-2">
              {role === "employee" && (
                <Link
                  to={`/${project.leadUserName}`}
                  className="text-[10px] lg:text-[11px] text-smtext"
                >
                  By <span className="text-subtext/70">{project.lead}</span>
                </Link>
              )}

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
        </Link>

        {/* 2. Stats (Hidden on mobile) */}
        <Link
          to={`/u/workspaces/${project.id}`}
          className="item-2 relative z-10 flex items-center justify-start lg:justify-center gap-8 flex-1"
        >
          <div className="flex items-center lg:items-start gap-2 lg:gap-1 bg-boxHover/50 lg:bg-transparent  border border-border lg:border-none px-3 py-1 rounded-md text-[11px] text-text/80 lg:flex lg:flex-col ">
            <span className="hidden lg:inline text-[10px] text-zinc-600 uppercase tracking-wider">
              Category
            </span>
            <div className="flex items-center gap-1.5 text-text/80 text-[12px]">
              <Layers size={13} className="text-smtext" />
              <span className="truncate max-w-[120px]">{project.category}</span>
            </div>
          </div>
        </Link>

        {/* 3. Performance & Actions */}
        <div className="item-3 relative z-10 flex justify-end gap-6">
          <Link
            to={`/u/workspaces/${project.id}`}
            className="hidden lg:flex flex-col justify-center items-start gap-1"
          >
            <span className="text-[10px] text-zinc-600 uppercase tracking-wider">
              Team Size
            </span>
            <div className="flex items-center gap-1.5 text-zinc-400 text-[12px]">
              <Users size={13} />
              <span>
                {project.members}/{project.maxMembers}
              </span>
            </div>
          </Link>

          <Link
            to={`/u/workspaces/${project.id}`}
            className="flex flex-col justify-center  gap-1 text-[11px]"
          >
            <PerformanceGauge score={project.performance} size={30} />
          </Link>

          <div className="flex justify-center items-center">
            <button
              onClick={(e) => {
                setShowOptionBar(!showOptionBar);
                setOptionBarDt({
                  link: `/u/workspaces/${project.id}/`,
                  settings: `/u/workspaces/${project.id}/settings`,
                });
              }}
              className="relative z-50 text-smtext hover:text-white bg-transparent hover:bg-hover px-1.5 py-0.5 rounded-md"
            >
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>

        {/* 4. Optional Section: Team Size */}
        <Link
          to={`/u/workspaces/${project.id}`}
          className="item-4 relative flex lg:hidden flex-col justify-center items-end gap-1"
        >
          <span className="text-[10px] text-zinc-600 uppercase tracking-wider">
            Team Size
          </span>
          <div className="flex items-center gap-1.5 text-zinc-400 text-[12px]">
            <Users size={13} />
            <span>
              {project.members}/{project.maxMembers}
            </span>
          </div>
        </Link>

        <div className="item-5 flex lg:hidden flex-col justify-start">
          <Link
            to={`/u/workspaces/${project.id}`}
            className="text-subtext/70 text-[13px] line-clamp-1 leading-relaxed"
          >
            {project.description}
          </Link>
          <div className="relative z-10 flex items-center justify-start pt-3 text-[11px] text-zinc-500">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <Briefcase size={12} />
                <span>{project.projectsCount} Projects</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showOptionBar && (
          <OptionBar
            optionBarDt={optionBarDt}
            setShowOptionBar={setShowOptionBar}
            role={role}
            deleteWorksplace={deleteWorksplace}
          />
        )}
      </AnimatePresence>
    </li>
  );
}
