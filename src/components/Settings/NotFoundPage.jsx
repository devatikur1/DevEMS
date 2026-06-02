import React from "react";
import { TriangleAlert } from "lucide-react";

export default function NotFoundPage({
  text = "This page could not be found.",
}) {
  return (
    <section className="w-full min-h-[40vh] flex items-center justify-center px-5">
      <div className="w-full max-w-lg rounded-2xl p-10 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
          <TriangleAlert size={30} className="text-accent" />
        </div>

        <h1 className="mt-6 text-3xl font-semibold text-textPrimary">
          Tab Not Found
        </h1>

        <p className="mt-3 text-sm text-textMuted">{text}</p>
      </div>
    </section>
  );
}
