import React from "react";

export default function HighlightText({ text, highlight }) {
  if (!highlight.trim()) {
    return (
      <h3 className="text-text font-semibold text-[13px] lg:text-[15px] truncate">
        {text}
      </h3>
    );
  }
  const regex = new RegExp(`${highlight}`, "gi");
  const part = text.split(regex);
  return (
    <h3 className="text-text font-semibold text-[13px] lg:text-[15px] truncate">
      <span>{part[0]}</span>
      <mark className="bg-warning/20 text-warning">{highlight}</mark>
      <span>{part[1]}</span>
    </h3>
  );
}
