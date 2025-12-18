import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export const DrawingTransformation = ({
  initialIcon: InitialIcon,
  finalIcon: FinalIcon,
  label,
  delay,
  x,
  y,
  rotation = 0,
}) => {
  // 🔹 state
  const [stage, setStage] = useState(0); // 0: Hidden, 1: Drawing, 2: Alive

  // -------------------------
  // ✅ card animation Logic
  // -------------------------
  useEffect(() => {
    const cycle = () => {
      setStage(0);
      setTimeout(() => setStage(1), 500); // Start drawing
      setTimeout(() => setStage(2), 3500); // Set alive
    };

    // Initial delay
    const startTimeout = setTimeout(() => {
      cycle();
      // Repeat cycle
      const interval = setInterval(cycle, 9000);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  const container = useRef(null);

  // ---------------------
  // ✅ GSAP Animation
  // ---------------------
  useGSAP(
    () => {
      gsap.fromTo(
        container.current,
        {
          left: "50%",
          top: "50%",
          rotation: "0deg",
          xPercent: -50,
          yPercent: -50,
          opacity: 0,
          scale: 0.5,
        },
        {
          left: x,
          top: y,
          rotation: rotation,
          xPercent: 0,
          yPercent: 0,
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power3.inOut",
        }
      );
    },
    { scope: container }
  );

  // ---------------------
  // ✅ Render
  // ---------------------
  return (
    <div
      ref={container}
      className="absolute transition-all duration-1000 ease-in-out z-0 pointer-events-none"
    >
      <div
        className={clsx(
          "relative w-20 h-28 md:w-28 md:h-40 border rounded-lg backdrop-blur-md transition-all duration-1000",
          stage === 2
            ? "bg-surface/80 border-border shadow-xl scale-110 -translate-y-4" // apply when 2
            : "bg-surface/50 border-border border-dashed scale-100 " // apply this when 0, 1
        )}
      >
        {/* Label tag that appears in stage 2 */}
        <div
          className={clsx(
            "absolute -top-3 left-1/2 -translate-x-1/2 bg-zinc-100 text-zinc-900 border border-zinc-200 text-[8px] md:text-[10px] font-mono font-bold px-2 py-0.5 rounded-sm transition-all duration-500",
            stage === 2
              ? "opacity-100 translate-y-0" // apply this when 0, 1
              : "opacity-0 translate-y-2" // apply when 2
          )}
        >
          {label}
        </div>

        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Stage 1: Wireframe Drawing Effect */}
          <div
            className={clsx(
              "absolute transition-all duration-1000",
              stage === 1 ? "opacity-100" : "opacity-0"
            )}
          >
            <InitialIcon className="w-8 h-8 md:w-12 md:h-12 text-zinc-500 stroke-1" />
            {/* Technical corner markers instead of dash drawing */}
            <div className="absolute -inset-2 border border-zinc-700/30 opacity-50"></div>
            <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-zinc-500"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-zinc-500"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-zinc-500"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-zinc-500"></div>
          </div>

          {/* Stage 2: Alive/Interactive */}
          <div
            className={`absolute transition-all duration-700 flex flex-col items-center ${
              stage === 2
                ? "opacity-100 scale-100 blur-0"
                : "opacity-0 scale-75 blur-sm"
            }`}
          >
            <FinalIcon className="w-10 h-10 md:w-14 md:h-14 text-blue-500" />
            {stage === 2 && (
              <div className="mt-3 flex items-center gap-2 px-2 py-1 bg-zinc-900/80 rounded-full border border-zinc-700/50">
                <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                <div className="w-8 h-0.5 bg-zinc-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-2/3 animate-[pulse_1s_infinite]"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
