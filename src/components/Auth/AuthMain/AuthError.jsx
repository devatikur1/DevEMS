import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export default function AuthError({ authError }) {
  const { status, text } = authError;

  return (
    <AnimatePresence>
      {status && (
        <motion.div
          layout
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            y: -6,
            transition: { duration: 0.4, ease: "easeInOut" },
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="w-full flex items-start gap-3 bg-error/10 border border-errorSoft/20 rounded-lg p-3 text-error mt-5"
        >
          <AlertCircle className="shrink-0 mt-0.5" size={16} />
          <p className="text-xs font-medium leading-relaxed">{text}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
