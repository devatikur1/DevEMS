import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Header from "../../components/U/Header";

export default function ULayout() {
  // 🔹 useContext context
  const { authId } = useContext(AppContext);
  const { isLogged } = authId;

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
    <main>
      <Header
        adminUrlArr={[
          { name: "Overview", path: "/u" },
          { name: "Activity", path: "/u/activity" },
          { name: "Employees", path: "/u/employees" },
          { name: "Analysis", path: "/u/analysis" },
        ]}
        employeeUrlArr={[
          { name: "Overview", path: "/u" },
          { name: "Activity", path: "/u/activity" },
          { name: "Teams", path: "/u/teams" },
          { name: "Analysis", path: "/u/analysis" },
        ]}
      
      />
      <Outlet />
    </main>
  );
}
