import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <article className="w-screen h-screen overflow-hidden bg-bg text-text *:text-text">
      <Outlet />
      <Toaster position="top-center" reverseOrder={false} />
    </article>
  );
}
