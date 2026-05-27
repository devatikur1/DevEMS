import React from 'react'

export default function Header() {
  return (
    <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-8">
      <div>
        <h1 className="text-textPrimary font-semibold text-xl md:text-2xl">Settings</h1>
        <p className="text-textMuted mt-2 text-xs md:text-sm">
          Manage your personal preferences and workspace configurations.
        </p>
      </div>
    </header>
  );
}
