import React, { useState, useRef } from "react";
import useFunction from "../../hooks/useFunction";
import UploadImg from "../Custom/UploadImg";
import { Loader2, LocateFixed } from "lucide-react";

export default function Profile({
  formData,
  setFormData,
  handleChange,

  LastUsername,
  usernameStatus,
  setUsernameStatus,

  GetCurrentLocation,
  isChange,
  handleSave,
  isSaving,
}) {
  const fileInputRef = useRef(null);
  const debounceTimerRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const { uploadImageFn, uniUsername } = useFunction();

  const handleImageUpload = async (data) => {
    const url = data.url;
    const file = data.file;
    if (!url) return;

    setIsUploading(true);
    const res = await uploadImageFn(file);
    if (!res.isError) {
      setFormData((prev) => ({ ...prev, photoURL: res.url }));
    } else {
      alert("Image upload failed. Please try again.");
    }
    setIsUploading(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-300">
      <div>
        <h2 className="text-xl font-bold text-textPrimary text-center md:text-left">
          General Profile
        </h2>
        <p className="text-textMuted mt-1 text-xs text-center md:text-left">
          Update your personal information and how others see you on the
          platform.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Profile Photo */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-6 pb-6 border-b border-border">
          <div className="relative">
            <UploadImg
              img={{
                file: {},
                url: formData.photoURL,
              }}
              setImg={handleImageUpload}
              isShow={false}
              labelClass={"flex md:hidden"}
              fileInputRef={fileInputRef}
            />
          </div>
          <div className="hidden md:flex flex-col gap-1 md:gap-0">
            <h3 className="text-lg font-semibold text-textPrimary text-left">
              Profile Picture
            </h3>
            <p className="text-xs text-textMuted max-w-sm mt-1 mb-3 text-left">
              Upload a high-res image (Max 2MB). Formats: JPEG, PNG, WEBP.
            </p>
            <div className="flex items-center justify-start gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="text-sm font-semibold bg-surfaceSoft hover:bg-hover text-textPrimary px-4 py-2 rounded-lg transition-colors border border-border disabled:pointer-events-none disabled:opacity-50"
              >
                {isUploading ? "Uploading..." : "Upload New"}
              </button>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSave}
          className="px-3 md:px-0 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Inputs */}
          <div className="space-y-3">
            <label
              htmlFor="name"
              className="text-sm font-semibold text-textMuted block mb-1"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-surfaceSoft border border-border text-textPrimary focus:border-accent focus:ring-1 focus:ring-accent rounded-lg px-4 py-2.5 outline-none transition-all placeholder:text-textMuted/50"
              placeholder="e.g. John Doe"
            />
          </div>

          <div className="space-y-3">
            <label className="flex justify-between items-center text-xs font-medium text-textMuted ml-1">
              <span className="text-sm font-semibold text-textMuted">
                Username
              </span>

              <span
                className={`text-[11px] px-2 py-0.5 rounded ${
                  usernameStatus === "Available"
                    ? "bg-success/10 text-success"
                    : usernameStatus === "Checking..."
                      ? "bg-warning/10 text-warning"
                      : "bg-error/10 text-error"
                }`}
              >
                Status: {usernameStatus}
              </span>
            </label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={(e) => {
                const val = e.target.value
                  .toLowerCase()
                  .replace(/\s+/g, "")
                  .replace(/@+/g, "")
                  .replace(/[^a-z0-9._]/g, "");

                const username = `@${val}`;

                setFormData((prev) => ({
                  ...prev,
                  username,
                }));

                if (!val.trim()) {
                  clearTimeout(debounceTimerRef.current);
                  return setUsernameStatus("Not Valid");
                }

                setUsernameStatus("Checking...");

                clearTimeout(debounceTimerRef.current);

                debounceTimerRef.current = setTimeout(async () => {
                  const status = await uniUsername({
                    type: "find",
                    baseName: username,
                  });
                  let dstatus = username === LastUsername || status;

                  setUsernameStatus(dstatus ? "Available" : "Taken");
                }, 800);
              }}
              className="w-full bg-surfaceSoft border border-border text-textPrimary focus:border-accent focus:ring-1 focus:ring-accent rounded-lg px-4 py-2.5 outline-none transition-all placeholder:text-textMuted/50"
              placeholder="e.g. johndoe"
            />
          </div>

          <div className="space-y-3">
            <label
              disabled
              className="text-sm font-semibold text-textMuted block mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              className="w-full bg-surfaceSoft/50 border border-border/50 text-textMuted rounded-lg px-4 py-2.5 outline-none cursor-not-allowed select-none"
              placeholder="e.g. name@company.com"
              disabled
            />
            <p className="text-xs text-textMuted mt-1 ml-2">
              The email change feature is currently unavailable.
            </p>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-textMuted block mb-1">
              Role (Department)
            </label>
            <input
              type="text"
              value={`${formData.role}`}
              className="w-full bg-surfaceSoft/50 border border-border/50 text-textMuted rounded-lg px-4 py-2.5 outline-none cursor-not-allowed select-none capitalize"
              disabled
            />
          </div>

          <div className="col-span-full space-y-3">
            <label className="text-sm font-semibold text-textMuted block mb-1">
              Location
            </label>

            <div className="relative">
              <input
                type="text"
                name="location"
                onChange={handleChange}
                value={formData.location}
                placeholder="e.g. Location"
                className="w-full bg-surfaceSoft border border-border text-textPrimary focus:border-accent focus:ring-1 focus:ring-accent rounded-xl pl-4 pr-12 py-3 outline-none transition-all placeholder:text-textMuted/50"
              />

              {/* Current Location Button */}
              <button
                type="button"
                onClick={async () => await GetCurrentLocation()}
                title="Set Current Location"
                className="absolute right-3 top-1/2 -translate-y-1/2 size-9 rounded-lg flex items-center justify-center bg-surface hover:bg-boxHover border border-border hover:border-accent/30 transition-all duration-200 group"
              >
                <LocateFixed className="size-4 text-textMuted group-hover:text-accent transition-colors" />
              </button>
            </div>
          </div>

          <div className="col-span-full space-y-3">
            <label className="text-sm font-semibold text-textMuted block mb-1">
              Short Bio
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full min-h-[150px] bg-surfaceSoft border border-border text-textPrimary focus:border-accent focus:ring-1 focus:ring-accent rounded-lg px-4 py-2.5 outline-none transition-all placeholder:text-textMuted/50 resize-y"
              placeholder="Tell us a little about yourself..."
            ></textarea>
          </div>

          <div className="col-span-full flex justify-center items-center mt-12">
            <button
              disabled={!isChange || usernameStatus !== "Available" || isSaving}
              type={
                isChange || usernameStatus === "Available" || !isSaving
                  ? "submit"
                  : "button"
              }
              className="w-72 bg-accent text-[0.8rem] md:text-[1rem] text-textPrimary px-8 py-3 lg:px-10 lg:py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-60 disabled:pointer-events-none"
            >
              {isSaving ? (
                <div className="w-full flex justify-center items-center">
                  <Loader2 size={23} className="animate-spin" />
                </div>
              ) : (
                <span>Update profile</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
