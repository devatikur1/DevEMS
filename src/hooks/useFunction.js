import { doc, getDoc, where } from "firebase/firestore";
import { db } from "../context/AppContext";
import useFirestore from "./useFirestore";

export default function useFunction() {
  const { getCount } = useFirestore();
  // 🔹 password Validation
  function passValidation(pass) {
    if (!pass) return false;
    if (pass.length < 8) return false;
    if (!/[A-Z]/.test(pass)) return false;
    if (!/[a-z]/.test(pass)) return false;
    if (!/[0-9]/.test(pass)) return false;
    if (!/[^a-zA-Z0-9]/.test(pass)) return false;
    return true;
  }

  // 🔹 Unique Username (Gen/Find)
  async function uniUsername({ type, baseName }) {
    let username = baseName;
    let exists = true;
    let counter = 0;

    if (type === "gen") {
      while (exists) {
        const usersDoc = await getDoc(doc(db, "username", username));
        if (usersDoc.exists()) {
          counter++;
          username = `${baseName}${counter}`;
          exists = true;
        } else {
          exists = false;
        }
      }
      return username;
    } else {
      const usersDoc = await getDoc(doc(db, "username", username));
      if (usersDoc.exists()) {
        return false;
      }
      return true;
    }
  }

  // 🔹 Unique Uid (Gen/Find)
  function genEmailbaseUid(email) {
    const LId = "3c3f3o3b38373p3b";
    const MId = email.split("@")[1].split(".")[0];
    const FId = email.split("@")[0];
    return `${FId}-${MId}-${LId}`;
  }

  // 🔹 Gen ID
  function genUniId() {
    if (crypto?.randomUUID) {
      return crypto.randomUUID();
    }

    return (
      Date.now().toString(36) +
      "-" +
      Math.random().toString(36).substr(4, 9) +
      "-" +
      Math.random().toString(36).substr(4, 9) +
      "-" +
      Date.now().toString(36)
    );
  }

  // 🔹 Unique WS-ID (Gen/Find)
  async function genWSID() {
    let id = genUniId();
    let isUnique = false;

    let attempts = 0;

    while (!isUnique && attempts < 5) {
      try {
        const { status, count } = await getCount({
          collId: "workspaces",
          whereQuery: [where("id", "==", id)],
        });

        if (status && count === 0) {
          isUnique = true;
        } else {
          id = genUniId();
          attempts++;
        }
      } catch (error) {
        console.error("ID validation failed:", error);
        break;
      }
    }

    return id;
  }

  // 🔹 Get Member Level
  const getMemberLevel = (count) => {
    if (count === "Unlimited") {
      return "High";
    } else {
      const members = Number(count);
      if (members >= 20) return "High";
      if (members >= 10) return "Medium";
      return "Low";
    }
  };

  // 🔹 Params Url
  function paramsUrl({ type, get, set, key, value }) {
    const params = new URLSearchParams(get);
    if (type === "del") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    set(params);
  }

  //🔹 Auth Error Message
  function getErrMsg(error) {
    const code = typeof error === "string" ? error : error?.code;

    const AUTH_ERROR_MESSAGE_MAP = {
      // 🔐 Credentials / Login
      "auth/user-not-found": "Invalid email or password.",
      "auth/wrong-password": "Invalid email or password.",
      "auth/invalid-credential": "Invalid login credentials.",
      "auth/user-disabled": "This account has been disabled.",
      "auth/user-token-expired": "Session expired. Please log in again.",
      "auth/requires-recent-login": "Please re-login to continue.",

      // 📧 Email
      "auth/invalid-email": "Please enter a valid email address.",
      "auth/email-already-in-use":
        "Email already exists. Please log in instead.",
      "auth/unverified-email": "Please verify your email first.",

      // 🔑 Password
      "auth/weak-password": "Password is too weak. Use a stronger password.",
      "auth/missing-password": "Password is required.",

      // 🌐 Network / System
      "auth/network-request-failed":
        "Network error. Please check your internet connection.",
      "auth/internal-error": "Something went wrong. Please try again later.",
      "auth/timeout": "Request timed out. Please try again.",
      "auth/quota-exceeded":
        "Service temporarily unavailable. Please try again later.",

      // 🪟 Popup / OAuth
      "auth/popup-closed-by-user": "Login window was closed.",
      "auth/popup-blocked": "Popup blocked by browser. Please allow popups.",
      "auth/cancelled-popup-request": "Login request cancelled.",
      "auth/account-exists-with-different-credential":
        "An account already exists with a different login method.",
      "auth/provider-already-linked":
        "This provider is already linked to your account.",

      // 🧠 MFA
      "auth/multi-factor-auth-required":
        "Multi-factor authentication required.",
      "auth/invalid-multi-factor-session":
        "Invalid authentication session. Please try again.",

      // 🚫 Permissions / Config
      "auth/operation-not-allowed": "This login method is not enabled.",
      "auth/unauthorized-domain": "This domain is not authorized.",
      "auth/app-not-authorized":
        "This app is not authorized to use Firebase Authentication.",

      // ⏳ Rate limit
      "auth/too-many-requests":
        "Too many attempts. Please wait and try again later.",

      // 🔧 Custom Errors
      "custom/role-mismatch": "Account exists but role does not match.",
      "custom/unknown-provider": "Unknown login provider.",
      "custom/invalid-input": "Invalid email or password.",
      "custom/image-not-select": "Please select an image",
      "custom/image-upload-failed": "Image upload failed",
      "custom/email-not-type": "Please enter your email address.",
      "custom/user-not-found":
        "Email not found. Please create an account first.",
    };

    return AUTH_ERROR_MESSAGE_MAP[code] || "Failed! Please try again.";
  }

  //🔹 Upload Image Fn
  async function uploadImageFn(file) {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const apiKey = process.env.REACT_APP_IMGBB_KEY;

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        },
      );

      const resData = await response.json();

      if (resData.data.display_url) {
        return { isError: false, url: resData.data.display_url };
      } else {
        return { isError: true, msg: "custom/image-upload-failed" };
      }
    } catch (error) {
      console.log(Object.value(error));
      console.error(error);

      return { isError: true, msg: error };
    }
  }

  return {
    passValidation: passValidation,
    paramsUrl: paramsUrl,
    uniUsername: uniUsername,
    getErrMsg: getErrMsg,
    uploadImageFn: uploadImageFn,
    genEmailbaseUid: genEmailbaseUid,
    genWSID: genWSID,
    getMemberLevel: getMemberLevel,
  };
}
