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
  const [optionBarDt, setOptionBarDt] = useState({});
  const navigate = useNavigate();
  if (!project) return null;
  return (
    <li className="static sm:relative">
      <div
        onClick={() => navigate(`/u/workspaces/${project.id}`)}
        className={clsx(
          "group relative grid p-5 bg-surface border border-boxHover hover:border-smtext/40 transition-all duration-300 w-full",
          isFast === true && !isGrid && "rounded-t-lg",
          isLast === true && !isGrid && "rounded-b-lg",
          isGrid && "rounded-xl",
          isGrid
            ? "grid-cols-2 grid-rows-4 gap-4"
            : "grid-cols-2 grid-rows-3 lg:grid-cols-3 lg:grid-rows-1 gap-2 p-4"
        )}
      >
        {/* 1. Logo & Name */}
        <div
          className={clsx(
            "relative z-10 flex items-center gap-4 flex-1",
            isGrid ? "col-start-1 col-end-2" : "col-start-1 col-end-2"
          )}
        >
          <div className="h-10 w-10 rounded-lg border border-zinc-800 bg-zinc-900 flex items-center justify-center overflow-hidden shrink-0">
            <img
              src={project.favicon}
              alt="logo"
              className="w-7 h-7 object-cover opacity-90 group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col  min-w-0">
            <HighlightText
              text={project.name}
              highlight={searchParams.get("q") || ""}
            />
            <div className="flex items-center gap-2 mt-1 lg:mt-0">
              {role === "employee" && (
                <span className="text-[11px] text-smtext font-medium">
                  By{" "}
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/${project.leadUserName}`);
                    }}
                    className="text-subtext"
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
          className={clsx(
            "relative z-10 flex items-center  gap-8 flex-1",
            isGrid
              ? "col-start-1 col-end-2 row-start-2 row-end-3 justify-start"
              : "col-start-1 col-end-2 row-start-2 row-end-3 lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2 justify-start lg:justify-center"
          )}
        >
          <div
            className={clsx(
              "flex border px-3 py-1 rounded-md text-[11px] text-text/80 flex-col ",
              isGrid
                ? "items-center gap-2 bg-boxHover/50 border-border"
                : "items-center lg:items-start gap-2 lg:gap-1 bg-boxHover/50 lg:bg-transparent border-border lg:border-none"
            )}
          >
            <span
              className={clsx(
                isGrid ? "hidden" : "hidden lg:inline",
                "text-[10px] text-zinc-600 uppercase tracking-wider"
              )}
            >
              Category
            </span>
            <div className="flex items-center gap-1.5 text-text/80 text-[12px]">
              <Layers size={13} className="text-smtext" />
              <span className="truncate max-w-[120px]">{project.category}</span>
            </div>
          </div>
        </section>

        {/* 3. Performance & Actions */}
        <div
          className={clsx(
            isGrid
              ? "col-start-2 col-end-3"
              : "col-start-2 col-end-3 lg:col-start-3 lg:col-end-4",
            "relative z-10 flex justify-end gap-6"
          )}
        >
          <section
            className={clsx(
              isGrid ? "hidden" : "hidden lg:flex",
              "flex-col justify-center items-start gap-1"
            )}
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
          </section>

          <section
            className={clsx(
              isGrid ? "hidden" : "flex",
              "flex-col justify-center  gap-1 text-[11px]"
            )}
          >
            <PerformanceGauge score={project.performance} size={30} />
          </section>

          <div className="flex justify-center items-center">
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
              className="relative z-50 text-smtext hover:text-white bg-transparent hover:bg-hover px-1.5 py-0.5 rounded-md"
            >
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>

        {/* 4. Grid:Score && List:Team Size */}
        <section
          className={clsx(
            isGrid ? "flex" : "flex lg:hidden",
            "row-start-2 row-end-3 col-start-2 col-end-3 justify-end items-center"
          )}
        >
          {" "}
          {isGrid ? (
            <div className="relative flex justify-center items-center">
              <div className="text-[11px] font-medium text-success/80">
                Score: {project.performance}
              </div>
            </div>
          ) : (
            <div className="relative flex lg:hidden flex-col justify-center items-end gap-1">
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
          )}
        </section>

        {/* 4. Description && Tags && Projects Count  Section */}
        <section
          className={clsx(
            isGrid ? "flex" : "flex lg:hidden",
            "flex-col justify-start row-start-3 row-end-4 col-start-1 col-end-3"
          )}
        >
          <div
            className={clsx(
              isGrid ? "line-clamp-2" : "line-clamp-1",
              "text-subtext/70 text-[13px] line-clamp-1 leading-relaxed"
            )}
          >
            {project.description}
          </div>

          <div
            className={clsx(
              isGrid ? "hidden" : "flex",
              "relative z-10 flex items-center justify-start pt-3 text-[11px] text-zinc-500"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <Briefcase size={12} />
                <span>{project.projectsCount} Projects</span>
              </div>
            </div>
          </div>

          <div
            className={clsx(
              isGrid ? "flex" : "hidden",
              " z-10 flex-wrap gap-1.5 pt-3"
            )}
          >
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
        </section>

        {/* 5. Footer Stats */}
        {isGrid ? (
          <>
            <section className="row-start-4 row-end-5 col-start-1 col-end-3 relative z-10 flex items-center justify-between border-t border-boxHover pt-3 text-[11px] text-zinc-500">
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
            </section>
          </>
        ) : (
          <></>
        )}
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
