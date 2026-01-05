import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import SnowflakesAnimation from "../components/Home/Bg";
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
  // ✅ Chage Tilte base on Load
  // ----------------------------
  useEffect(() => {
    document.title = "DevEMS - Login";
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
    <aside className="relative h-full overflow-x-hidden overflow-y-auto flex justify-center items-center select-none *:select-none">
      <article
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 10,
        }}
      >
        <SnowflakesAnimation
          maxSnowflakes={100}
          snowflakeColor={"#fff"}
          backgroundColor={"#000"}
          minSize={7}
          maxSize={12}
          minSpeed={0.02}
          maxSpeed={0.1}
        />
      </article>

      <AnimatePresence>
        <motion.article
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{
            duration: 0.4,
          }}
          className="relative z-20 min-w-[100%] h-screen md:h-auto md:min-w-[500px] flex flex-col gap-4 items-center justify-between md:justify-center bg-surface md:border border-border rounded-lg mx-8 md:px-11 py-9 overflow-x-hidden overflow-y-auto"
        >
          <header className="w-full flex flex-col justify-center items-center gap-8 px-4">
            <div to={"/"} className="min-w-5 min-h-5 md:min-w-6 md:min-h-6">
              <svg
                width="50"
                height="50"
                viewBox="0 0 76 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M38 0L76 65H0L38 0Z" fill="white" />
              </svg>
            </div>

            <h2 className="text-[1.3rem] text-center lg:text-[1.38rem] xl:text-[1.5rem]">
              {IsSignIn ? "Log into your account" : "Create your account"}
            </h2>
          </header>
          <AuthMain
            IsSignIn={IsSignIn}
            setAuthError={setAuthError}
            providerSign={providerSign}
          />
          <AnimatePresence>
            {authError.status && (
              <motion.div
                initial={{ opacity: 0, x: 0, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  x: [0, -10, 10, -10, 10, 0],
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                  overflow: "hidden",
                  scale: 0.95,
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
                className="w-[80%] sm:w-[60%] md:w-[80%] mt-3 flex items-start gap-3 border border-error/40 bg-error/20 backdrop-blur-md rounded-xl px-4 py-3 text-error/85"
              >
                <AlertCircle className="shrink-0 mt-0.5" size={18} />
                <div className="flex flex-col gap-0.5">
                  <p className="text-[0.85rem] font-semibold uppercase tracking-wider">
                    Error
                  </p>
                  <p className="text-[0.82rem] leading-tight text-red-200/80 line-clamp-2">
                    {authError.text}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <footer className="h-[100px] md:h-auto flex justify-center items-end pt-8 md:pt-2">
            <div className="flex justify-center items-center mt-6 gap-2">
              <span className="text-sm text-smtext text-center">
                {IsSignIn
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </span>
              <Link to={IsSignIn ? "/sign-up" : "/sign-in"}>
                <span className="text-sm text-white text-center">
                  {IsSignIn ? "Sign up" : "Sign in"}
                </span>
              </Link>
            </div>{" "}
          </footer>
        </motion.article>
      </AnimatePresence>
    </aside>
  );
}
