import React from 'react'

export default function Header() {
  return (
    <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-8">
      <div>
        <h1 className="text-textPrimary font-semibold text-3xl">
          Employees
        </h1>
        <p className="text-textMuted mt-2 text-sm">
          Configure your workspace, security, and profile preferences.
        </p>
      </div>
    </header>
  );
}
