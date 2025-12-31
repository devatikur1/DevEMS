import clsx from "clsx";
import {
  Briefcase,
  Layers,
  MoreHorizontal,
  ShieldCheck,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PerformanceGauge from "./PerformanceGauge";
import HighlightText from "./HighlightText";
import { AnimatePresence } from "framer-motion";
import OptionBar from "./OptionBar";
import { getMemberLevel } from "../../../function/getMemberLevel";

export default function Placeholder({
  project,
  isFast,
  isLast,
  role,
  searchParams,
  deleteWorksplace,
  isGrid,
}) {
  const [showOptionBar, setShowOptionBar] = useState(false);
  const [optionBarDt, setOptionBarDt] = useState(null);
  const navigate = useNavigate();

  if (!project) return null;

  return (
    <li className="static sm:relative list-none">
      <div
        onClick={() => navigate(`/u/workspaces/${project.id}`)}
        role="button"
        tabIndex="0"
        className={clsx(
          "group relative grid p-5 bg-surface border border-boxHover hover:border-smtext/40 transition-all duration-300 w-full cursor-pointer",
          isFast && !isGrid && "rounded-t-lg",
          isLast && !isGrid && "rounded-b-lg",
          isGrid && "rounded-xl",
          isGrid
            ? "grid-cols-2 grid-rows-[auto_auto_auto_auto] gap-4"
            : "grid-cols-2 lg:grid-cols-3 gap-3.5 p-4 items-center"
        )}
      >
        {/* 1. Logo & Name */}
        <div className="relative z-10 flex items-center gap-4 col-start-1 col-end-2">
          <div className="h-10 w-10 rounded-lg border border-zinc-800 bg-zinc-900 flex items-center justify-center overflow-hidden shrink-0">
            <img
              src={project.favicon}
              alt="logo"
              className="w-7 h-7 object-cover opacity-90 group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col">
            <HighlightText
              text={project.name}
              highlight={searchParams.get("q") || ""}
            />
            <div className="flex items-center gap-2 mt-1">
              {role === "employee" && (
                <span className="text-[11px] text-smtext font-medium">
                  By{" "}
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/${project.leadUserName}`);
                    }}
                    className="text-subtext hover:underline"
                  >
                    {project.lead}
                  </span>
                </span>
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

        {/* 2. Category */}
        <section
          title={`Category: ${project?.category}`}
          className={clsx(
            "relative z-10 flex items-center justify-start col-start-1 col-end-2 row-start-2 row-end-3 pt-1",
            !isGrid &&
              "lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2 lg:justify-center pt-2.5"
          )}
        >
          <div
            className={clsx(
              "flex items-center px-3 py-1 rounded-md text-[11px] text-text/80 bg-boxHover/50 border border-border gap-2 ",
              !isGrid && "lg:bg-transparent lg:border-none"
            )}
          >
            <Layers size={13} className="text-smtext" />
            <span className="truncate max-w-[120px]">{project.category}</span>
          </div>
        </section>

        {/* 3. Performance & Actions */}
        <div
          className={clsx(
            "relative z-10 flex justify-end items-center gap-6 col-start-2 col-end-3",
            !isGrid && "lg:col-start-3 lg:col-end-4"
          )}
        >
          {!isGrid && (
            <section className="hidden lg:flex flex-col items-start gap-1">
              <span className="text-[10px] text-zinc-600 uppercase tracking-wider">
                Team Size
              </span>
              <div className="flex items-center gap-1.5 text-zinc-400 text-[12px]">
                <Users size={13} />
                <span>
                  {project.members}/{project.maxMembers}
                </span>
              </div>
            </section>
          )}

          {!isGrid && (
            <PerformanceGauge score={project.performance} size={30} />
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              const rect = e.currentTarget.getBoundingClientRect();
              const isMobile = window.innerWidth < 640;
              setShowOptionBar(!showOptionBar);
              setOptionBarDt({
                link: `/u/workspaces/${project.id}/`,
                settings: `/u/workspaces/${project.id}/settings`,
                isMobile,
                x: isMobile ? undefined : rect.top + rect.height + 4,
                y: isMobile ? undefined : Math.max(8, rect.right - 240),
              });
            }}
            className="relative z-50 text-smtext hover:text-white bg-transparent hover:bg-hover px-1.5 py-0.5 rounded-md transition-colors"
          >
            <MoreHorizontal size={18} />
          </button>
        </div>

        {/* 4. Responsive Metrics: Shows Performance Score in Grid or Team Size in List (Mobile Only) */}
        <>
          {isGrid ? (
            /* Performance Score for Grid View */
            <div className="flex flex-col justify-center items-end text-[11px] font-medium text-success/80">
              Score: {project.performance}
            </div>
          ) : (
            /* Team Size Metric for List View */
            <div className="flex lg:hidden flex-col items-end justify-center">
              <span className="flex justify-center items-end text-[10px] text-zinc-600 uppercase tracking-wider">
                Team Size
              </span>
              <div className="flex items-center gap-1.5 text-zinc-400 text-[12px]">
                <Users size={13} />
                <span>
                  {project.members}/{project.maxMembers}
                </span>
              </div>
            </div>
          )}
        </>

        {/* 5. Combined Info Section (Description & Tags & Total Projects) */}
        <section
          className={clsx(
            "col-span-2 flex flex-col gap-4 pt-1",
            !isGrid && "lg:hidden"
          )}
        >
          <p
            className={clsx(
              "text-subtext/70 text-[13px] leading-relaxed",
              isGrid ? "line-clamp-2" : "line-clamp-1"
            )}
          >
            {project.description}
          </p>

          {isGrid ? (
            <div className="flex flex-wrap gap-1.5">
              {project.tags?.slice(0, 4).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 bg-boxHover/30 border border-border/85 text-zinc-500 text-[10px] rounded"
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
          ) : (
            <div className="flex lg:hidden items-center gap-3 text-[11px] text-smtext/85">
              <span className="flex items-center gap-1.5">
                <Briefcase size={12} /> {project.projectsCount} Projects
              </span>
            </div>
          )}
        </section>

        {/* 6. Footer (Only for Grid) */}
        {isGrid && (
          <section className="row-start-4 row-end-5 col-span-2 mt-1 pt-3 border-t border-boxHover flex items-center justify-between text-[11px] text-smtext/85">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <Users size={12} /> {project.members}/{project.maxMembers}
              </span>
              <span className="flex items-center gap-1.5">
                <Briefcase size={12} /> {project.projectsCount} Projects
              </span>
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-boxHover/80 text-zinc-400 border border-zinc-800">
              <ShieldCheck size={12} className="text-blue-500" />
              <span>{getMemberLevel(project.maxMembers)}</span>
            </div>
          </section>
        )}
      </div>

      {/* OptionBar Animation */}
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
