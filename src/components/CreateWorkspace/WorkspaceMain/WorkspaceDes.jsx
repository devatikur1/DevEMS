import { DessertIcon } from 'lucide-react';
import React from 'react'

export default function WorkspaceDes({ des }) {
    const { description, setDescription } = des;
  return (
    <section className="w-full flex flex-col gap-2 mb-6">
      <label className="text-sm font-medium text-text ml-1">
        Workspace Description
      </label>
      <div className="relative flex rounded-lg bg-bg border border-boxHover focus-within:border-accent/50 transition-all">
        <DessertIcon size={18} className="absolute left-4 top-4 text-smtext" />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your team's goals..."
          className="bg-transparent w-full pl-12 pr-4 py-4 text-sm resize-none text-white outline-none min-h-[100px]"
          rows={3}
        />
      </div>
    </section>
  );
}
