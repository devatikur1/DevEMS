/* eslint-disable no-throw-literal */
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import delParamsOnUrl from "../../../function/delParamsOnUrl";
import AuthError from "./AuthError";
import UploadImg from "../../custom/UploadImg";
import uploadImageFn from "../../../function/UploadImageFn";
import { getErrorMessage } from "../../../function/getErrorMessage";
import FormInputStyle from "./FormInputStyle";

export default function EmailMethod({
  IsSignIn,
  authError,
  role,
  setAuthError,
  providerSign,
}) {
  // 🔹 Cutom Hook
  const [lodingitem, authSign] = providerSign;

  // 🔹 React-Router-Dom
  const [searchParams, setSearchParams] = useSearchParams();

  //🔹 State
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [imgData, setImgData] = useState({ url: "", file: null });
  const [imgUploading, setImgUploading] = useState(false);
  const [isFormBtnDis, setIsFormBtnDis] = useState(true);
  const [isImageUpBtnDis, setIsImageUpBtnDis] = useState(true);

  const [signUpPart, setSignUpPart] = useState(1);

  // ------------------------------
  // ✅ Form validation
  // ------------------------------
  useEffect(() => {
    const requiredFields = IsSignIn
      ? [email, pass]
      : [username, name, email, pass, photoURL];

    const hasEmpty = requiredFields.some((val) => !val);
    setIsFormBtnDis(hasEmpty || lodingitem === "email_auth");
  }, [IsSignIn, email, lodingitem, name, pass, photoURL, username]);

  useEffect(() => {
    setIsImageUpBtnDis(!imgData.url || imgUploading);
  }, [imgData.url, imgUploading]);

  // ------------------------------
  // ✅ Image upload handler
  // ------------------------------
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!imgData?.file) throw { code: "custom/image-not-select" };

    setImgUploading(true);
    setAuthError({ status: false, text: "" });

    try {
      const imgDt = await uploadImageFn(imgData.file);
      if (imgDt.isError) throw { code: imgDt.msg };
      setPhotoURL(imgDt.url);
    } catch (error) {
      setAuthError({ status: true, text: getErrorMessage(error) });
    } finally {
      setImgUploading(false);
    }
  };

  // ------------------------------
  // ✅ Form submit handler
  // ------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormBtnDis) {
      setAuthError({ status: true, text: "Please fill up the form." });
      return;
    }

    const formData = {
      username: username,
      name: name,
      email: email,
      password: pass,
      photoURL: photoURL,
    };

    await authSign({
      id: "email_auth",
      IsSignIn,
      role,
      formData,
      setAuthError,
    });
  };

  // ---------------------
  // ✅ Render
  // ---------------------
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full flex flex-col gap-6 mt-2"
    >
      <p className="text-xs text-center text-textMuted/95">
        {IsSignIn ? "Sign In" : "Sign Up"} with Email
      </p>

      <form
        onSubmit={(e) => {
          if ((!IsSignIn && photoURL) || IsSignIn) {
            handleSubmit(e);
          } else {
            handleUpload(e);
          }
        }}
        className="flex flex-col gap-4"
      >
        {!IsSignIn && !photoURL && (
          <UploadImg img={imgData} setImg={setImgData} />
        )}

        {((!IsSignIn && photoURL) || IsSignIn) && (
          <>
            <FormInputStyle
              IsSignIn={IsSignIn}
              username={username}
              setUsername={setUsername}
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              pass={pass}
              setPass={setPass}
              confirmPass={confirmPass}
              setConfirmPass={setConfirmPass}
              showPass={showPass}
              setShowPass={setShowPass}
              showConfirmPass={showConfirmPass}
              setShowConfirmPass={setShowConfirmPass}
              signUpPart={signUpPart}
              setSignUpPart={setSignUpPart}
            />

            {IsSignIn && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-xs text-textMuted hover:text-textPrimary/90 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            )}
          </>
        )}

        <AuthError authError={authError} />

        <div className="flex flex-col gap-2">
          {!IsSignIn && !photoURL && (
            <button
              type="submit"
              disabled={isImageUpBtnDis}
              className="mt-2 w-full text-textPrimary bg-accent font-medium py-3 rounded-xl shadow-lg border border-border active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-accent/60"
            >
              {imgUploading ? (
                <Loader2 className="animate-spin mx-auto" size={20} />
              ) : (
                "Upload Image"
              )}
            </button>
          )}

          {((!IsSignIn && photoURL) || IsSignIn) && (
            <button
              type={signUpPart < 3 ? "button" : "submit"}
              onClick={() => {
                if (signUpPart < 3) {
                  setSignUpPart(signUpPart + 1);
                }
              }}
              disabled={() => {
                if (signUpPart === 1) {
                  return !email;
                } else if (signUpPart === 2) {
                  return !name || !username;
                } else {
                  return !pass || !confirmPass || pass !== confirmPass;
                }
              }}
              className="mt-2 w-full text-textPrimary bg-accent font-medium py-3 rounded-xl shadow-lg border border-border active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-accent/60"
            >
              {signUpPart < 3 ? (
                <>{"Next"}</>
              ) : (
                <>
                  {lodingitem === "email_auth" ? (
                    <Loader2 className="animate-spin mx-auto" size={20} />
                  ) : IsSignIn ? (
                    "Sign In"
                  ) : (
                    "Create Account"
                  )}
                </>
              )}
            </button>
          )}

          <button
            type="button"
            onClick={() =>
              delParamsOnUrl({
                get: searchParams,
                set: setSearchParams,
                key: "method",
                value: "email",
              })
            }
            className="mt-2 w-full text-textPrimary bg-surface hover:bg-surfaceHard/50 font-medium py-3 rounded-xl shadow-lg border border-border active:scale-[0.98] transition-all"
          >
            Go back
          </button>
        </div>
      </form>
    </motion.div>
  );
}
