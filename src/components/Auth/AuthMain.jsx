import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoginProviders from "./AuthMain/LoginProviders";
import { useSearchParams } from "react-router-dom";
import EmailMethod from "./AuthMain/EmailMethod";
import RoleSelector from "./AuthMain/RoleSelector";

export default function AuthMain({ providerSign, IsSignIn, setAuthError }) {
  // 🔹 React-Router-Dom && State
  const [searchParams, setSearchParams] = useSearchParams();
  const [role, setRole] = useState("");

  // ---------------------
  // ✅ Render
  // ---------------------
  return (
    <AnimatePresence>
      <motion.main
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className="w-full flex flex-col items-center justify-center gap-5 select-none *:select-none"
      >
        <AnimatePresence>
          {role === "" ? (
            <RoleSelector role={role} setRole={setRole} />
          ) : (
            <>
              {searchParams.get("method") === "email" ? (
                <EmailMethod
                  IsSignIn={IsSignIn}
                  setAuthError={setAuthError}
                  providerSign={providerSign}
                  setSearchParams={setSearchParams}
                />
              ) : (
                <LoginProviders
                  IsSignIn={IsSignIn}
                  setAuthError={setAuthError}
                  providerSign={providerSign}
                  setSearchParams={setSearchParams}
                />
              )}
            </>
          )}
        </AnimatePresence>
      </motion.main>
    </AnimatePresence>
  );
}
