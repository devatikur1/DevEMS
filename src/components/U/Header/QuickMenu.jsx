import React from "react";
import { motion } from "framer-motion";
import { LogOut, User, Settings } from "lucide-react"; // ShieldCheck role-er jonno bhalo lage
import { useNavigate } from "react-router-dom";

export default function QuickMenu({
  userDt,
  setShowOpBar,
  openProfile,
  handleLogout,
}) {
  const navigate = useNavigate();
  return (
    <>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        {/* Backdrop-BG */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowOpBar(false)}
          className="absolute inset-0 bg-transparent"
        />

        {/* Modal-Content */}
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          className="absolute z-[110] top-[60px] md:right-5 md:mx-0 min-w-[95%] md:min-w-[240px] bg-surface backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-2 overflow-hidden"
        >
          {/* Header Section with Notun Data */}
          <div className="px-4 py-3 border-b border-white/5 mb-2 bg-boxHover/70 rounded-xl">
            <div className="flex items-center justify-between mb-1">
              <p className="text-white text-[0.9rem] font-bold truncate leading-none">
                {userDt?.name || "User"}
              </p>
              {/* Role Badge */}
              <span className="text-[10px] text-subtext px-2 py-0.5 rounded-full border border-accent uppercase tracking-tighter">
                {userDt?.role || "User"}
              </span>
            </div>

            {/* Username Display */}
            <p className="text-accent text-[0.75rem] font-medium mb-1">
              {userDt?.username || "@username"}
            </p>

            {/* Email Display */}
            <p className="text-zinc-500 text-[0.7rem] truncate">
              {userDt?.email}
            </p>
          </div>

          {/* Menu Actions */}
          <div className="flex flex-col gap-1">
            <button
              onClick={() => {
                navigate(`/${userDt?.username}`);
              }}
              className="w-full text-left text-[0.85rem] text-zinc-300 hover:text-white hover:bg-hover transition-all flex items-center gap-3 px-3 py-2.5 rounded-xl group"
            >
              <User
                size={16}
                className="text-zinc-500 group-hover:text-accent transition-colors"
              />
              You
            </button>
            <button
              onClick={() => {
                openProfile();
                setShowOpBar(false);
              }}
              className="w-full text-left text-[0.85rem] text-zinc-300 hover:text-white hover:bg-hover/50 transition-all flex items-center gap-3 px-3 py-2.5 rounded-xl group"
            >
              <Settings
                size={16}
                className="text-zinc-500 group-hover:text-accent transition-colors"
              />
              Profile Settings
            </button>
            <div className="h-[1px] bg-border/50 my-1 mx-2" /> {/* Divider */}
            <button
              onClick={handleLogout}
              className="w-full text-left text-[0.85rem] text-red-400 hover:text-red-500 hover:bg-red-500/5 transition-all flex items-center gap-3 px-3 py-2.5 rounded-xl group"
            >
              <LogOut
                size={16}
                className="group-hover:translate-x-0.5 transition-transform"
              />
              Logout
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
