import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

export default function AuthHeader() {
  return (
    <header className="flex flex-col items-center gap-0 text-center">
      <div className="p-3">
        <div className="flex items-center gap-3">
          <Link to="/" className="pointer-events-auto flex items-center gap-4">
            <img src={logo} alt="DevEMS Logo" className="h-9 w-auto" />
            <span className="text-textPrimary font-bold tracking-tight text-xl">
              DevEMS
            </span>
          </Link>
        </div>
      </div>

      <p className="text-sm text-center text-textMuted/95 font-medium">
        Employee Management System
      </p>
    </header>
  );
}
