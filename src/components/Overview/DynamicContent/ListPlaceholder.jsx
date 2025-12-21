import clsx from "clsx";
import React from "react";

export default function ListPlaceholder({ isBorder, i }) {
  return (
    <div
      className={clsx(
        "h-[120px] lg:h-[65px] px-5 flex items-center justify-between cursor-pointer",
        isBorder && "border-b border-border"
      )}
    >
      hhh
    </div>
  );
}
