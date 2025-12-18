import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="w-screen h-screen overflow-x-hidden overflow-y-auto bg-bg  text-text *:text-text animate-bg-dots">
      <Outlet />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
