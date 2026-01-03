import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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
import FireflyEffect from "../components/Home/Bg";
import NoiseField from "../components/Home/Bg";
import PlasmaWave from "../components/Home/Bg";

gsap.registerPlugin(useGSAP);

export default function HomePage() {
  // 🔹 Ref
  const container = useRef(null);

  // ----------------------------
  // ✅ Chage Tilte base on Load
  // ----------------------------
  useEffect(() => {
    document.title = "DevEMS | Intelligence Workspace";
  }, []);

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
    <div>
      <div
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 10,
        }}
      >
        <PlasmaWave
          overallSpeed={0.2}
          lineSpeed={1}
          warpSpeed={0.2}
          offsetSpeed={1.33}
          gridSmoothWidth={0.015}
          axisWidth={0.05}
          majorLineWidth={0.025}
          minorLineWidth={0.0125}
          majorLineFrequency={5}
          minorLineFrequency={1}
          minLineWidth={0.01}
          maxLineWidth={0.2}
          lineAmplitude={1}
          lineFrequency={0.2}
          linesPerGroup={16}
          warpFrequency={0.5}
          warpAmplitude={1}
          offsetFrequency={0.5}
          minOffsetSpread={0.6}
          maxOffsetSpread={2}
          lineColorR={0.4}
          lineColorG={0.2}
          lineColorB={0.8}
          lineColorA={1}
          bgColor1R={0.1}
          bgColor1G={0.1}
          bgColor1B={0.3}
          bgColor1A={1}
          bgColor2R={0.3}
          bgColor2G={0.1}
          bgColor2B={0.5}
          bgColor2A={1}
          scale={5}
        />
      </div>

      <div
        ref={container}
        className="relative h-screen overflow-y-auto overflow-x-hidden"
      >
        {/* Background elements (fixed) */}
        <div className="fixed inset-0 z-20 overflow-hidden pointer-events-none z-0">
          {/* Top Left: Payroll */}
          <div className="hidden lg:block">
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
          <div className="hidden lg:block">
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
          <div className="hidden md:block">
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
          <div className="hidden md:block">
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

        {/* 🔹 Hero Content */}
        <article className="relative z-30 max-w-6xl mx-auto px-4 h-screen flex justify-center items-center select-none">
          <div className="text-center">
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 leading-[1.05] text-white">
              <div className="overflow-hidden">
                <span className="hp inline-block">Manage your workspace</span>
              </div>
              <div className="overflow-hidden">
                <span className="hp inline-block">with</span>{" "}
                <span className="hp inline-block text-accent underline decoration-4 decoration-accent/50 underline-offset-8">
                  intelligence
                </span>
              </div>
            </h2>

            <div className="overflow-hidden">
              <p className="hp text-sm sm:text-lg text-smtext max-w-2xl mx-auto font-normal leading-relaxed">
                A unified platform to manage payroll, attendance, and
                performance. Streamline your HR operations with AI-powered
                insights.
              </p>
            </div>

            <Link to="/u" className="inline-block pt-8 hp pointer-events-auto">
              <button className="relative group overflow-hidden bg-subtext text-black px-10 py-3.5 rounded-full font-bold transition-all hover:scale-105 active:scale-95">
                <span className="relative z-10">Start Managing Now</span>
                <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
