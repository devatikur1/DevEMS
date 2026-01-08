import React, { useEffect, useState } from "react";
import {
  KeyRound,
  Mail,
  Loader2,
  Eye,
  EyeOff,
  User,
  IdCard,
} from "lucide-react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import delParamsOnUrl from "../../../function/delParamsOnUrl";
import AuthError from "./AuthError";
import UploadImg from "../../custom/UploadImg";
import uploadImageFn from "../../../function/UploadImageFn";
import { getErrorMessage } from "../../../function/getErrorMessage";

export default function EmailMethod({
  IsSignIn,
  authError,
  role,
  setAuthError,
  providerSign,
}) {
  // 🔹 Cutom Hook
  const [lodingitem, authSign] = providerSign;

  // 🔹 React-Router-Dom && State
  const [searchParams, setSearchParams] = useSearchParams();
  const [isImageUpBtnDis, setIsImageUpBtnDis] = useState(true);
  const [isFormBtnDis, setIsFormBtnDis] = useState(true);

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    photoURL: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [imgData, setImgData] = useState({
    url: "",
    file: undefined,
  });
  const [imgUploading, setImgUploading] = useState(false);

  // ------------------------------
  // ✅ Handle Form Validation
  // ------------------------------
  useEffect(() => {
    setIsImageUpBtnDis(!imgData.url || imgUploading);
  }, [imgData.url, imgUploading]);

  useEffect(() => {
    const requiredFields = IsSignIn
      ? ["email", "password"]
      : ["username", "name", "email", "photoURL"];

    const hasEmpty = requiredFields.some((key) => formData[key] === "");

    setIsFormBtnDis(hasEmpty || lodingitem === "email_auth");
  }, [IsSignIn, formData, lodingitem]);

  // ------------------------------
  // ✅ Handle Upload Image
  // ------------------------------
  async function handleUpload(e) {
    e.preventDefault();
    setAuthError({
      status: false,
      text: "",
    });
    setImgUploading(true);
    if (!imgData?.file) throw { code: "custom/image-not-select" };

    try {
      const imgDt = await uploadImageFn(imgData?.file);
      if (imgDt.isError) throw { code: imgDt.msg };
      setFormData({
        ...formData,
        photoURL: imgDt?.url,
      });
    } catch (error) {
      setAuthError({ status: true, text: getErrorMessage(error) });
    } finally {
      setImgUploading(false);
    }
  }

  // ------------------------------
  // ✅ Handle Submit Data
  // ------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormBtnDis) {
      setAuthError({ status: true, text: "Please fill up form" });
      setImgUploading(false);
      return;
    }
    await authSign({
      id: "email_auth",
      IsSignIn,
      role,
      formData,
      setAuthError,
    });
  };

  // ---------------------
  // ✅ Forms inputs
  // ---------------------

  const Forms_Inputs = [
    !IsSignIn && {
      id: "username",
      type: "text",
      label: "Username",
      placeholder: "your_username",
      icon: User,
      pattern: "^[a-zA-Z0-9_]{3,20}$",
      title:
        "Username can contain letters, numbers, and underscores (3-20 characters)",
    },
    !IsSignIn && {
      id: "name",
      type: "text",
      label: "Full Name",
      placeholder: "John Doe",
      icon: IdCard,
      pattern: "^[a-zA-Z ]{2,30}$",
      title: "Name should only contain letters and spaces",
    },
    {
      id: "email",
      type: "email",
      label: "Email Address",
      placeholder: "name@company.com",
      icon: Mail,
      pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
      title: "Please enter a valid email address",
    },
    {
      id: "password",
      type: "password",
      label: "Password",
      placeholder: "••••••••",
      icon: KeyRound,
      pattern:
        "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}",
      title:
        "Minimum 8 characters, include uppercase, lowercase, number, and special character",
    },
  ].filter(Boolean);

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
          if ((!IsSignIn && formData.photoURL) || IsSignIn) {
            handleSubmit(e);
          } else {
            handleUpload(e);
          }
        }}
        className="flex flex-col gap-4"
      >
        {!IsSignIn && !formData.photoURL && (
          <UploadImg img={imgData} setImg={setImgData} />
        )}
        {((!IsSignIn && formData.photoURL) || IsSignIn) && (
          <>
            {Forms_Inputs.map((input) => {
              const Icon = input?.icon;
              const isPassword = input?.type === "password";
              return (
                <div key={input?.id} className="space-y-1.5">
                  <label
                    htmlFor={input?.id}
                    className="text-xs font-medium text-textMuted/95 ml-1"
                  >
                    {input?.label}
                  </label>
                  <div className="relative group">
                    <Icon
                      className="absolute left-4 top-3 text-textMuted/95 group-focus-within:text-blue-400 transition-colors"
                      size={18}
                    />
                    <input
                      id={input?.id}
                      type={
                        isPassword
                          ? showPass
                            ? "text"
                            : "password"
                          : input?.type
                      }
                      value={formData[input?.id]}
                      placeholder={input?.placeholder}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [input?.id]: e.target.value,
                        })
                      }
                      pattern={!IsSignIn && input?.pattern}
                      title={!IsSignIn && input?.title}
                      className="w-full bg-surfaceSoft/60 border border-border focus:border-accent/50 rounded-xl py-2.5 pl-12 pr-12 text-sm text-textPrimary placeholder:text-textMuted/50 outline-none transition-all select-text"
                      required
                    />
                    {isPassword && (
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-4 top-3 text-textMuted/95 hover:text-textPrimary/95 transition-colors"
                      >
                        {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

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
          {!IsSignIn && !formData.photoURL && (
            <button
              type="submit"
              disabled={isImageUpBtnDis}
              className="mt-2 w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-textPrimary bg-accent font-medium py-3 rounded-xl shadow-lg ring-1 ring-border active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-accent/60"
            >
              {imgUploading ? (
                <Loader2 className="animate-spin mx-auto" size={20} />
              ) : (
                <span>Upload Image</span>
              )}
            </button>
          )}
          {(!IsSignIn && formData.photoURL) ||
            (IsSignIn && (
              <button
                type="submit"
                disabled={isFormBtnDis}
                className="mt-2 w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-textPrimary bg-accent font-medium py-3 rounded-xl shadow-lg ring-1 ring-border active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-accent/60"
              >
                {lodingitem === "email_auth" ? (
                  <Loader2 className="animate-spin mx-auto" size={20} />
                ) : (
                  <span>{IsSignIn ? "Sign In" : "Create Account"}</span>
                )}
              </button>
            ))}

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
            className="mt-2 w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-textPrimary bg-transparent hover:bg-surfaceSoft font-medium py-3 rounded-xl shadow-lg ring-1 ring-textMuted/40 active:scale-[0.98] transition-all"
          >
            Go back
          </button>
        </div>
      </form>
    </motion.div>
  );
}
