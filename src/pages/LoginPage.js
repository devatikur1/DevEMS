import React, { useEffect, useRef, useState } from "react";
import google from "../assets/google.png";
import { auth, db } from "../context/AppContext";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { AlertCircle, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

export default function LoginPage() {
  // 🔹 useContext context
  const { authId } = useContext(AppContext);
  const { isLogged, setIsLogged, userDt, setUserDt } = authId;

  // 🔹 Ref & Navigate
  const container = useRef(null);
  const navigate = useNavigate();

  // 🔹 Google Provider
  const googleProvider = new GoogleAuthProvider();

  // 🔹 State
  const [role, setRole] = useState("");
  const [showGoogleLoginBtn, setShowGoogleLoginBtn] = useState(false);
  const [googleAuthDataColltextinggg, setGoogleAuthDataColltextinggg] =
    useState(false);
  const [googleAuthDataError, setGoogleAuthDataError] = useState({
    status: false,
    text: "",
  });

  // ---------------------
  // ✅ Check isLogged
  // ---------------------
  useEffect(() => {
    if (isLogged === true) {
      navigate(`/${userDt.username}`);
    }
  }, [isLogged, navigate, userDt.username]);

  // ---------------------
  // ✅ Google Login
  // ---------------------
  async function CollectGoogleAuthData() {
    try {
      setGoogleAuthDataError({
        status: false,
        text: "",
      });
      setGoogleAuthDataColltextinggg(true);

      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const docSnap = await getDoc(doc(db, "users", user.uid));

      if (docSnap.exists()) {
        let data = docSnap.data();
        localStorage.setItem("isLogged", "true");
        localStorage.setItem("userDt", JSON.stringify(data));
        setUserDt(data);
      } else {
        let data = {
          name: user.displayName,
          username: `@${user.email.split("@")[0].toLocaleLowerCase()}`,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
          emailVerified: user.emailVerified,
          role: role,
        };
        await setDoc(
          doc(
            db,
            "username",
            `@${user.email.split("@")[0].toLocaleLowerCase()}`
          ),
          { uid: user.uid },
          { merge: true }
        );
        await setDoc(doc(db, "users", user.uid), data, { merge: true });
        localStorage.setItem("isLogged", "true");
        localStorage.setItem("userDt", JSON.stringify(data));
        setUserDt(data);
      }

      setIsLogged(true);
    } catch (error) {
      const errorCode = error.code;
      let customMessage = "";

      switch (errorCode) {
        case "auth/popup-closed-by-user":
          customMessage = "Login window closed. Please try again.";
          break;
        case "auth/network-request-failed":
          customMessage = "Network error. Check your internet connection.";
          break;
        case "auth/cancelled-popup-request":
          customMessage = "Multiple popups opened. Please wait.";
          break;
        case "auth/popup-blocked":
          customMessage = "Popup blocked! Please allow popups for this site.";
          break;
        default:
          customMessage = "Login failed. Something went wrong.";
      }

      setGoogleAuthDataError({
        status: true,
        text: customMessage,
      });
    } finally {
      setGoogleAuthDataColltextinggg(false);
    }
  }

  // ---------------------
  // ✅ Render
  // ---------------------
  return (
    <div
      ref={container}
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(159, 159, 169, 0.4) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
      }}
      className="relative h-screen overflow-y-auto flex justify-center items-center select-none *:select-none animate-bg-dots"
    >
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{
            duration: 0.4,
          }}
          className="min-w-[95%] md:min-w-[400px] flex flex-col gap-4 items-center justify-center bg-surface border border-border rounded-lg mx-8 px-11 py-9"
        >
          <h2 className="text-[1.7rem] font-bold ">Login</h2>
          <div className="flex flex-col items-center justify-center gap-5 select-none *:select-none mt-5">
            <AnimatePresence>
              {showGoogleLoginBtn === false && (
                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, overflow: "hidden", height: 0 }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="flex flex-col gap-7"
                >
                  <article className="flex justify-center items-center gap-5">
                    <div
                      onClick={() => setRole("admin")}
                      className={clsx(
                        "border border-border rounded-md transition-all duration-300 px-5 py-3 text-[0.9rem]",
                        role === "admin"
                          ? "bg-accent/80 hover:bg-accent"
                          : "bg-black/80 hover:bg-hover"
                      )}
                    >
                      Admin
                    </div>
                    <div
                      onClick={() => setRole("employee")}
                      className={clsx(
                        "border border-border rounded-md transition-all duration-300 px-5 py-3 text-[0.9rem]",
                        role === "employee"
                          ? "bg-accent/80 hover:bg-accent"
                          : "bg-black/80 hover:bg-hover"
                      )}
                    >
                      Employee
                    </div>
                  </article>
                  <article className="flex flex-col justify-center items-center">
                    <button
                      disabled={role === ""}
                      onClick={() => {
                        if (role !== "") {
                          setShowGoogleLoginBtn(true);
                        }
                      }}
                      className="bg-accentA/80 border border-accent/70 rounded-xl px-5 py-2 text-[0.81rem] font-normal disabled:opacity-50 disabled:pointer-events-none"
                    >
                      Set Role
                    </button>
                    <p className="mt-8 rounded-lg border border-warning/40 bg-warning/10 px-4 py-2 text-[0.68rem] text-warning backdrop-blur-md">
                      ⚠ Please note: once this is set, it cannot be changed
                      later.
                    </p>
                  </article>
                </motion.section>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showGoogleLoginBtn === true && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: 0.3,
                    duration: 0.2,
                  }}
                  onClick={async () => await CollectGoogleAuthData()}
                  className="min-w-[300px] flex justify-center items-center gap-3 bg-bg/70 duration-300 transition-all hover:bg-hover border border-border rounded-full px-6 p-2"
                >
                  {googleAuthDataColltextinggg ? (
                    <Loader2 className="animate-spin" size={21.5} />
                  ) : (
                    <>
                      <img className="w-5 h-5" src={google} alt="google" />
                      <span className="font-light text-subtext text-[0.94rem]">
                        Register with Google
                      </span>
                    </>
                  )}
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {googleAuthDataError.status && (
              <motion.div
                initial={{ opacity: 0, x: 0, scale: 0.95 }}
                animate={{ opacity: 1, x: [0, -10, 10, -10, 10, 0], scale: 1 }}
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
                className="max-w-[300px] mt-2 flex items-start gap-3 border border-error/40 bg-error/20 backdrop-blur-md rounded-xl px-4 py-3 text-error/85"
              >
                <AlertCircle className="shrink-0 mt-0.5" size={18} />
                <div className="flex flex-col gap-0.5">
                  <p className="text-[0.85rem] font-semibold uppercase tracking-wider">
                    Error
                  </p>
                  <p className="text-[0.82rem] leading-tight text-red-200/80 line-clamp-2">
                    {googleAuthDataError.text ||
                      "Something went wrong. Please try again."}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
