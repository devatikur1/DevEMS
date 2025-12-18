import React, { useContext, useEffect } from "react";
import Header from "../components/U/Header";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function UPage() {
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
      navigate("/");
    }
  }, [isLogged, navigate]);

  // ---------------------
  // ✅ Render
  // ---------------------
  return (
    <main>
      <Header />
    </main>
  );
}
