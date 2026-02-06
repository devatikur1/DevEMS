import React, { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import AuthHeader from "../components/Auth/AuthHeader";
import AuthMain from "../components/Auth/AuthMain";
import AuthFooter from "../components/Auth/AuthFooter";

export default function AuthPage({ IsSignIn }) {
  // 🔹 useContext context
  const { authId } = useContext(AppContext);
  const { isLogged, userDt } = authId;

  // 🔹 Navigate
  const navigate = useNavigate();

  // -----------------------------
  // ✅ Change Title base on Load
  // ----------------------------
  useEffect(() => {
    document.title = IsSignIn
      ? "Sign In to Your Account"
      : "Create a New Account";
  }, [IsSignIn]);

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
    <figure className="relative h-screen overflow-x-hidden overflow-y-auto scrollVeiwNone w-full flex justify-center items-center bg-bg text-text">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple/20 rounded-full blur-[120px]" />
      </div>

      <AnimatePresence>
        <motion.aside
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-20 w-full h-screen md:h-auto hover:shadow-2xl shadow-shadow/50 duration-500 max-w-full md:max-w-[500px] md:mx-4 flex flex-col md:bg-surface/60 backdrop-blur-2xl md:border md:border-border rounded-2xl p-8"
        >
          {/* Header Section */}
          <AuthHeader />

          {/* Divider && Header */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent my-5" />
          <h2 className="text-3xl font-bold text-center tracking-tight text-textPrimary">
            {IsSignIn ? "Welcome Back" : "Create Account"}
          </h2>

          {/* Auth Main &&  Auth Error Section */}
          <AuthMain IsSignIn={IsSignIn} />

          {/* Footer Section */}
          <AuthFooter IsSignIn={IsSignIn} />
        </motion.aside>
      </AnimatePresence>
    </figure>
  );
}
