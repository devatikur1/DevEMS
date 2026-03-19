/* eslint-disable no-throw-literal */

import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useCallback, useContext, useState } from "react";
import { AppContext, auth } from "../context/AppContext";
import useFirestore from "./useFirestore";
import useFunction from "./useFunction";
import { where } from "firebase/firestore";

function useAuthProvider(setAuthMsg) {
  // 🔹 Context & Hooks
  const { authId } = useContext(AppContext);
  const { setIsLogged, setUserDt } = authId;
  const { setData, getData, getCount } = useFirestore();
  const { getErrMsg, uniUsername, genEmailbaseUid } = useFunction();

  // 🔹 State & Ref
  const [lodingitem, setLodingItem] = useState(null);

  // 🔹 Login / Signup Function
  const authSign = useCallback(
    async ({ id, IsSignIn, role, formData }) => {
      try {
        setLodingItem(id);
        setAuthMsg({ status: false, text: "", type: "suc" });

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
                formData?.email,
                formData?.password,
              )
            : await createUserWithEmailAndPassword(
                auth,
                formData?.email,
                formData?.password,
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

        // -------------------------
        // 🔹 Check Firestore user
        // -------------------------

        const user = userResult.user;

        const userDoc = await getData({
          collId: "users",
          docId: genEmailbaseUid(user.email),
        });

        if (IsSignIn) {
          if (!userDoc.status) throw { code: "auth/user-not-found" };
          if (userDoc.data.role !== role)
            throw { code: "custom/role-mismatch" };
          finalUserData = userDoc.data;
        } else {
          if (userDoc.status) throw { code: "auth/email-already-in-use" };

          const username =
            id === "email_auth"
              ? formData?.username.trim()
              : await uniUsername({
                  type: "gen",
                  baseName: `@${user.email.split("@")[0].toLowerCase()}`,
                });

          finalUserData = {
            uid: genEmailbaseUid(user.email),
            role,
            username: `@${username.replace(/@/gm, "")}`,
            email: user.email,
            name: formData?.name.trim() || user.displayName || "User",
            photoURL: formData?.photoURL.trim() || user.photoURL || "",
            emailVerified: user.emailVerified,
            createdAt: new Date(),
          };

          await setData({
            collId: "users",
            docId: finalUserData?.uid,
            data: finalUserData,
          });
          await setData({
            collId: "username",
            docId: finalUserData?.username,
            data: { email: user.email, uid: finalUserData?.uid },
          });
        }

        localStorage.setItem("userDt", JSON.stringify(finalUserData));
        localStorage.setItem("isLogged", "true");
        setUserDt(finalUserData);
        setIsLogged(true);
      } catch (error) {
        setAuthMsg({ status: true, text: getErrMsg(error), type: "err" });
      } finally {
        setTimeout(() => setLodingItem(null), 300);
      }
    },
    [
      genEmailbaseUid,
      getData,
      getErrMsg,
      setAuthMsg,
      setData,
      setIsLogged,
      setUserDt,
      uniUsername,
    ],
  );

  // 🔹 Login Forgot Password  Function
  const forgotPass = useCallback(
    async (email) => {
      setAuthMsg({ status: false, text: "", type: "suc" });
      try {
        if (!email) throw { code: "custom/email-not-type" };
        const { status, count } = await getCount({
          collId: "users",
          whereQuery: [
            where("disable", "==", false),
            where("email", "==", email),
          ],
        });
        if (status && count === 1) {
          await sendPasswordResetEmail(auth, email);
          setAuthMsg({
            status: true,
            type: "warn",
            text: "We’ve sent a password reset link to your email. Check your inbox — and don’t forget to look in Spam or Promotions.",
          });
        } else  throw { code: "custom/user-not-found" };
      } catch (error) {
        setAuthMsg({ status: true, text: getErrMsg(error), type: "err" });
      }
    },
    [getCount, getErrMsg, setAuthMsg],
  );

  // 🔹 Log Out Function
  const logOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("isLogged");
      localStorage.removeItem("userDt");
      setIsLogged(false);
      setUserDt({});
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return { lodingitem, authSign, forgotPass, logOut };
}

export default useAuthProvider;
