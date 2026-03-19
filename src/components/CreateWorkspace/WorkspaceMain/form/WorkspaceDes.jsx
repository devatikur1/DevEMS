import { DessertIcon } from 'lucide-react';
import React from 'react'

export default function WorkspaceDes({ des }) {
    const { description, setDescription } = des;
  return (
    <section className="w-full flex flex-col gap-2 mb-6">
      <label className="text-[13px] font-medium text-textMuted mx-1 flex justify-between items-center">
        Workspace Description
      </label>
      <div className="group relative rounded-md">
        <DessertIcon
          size={18}
          className="absolute left-4 top-3.5 text-textMuted group-focus-within:text-accent transition-colors"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your team's goals..."
          className="resize-none w-full bg-surfaceSoft border border-border hover:border-hover focus:border-accent/50 rounded-md pl-12 pr-4 py-3 text-sm text-textPrimary placeholder:text-textMuted outline-none transition-all"
          rows={3}
        />
      </div>
    </section>
  );
}