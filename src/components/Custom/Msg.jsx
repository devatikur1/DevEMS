import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import clsx from "clsx";

export default function Msg({ msg }) {
  const { status, text, type } = msg;

  return (
    <AnimatePresence>
      {status && (
        <motion.div
          layout
          initial={{ opacity: 0, y: -6, x: [0, -10, 10, -10, 10, 0] }}
          animate={{ opacity: 1, y: 0, x: 0}}
          exit={{
            opacity: 0,
            y: -6,
            x: 0,
            transition: { duration: 0.4, ease: "easeInOut" },
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={clsx(
            "w-full flex items-start gap-3  border  rounded-lg p-3 text-error mt-5",
            type === "err" && "border-errorSoft/20 text-error bg-error/10",
            type === "warn" &&
              "border-warningSoft/20  text-warning bg-warning/10",
            type === "suc" &&
              "border-successSoft/20  text-success bg-success/10"
          )}
        >
          <AlertCircle className="shrink-0 mt-0.5" size={16} />
          <p className="text-xs font-medium leading-relaxed">{text}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
