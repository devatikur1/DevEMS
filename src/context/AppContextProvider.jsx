import React, { useState } from "react";
import { AppContext } from "./AppContext";

export default function AppContextProvider({ children }) {
  // 🔹 authId-State
  const [isLogged, setIsLogged] = useState(
    Boolean(JSON.parse(localStorage.getItem("isLogged"))) || false
  );
  const [userDt, setUserDt] = useState(
    JSON.parse(localStorage.getItem("userDt")) || {}
  );

  // ---------------------
  // ✅ Value
  // ---------------------
  const value = {
    authId: {
      isLogged,
      setIsLogged,
      userDt,
      setUserDt,
    },
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
