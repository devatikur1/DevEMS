import React, { useContext, useEffect } from "react";
import Header from "../../components/U/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

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
      <Header />
      <Outlet />
    </main>
  );
}
