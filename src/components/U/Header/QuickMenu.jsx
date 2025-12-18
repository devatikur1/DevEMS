import React from "react";
import { motion } from "framer-motion";
import { LogOut, User } from "lucide-react";

export default function QuickMenu({
  userDt,
  setShowOpBar,
  openProfile,
  closeProfile,
  handleLogout,
}) {
  // ---------------------
  // ✅ Render
  // ---------------------
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
          className="absolute z-[110] top-[60px] md:right-5 md:mx-0 min-w-[95%] md:min-w-[220px] bg-surface/90 backdrop-blur-xl border border-border rounded-xl shadow-2xl p-2"
        >
          <div className="px-3 py-3 border-b border-border mb-2">
            <p className="text-white text-sm font-semibold line-clamp-1 us">
              <span>{userDt?.name || "User"}</span>
              <small className="pl-2 text-subtext/80 us">{`(${userDt.role})`}</small>
            </p>
            <p className="text-zinc-500 text-xs truncate us">{userDt?.email}</p>
          </div>

          <div className="flex flex-col gap-1">
            <button
              onClick={() => {
                openProfile();
                setShowOpBar(false);
              }}
              className="w-full text-left text-sm text-zinc-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-3 px-3 py-2 rounded-lg"
            >
              <User size={16} /> Profile Settings
            </button>

            <button
              onClick={handleLogout}
              className="w-full text-left text-sm text-error/80 hover:text-error hover:bg-red-500/10 transition-colors flex justify-between items-center px-3 py-2 rounded-lg"
            >
              <span className="flex items-center gap-3">
                <LogOut size={16} /> Logout
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
