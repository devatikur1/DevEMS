import { ShieldCheck, User } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import setParamsOnUrl from "../../../function/setParamsOnUrl";
import { useSearchParams } from "react-router-dom";

export default function RoleSelector({ setRole }) {
  // 🔹 React-Router-Dom && State
  const [searchParams, setSearchParams] = useSearchParams();

  // ---------------------
  // ✅ All Roles
  // ---------------------
  const roles = [
    {
      id: "admin",
      label: "Admin",
      icon: ShieldCheck,
      description: "Manage workspace & settings",
      color: "from-blue/20 to-blue/50",
      border: "hover:border-blue",
    },
    {
      id: "employee",
      label: "Employee",
      icon: User,
      description: "Access dashboard & tasks",
      color: "from-purple/20 to-purple/50",
      border: "hover:border-purple",
    },
  ];
  // ---------------------
  // ✅ Render
  // ---------------------
  return (
    <motion.section
      exit={{ height: 0, overflow: "hidden" }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col gap-6 mt-2"
    >
      <p className="text-xs text-center text-textMuted">
        Choose your role to continue to the portal
      </p>

      <div className="grid grid-cols-1 gap-4">
        {roles.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => {
              setRole(item.id);
              setParamsOnUrl({
                get: searchParams,
                set: setSearchParams,
                key: "role",
                value: item.id,
              });
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`group relative flex items-center gap-4 p-4 rounded-xl border border-border bg-surfaceSoft hover:bg-boxHover ${item.border} transition-all duration-300 text-left`}
          >
            <div
              className={`p-3 rounded-lg bg-gradient-to-br ${item.color} group-hover:scale-110 transition-transform duration-300`}
            >
              <item.icon className="text-textPrimary" size={24} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-textPrimary">
                {item.label}
              </span>
              <span className="text-xs text-textMuted group-hover:text-textPrimary/70 transition-colors">
                {item.description}
              </span>
            </div>

            <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-3 h-3 rounded-full bg-textPrimary shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            </div>
          </motion.button>
        ))}
      </div>
    </motion.section>
  );
}
