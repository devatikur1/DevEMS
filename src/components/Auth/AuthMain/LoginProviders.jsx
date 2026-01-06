import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Facebook, Loader2, Mail } from "lucide-react";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { AppContext } from "../../../context/AppContext";
import { useSearchParams } from "react-router-dom";
import setParamsOnUrl from "../../../function/setParamsOnUrl";

export default function LoginProviders({
  providerSign,
  IsSignIn,
  setAuthError,
}) {
  // 🔹 useContext context
  const { authId } = useContext(AppContext);
  const { setIsLogged, setUserDt } = authId;

  // 🔹 Cutom Hook
  const [lodingitem, setLodingItem, signIn] = providerSign;

  // 🔹 React-Router-Dom
  const [searchParams, setSearchParams] = useSearchParams();

  // ---------------------
  // ✅ Login Providers
  // ---------------------
  const LOGIN_PROVIDERS = [
    {
      id: "email",
      label: `${IsSignIn ? "Login" : "Continue"}  with email`,
      icon: Mail,
    },
    {
      id: "google",
      label: `${IsSignIn ? "Login" : "Continue"}  with Google`,
      icon: GoogleIcon,
    },
    {
      id: "github",
      label: `${IsSignIn ? "Login" : "Continue"}  with Github`,
      icon: GitHubIcon,
    },
    {
      id: "facebook",
      label: `${IsSignIn ? "Login" : "Continue"}  with Facebook`,
      icon: Facebook,
    },
  ];

  // ---------------------
  // ✅ Render
  // ---------------------
  return (
    <>
      {LOGIN_PROVIDERS.map(({ id, label, icon: Icon }) => (
        <>
          <motion.button
            key={id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.3,
              duration: 0.2,
            }}
            onClick={() => {
              if (id === "email") {
                setParamsOnUrl({
                  get: searchParams,
                  set: setSearchParams,
                  key: "method",
                  value: "email",
                });
              } else {
                (async () => {
                  setLodingItem(id);
                  const { status, data, text } = await signIn(id, IsSignIn);
                  if (status === false) {
                    setUserDt(data);
                    setIsLogged(true);
                    setAuthError({
                      status: false,
                      text,
                    });
                  } else {
                    setUserDt(null);
                    setIsLogged(false);
                    setAuthError({
                      status: true,
                      text,
                    });
                  }
                  setTimeout(() => {
                    setLodingItem(null);
                  }, 300);
                })();
              }
            }}
            className={`group w-full flex justify-center items-center gap-3 bg-surfaceSoft/60 hover:bg-surfaceHard/70 active:scale-[0.98] transition-all duration-200 border border-border/85 hover:border-border rounded-xl px-4 py-3 ${
              id === "email"
             && "mt-9"}`}
          >
            {lodingitem === id ? (
              <Loader2 className="animate-spin text-textPrimary" size={20} />
            ) : (
              <>
                <div className="text-textPrimary group-hover:text-textPrimary transition-colors">
                  <Icon fontSize="small" className="w-5 h-5" />
                </div>
                <span className="font-medium text-sm text-textPrimary/85 group-hover:text-textPrimary transition-colors">
                  {label}
                </span>
              </>
            )}
          </motion.button>
          {id === "email" && (
            <div className="w-full flex items-center gap-4 px-2 py-1">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent  via-border to-transparent" />
              <span className="text-xs font-medium text-textMuted/95 uppercase tracking-wider">
                Or continue with
              </span>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>
          )}
        </>
      ))}
    </>
  );
}
