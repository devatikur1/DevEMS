import React from "react";

export default function EmailInput({ input, setEmail, email }) {
  const Icon = input.icon;
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={input.id}
        className="text-xs font-medium text-textMuted ml-1"
      >
        {input.label}
      </label>
      <div className="relative group">
        <Icon
          className="absolute left-4 top-3 text-textMuted group-focus-within:text-accent transition-colors"
          size={18}
        />
        <input
          id={input.id}
          type="email"
          value={email}
          placeholder={input.placeholder}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-surfaceSoft border border-border hover:border-hover focus:border-accent/50 rounded-xl py-2.5 pl-12 pr-12 text-sm text-textPrimary placeholder:text-textMuted outline-none transition-all"
          required
        />
      </div>
    </div>
  );
}
