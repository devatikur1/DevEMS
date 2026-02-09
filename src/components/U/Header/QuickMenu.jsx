import React from "react";
import { motion } from "framer-motion";
import { LogOut, User, Settings } from "lucide-react"; // ShieldCheck role-er jonno bhalo lage
import { useNavigate, useSearchParams } from "react-router-dom";
import setParamsOnUrl from "../../../function/setParamsOnUrl";

export default function QuickMenu({ userDt, quickMenuDetails, setQuickMenuDetails, logOut }) {
  const navigate = useNavigate();
  // 🔹 router-dom
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        {/* Backdrop-BG */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() =>
            setQuickMenuDetails((p) => ({
              ...p,
              show: false,
            }))
          }
          className="absolute inset-0 bg-transparent"
        />

        {/* Modal-Content */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
            height: 0,
            top: quickMenuDetails.x,
            left: quickMenuDetails.y,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            height: "auto",
            top: quickMenuDetails.x,
            left: quickMenuDetails.y,
          }}
          exit={{
            opacity: 0,
            scale: 0.95,
            height: 0,
            top: quickMenuDetails.x,
            left: quickMenuDetails.y,
          }}
          className="absolute z-[110] min-w-[240px] bg-surface border border-border rounded-2xl shadow-2xl p-2 overflow-hidden"
        >
          {/* Header Section with Notun Data */}
          <div className="px-4 py-3 border-b border-border/5 mb-2 bg-surfaceSoft hover:bg-boxHover transition-all duration-300 rounded-xl">
            <div className="flex items-center justify-between mb-1">
              <p className="text-textPrimary text-[0.9rem] font-bold truncate leading-none">
                {userDt?.name || "User"}
              </p>
              {/* Role Badge */}
              <span className="text-[10px] text-subtext px-2 py-0.5 rounded-full border border-accent uppercase tracking-tighter">
                {userDt?.role || "Null"}
              </span>
            </div>

            {/* Username Display */}
            <p className="text-accent text-[0.75rem] font-medium mb-1">
              {userDt?.username || "@username"}
            </p>

            {/* Email Display */}
            <p className="text-textMuted text-[0.7rem] truncate">
              {userDt?.email}
            </p>
          </div>

          {/* Menu Actions */}
          <div className="flex flex-col gap-1">
            <button
              onClick={() => {
                navigate(`/${userDt?.username}`);
              }}
              className="w-full text-left text-[0.8rem] md:text-[0.83rem] text-textPrimary bg-transparent hover:bg-boxHover transition-all flex items-center gap-3 px-3 py-2.5 rounded-xl group"
            >
              <User
                size={16}
                className="text-textMuted group-hover:scale-110 transition-all duration-300"
              />
              You
            </button>
            <button
              onClick={() => {
                setQuickMenuDetails((p) => ({
                  ...p,
                  show: false,
                }));
                setParamsOnUrl({
                  get: searchParams,
                  set: setSearchParams,
                  key: "profile_setting",
                  value: "true",
                });
              }}
              className="w-full text-left text-[0.8rem] md:text-[0.82rem] text-textPrimary bg-transparent hover:bg-boxHover transition-all flex items-center gap-3 px-3 py-2.5 rounded-xl group"
            >
              <Settings
                size={16}
                className="text-textMuted group-hover:rotate-90 transition-all duration-300"
              />
              Profile Settings
            </button>
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />{" "}
            {/* Divider */}
            <button
              onClick={async () => await logOut()}
              className="w-full text-left text-[0.8rem] md:text-[0.82rem] text-error  bg-transparent  hover:bg-error/10 transition-all flex items-center gap-3 px-3 py-2.5 rounded-xl group"
            >
              <LogOut
                size={16}
                className="group-hover:translate-x-0.5 transition-transform duration-300"
              />
              Logout
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
