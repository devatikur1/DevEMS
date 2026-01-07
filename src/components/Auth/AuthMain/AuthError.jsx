import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export default function AuthError({ authError }) {
  let { status, text } = authError;
  return (
    <AnimatePresence>
      {status && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          className="w-full flex items-start gap-3 bg-error/10 border border-errorSoft/20 rounded-lg p-3 text-error overflow-hidden mt-5"
        >
          <AlertCircle className="shrink-0 mt-0.5" size={16} />
          <p className="text-xs font-medium leading-relaxed">{text}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
