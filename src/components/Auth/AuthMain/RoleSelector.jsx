import { ShieldCheck, User } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

export default function RoleSelector({ role, setRole }) {
  const roles = [
    {
      id: "admin",
      label: "Admin",
      icon: ShieldCheck,
      description: "Manage workspace & settings",
      color: "from-blue-500/20 to-indigo-500/20",
      border: "hover:border-blue-400/50",
    },
    {
      id: "employee",
      label: "Employee",
      icon: User,
      description: "Access dashboard & tasks",
      color: "from-emerald-500/20 to-teal-500/20",
      border: "hover:border-emerald-400/50",
    },
  ];

  return (
    <section className="w-full flex flex-col gap-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-medium text-white">Select User Type</h3>
        <p className="text-xs text-zinc-400">
          Choose your role to continue to the portal
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {roles.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => setRole(item.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`group relative flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 ${item.border} transition-all duration-300 hover:bg-white/10 text-left`}
          >
            <div
              className={`p-3 rounded-lg bg-gradient-to-br ${item.color} group-hover:scale-110 transition-transform duration-300`}
            >
              <item.icon className="text-white" size={24} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-white">
                {item.label}
              </span>
              <span className="text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors">
                {item.description}
              </span>
            </div>

            <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
