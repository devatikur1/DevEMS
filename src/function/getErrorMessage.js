// 🔐 Centralized Auth Error Message Resolver
export function getErrorMessage(error) {
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
    "auth/email-already-in-use": "Email already exists. Please log in instead.",
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
    "auth/multi-factor-auth-required": "Multi-factor authentication required.",
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
  };

  return (
    AUTH_ERROR_MESSAGE_MAP[code] || "Authentication failed. Please try again."
  );
}
