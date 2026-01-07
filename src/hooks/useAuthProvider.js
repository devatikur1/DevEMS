import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useCallback, useState } from "react";
import { auth } from "../context/AppContext";
import { generateUniqueUsername } from "../function/generateUniqueUsername";
import useFirestore from "./useFirestore";

function useAuthProvider() {
  // 🔹 Sate && Cutom Hook
  const [lodingitem, setLodingItem] = useState(null);
  const [setData, getData] = useFirestore();

  // 🔹 Login Fn
  const authSign = useCallback(
    async (id, IsSignIn, role, formData, pass) => {
      try {
        // 🔹 Provider
        const googleProvider = new GoogleAuthProvider();
        const githubProvider = new GithubAuthProvider();
        githubProvider.addScope("user:email");
        const facebookAuthProvider = new FacebookAuthProvider();

        let provider;
        switch (id) {
          case "google":
            provider = googleProvider;
            break;

          case "github":
            provider = githubProvider;
            break;

          case "facebook":
            provider = facebookAuthProvider;
            break;

          case "email_auth":
            (async () => {
              try {
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
                  if (!userDoc.status) {
                    return {
                      status: false,
                      data: null,
                      text: "User data not found",
                    };
                  }

                  return {
                    status: true,
                    data: userDoc.data,
                    text: "",
                  };
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

                  return {
                    status: true,
                    data: newUserData,
                    text: "",
                  };
                }
              } catch (error) {
                return {
                  status: false,
                  data: null,
                  text: "Failed to save user data",
                };
              }
            })();
            break;

          default:
            return { status: false, data: null, text: "Unknown provider" };
        }

        console.log("cccc");

        // 🔹 Login Base on Provider
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log(user);

        // 🔹 eta jodi SignIn hoy true
        if (IsSignIn) {
          const docSnap = await getData({
            collId: "users",
            docId: user.email,
          });

          if (docSnap.status && docSnap.data?.role === role) {
            const data = docSnap?.data;
            localStorage.setItem("isLogged", "true");
            localStorage.setItem("userDt", JSON.stringify(data));
            return {
              status: true,
              data: data,
              text: "",
            };
          } else {
            return {
              status: false,
              data: null,
              text: "No account found. Please sign up before logging in.",
            };
          }
        } else {
          (async () => {
            const username = await generateUniqueUsername(
              `@${user.email.split("@")[0]}`
            );
            const newUserData = {
              role: role,
              username,
              email: user.email,
              name: user.displayName,
              photoURL: user.photoURL,
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

            return {
              status: true,
              data: newUserData,
              text: "",
            };
          })();
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

        return {
          status: false,
          data: null,
          text: customMessage,
        };
      }
    },
    [getData, setData]
  );

  return [lodingitem, setLodingItem, authSign];
}

export default useAuthProvider;
