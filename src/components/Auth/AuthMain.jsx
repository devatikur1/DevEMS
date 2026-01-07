import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import RoleSelector from "./AuthMain/RoleSelector";
import LoginMethods from "./AuthMain/LoginMethods";
import EmailMethod from "./AuthMain/EmailMethod";
import AuthError from "./AuthMain/AuthError";
import useAuthProvider from "../../hooks/useAuthProvider";

export default function AuthMain({ IsSignIn }) {
  // 🔹 Cutom Hooks
  const providerSign = useAuthProvider();

  // 🔹 React-Router-Dom && State
  const [searchParams] = useSearchParams();
  const [role, setRole] = useState("");
  const [authError, setAuthError] = useState({
    status: false,
    text: "",
  });

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
              <RoleSelector role={role} setRole={setRole} />
            ) : (
              <>
                {searchParams.get("method") === "email" ? (
                  <EmailMethod
                    IsSignIn={IsSignIn}
                    authError={authError}
                    setAuthError={setAuthError}
                    providerSign={providerSign}
                  />
                ) : (
                  <LoginMethods
                    IsSignIn={IsSignIn}
                    role={role}
                    setAuthError={setAuthError}
                    providerSign={providerSign}
                  />
                )}
              </>
            )}
          </AnimatePresence>
        </motion.main>
      </AnimatePresence>

      {/* Auth Error Section */}
      {searchParams.get("role") !== null &&
        searchParams.get("method") !== "email" && (
          <AuthError authError={authError} />
        )}
    </>
  );
}
