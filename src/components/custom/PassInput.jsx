import { Eye, EyeOff } from "lucide-react";
import React from "react";

export default function PassInput({ input, showPass, setShowPass, IsSignIn, setPass, pass }) {
  const Icon = input.icon;
  return (
    <div key={input.id} className="space-y-1.5">
      <label
        htmlFor={input.id}
        className="text-xs font-medium text-textMuted/95 ml-1"
      >
        <span>{input.label}</span>
        {/* Dynamic Label showing if it's Unlimited or a specific number */}
        {/* <span
          className={`text-[11px] px-2 py-0.5 rounded ${
            Number(totalMembers) >= 0 && Number(totalMembers) <= 10
              ? "bg-success/10 text-success"
              : "bg-warning/10 text-warning"
          }`}
        >
          {Number(totalMembers) >= 0 && Number(totalMembers) <= 10
            ? "Status: Unlimited"
            : "Status: Limited"}
        </span> */}
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
          onChange={(e) => setPass(e.target.value)}
          className="w-full bg-surfaceSoft/60 border border-border focus:border-accent/50 rounded-xl py-2.5 pl-12 pr-12 text-sm text-textPrimary placeholder:text-textMuted/50 outline-none transition-all"
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
    </div>
  );
}
