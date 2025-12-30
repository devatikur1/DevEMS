import { LayoutGrid, Users, ChevronDown } from "lucide-react"; // ChevronDown যোগ করা হয়েছে
import React from "react";

export default function CatMaxMemLimit({ cat, totalMem }) {
  const { category, setCategory } = cat;
  const { totalMembers, setTotalMembers } = totalMem;

  const categories = [
    "Frontend Development",
    "Backend Development",
    "Full Stack Development",
    "UI/UX Design",
    "Graphic Design",
    "Product Management",
    "Project Management",
    "Mobile App Development",
    "DevOps & Cloud",
    "Digital Marketing",
    "Social Media Management",
    "Content Writing",
    "Cyber Security",
    "Data Science & AI",
    "Quality Assurance (QA)",
    "Human Resources (HR)",
    "Finance & Accounts",
    "Customer Support",
    "Sales & Business Development",
    "Legal & Compliance",
    "Public Relations (PR)",
    "R&D (Research & Development)",
    "Game Development",
    "Video Production",
    "Blockchain",
    "Others",
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-6">
      {/* 🔹 Category Section */}
      <div className="flex flex-col gap-2">
        <label className="text-[13px] font-medium text-text/80 ml-1">
          Workspace Category
        </label>
        <div className="relative flex items-center group">
          <LayoutGrid
            size={18}
            className="absolute left-4 text-smtext group-focus-within:text-accent transition-colors"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-surface w-full pl-12 pr-10 py-3 text-sm text-white border border-boxHover rounded-lg outline-none appearance-none cursor-pointer focus:border-accent/50 transition-all"
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories.sort().map((item) => (
              <option key={item} value={item} className="bg-surface">
                {item}
              </option>
            ))}
          </select>
          {/* Custom Arrow for select */}
          <ChevronDown
            size={16}
            className="absolute right-4 text-smtext pointer-events-none"
          />
        </div>
      </div>

      {/* 🔹 Maximum Member Limit Section */}
      <div className="flex flex-col gap-2">
        <label className="flex justify-between items-center text-[13px] font-medium text-text/80 mx-1">
          <span>Member Limit</span>
          {/* Dynamic Label showing if it's Unlimited or a specific number */}
          <span
            className={`text-[11px] px-2 py-0.5 rounded ${
              Number(totalMembers) >= 0 && Number(totalMembers) <= 10
                ? "bg-success/10 text-success"
                : "bg-warning/10 text-warning"
            }`}
          >
            {Number(totalMembers) >= 0 && Number(totalMembers) <= 10
              ? "Status: Unlimited"
              : "Status: Limited"}
          </span>
        </label>

        <div className="relative flex items-center group">
          <Users
            size={18}
            className="absolute left-4 text-smtext group-focus-within:text-accent transition-colors"
          />
          <input
            value={totalMembers}
            onChange={(e) => setTotalMembers(e.target.value)}
            min={0}
            type="number"
            placeholder="e.g. 10"
            className="bg-surface w-full pl-12 pr-4 py-3 text-sm text-white border border-boxHover rounded-lg outline-none focus:border-accent/50 transition-all placeholder:text-zinc-600"
          />
        </div>
        <p className="text-[10px] text-zinc-500 ml-1">
          💡 Tip: Set <span className="text-zinc-300">0-10</span> for Unlimited,
          or above <span className="text-zinc-300">10</span> for specific limit.
        </p>
      </div>
    </div>
  );
}
