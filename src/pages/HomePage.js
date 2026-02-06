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
import logo from "../assets/logo.png";

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
    <figure className="relative h-screen overflow-x-hidden overflow-y-auto scrollVeiwNone w-full">
      {/* ColorFull Background */}
      <aside className="fixed inset-0 z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple/20 rounded-full blur-[120px]" />
      </aside>

      {/* Logo */}
      <header
        role="banner"
        className="fixed top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
      >
        <div className="flex items-center gap-3 bg-surface backdrop-blur-xl px-6 py-3 rounded-full shadow-lg">
          <Link
            to="/"
            className="pointer-events-auto flex items-center gap-2"
            aria-label="Go to DevEMS homepage"
          >
            <img src={logo} alt="DevEMS Logo" className="h-8 w-auto" />
            <h1 className="text-textPrimary font-bold tracking-tight text-lg">
              DevEMS
            </h1>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main
        ref={container}
        className="relative z-10 min-h-screen overflow-y-auto overflow-x-hidden"
      >
        {/* 🔹 Background elements (fixed) */}
        <div className="fixed inset-0 z-20 overflow-hidden pointer-events-none">
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
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 leading-[1.05] text-textPrimary">
              <div className="hp-wrap overflow-hidden">
                <span className="hp inline-block">Manage your workspace</span>
              </div>
              <div className="hp-wrap overflow-hidden">
                <span className="hp inline-block">with</span>{" "}
                <span className="hp inline-block text-accent underline decoration-4 decoration-accent/50 underline-offset-8">
                  intelligence
                </span>
              </div>
            </h2>

            <div className="hp-wrap overflow-hidden">
              <p className="hp sm:w-[80%] text-sm sm:text-[0.9rem] text-textMuted max-w-2xl mx-auto font-normal leading-relaxed">
                A unified platform to manage payroll, attendance, and
                performance. Streamline your HR operations with AI-powered
                insights.
              </p>
            </div>

            <Link to="/u" className="inline-block pt-8 hp pointer-events-auto">
              <button className="relative group overflow-hidden bg-bgSoft text-[0.8rem] md:text-[1rem] text-bg px-8 py-2 lg:px-10 lg:py-3 rounded-full font-bold transition-all hover:scale-105 active:scale-95">
                <span className="relative z-10">Start Managing Now</span>
                <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </Link>
          </div>
        </article>
      </main>
    </figure>
  );
}
