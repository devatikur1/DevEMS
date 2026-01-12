import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import passValidation from "../../function/passValidation";

export default function PassInput({
  input,
  showPass,
  setShowPass,
  IsSignIn,
  setPass,
  pass,
  confirmPassIsvalid,
}) {
  const [passStatus, setPassStatus] = useState("Not Strong");
  const Icon = input.icon;
  return (
    <div key={input.id} className="space-y-1.5">
      <label
        htmlFor={input.id}
        className="flex justify-between items-center text-xs font-medium text-textMuted/95 ml-1"
      >
        <span>{input.label}</span>
        {!IsSignIn &&
          (input.id === "password" ? (
            <span
              className={`text-[11px] px-2 py-0.5 rounded ${
                passStatus === "Strong"
                  ? "bg-success/10 text-success"
                  : passStatus === "Not Strong"
                  ? "bg-error/10 text-error"
                  : "bg-warning/10 text-warning"
              }`}
            >
              {`Status: ${passStatus}`}
            </span>
          ) : (
            <span
              className={`text-[11px] px-2 py-0.5 rounded ${
                confirmPassIsvalid
                  ? "bg-success/10 text-success"
                  : "bg-error/10 text-error"
              }`}
            >
              {`Status: ${confirmPassIsvalid ? "Match" : "Not Match"}`}
            </span>
          ))}
      </label>
      <div className="relative group">
        <Icon
          className="absolute left-4 top-3 text-textMuted/95 group-focus-within:text-blue-400 transition-colors"
          size={18}
        />
        <input
          id={input.id}
          type={showPass ? "text" : "password"}
          value={pass}
          placeholder={input.placeholder}
          onChange={(e) => {
            if (!IsSignIn && input.id === "password") {
              setPass(e.target.value);
              setPassStatus("checking...");
              const status = passValidation(e.target.value);
              setTimeout(() => {
                setPassStatus(status ? "Strong" : "Not Strong");
              }, 300);
            } else {
              setPass(e.target.value);
            }
          }}
          className="w-full bg-surfaceSoft/60 border border-border/85 focus:border-accent/50 rounded-xl py-2.5 pl-12 pr-12 text-sm text-textPrimary placeholder:text-textMuted/50 outline-none transition-all"
          required
        />

        <button
          type="button"
          onClick={() => setShowPass(!showPass)}
          className="absolute right-4 top-3 text-textMuted/95 hover:text-textPrimary/95 transition-colors"
        >
          {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {!IsSignIn && input.id === "password" && (
        <p className="text-[10px] text-zinc-500 ml-1">
          💡 Password must be at least 8 characters and include a number and a
          symbol.
        </p>
      )}
    </div>
  );
}
