import React from 'react'

export default function Heading({ currentStep, totalSteps }) {
  return (
    <header className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
      <h1 className="text-3xl md:text-4xl font-bold text-textPrimary tracking-tight">
        {currentStep === 1 && "Start Your Journey"}
        {currentStep === 2 && "Configure Workspace"}
        {currentStep === 3 && "Finalize Details"}
      </h1>
      <p className="text-textMuted mt-3 text-sm md:text-base">
        Step {currentStep} of {totalSteps}: Fill in the information below.
      </p>
    </header>
  );
}
