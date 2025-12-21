import { motion } from 'framer-motion';
import React from 'react'

export default function FilterQuickMenu({ setShowFilterMenuBar }) {
  return (
    <>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        {/* Backdrop-BG */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowFilterMenuBar(false)}
          className="absolute inset-0 bg-transparent"
        />

        {/* Modal-Content */}
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          className="absolute z-[110] top-[60px] md:right-5 md:mx-0 min-w-[95%] md:min-w-[240px] bg-bg/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-2 overflow-hidden"
        >
          {/* Menu Actions */}
          <div className="flex flex-col gap-1">
            <button
              onClick={() => {}}
              className="w-full text-left text-[0.85rem] text-zinc-300 hover:text-white hover:bg-hover/50 transition-all flex items-center gap-3 px-3 py-2.5 rounded-xl group"
            >
              {/* <Us
                size={16}
                className="text-zinc-500 group-hover:text-accent transition-colors"
              /> */}
              You
            </button>
            <button className="w-full text-left text-[0.85rem] text-zinc-300 hover:text-white hover:bg-hover/50 transition-all flex items-center gap-3 px-3 py-2.5 rounded-xl group">
              {/* <Settings
                size={16}
                className="text-zinc-500 group-hover:text-accent transition-colors"
              /> */}
              Profile Settings
            </button>
            <div className="h-[1px] bg-white/5 my-1 mx-2" /> {/* Divider */}
          </div>
        </motion.div>
      </div>
    </>
  );
}
