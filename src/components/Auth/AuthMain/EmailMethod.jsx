/* eslint-disable no-throw-literal */
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import FormInputs from "./FormInputs";
import Msg from "../../custom/Msg";
import useFunction from "../../../hooks/useFunction";

export default function EmailMethod({
  IsSignIn,
  authMsg,
  role,
  setAuthMsg,
  providerSign,
}) {
  // 🔹 Custom Hook
  const { passValidation, paramsUrl, uploadImageFn, getErrMsg } = useFunction();
  const { lodingitem, authSign, forgotPass } = providerSign;

  // 🔹 React Router
  const [searchParams, setSearchParams] = useSearchParams();

  // 🔹 Form State
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

  const [signUpPart, setSignUpPart] = useState(0);

  // ------------------------------
  // ✅ Form validation
  // ------------------------------
  useEffect(() => {
    setIsFormBtnDis(() =>
      IsSignIn
        ? !email || email.includes(" ") || !email.includes("@") || !pass
        : (signUpPart === 0 && !imgData.url) ||
          (signUpPart === 1 &&
            (!email || email.includes(" ") || !email.includes("@"))) ||
          (signUpPart === 2 && (!name || !username)) ||
          (signUpPart === 3 &&
            (!photoURL ||
              !pass ||
              !confirmPass ||
              pass !== confirmPass ||
              !passValidation(pass))) ||
          imgUploading ||
          lodingitem === "email_auth",
    );
  }, [
    IsSignIn,
    email,
    pass,
    signUpPart,
    imgData.url,
    name,
    username,
    photoURL,
    confirmPass,
    imgUploading,
    lodingitem,
    passValidation,
  ]);

  // ------------------------------
  // ✅ Handle Image Upload
  // ------------------------------
  const handleUpload = async () => {
    if (!imgData?.file) throw { code: "custom/image-not-select" };

    setImgUploading(true);
    setAuthMsg({ status: false, text: "", type: "suc" });

    try {
      const imgDt = await uploadImageFn(imgData.file);
      if (imgDt.isError) throw { code: imgDt.msg };
      setPhotoURL(imgDt.url);
      setSignUpPart(signUpPart + 1);
    } catch (error) {
      setAuthMsg({ status: true, text: getErrMsg(error), type: "err" });
    } finally {
      setImgUploading(false);
    }
  };

  // ------------------------------
  // ✅ Form Submit
  // ------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = IsSignIn
      ? [email, pass]
      : [username, name, email, pass, confirmPass, photoURL];
    if (
      requiredFields.some((val) => !val) ||
      (!IsSignIn && (pass !== confirmPass || !passValidation(pass)))
    ) {
      setAuthMsg({
        status: true,
        text: "Please Full fill up the form.",
        type: "err",
      });
      return;
    }

    const formData = { username, name, email, password: pass, photoURL };
    await authSign({
      id: "email_auth",
      IsSignIn,
      role,
      formData,
    });
  };

  // ------------------------------
  // ✅ Render
  // ------------------------------
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

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Form Inputs */}
        <FormInputs
          IsSignIn={IsSignIn}
          imgData={imgData}
          setImgData={setImgData}
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
        />

        {/* Forgot Password */}
        {IsSignIn && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={async () => {
                await forgotPass(email);
              }}
              className="text-xs text-textMuted hover:text-textPrimary/90 transition-colors"
            >
              Forgot password?
            </button>
          </div>
        )}

        {/* Error Message */}
        <Msg msg={authMsg} />

        {/* Buttons */}
        <div className="flex flex-col gap-2">
          {/* Next / Submit Button */}
          <button
            type={signUpPart < 3 && !IsSignIn ? "button" : "submit"}
            onClick={async () => {
              if (signUpPart === 0 && !IsSignIn) await handleUpload();
              else if (signUpPart < 3 && !IsSignIn)
                setSignUpPart(signUpPart + 1);
            }}
            disabled={isFormBtnDis}
            className="mt-3 w-full text-textPrimary bg-accent font-medium py-3 rounded-xl border border-border active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-accent/60"
          >
            {imgUploading || lodingitem === "email_auth" ? (
              <Loader2 className="animate-spin mx-auto" size={20} />
            ) : signUpPart < 3 && !IsSignIn ? (
              "Next"
            ) : lodingitem === "email_auth" ? (
              <Loader2 className="animate-spin mx-auto" size={20} />
            ) : IsSignIn ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </button>

          {/* Go Back */}
          <button
            type="button"
            onClick={() => {
              if (signUpPart > 0) {
                setSignUpPart(signUpPart - 1);
              } else {
                paramsUrl({
                  type: "del",
                  get: searchParams,
                  set: setSearchParams,
                  key: "method",
                  value: "email",
                });
              }
            }}
            disabled={lodingitem === "email_auth"}
            className="mt-2 w-full text-textPrimary bg-surfaceSoft hover:bg-boxHover font-medium py-3 rounded-xl border border-border hover:border-hover active:scale-[0.98] transition-all disabled:opacity-55"
          >
            Go back
          </button>
        </div>
      </form>
    </motion.div>
  );
}
