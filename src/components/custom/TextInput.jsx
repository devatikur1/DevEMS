import React, { useState } from "react";
import { findUniqueUsername } from "../../function/findUniqueUsername";

export default function TextInput({ input, setText, text }) {
  const [usernameStatus, setUsernameStatus] = useState("Not Valid");
  const Icon = input.icon;
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={input.id}
        className="flex justify-between items-center text-xs font-medium text-textMuted/95 ml-1"
      >
        <span>{input.label}</span>

        {input.id === "username" && (
          <span
            className={`text-[11px] px-2 py-0.5 rounded ${
              usernameStatus === "Valid"
                ? "bg-success/10 text-success"
                : usernameStatus === "Not Valid"
                ? "bg-error/10 text-error"
                : "bg-warning/10 text-warning"
            }`}
          >
            {`Status: ${usernameStatus}`}
          </span>
        )}
      </label>
      <div className="relative group">
        <Icon
          className="absolute left-4 top-3 text-textMuted/95 group-focus-within:text-blue-400 transition-colors"
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
              const status = await findUniqueUsername(`@${val}`);
              setTimeout(() => {
                setUsernameStatus(status ? "Valid" : "Not Valid");
              }, 300);
            } else {
              setText(e.target.value);
            }
          }}
          className="w-full bg-surfaceSoft/60 border border-border focus:border-accent/50 rounded-xl py-2.5 pl-12 pr-12 text-sm text-textPrimary placeholder:text-textMuted/50 outline-none transition-all"
          required
        />
      </div>
    </div>
  );
}
