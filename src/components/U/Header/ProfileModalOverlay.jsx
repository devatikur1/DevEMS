import React from "react";
import { IdCard, KeyRound, Loader2, User, X } from "lucide-react";
import { motion } from "framer-motion";
import UploadImg from "../../custom/UploadImg";
import TextInput from "../../custom/TextInput";
import Msg from "../../custom/Msg";

export default function ProfileModalOverlay({
  name,
  setName,
  username,
  setUsername,
  imgData,
  setImgData,
  authMsg,
  photoURL,
  userDt,
  handlePrUpdate,
  loding,
  closeProfile,
}) {

  // ------------------------------
  // ✅ Input config
  // ------------------------------
  const Inputs_Config = {
    username: {
      id: "username",
      type: "text",
      label: "Username",
      placeholder: "your_username",
      icon: User,
      pattern: "^[a-zA-Z0-9_]{3,20}$",
      title:
        "Username can contain letters, numbers, and underscores (3-20 characters)",
    },
    name: {
      id: "name",
      type: "text",
      label: "Full Name",
      placeholder: "John Doe",
      icon: IdCard,
    },
    pass: {
      id: "password",
      type: "password",
      label: "Password",
      placeholder: "••••••••",
      icon: KeyRound,
    },
    confirmPass: {
      id: "confirmPass",
      type: "password",
      label: "Confirm Password",
      placeholder: "••••••••",
      icon: KeyRound,
    },
  };
  // ---------------------
  // ✅ Render
  // ---------------------
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center sm:p-4 overflow-x-hidden overflow-y-auto">
      {/* Backdrop-BG */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeProfile}
        className="absolute inset-0 bg-bg/10 backdrop-blur-md select-none"
      />

      {/* Modal-Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-full h-full sm:h-auto sm:max-w-lg bg-surface border border-border sm:rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="px-0 py-4 sm:p-6 pb-8">
          {/* Header-Part */}
          <div className="px-5 pt-4 sm:px-0 flex justify-between items-center mb-6 *:select-none">
            <h2 className="text-xl font-bold text-textPrimary">
              Profile Settings
            </h2>
            <button
              onClick={closeProfile}
              className="text-textMuted hover:text-textPrimary transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Profile Edit Part && Upload Part */}
          <div className="space-y-4">
            <UploadImg img={imgData} setImg={setImgData} url={photoURL} />
            <TextInput
              input={Inputs_Config.name}
              setText={setName}
              text={name}
            />
            <TextInput
              input={Inputs_Config.username}
              setText={setUsername}
              text={username}
            />
            <Msg msg={authMsg} />

            <div className="w-full flex justify-center items-center">
              <button
                disabled={
                  (!name && !imgData.url && !username) ||
                  (name && name === userDt?.name) ||
                  authMsg.status ||
                  loding
                }
                onClick={async () => await handlePrUpdate()}
                type="button"
                className="mt-5 w-[95%] text-textPrimary bg-accent hover:bg-accentHover transition-all duration-300 font-medium py-3 rounded-xl shadow-lg border border-border active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-accent/60"
              >
                {loding ? (
                  <Loader2 className="animate-spin mx-auto" size={20} />
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
