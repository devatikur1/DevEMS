import React from "react";
import { Link } from "react-router-dom";

export default function HighlightText({ text, highlight, to }) {
  if (!highlight.trim()) {
    return (
      <Link
        to={to}
        className="text-text font-semibold text-[13px] lg:text-[15px] truncate"
      >
        {text}
      </Link>
    );
  }
  const regex = new RegExp(`${highlight}`, "gi");
  const part = text.split(regex);
  return (
    <Link
      to={to}
      className="text-text font-semibold text-[13px] lg:text-[15px] truncate"
    >
      <span>{part[0]}</span>
      <mark className="bg-warning/20 text-warning">{highlight}</mark>
      <span>{part[1]}</span>
    </Link>
  );
}
