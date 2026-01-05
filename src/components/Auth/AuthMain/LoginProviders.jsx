import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Facebook, Loader2, Mail } from "lucide-react";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { AppContext } from "../../../context/AppContext";

export default function LoginProviders({
  providerSign,
  IsSignIn,
  setAuthError,
  setSearchParams,
}) {
  // 🔹 useContext context
  const { authId } = useContext(AppContext);
  const { setIsLogged, setUserDt } = authId;

  // 🔹 Cutom Hook
  const [lodingitem, setLodingItem, signIn] = providerSign;

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
                setSearchParams({ method: "email" });
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
            className="min-w-full flex justify-center items-center gap-3 bg-bg/70 duration-300 transition-all hover:bg-hover border border-border rounded-full px-6 p-2"
          >
            {lodingitem === id ? (
              <Loader2 className="animate-spin" size={21.5} />
            ) : (
              <>
                <Icon fontSize="medium" />
                <span className="font-light text-subtext text-[0.94rem]">
                  {label}
                </span>
              </>
            )}
          </motion.button>
          {id === "email" && (
            <div className="w-full max-w-[90%] px-7 py-1">
              <hr className="h-[1px] bg-border/80 border-none w-full" />
            </div>
          )}
        </>
      ))}
    </>
  );
}
