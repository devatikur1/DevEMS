import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Header from "../../components/custom/Header";
import OptionHeader from "../../components/custom/OptionHeader";
import { useScroll } from "framer-motion";

export default function InLayout() {
  // 🔹 useContext context
  const { authId, containerRef } = useContext(AppContext);
  const { isLogged, userDt, authLoading } = authId;

  // 🔹 Motion, Ref & State
  const { scrollYProgress } = useScroll({ container: containerRef });
  const [isScrolled, setIsScrolled] = useState(false);

  // --------------------------------------
  // 3️⃣ INFINITE SCROLL FOR SUBSCRIPTIONS
  // --------------------------------------

  useEffect(() => {
    if (!scrollYProgress) return;
    const unsubscribe = scrollYProgress.on("change", async (value) => {
      if (value >= 0.04632152588555858) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });
    return () => unsubscribe?.();
  }, [scrollYProgress]);

  // 🔹 Ref
  const navigate = useNavigate();

  // ---------------------
  // ✅ Check isLogged
  // ---------------------
  useEffect(() => {
    if (!authLoading && !isLogged) {
      navigate("/sign-in");
    }
  }, [authLoading, isLogged, navigate]);

  // ---------------------
  // ✅ Render
  // ---------------------
  return (
    <aside
      ref={containerRef}
      className="h-screen overflow-y-auto overflow-x-hidden"
    >
      {/* Main Header */}
      <Header />
      {/* Options Header */}
      <OptionHeader
        isScrolled={isScrolled}
        navItems={
          userDt?.role === "admin"
            ? [
                { name: "Overview", path: "/u" },
                { name: "Activity", path: "/u/activity" },
                { name: "Employees", path: "/u/employees" },
                { name: "Analysis", path: "/u/analysis" },
                { name: "Settings", path: "/u/settings" },
              ]
            : [
                { name: "Overview", path: "/u" },
                { name: "Activity", path: "/u/activity" },
                { name: "Workspace", path: "/u/workspace" },
                { name: "Analysis", path: "/u/analysis" },
                { name: "Settings", path: "/u/settings" },
              ]
        }
      />

      {/* Outlet */}
      <Outlet />
    </aside>
  );
}
