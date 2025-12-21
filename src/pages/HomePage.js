import React, { useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { DrawingTransformation } from "../components/Home/DrawingTransformation";
import {
  CalculatorIcon,
  ChartBarIcon,
  NewspaperIcon,
  SparklesIcon,
} from "lucide-react";
import {
  ClipboardDocumentCheckIcon,
  CursorArrowRaysIcon,
  DocumentTextIcon,
  PuzzlePieceIcon,
} from "@heroicons/react/16/solid";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { AppContext } from "../context/AppContext";

gsap.registerPlugin(useGSAP);

export default function HomePage() {
  // 🔹 Ref & Navigate
  const container = useRef(null);

  // ---------------------
  // ✅ GSAP Animation
  // ---------------------
  useGSAP(
    () => {
      // Text reveal animation: niche theke bhese uthbar effect
      gsap.from(".hp", {
        delay: 0.5,
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",

        onStart() {
          gsap.set(".hp-wrap", { overflow: "hidden" });
        },

        onComplete() {
          gsap.set(".hp-wrap", { overflow: "visible" });
        },
      });
    },
    { scope: container }
  );

  // ---------------------
  // ✅ Render
  // ---------------------
  return (
    <div
      ref={container}
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(159, 159, 169, 0.4) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
      }}
      className="relative h-screen overflow-y-auto animate-bg-dots"
    >
      {/* Background elements (fixed) */}
      <div className=" fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Top Left: Payroll */}
        <div className="hidden lg:block drawing-card">
          <DrawingTransformation
            initialIcon={NewspaperIcon}
            finalIcon={CalculatorIcon}
            label="PAYROLL"
            delay={0}
            x="4%"
            y="8%"
            rotation={-3}
          />
        </div>

        {/* Top Right: Attendance */}
        <div className="hidden lg:block drawing-card">
          <DrawingTransformation
            initialIcon={DocumentTextIcon}
            finalIcon={SparklesIcon}
            label="ATTENDANCE"
            delay={600}
            x="88%"
            y="12%"
            rotation={2}
          />
        </div>

        {/* Bottom Left: Analytics */}
        <div className="hidden md:block drawing-card">
          <DrawingTransformation
            initialIcon={ClipboardDocumentCheckIcon}
            finalIcon={ChartBarIcon}
            label="ANALYTICS"
            delay={450}
            x="5%"
            y="72%"
            rotation={-9}
          />
        </div>

        {/* Bottom Right: Workflow */}
        <div className="hidden md:block drawing-card">
          <DrawingTransformation
            initialIcon={PuzzlePieceIcon}
            finalIcon={CursorArrowRaysIcon}
            label="WORKFLOW"
            delay={300}
            x="80%"
            y="75%"
            rotation={5}
          />
        </div>
      </div>

      {/* Hero Text Content */}
      <article className="relative z-10 max-w-6xl mx-auto px-4 h-screen flex justify-center items-center *:select-none">
        <div className="text-center">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 leading-[1.1] text-white">
            {/* Line 1 */}
            <div className="hp-wrap">
              <span className="hp inline-block">Manage your team</span>
            </div>

            {/* Line 2 */}
            <div className="hp-wrap">
              <span className="hp inline-block">with</span>{" "}
              <span className="hp inline-block underline decoration-4 decoration-blue-500 underline-offset-4 md:underline-offset-8">
                intelligence
              </span>
            </div>
          </h2>

          <div className="hp-wrap">
            <p className="hp text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto font-normal">
              A unified platform to manage payroll, attendance, and performance.
              Streamline your HR operations with AI-powered insights.
            </p>
          </div>

          <Link to={"/u"}>
            <div className="pt-9 hp">
              <button className="text-[0.8rem] md:text-[1rem] bg-white text-black px-8 py-2 md:py-3 rounded-full font-medium hover:bg-zinc-200 transition-all hover:scale-105 pointer-events-auto">
                Start Managing Now
              </button>
            </div>
          </Link>
        </div>
      </article>
    </div>
  );
}
