/* eslint-disable no-throw-literal */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { ArrowLeft, MoveLeft } from "lucide-react";

export default function Header({
  className = "",
  link = "/",
  isLogo = true,
  isLogoName = true,
  text = "DevEMS",
}) {
  // 🔹 useContext context
  const { authId } = useContext(AppContext);
  const { userDt } = authId;

  // ---------------------
  // ✅ Render
  // ---------------------
  return (
    <header
      className={`relative z-[100] w-full flex justify-center items-center select-none *:select-none text-textPrimary bg-surface ${className}`}
    >
      <section className="w-full flex items-center justify-between px-5 pt-4">
        <article>
          <Link to={link} className="min-w-4 min-h-4 md:min-w-5 md:min-h-5">
            {isLogo ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 76 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M38 0L76 65H0L38 0Z" fill="white" />
              </svg>
            ) : (
              <div className="flex justify-center items-start gap-1 group">
                <ArrowLeft
                  size={20}
                  className="text-textPrimary/60 group-hover:text-textMuted transition-all duration-300"
                />
                <span className="hidden md:inline text-sm text-textPrimary/60 group-hover:text-textMuted transition-all duration-300">
                  Back
                </span>
              </div>
            )}
          </Link>
        </article>
        <article>
          {isLogoName ? (
            <h1 className="text-[1.1rem] md:text-[1.15rem] font-bold tracking-tighter text-textPrimary">
              {text}
            </h1>
          ) : (
            <h1 className="flex-none truncate text-[0.95rem] font-medium">{text}</h1>
          )}
        </article>
        <article className="cursor-pointer">
          <img
            src={
              userDt?.photoURL ||
              `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
                userDt?.name,
              )}`
            }
            alt={userDt?.name || "user"}
            className="size-[25px] md:size-[30px]  rounded-full border border-accent object-cover hover:scale-105 transition-transform"
          />
        </article>
      </section>
    </header>
  );
}
