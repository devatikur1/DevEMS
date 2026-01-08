/* eslint-disable no-throw-literal */

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
import { getErrorMessage } from "../function/getErrorMessage";

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
          if (!formData?.email || !formData?.password) {
            throw { code: "custom/invalid-input" };
          }
          userResult = IsSignIn
            ? await signInWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
              )
            : await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
              );
        } else {
          // ------------------------
          // 🔹 SOCIAL AUTH
          // ------------------------
          const PROVIDERS = {
            google: new GoogleAuthProvider(),
            github: new GithubAuthProvider(),
            facebook: new FacebookAuthProvider(),
          };

          const provider = PROVIDERS[id];
          if (!provider) throw { code: "custom/unknown-provider" };

          userResult = await signInWithPopup(auth, provider);
        }

        const user = userResult.user;

        // -------------------------
        // 🔹 Check Firestore user
        // -------------------------
        const userDoc = await getData({ collId: "users", docId: user.email });

        if (IsSignIn) {
          if (!userDoc.status) throw { code: "auth/user-not-found" };
          if (userDoc.status && userDoc.data.role !== role)
            throw { code: "custom/role-mismatch" };

          finalUserData = userDoc.data;
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
        // 🔹 Persist Session
        // ------------------------
        localStorage.setItem("userDt", JSON.stringify(finalUserData));
        localStorage.setItem("isLogged", "true");
        setUserDt(finalUserData);
        setIsLogged(true);
      } catch (error) {
        setAuthError({ status: true, text: getErrorMessage(error) });
      } finally {
        setTimeout(() => setLodingItem(null), 300);
      }
    },
    [getData, setData, setIsLogged, setUserDt]
  );

  return [lodingitem, authSign];
}

export default useAuthProvider;
