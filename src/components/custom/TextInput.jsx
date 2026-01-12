import React, { useEffect, useRef, useState } from "react";
import { findUniqueUsername } from "../../function/findUniqueUsername";

export default function TextInput({ input, setText, text }) {
  const [usernameStatus, setUsernameStatus] = useState("Taken");
  const [takenCount, setTakenCount] = useState(0);
  const debounceTimerRef = useRef(null);
  const Icon = input.icon;

  useEffect(() => {
    console.log(takenCount);
    console.log(debounceTimerRef);
  }, [takenCount]);

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={input.id}
        className="flex justify-between items-center text-xs font-medium text-textMuted ml-1"
      >
        <span>{input.label}</span>

        {input.id === "username" && (
          <span
            className={`text-[11px] px-2 py-0.5 rounded ${
              usernameStatus === "Available "
                ? "bg-success/10 text-success"
                : usernameStatus === "Taken"
                ? "bg-error/10 text-error"
                : "bg-warning/10 text-warning"
            }`}
          >
            {`Status: ${usernameStatus} ${takenCount}`}
          </span>
        )}
      </label>
      <div className="relative group">
        <Icon
          className="absolute left-4 top-3 text-textMuted group-focus-within:text-accent transition-colors"
          size={18}
        />
        <input
          id={input.id}
          type="text"
          value={text}
          placeholder={input.placeholder}
          onChange={async (e) => {
            if (input.id === "username") {
              const val = e.target.value
                .toLowerCase()
                .replace(/\s+/g, "")
                .replace(/@+/g, "")
                .replace(/[^a-z0-9._]/g, "");
              setUsernameStatus("checking...");
              setText(val);
              if (!val) {
                setUsernameStatus("Not Valid");
                return;
              }
              if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
              }
              debounceTimerRef.current = setTimeout(async () => {
                const status = await findUniqueUsername(`@${val}`);
                setTakenCount((p) => p + 1);
                setUsernameStatus(status ? "Available " : "Taken");
              }, 800);
            } else {
              setText(e.target.value);
            }
          }}
          className="w-full bg-surfaceSoft border border-border hover:border-hover focus:border-accent/50 rounded-xl py-2.5 pl-12 pr-12 text-sm text-textPrimary placeholder:text-textMuted outline-none transition-all"
          required
        />
      </div>
    </div>
  );
}
