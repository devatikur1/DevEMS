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

  // 🔹 State & Custom Hook
  const [lodingitem, setLodingItem] = useState(null);
  const [setData, getData] = useFirestore();

  // 🔹 Login / Signup Function
  const authSign = useCallback(
    async ({ id, IsSignIn, role, formData, setAuthError }) => {
      try {
        setLodingItem(id);
        setAuthError({ status: false, text: "" });

        let userResult;
        let finalUserData;

        // ------------------------
        // 🔹 EMAIL AUTH
        // ------------------------
        if (id === "email_auth") {
          if (!formData?.email || (!IsSignIn && !formData?.password)) {
            throw { code: "custom/invalid-input" };
          }

          if (IsSignIn) {
            userResult = await signInWithEmailAndPassword(
              auth,
              formData.email,
              formData.password
            );
          } else {
            userResult = await createUserWithEmailAndPassword(
              auth,
              formData.email,
              formData.password
            );
          }
        } else {
          // ------------------------
          // 🔹 SOCIAL PROVIDERS
          // ------------------------
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
              throw { code: "custom/unknown-provider" };
          }

          userResult = await signInWithPopup(auth, provider);
        }

        const user = userResult.user;

        // ------------------------
        // 🔹 Check Firestore user
        // ------------------------
        const userDoc = await getData({ collId: "users", docId: user.email });

        if (IsSignIn) {
          if (userDoc.status && userDoc.data.role === role) {
            finalUserData = userDoc.data;
          } else if (userDoc.status) {
            throw { code: "custom/role-mismatch" };
          } else {
            throw { code: "auth/user-not-found" };
          }
        } else {
          if (userDoc.status) throw { code: "auth/email-already-in-use" };

          const username =
            id === "email_auth"
              ? formData.username
              : await genUniqueUsername(
                  `@${user.email.split("@")[0].toLowerCase()}`
                );

          finalUserData = {
            role,
            username,
            email: user.email,
            name: formData?.name || user.displayName || "User",
            photoURL: formData?.photoURL || user.photoURL || "",
            emailVerified: user.emailVerified,
            createdAt: Date.now(),
          };

          await setData({
            collId: "users",
            docId: user.email,
            data: finalUserData,
          });
          await setData({
            collId: "username",
            docId: username,
            data: { email: user.email },
          });
        }

        // ------------------------
        // 🔹 Set localStorage & Context
        // ------------------------
        localStorage.setItem("isLogged", "true");
        localStorage.setItem("userDt", JSON.stringify(finalUserData));
        setIsLogged(true);
        setUserDt(finalUserData);
      } catch (error) {
        console.error("Auth Error:", error);

        let customMessage = "Something went wrong. Please try again.";

        switch (error.code) {
          case "custom/role-mismatch":
            customMessage = `Account found, but not as a ${role}.`;
            break;
          case "custom/unknown-provider":
            customMessage = "Unknown login provider.";
            break;
          case "custom/invalid-input":
            customMessage = "Invalid email or password.";
            break;
          case "auth/user-not-found":
          case "auth/wrong-password":
            customMessage = "Invalid email or password.";
            break;
          case "auth/email-already-in-use":
            customMessage = "Email already in use. Try logging in.";
            break;
          case "auth/popup-closed-by-user":
            customMessage = "Login window closed.";
            break;
          case "auth/network-request-failed":
            customMessage = "Network error. Check your connection.";
            break;
          default:
            customMessage = error.message || customMessage;
        }

        setAuthError({ status: true, text: customMessage });
      } finally {
        setTimeout(() => setLodingItem(null), 300);
      }
    },
    [getData, setData, setIsLogged, setUserDt]
  );

  return [lodingitem, authSign];
}

export default useAuthProvider;
