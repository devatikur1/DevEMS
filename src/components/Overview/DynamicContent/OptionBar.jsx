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
    <div className="fixed inset-0 z-[200]">
      {/* Backdrop-BG */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={() => setShowOptionBar(false)}
        className="absolute inset-0 bg-surface/35 sm:bg-transparent"
      />

      {/* Modal-Content */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
          height: 0,
          ...(optionBarDt.isMobile
            ? {}
            : { top: optionBarDt.x, left: optionBarDt.y }),
        }}
        animate={{
          opacity: 1,
          scale: 1,
          height: "auto",
          ...(optionBarDt.isMobile
            ? {}
            : { top: optionBarDt.x, left: optionBarDt.y }),
        }}
        exit={{
          opacity: 0,
          scale: 0.95,
          height: 0,
          ...(optionBarDt.isMobile
            ? {}
            : { top: optionBarDt.x, left: optionBarDt.y }),
        }}
        transition={{
          duration: 0.25,
          ease: [0.4, 0, 0.2, 1],
        }}
        drag={"y"}
        dragConstraints={{ top: 0, bottom: -20 }}
        dragElastic={{ top: 0, bottom: 0.4 }}
        onDragEnd={(e, info) => {
          if (info.offset.y > 10) {
            setShowOptionBar(false);
          }
        }}
        className="fixed bottom-0 sm:bottom-auto left-0 sm:left-auto right-0 sm:right-auto z-[110] sm:mx-0 w-[99%] sm:w-[240px] bg-bg/80 backdrop-blur-2xl border-t sm:border border-white/10 rounded-t-xl sm:rounded-2xl shadow-2xl shadow-black/40 p-2 overflow-hidden pb-32 sm:pb-2"
      >
        {/* Drag Handle for mobile */}
        <div className="w-full flex sm:hidden justify-center py-2">
          <div className="rounded-full bg-smtext/50 h-1 w-10"></div>
        </div>
        <div className="flex flex-col gap-3 pt-3 sm:pt-0 sm:gap-0.5">
          <button
            onClick={() => {
              navigator.clipboard
                .writeText(optionBarDt.link)
                .then(() => {
                  toast.success("Copied!");
                  console.log("Copied!");
                })
                .catch((err) => {
                  console.log("Could not copy text: ", err);
                  toast.error("Could not copy text!");
                });
              setTimeout(() => {
                setShowOptionBar(false);
              }, 200);
            }}
            className="group w-full text-left px-3 py-2.5 sm:py-2 text-[13px] text-subtext/65 hover:text-white hover:bg-white/5 rounded-md transition-all duration-200 flex items-center gap-3"
          >
            <Unlink
              size={15}
              className="sm:group-hover:scale-110 transition-transform"
            />
            <span>Copy URL</span>
          </button>
          <Link
            to={optionBarDt.settings}
            className="group w-full text-left px-3 py-2.5 sm:py-2 text-[13px] text-subtext/65 hover:text-white hover:bg-white/5 rounded-md transition-all duration-200 flex items-center gap-3"
          >
            <Settings
              size={15}
              className="sm:group-hover:rotate-90 transition-transform duration-300"
            />
            <span>Settings</span>
          </Link>
          <Link
            to={optionBarDt.link}
            className="group w-full text-left px-3 py-2.5 sm:py-2 text-[13px] text-subtext/65 hover:text-white hover:bg-white/5 rounded-md transition-all duration-200 flex items-center gap-3"
          >
            <SquareArrowOutUpRight
              size={15}
              className="sm:group-hover:translate-x-0.5 sm:group-hover:-translate-y-0.5 transition-transform"
            />
            <span>Visit</span>
          </Link>
          <div className="h-[1px] bg-white/5 my-1" /> {/* Divider */}
          <button
            onClick={async () => {
              if (role === "admin") {
                await deleteWorksplace(optionBarDt.link.split("/")[3]);
                setShowOptionBar(false);
              } else {
                console.log("Exit workspace");
                setShowOptionBar(false);
              }
            }}
            className="group w-full text-left px-3 py-2.5 sm:py-2 text-[13px] text-error/90 hover:text-error hover:bg-error/10 rounded-md transition-all duration-200 flex items-center gap-3"
          >
            {role === "admin" ? (
              <>
                <Trash2
                  size={15}
                  className="sm:group-hover:scale-110 transition-transform"
                />
                <span>Delete Workspace</span>
              </>
            ) : (
              <>
                <LogOut
                  size={15}
                  className="sm:group-hover:translate-x-0.5 transition-transform"
                />
                <span>Exit Workspace</span>
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
