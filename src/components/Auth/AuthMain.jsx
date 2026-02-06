import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import RoleSelector from "./AuthMain/RoleSelector";
import LoginMethods from "./AuthMain/LoginMethods";
import EmailMethod from "./AuthMain/EmailMethod";
import useAuthProvider from "../../hooks/useAuthProvider";
import Msg from "../custom/Msg";

export default function AuthMain({ IsSignIn }) {
  // 🔹 React-Router-Dom && State
  const [searchParams] = useSearchParams();
  const [role, setRole] = useState(searchParams.get("role") || "");
  const [authMsg, setAuthMsg] = useState({
    status: false,
    text: "",
    type: "suc",
  });

  // 🔹 Cutom Hooks
  const providerSign = useAuthProvider(setAuthMsg);

  // -------------------------------
  // ✅ set AuthError base on Load
  // ------------------------------
  useEffect(() => {
    setAuthMsg({
      status: false,
      text: "",
      type: "suc",
    });
  }, [IsSignIn]);

  // ---------------------
  // ✅ Render
  // ---------------------
  return (
    <>
      {/* Auth Main Section */}
      <AnimatePresence>
        <motion.main
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="w-full flex flex-col items-center justify-center gap-5 select-none *:select-none"
        >
          <AnimatePresence>
            {searchParams.get("role") === null ? (
              <RoleSelector setRole={setRole} />
            ) : searchParams.get("method") === "email" ? (
              <EmailMethod
                IsSignIn={IsSignIn}
                authMsg={authMsg}
                setAuthMsg={setAuthMsg}
                providerSign={providerSign}
                role={role}
              />
            ) : (
              <LoginMethods
                IsSignIn={IsSignIn}
                role={role}
                providerSign={providerSign}
              />
            )}
          </AnimatePresence>
        </motion.main>
      </AnimatePresence>

      {/* Auth Error Section */}
      {searchParams.get("role") !== null &&
        searchParams.get("method") !== "email" && <Msg msg={authMsg} />}
    </>
  );
}
