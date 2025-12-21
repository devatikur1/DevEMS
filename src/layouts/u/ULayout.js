import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Header from "../../components/U/Header";
import OptionHeader from "../../components/U/OptionHeader";
import { useScroll } from "framer-motion";

export default function ULayout() {
  // 🔹 useContext context
  const { authId } = useContext(AppContext);
  const { isLogged, userDt } = authId;

  // 🔹 Motion, Ref & State
  const containerRef = useRef(null);
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

  useEffect(() => {
    console.log(isScrolled);
    
  }, [isScrolled]);
  

  // 🔹 Ref
  const navigate = useNavigate();

  // ---------------------
  // ✅ Check isLogged
  // ---------------------
  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    }
  }, [isLogged, navigate]);

  // ---------------------
  // ✅ Render
  // ---------------------
  return (
    <main ref={containerRef} className="h-screen overflow-y-auto">
      {/* Main Header */}
      <Header />
      {/* Options Header */}
      <OptionHeader
        isScrolled={isScrolled}
        navItems={
          userDt.role === "admin"
            ? [
                { name: "Overview", path: "/u" },
                { name: "Activity", path: "/u/activity" },
                { name: "Employees", path: "/u/employees" },
                { name: "Analysis", path: "/u/analysis" },
              ]
            : [
                { name: "Overview", path: "/u" },
                { name: "Activity", path: "/u/activity" },
                { name: "Workspace", path: "/u/workspace" },
                { name: "Analysis", path: "/u/analysis" },
              ]
        }
      />

      {/* Outlet */}
      <Outlet />
    </main>
  );
}
