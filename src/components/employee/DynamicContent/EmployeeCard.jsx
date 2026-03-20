import React from "react";
import {
  Mail,
  MapPin,
  Phone,
  MoreVertical,
  ShieldCheck,
  Briefcase,
  Star,
  ChevronRight,
} from "lucide-react";
import clsx from "clsx";
import { motion } from "framer-motion";
import HighlightText from "./HighlightText";

export default function EmployeeCard({ emp, index, searchParams }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index > 15 ? 0 : index * 0.05 }}
      key={emp.uid}
      className="group relative bg-surface border border-border rounded-2xl overflow-hidden hover:border-accent/40 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(59,130,246,0.08)] flex flex-col"
    >
      {/* Card Header Background */}
      <div className="h-16 bg-gradient-to-r from-surfaceHard via-surface to-boxHover border-b border-border relative">
        <button className="absolute top-3 right-3 text-textMuted hover:text-textPrimary p-1.5 rounded-lg hover:bg-surfaceHard transition-colors z-10">
          <MoreVertical size={16} />
        </button>
      </div>

      {/* Profile Picture & Badges */}
      <div className="px-5 relative flex justify-between items-end -mt-8 mb-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-xl p-1 bg-surface border border-border shadow-md">
            <img
              src={emp.photoURL}
              alt={emp.name}
              className="w-full h-full rounded-lg object-cover bg-bg"
            />
          </div>
          {/* Online Status Dot */}
          <div
            className={clsx(
              "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-surface",
              emp.isOnline ? "bg-success" : "bg-textMuted",
            )}
          />
        </div>

        {/* Badges */}
        <div className="flex gap-1.5 pb-1 flex-wrap justify-end max-w-[50%]">
          {emp.role === "admin" && (
            <div className="bg-accent/10 border border-accent/20 text-accent px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 mb-1">
              <ShieldCheck size={10} /> Admin
            </div>
          )}
          <div className="bg-boxHover border border-border text-textMuted px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-1 truncate max-w-full">
            {emp.department}
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="px-5 flex-1 flex flex-col">
        <HighlightText
          text={emp.name}
          highlight={
            ((searchParams.get("fc") === "name" ||
              searchParams.get("fc") === null) &&
              (searchParams.get("q") || "")) ||
            ""
          }
        />
        <p className="text-textMuted text-xs flex items-center gap-1.5 mt-1">
          <Briefcase size={12} className="text-accent/70 shrink-0" />
          <span className="truncate">{emp.position}</span>
        </p>

        {/* ✅ 2. Description Added Here */}
        <div className="mt-3 min-h-[36px]">
          <p className="text-textMuted/80 text-[12px] leading-relaxed line-clamp-2">
            {emp.description}
          </p>
        </div>

        {/* Performance / Stats */}
        <div className="mt-auto pt-4 mb-4 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-textMuted">Performance</span>
            <span className="text-success font-medium flex items-center gap-1">
              <Star size={10} className="fill-success" /> {emp.performance}%
            </span>
          </div>
          <div className="h-1.5 w-full bg-surfaceHard rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${emp.performance}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              className={clsx(
                "h-full rounded-full",
                emp.performance >= 90
                  ? "bg-success"
                  : emp.performance >= 75
                    ? "bg-accent"
                    : "bg-warning",
              )}
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex flex-col">
              <span className="text-[10px] text-textMuted uppercase tracking-widest font-semibold">
                Tasks
              </span>
              <span className="text-sm font-medium text-textPrimary">
                {emp.tasksCompleted}
              </span>
            </div>
            <div className="w-[1px] h-6 bg-border"></div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-textMuted uppercase tracking-widest font-semibold">
                Joined Workspace
              </span>
              <span className="text-sm font-medium text-textPrimary">
                {emp.joinedWS}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer / Contact */}
      <div className="px-5 py-3 border-t border-border bg-surfaceHard/30 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-3">
          <button
            title={emp.email}
            className="text-textMuted hover:text-accent transition-colors"
          >
            <Mail size={14} />
          </button>
          <button
            title={emp.location}
            className="text-textMuted hover:text-accent transition-colors"
          >
            <MapPin size={14} />
          </button>
        </div>

        <button className="text-xs text-textPrimary hover:text-accent font-medium flex items-center gap-1 transition-colors">
          View <ChevronRight size={14} />
        </button>
      </div>

      {/* Pending Overlay */}
      {emp.requestStatus === "pending" && (
        <div className="absolute inset-0 bg-surface/60 backdrop-blur-[2px] flex items-center justify-center z-20">
          <div className="bg-surface border border-warning/30 px-4 py-3 rounded-xl shadow-lg flex flex-col items-center gap-3 w-3/4 max-w-[200px]">
            <span className="text-xs font-semibold text-warning uppercase tracking-wider">
              Pending
            </span>
            <div className="flex gap-2 w-full">
              <button className="flex-1 text-[11px] font-medium bg-success/10 text-success border border-success/20 py-1.5 rounded hover:bg-success hover:text-bg transition-colors">
                Accept
              </button>
              <button className="flex-1 text-[11px] font-medium bg-error/10 text-error border border-error/20 py-1.5 rounded hover:bg-error hover:text-white transition-colors">
                Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
