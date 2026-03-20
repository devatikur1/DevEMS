import React from "react";
import clsx from "clsx";
import { UserPlus, Plus, Users } from "lucide-react"; // Changed FolderPlus to Users
import { useNavigate } from "react-router-dom";
import EmployeeCard from "./DynamicContent/EmployeeCard";
import CardLoading from "./DynamicContent/CardLoading";

export default function DynamicContent({
  role,
  searchParams,
  employeesGetting,
  employeesData,
}) {
  const navigate = useNavigate();

  return (
    <section className="mt-8 mb-20 overflow-hidden">
      {/* Title Updated */}
      <h1 className="pb-5 text-textPrimary font-semibold text-xl">Employees</h1>
      {/* VIEW CONTAINER */}
      <ul className="overflow-hidden transition-all duration-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Render Employee List */}
        {employeesData?.length > 0 &&
          employeesData.map((employee, i) => (
            <EmployeeCard
              key={employee.id || i}
              emp={employee}
              index={i}
              role={role}
              searchParams={searchParams}
            />
          ))}

        {employeesGetting &&
          [...Array(10)].map((_, i) => <CardLoading key={i} />)}
      </ul>

      {/* EMPTY STATE - Updated for Employees */}
      {!employeesGetting && employeesData?.length === 0 && (
        <div className="relative overflow-hidden w-full flex flex-col items-center justify-center py-24 px-6 border border-dashed border-border/40 rounded-3xl bg-surfaceSoft/5 backdrop-blur-sm group transition-all duration-500 hover:border-accent/30 hover:bg-surfaceSoft/10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/5 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative mb-6">
            <div className="w-20 h-20 rounded-2xl bg-surfaceSoft/50 flex items-center justify-center border border-border group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl">
              <UserPlus
                size={32}
                className="text-textMuted group-hover:text-accent transition-colors duration-500"
              />
            </div>

            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-accent rounded-lg flex items-center justify-center border-2 border-bg shadow-lg scale-0 group-hover:scale-100 transition-transform duration-300 delay-150">
              <Plus size={14} className="text-white" />
            </div>
          </div>

          <div className="text-center z-10">
            <h3 className="text-textPrimary font-bold text-xl mb-2 tracking-tight">
              No employees found
            </h3>
            <p className="text-textMuted text-sm max-w-[340px] mx-auto leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
              {role === "admin"
                ? "Your team is empty. Start by inviting employees to your workspace to begin collaborating."
                : "It looks like there are no other members in this workspace yet."}
            </p>
          </div>

          <button
            onClick={() =>
              navigate(role === "admin" ? "/u/employees/invite" : "/u/overview")
            }
            className="mt-8 relative group/btn overflow-hidden px-8 py-3 bg-accent/10 hover:bg-accent border border-accent/20 hover:border-accent text-accent hover:text-white font-bold rounded-xl transition-all duration-300 active:scale-95 flex items-center gap-2 shadow-lg shadow-accent/5"
          >
            <Plus size={18} />
            <span className="uppercase tracking-[0.1em] text-[11px]">
              {role === "admin"
                ? "Invite Your First Employee"
                : "Return to Dashboard"}
            </span>

            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-shine" />
          </button>
        </div>
      )}
    </section>
  );
}
