import React from "react";
import { Link } from "react-router-dom";

export default function MainHeader({ setShowOpBar, showOpBar, userDt }) {

  return (
    <article className="w-full flex justify-center items-center select-none *:select-none">
      <section className="w-full flex items-center justify-between px-5 pt-4">
        <article>
          <Link to={"/"} className="min-w-5 min-h-5">
            <svg
              width="20"
              height="20"
              viewBox="0 0 76 65"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M38 0L76 65H0L38 0Z" fill="white" />
            </svg>
          </Link>
        </article>
        <article>
          <h1 className="text-[1.15rem] font-bold tracking-tighter text-white">
            DevEMS
          </h1>
        </article>
        <article
          className="cursor-pointer"
          onClick={() => setShowOpBar(!showOpBar)}
        >
          <img
            src={userDt?.photoURL || "https://cdn.auth0.com/avatars/E.png"}
            alt="user"
            className="w-[30px] h-[30px] rounded-full border border-accent object-cover hover:scale-105 transition-transform"
          />
        </article>
      </section>
    </article>
  );
}
