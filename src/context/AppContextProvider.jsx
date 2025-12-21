import React, { useEffect, useState } from "react";
import { AppContext, auth, db } from "./AppContext";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function AppContextProvider({ children }) {
  // 🔹 authId-State
  const [isLogged, setIsLogged] = useState(
    Boolean(JSON.parse(localStorage.getItem("isLogged"))) || false
  );
  const [userDt, setUserDt] = useState(
    JSON.parse(localStorage.getItem("userDt")) || {}
  );
  const [workspaces, setWorkspace] = useState([]);

  // --------------------------
  // ✅ Get Current USer Data
  // --------------------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        localStorage.removeItem("isLogged");
        localStorage.removeItem("userDt");
        setIsLogged(false);
        setUserDt({});
        return;
      }

      // 🔹 Get Data 
      try {
        const docSnap = await getDoc(doc(db, "users", user.uid));

        if (docSnap.exists()) {
          let data = docSnap.data();
          localStorage.setItem("isLogged", "true");
          localStorage.setItem("userDt", JSON.stringify(data));
          setIsLogged(true);
          setUserDt(data);
        } else {
          localStorage.removeItem("isLogged");
          localStorage.removeItem("userDt");
          setIsLogged(false);
          setUserDt({});
        }
      } catch (error) {
        console.error("🔥 Error fetching user data:", error);
        localStorage.removeItem("isLogged");
        localStorage.removeItem("userDt");
        setIsLogged(false);
        setUserDt({});
      }
      
    });

    return () => unsubscribe();
  }, []);

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
    overviewdt: {
      workspaces,
      setWorkspace,
    },
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
