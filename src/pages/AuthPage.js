import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { AlertCircle, LayoutDashboard } from "lucide-react"; // Added LayoutDashboard icon
import { AnimatePresence, motion } from "framer-motion";
import useAuthProvider from "../hooks/useAuthProvider";
import AuthMain from "../components/Auth/AuthMain";

export default function AuthPage({ IsSignIn }) {
  // 🔹 useContext context
  const { authId } = useContext(AppContext);
  const { isLogged, userDt } = authId;

  // 🔹 Navigate
  const navigate = useNavigate();

  // 🔹 Hooks
  const providerSign = useAuthProvider();
  const [authError, setAuthError] = useState({
    status: false,
    text: "",
  });

  // -----------------------------
  // ✅ Change Title base on Load
  // ----------------------------
  useEffect(() => {
    document.title = "Employee Management - Login";
  }, []);

  // ---------------------
  // ✅ Check isLogged
  // ---------------------
  useEffect(() => {
    if (isLogged === true) {
      navigate(`/${userDt?.username}`);
    }
  }, [isLogged, navigate, userDt?.username]);

  // ---------------------
  // ✅ Render
  // ---------------------
  return (
    <aside className="relative h-screen w-full overflow-hidden flex justify-center items-center bg-bg text-text">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />
      </div>

      <AnimatePresence>
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-20 w-full hover:shadow-2xl shadow-black/50 duration-500 max-w-[420px] mx-4 flex flex-col gap-6 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-8"
        >
          {/* Header Section */}
          <header className="flex flex-col items-center gap-4 text-center">
            <div className="p-3 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-xl shadow-lg shadow-blue-500/20">
              <LayoutDashboard size={28} className="text-text" />
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                DevEMS
              </h1>
              <p className="text-sm text-zinc-400 font-medium">
                Employee Management System
              </p>
            </div>
          </header>

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <h2 className="text-lg font-semibold text-center text-zinc-200">
            {IsSignIn ? "Welcome Back" : "Create Account"}
          </h2>

          <AuthMain
            IsSignIn={IsSignIn}
            setAuthError={setAuthError}
            providerSign={providerSign}
          />

          <AnimatePresence>
            {authError.status && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-200"
              >
                <AlertCircle className="shrink-0 mt-0.5" size={16} />
                <p className="text-xs font-medium leading-relaxed">
                  {authError.text}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer Section */}
          <footer className="pt-2 text-center">
            <p className="text-sm text-zinc-500">
              {IsSignIn ? "New to the platform?" : "Already have an account?"}{" "}
              <Link
                to={IsSignIn ? "/sign-up" : "/sign-in"}
                className="text-white hover:text-blue-400 font-medium transition-colors duration-200"
              >
                {IsSignIn ? "Create account" : "Sign in"}
              </Link>
            </p>
          </footer>
        </motion.article>
      </AnimatePresence>
    </aside>
  );
}
