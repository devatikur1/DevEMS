import React from "react";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <article className="w-screen h-screen overflow-hidden bg-bg text-textPrimary *:text-textPrimary">
      <Outlet />
    </article>
  );
}
