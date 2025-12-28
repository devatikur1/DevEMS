import { motion } from "framer-motion";
import {
  LogOut,
  Settings,
  SquareArrowOutUpRight,
  Trash2,
  Unlink,
} from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function OptionBar({
  optionBarDt,
  setShowOptionBar,
  role,
  deleteWorksplace,
}) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-surface/35 sm:bg-transparent">
      {/* Backdrop-BG */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowOptionBar(false)}
        className="absolute inset-0 bg-transparent sm:bg-bg/5 backdrop-blur-sm"
      />

      {/* Modal-Content */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: "auto" }}
        exit={{ height: 0 }}
        drag={"y"}
        dragConstraints={{ top: 0, bottom: -20 }}
        dragElastic={{ top: 0, bottom: 0.4 }}
        onDragEnd={(e, info) => {
          if (info.offset.y > 10) {
            setShowOptionBar(false);
          }
        }}
        className="absolute z-[110] -bottom-20 sm:bottom-auto sm:mx-0 w-[99.9%] sm:w-[240px] bg-bg/80 backdrop-blur-2xl border border-white/10 rounded-xl sm:rounded-2xl shadow-2xl p-2 overflow-hidden pb-32 sm:pb-2"
      >
        <div className="w-full flex sm:hidden justify-center">
          <div className="rounded-full bg-smtext h-1 w-10"></div>
        </div>
        <div className="flex flex-col gap-3 pt-5 sm:pt-0 sm:gap-0.5">
          <button
            onClick={() => {
              navigator.clipboard
                .writeText(optionBarDt.link)
                .then(() => {
                  toast.success("Copied !");
                  console.log("Copied !");
                })
                .catch((err) => {
                  console.log("Could not copy text: ", err);
                  toast.error("Could not copy text: ", err);
                });
              setTimeout(() => {
                setShowOptionBar(false);
              }, 300);
            }}
            className="w-full text-left px-3 py-2.5 sm:py-2 text-[13px] text-subtext/65 hover:text-white hover:bg-white/5 rounded-md transition-colors flex items-center gap-3 "
          >
            <Unlink size={15} />
            <span>Copy URL</span>
          </button>
          <Link
            to={optionBarDt.settings}
            className="w-full text-left px-3 py-2.5 sm:py-2 text-[13px] text-subtext/65 hover:text-white hover:bg-white/5 rounded-md transition-colors flex items-center gap-3 "
          >
            <Settings size={15} />
            <span>Settings</span>
          </Link>
          <Link
            to={optionBarDt.link}
            className="w-full text-left px-3 py-2.5 sm:py-2 text-[13px] text-subtext/65 hover:text-white hover:bg-white/5 rounded-md transition-colors flex items-center gap-3 "
          >
            <SquareArrowOutUpRight size={15} />
            <span>Visit</span>
          </Link>
          <div className="h-[1px] bg-white/5 my-1" /> {/* Divider */}
          <button
            onClick={async () => {
              if (role === "admin") {
                await deleteWorksplace(optionBarDt.link.split("/")[3]);
              } else {
                console.log("hhh");
              }
            }}
            className="w-full text-left px-3 py-2.5 sm:py-2 text-[13px] text-error/90 hover:text-error hover:bg-error/5 rounded-md transition-colors flex items-center gap-3"
          >
            {role === "admin" ? (
              <>
                <Trash2 size={15} />
                <span>Delete Worksplace</span>
              </>
            ) : (
              <>
                <LogOut size={15} />
                <span>Exit Worksplace</span>
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
