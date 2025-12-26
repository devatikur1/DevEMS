import React from "react";
import { Loader2, Pen, X } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function ProfileModalOverlay({
  closeProfile,
  name,
  setName,
  username,
  onUpdateUserName,
  usernameIsDoText,
  pUrl,
  setPUrl,
  photoURL,
  userDt,
  handlePrUpdate,
  updateLod,
}) {
  // ---------------------
  // ✅ Image Change Fn
  // ---------------------
  function onChangeImage(e) {
    if (e?.target?.files[0].size < 32 * 1024 * 1024) {
      setPUrl({
        file: e?.target?.files[0],
        url: URL.createObjectURL(e?.target?.files[0]),
      });
    } else {
      toast.error("Img Must be lower than 32 MB");
    }
  }

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
        onClick={() => closeProfile()}
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
            <h2 className="text-xl font-bold text-white">Profile Settings</h2>
            <button
              onClick={() => closeProfile()}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Profile Edit Part && Upload Part */}
          <div className="space-y-4">
            <div className="flex flex-col items-center gap-4 py-4">
              <p className="rounded-lg border border-warning/40 bg-warning/10 px-4 py-2 text-[0.65rem] text-warning backdrop-blur-md">
                ⚠ Img Must be lower than 32 MB
              </p>
              <div className="group relative">
                <img
                  src={photoURL}
                  alt=""
                  className="w-24 h-24 object-cover rounded-full border-2 border-text p-1"
                />
                <label
                  htmlFor="file"
                  className="absolute -bottom-1 -right-1 flex justify-center items-center gap-1 rounded-[8px] px-1.5 py-0.5 bg-surface border border-boxHover text-[0.75rem] text-smtext"
                >
                  <Pen size={13} />
                  <span>Edit</span>
                </label>
              </div>
              <input
                id="file"
                accept="image/*"
                onChange={onChangeImage}
                className="hidden"
                type="file"
              />
            </div>
            <div className="px-8 flex flex-col gap-2">
              <label htmlFor="name">Name*</label>
              <input
                id="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="bg-boxHover backdrop-blur-lg outline-custom py-1.5 px-4"
                placeholder={userDt?.name}
                type="text"
              />
            </div>
            <div className="px-8 flex flex-col gap-2 pt-3 pb-4">
              <label htmlFor="name">Username*</label>
              <input
                id="name"
                onChange={async (e) => await onUpdateUserName(e.target.value)}
                value={username}
                className="bg-boxHover backdrop-blur-lg outline-custom py-1.5 px-4"
                placeholder={userDt?.username}
                type="text"
              />
            </div>
            {usernameIsDoText.status && (
              <p
                className={`mx-8 rounded-lg border ${
                  usernameIsDoText.status === "error"
                    ? "border-error/40  text-error bg-error"
                    : usernameIsDoText.status === "success"
                    ? "border-success/40 text-success bg-success"
                    : "border-warning/40 text-warning bg-warning"
                } bg-opacity-10 px-4 py-2 text-[0.69rem] backdrop-blur-md`}
              >
                {usernameIsDoText.status === "warning" && "⚠  "}
                {usernameIsDoText.status === "error" && "❌  "}
                {usernameIsDoText.status === "success" && "✅  "}
                {usernameIsDoText.text || "Something went wrong"}
              </p>
            )}
            <div className="flex justify-center items-center pt-5 *:select-none">
              <button
                disabled={
                  (name === "" && pUrl === "" && username === "") ||
                  updateLod ||
                  name === userDt?.name ||
                  (username !== "" && usernameIsDoText.status !== "success")
                }
                onClick={async () => await handlePrUpdate()}
                type="button"
                className="bg-accent  hover:bg-accent px-14 py-2 rounded-lg active:scale-[1.2] transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none"
              >
                {updateLod ? (
                  <Loader2 size={25} className="animate-spin" />
                ) : (
                  <span className="text-bg">Update</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
