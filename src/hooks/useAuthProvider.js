import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useCallback, useState } from "react";
import { auth, db } from "../context/AppContext";
import { doc, getDoc } from "firebase/firestore";

function useAuthProvider() {
  // 🔹 Sate
  const [lodingitem, setLodingItem] = useState(null);

  // 🔹 Main Fn
  const signIn = useCallback(async (id, IsSignIn) => {
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

        default:
          return { status: true, data: null, text: "Unknown provider" };
      }

      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);

      const docSnap = await getDoc(doc(db, "users", user.uid));
      if (docSnap.exists()) {
        const data = docSnap.data();
        localStorage.setItem("isLogged", "true");
        localStorage.setItem("userDt", JSON.stringify(data));
        return {
          status: false,
          data: data,
          text: "",
        };
      } else {
        return {
          status: true,
          data: null,
          text: "No account found. Please sign up before logging in.",
        };
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
        status: true,
        data: null,
        text: customMessage,
      };
    }
  }, []);

  return [lodingitem, setLodingItem, signIn];
}

export default useAuthProvider;
