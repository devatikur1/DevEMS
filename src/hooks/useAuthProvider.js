import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useCallback, useContext, useState } from "react";
import { AppContext, auth } from "../context/AppContext";
import { genUniqueUsername } from "../function/genUniqueUsername";
import useFirestore from "./useFirestore";

function useAuthProvider() {
  // 🔹 useContext context
  const { authId } = useContext(AppContext);
  const { setIsLogged, setUserDt } = authId;

  // 🔹 Sate && Cutom Hook
  const [lodingitem, setLodingItem] = useState(null);
  const [setData, getData] = useFirestore();

  // 🔹 Login Fn
  const authSign = useCallback(
    async ({ id, IsSignIn, role, formData, setAuthError }) => {
      try {
        setLodingItem(id);
        setAuthError({ status: false, text: "" });


        // 🔹 EMAIL AUTH
        if (id === "email_auth") {
          if (IsSignIn) {
             await signInWithEmailAndPassword(
              auth,
              formData.email,
              formData.password
            );
            const userDoc = await getData({
              collId: "users",
              docId: formData.email,
            });
            if (userDoc.status && userDoc.data.role === role) {
              localStorage.setItem("isLogged", "true");
              localStorage.setItem("userDt", JSON.stringify(userDoc.data));
              setIsLogged(true);
              setUserDt(userDoc.data);
              setAuthError({
                status: false,
                text: "",
              });
            } else {
              setAuthError({
                status: true,
                text: "No account found. Please sign up before logging in.",
              });
            }
          } else {
            const result = await createUserWithEmailAndPassword(
              auth,
              formData.email,
              formData.password
            );
            const newUserData = {
              role: role,
              username: formData.username,
              email: formData.email,
              name: formData.name,
              photoURL: formData.photoURL,
              emailVerified: result.user.emailVerified,
              createdAt: Date.now(),
            };
            await setData({
              collId: "users",
              docId: formData.email,
              data: newUserData,
            });
            await setData({
              collId: "username",
              docId: formData.username,
              data: {
                email: formData.email,
              },
            });
            localStorage.setItem("isLogged", "true");
            localStorage.setItem("userDt", JSON.stringify(newUserData));

            setIsLogged(true);
            setUserDt(newUserData);
            setAuthError({
              status: false,
              text: "",
            });
          }
        } else {
          
          // 🔹 SOCIAL PROVIDERS
          let provider;
          switch (id) {
            case "google":
              provider = new GoogleAuthProvider();
              break;

            case "github":
              provider = new GithubAuthProvider();
              break;

            case "facebook":
              provider = new FacebookAuthProvider();
              break;

            default:
              setAuthError({
                status: true,
                text: "Unknown provider",
              });
              return;
          }

          // 🔹 Login Base on Provider
          const result = await signInWithPopup(auth, provider);
          const user = result.user;
          console.log(user);

          if (IsSignIn) {
            const docSnap = await getData({
              collId: "users",
              docId: user.email,
            });

            if (docSnap.status && docSnap.data.role === role) {
              const data = docSnap.data;
              localStorage.setItem("isLogged", "true");
              localStorage.setItem("userDt", JSON.stringify(data));
              setIsLogged(true);
              setUserDt(data);
              setAuthError({
                status: false,
                text: "",
              });
            } else {
              setAuthError({
                status: true,
                text: "No account found. Please sign up before logging in.",
              });
            }
          } else {
            const username = await genUniqueUsername(
              `@${user.email.split("@")[0].toLocaleLowerCase()}`
            );
            const newUserData = {
              role: role,
              username,
              email: user.email,
              name: user.displayName || "",
              photoURL: user.photoURL || "",
              emailVerified: user.emailVerified,
              createdAt: Date.now(),
            };

            await setData({
              collId: "users",
              docId: user.email,
              data: newUserData,
            });

            await setData({
              collId: "username",
              docId: username,
              data: {
                email: user.email,
              },
            });

            localStorage.setItem("isLogged", "true");
            localStorage.setItem("userDt", JSON.stringify(newUserData));

            setIsLogged(true);
            setUserDt(newUserData);
            setAuthError({
              status: false,
              text: "",
            });
          }
        }
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

        setAuthError({
          status: true,
          text: customMessage,
        });
      } finally {
        setTimeout(() => {
          setLodingItem(null);
        }, 300);
      }
    },
    [getData, setData, setIsLogged, setUserDt]
  );

  return [lodingitem, authSign];
}

export default useAuthProvider;
