import React, { useEffect, useRef, useState } from "react";
import { AppContext, auth, db } from "./AppContext";
import { onAuthStateChanged } from "firebase/auth";
import useFunction from "../hooks/useFunction";
import useFirestore from "../hooks/useFirestore";

export default function AppContextProvider({ children }) {
  // 🔹 authId-State
  const [isLogged, setIsLogged] = useState(
    Boolean(JSON.parse(localStorage.getItem("isLogged"))) || false,
  );
  const [userDt, setUserDt] = useState(
    JSON.parse(localStorage.getItem("userDt")) || {},
  );

  // 🔹 workspaces && Ref
  const [workspaces, setWorkspace] = useState([]);
  const containerRef = useRef(null);

  // 🔹 custom hook
  const { getData } = useFirestore();
  const { genEmailbaseUid } = useFunction();

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
        setWorkspace([]);
        return;
      }

      // 🔹 Get Data
      try {
        let docSnap = await getData({
          collId: "users",
          docId: genEmailbaseUid(user.email),
        });

        if (docSnap.status && docSnap.data) {
          let data = docSnap.data;
          localStorage.setItem("isLogged", "true");
          localStorage.setItem("userDt", JSON.stringify(data));
          setIsLogged(true);
          setUserDt(data);
        } else throw { code: "auth/user-not-found" };
      } catch (error) {
        console.error("🔥 Error fetching user data:", error);
        localStorage.removeItem("isLogged");
        localStorage.removeItem("userDt");
        setIsLogged(false);
        setUserDt({});
        setWorkspace([]);
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
    containerRef,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
