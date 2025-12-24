import { LayoutGrid, Users } from "lucide-react";
import React from "react";

export default function CatMaxMemLimit({ cat, totalMem }) {
  const { category, setCategory } = cat;
  const { totalMembers, setTotalMembers } = totalMem;

  // 🔹 categories list
  const categories = [
    "UI/UX Design",
    "Frontend Development",
    "Backend Development",
    "Full Stack Development",
    "Mobile App Development",
    "DevOps & Cloud",
    "Software Architecture",
    "Quality Assurance (QA)",
    "Data Science & AI",
    "Cyber Security",
    "Digital Marketing",
    "Content Strategy",
    "Project Management",
    "Human Resources (HR)",
    "Product Management",
    "Sales & Business",
    "Customer Support",
    "Finance & Accounts",
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-6">
      {/* Category*/}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-text ml-1">Category</label>
        <div className="relative flex items-center rounded-lg bg-surface border border-boxHover focus-within:border-accent/50 transition-all">
          <LayoutGrid size={18} className="absolute left-4 text-smtext" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-transparent w-full pl-12 pr-4 py-3 text-sm text-white outline-none appearance-none cursor-pointer"
          >
            <option value="" selected disabled className="bg-surface">
              Select Category
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-surface">
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Maximum Member Limit*/}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-text ml-1">
          Maximum Member Limit{" "}
          <small className="text-warning">{"(Not required)"}</small>
        </label>
        <div className="relative flex items-center rounded-lg bg-surface border border-boxHover focus-within:border-accent/50 transition-all">
          <Users size={18} className="absolute left-4 text-smtext" />
          <input
            value={totalMembers}
            onChange={(e) => setTotalMembers(e.target.value)}
            type="number"
            placeholder="e.g. 10"
            className="bg-transparent w-full pl-12 pr-4 py-3 text-sm text-white outline-none overflow-hidden"
          />
        </div>
      </div>
    </div>
  );
}
