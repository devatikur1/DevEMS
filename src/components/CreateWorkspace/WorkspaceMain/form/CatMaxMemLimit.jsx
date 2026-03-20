import { LayoutGrid, Users, ChevronDown, Check } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

export default function CatMaxMemLimit({ cat, totalMem }) {
  const { category, setCategory } = cat;
  const { totalMembers, setTotalMembers } = totalMem;

  // Searchable Dropdown States
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  const dropdownRef = useRef(null);

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

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCategories = categories.filter((c) =>
    c.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-6">
      {/* 🔹 Category Section */}
      <div className="flex flex-col gap-2 relative">
        <label className="text-[13px] font-medium text-textMuted mx-1 flex justify-between items-center">
          Workspace Category
        </label>

        {/* Custom Searchable Dropdown */}
        <div className="relative flex flex-col w-full" ref={dropdownRef}>
          <div className="relative flex items-center group">
            <LayoutGrid
              size={18}
              className="absolute left-4 text-textMuted group-focus-within:text-accent transition-colors z-10"
            />
            <input
              type="text"
              placeholder="Search or select category..."
              value={isFocused ? query : category || ""}
              onChange={(e) => {
                setQuery(e.target.value);
                if (!isFocused) setIsFocused(true);
              }}
              onFocus={() => {
                setIsFocused(true);
                setQuery("");
              }}
              className="w-full bg-surfaceSoft border border-border hover:border-hover focus:border-accent/50 rounded-md pl-12 pr-10 py-3 text-[13px] text-textPrimary placeholder:text-textMuted outline-none transition-all cursor-pointer"
            />
            <ChevronDown
              size={16}
              className={`absolute right-4 text-textMuted pointer-events-none transition-transform z-10 ${
                isFocused ? "rotate-180" : ""
              }`}
            />
          </div>

          {/* Dropdown Options */}
          {isFocused && (
            <div className="absolute top-[52px] left-0 w-full bg-surfaceSoft border border-border rounded-lg shadow-xl z-20 flex flex-col py-2 px-1.5 space-y-1">
              {filteredCategories.length > 0 ? (
                <div className="max-h-56 overflow-y-auto px-1.5">
                  <div className="sticky top-0 z-10 bg-surfaceSoft text-[11px] font-medium text-textMuted uppercase tracking-wider px-2 py-1 mb-1 border-b border-border/50 pb-2">
                    {query ? "Search Results" : "All Categories"}
                  </div>
                  <ul className="mt-1">
                    {filteredCategories.sort().map((item) => (
                      <li
                        key={item}
                        type="button"
                        onClick={() => {
                          setCategory(item);
                          setIsFocused(false);
                          setQuery(""); // Reset query for future searches
                        }}
                        className={`group relative flex items-center justify-between w-full px-3 py-2 rounded-md transition-colors cursor-pointer text-left ${
                          category === item
                            ? "bg-accent/10 border-accent/20"
                            : "hover:bg-boxHover"
                        }`}
                      >
                        <span
                          className={`text-[13px] ${
                            category === item
                              ? "text-accent font-medium"
                              : "text-textPrimary/65 group-hover:text-textPrimary"
                          }`}
                        >
                          {item}
                        </span>
                        {category === item && (
                          <span className="text-[10px] text-accent font-medium px-2 py-0.5 rounded-full bg-accent/20 border border-accent/30 flex items-center gap-1">
                            <Check size={10} /> Selected
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="px-3 py-4 text-center text-[13px] text-textMuted italic">
                  No categories found.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 🔹 Maximum Member Limit Section */}
      <div className="flex flex-col gap-2">
        <label className="flex justify-between items-center text-[13px] font-medium mx-1">
          <span className="text-[13px] font-medium text-textMuted mx-1 flex justify-between items-center">
            Member Limit
          </span>
          {/* Dynamic Label showing if it's Unlimited or a specific number */}
          <span
            className={`text-[11px] px-2 py-0.5 rounded ${
              Number(totalMembers) > 0 && Number(totalMembers) <= 10
                ? "bg-success/10 text-success/90 hover:text-error"
                : Number(totalMembers) > 10
                  ? "bg-warning/10 text-warning/90 hover:text-warning"
                  : "bg-error/10 text-error/90 hover:text-error"
            } transition-all duration-300`}
          >
            {Number(totalMembers) > 0 && Number(totalMembers) <= 10
              ? "Status: Unlimited"
              : Number(totalMembers) > 10
                ? "Status: Limited"
                : "Status: Nothing"}
          </span>
        </label>

        <div className="relative flex items-center group">
          <Users
            size={18}
            className="absolute left-4 text-textMuted group-focus-within:text-accent transition-colors"
          />
          <input
            value={totalMembers}
            onChange={(e) => setTotalMembers(e.target.value)}
            min={1}
            type="number"
            placeholder="e.g. 10"
            className="w-full bg-surfaceSoft border border-border hover:border-hover focus:border-accent/50 rounded-md pl-12 pr-4 py-3 text-[13px] text-textPrimary placeholder:text-textMuted outline-none transition-all"
          />
        </div>
        <p className="text-[10px] text-textMuted ml-1">
          💡 Tip: Set <span className="text-textPrimary">1-10</span> for
          Unlimited, or above <span className="text-textPrimary">10</span> for
          specific limit.
        </p>
      </div>
    </div>
  );
}
