import React from "react";

export default function HighlightText({ text, highlight }) {
  if (!highlight.trim()) {
    return (
      <h3 className="font-semibold text-textPrimary text-[15px] truncate group-hover:text-accent transition-colors">
        {text}
      </h3>
    );
  }

  // Regex special characters escape kora
  const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escapedHighlight})`, "gi");
  const parts = text.split(regex);
  

  return (
    <h3 className="font-semibold text-textPrimary text-[15px] truncate group-hover:text-accent transition-colors">
      {parts.map((part, index) =>
        regex.test(part) ? (
          <mark key={index} className="bg-warning/20 text-warning">
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </h3>
  );
}
