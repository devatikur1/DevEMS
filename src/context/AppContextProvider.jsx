/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-throw-literal */
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AppContext, auth } from "./AppContext";
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

  // 🔹 overview
  const [workspaces, setWorkspace] = useState([]);

  // 🔹 settings
  const [theme, setTheme] = useState("dark");
  const [accent, setAccent] = useState("sky-blue");
  const [font, setFont] = useState("inter");

  // 🔹 Ref
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
        } else if (docSnap.error) {
          throw docSnap.error;
        } else {
          throw { code: "auth/user-not-found" };
        }
      } catch (error) {
        let errorMsg = "Unknown error";
        if (error?.message) {
          errorMsg = error.message;
        } else if (error?.code) {
          errorMsg = error.code;
        } else if (typeof error === "string") {
          errorMsg = error;
        } else {
          errorMsg = `Error: ${JSON.stringify(error)}`;
        }
        console.error("🔥 Error fetching user data:", errorMsg);
        localStorage.removeItem("isLogged");
        localStorage.removeItem("userDt");
        setIsLogged(false);
        setUserDt({});
        setWorkspace([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // ------------------------------
  // ✅ Get Current User Setting
  // -------------------------------
  useLayoutEffect(() => {
    let themeId = localStorage.getItem("themeId") || "dark";
    let accentId = localStorage.getItem("accentId") || "sky-blue";
    let fontId = localStorage.getItem("fontId") || "inter";

    const root = document.documentElement;

    root.dataset.accentId = themeId;
    root.classList.add(themeId);
    localStorage.setItem("themeId", themeId);

    root.dataset.accentId = accentId;
    root.classList.add(accentId);
    localStorage.setItem("accentId", accentId);

    root.dataset.accentId = fontId;
    root.classList.add(fontId);
    localStorage.setItem("fontId", fontId);

    setTheme(themeId);
    setAccent(accentId);
    setFont(fontId);
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
    settingsdt: {
      theme,
      setTheme,
      accent,
      setAccent,
      font,
      setFont,
    },
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
