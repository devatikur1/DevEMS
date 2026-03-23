import React from 'react'

export default function ProgressBar({ currentStep, totalSteps }) {
  return (
    <div className="w-full max-w-3xl mx-auto mb-16 relative">
      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-surfaceSoft -translate-y-1/2"></div>

      <div
        className="absolute top-1/2 left-0 h-[2px] bg-accent -translate-y-1/2 transition-all duration-700 ease-in-out"
        style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
      >
        <div className="absolute top-0 left-0 w-full h-full animate-progress-scan bg-gradient-to-r from-transparent via-white/40 to-transparent bg-[length:200%_100%]"></div>
      </div>

      <div className="relative flex justify-between w-full">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 z-10 
                ${
                  currentStep >= step
                    ? "bg-accent border-accent text-white scale-110"
                    : "bg-surfaceHard border-border text-textMuted scale-100"
                }`}
            >
              {currentStep > step ? (
                <span className="text-lg font-bold">✓</span>
              ) : (
                <span className="text-sm font-bold">{step}</span>
              )}
            </div>

            <span
              className={`absolute -bottom-7 text-[10px] font-bold uppercase tracking-widest transition-colors duration-500 ${currentStep >= step ? "text-accent" : "text-textMuted"}`}
            >
              {step === 1 && "Identity"}
              {step === 2 && "Capacity"}
              {step === 3 && "Finalize"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
