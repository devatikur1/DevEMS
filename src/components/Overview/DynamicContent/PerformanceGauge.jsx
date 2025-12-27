import React from "react";

export default function PerformanceGauge({ score = 0, size = 32 }) {
  const getColor = (s) => {
    if (s >= 90) return "#10b981";
    if (s >= 50) return "#f59e0b";
    return "#ef4444";
  };

  const percentage = parseInt(score) || 0;
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        aria-hidden="true"
        fill="none"
        height={size}
        width={size}
        viewBox="0 0 100 100"
        className="rotate-[-90deg]"
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          strokeWidth="10"
          stroke="currentColor"
          className="text-zinc-800"
          strokeLinecap="round"
        />

        <circle
          cx="50"
          cy="50"
          r={radius}
          strokeWidth="10"
          stroke={getColor(percentage)}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>

      <span className="absolute text-[8px] font-bold text-subtext/85">
        {percentage}{"%"}
      </span>
    </div>
  );
}
