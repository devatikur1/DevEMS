import { Pen, UploadCloud } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

export default function UploadImg({ img }) {
  const { imgData, setImgData } = img;
  // ---------------------
  // ✅ Image Change Fn
  // ---------------------
  function onChangeImage(e) {
    const file = e?.target?.files?.[0];
    if (!file) return;

    // ❗ size check
    if (file.size > 32 * 1024 * 1024) {
      toast.error("Image must be lower than 32 MB");
      return;
    }

    // ✅ valid image
    setImgData({
      file,
      url: URL.createObjectURL(file),
    });
  }
  return (
    <section className="flex flex-col items-center gap-7 mb-10">
      <div className="relative z-10 group bg-surface rounded-full">
        {imgData.url ? (
          <label htmlFor="file">
            <img
              src={imgData.url}
              alt="Avatar"
              className="w-28 h-28 object-cover rounded-full border-2 border-accent p-1 group-hover:scale-105 transition-all"
            />
          </label>
        ) : (
          <label
            htmlFor="file"
            className="group w-28 h-28 rounded-full border-2 border-dashed border-border bg-surfaceSoft/5 hover:bg-surfaceHard/10 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <UploadCloud size={24} className="text-zinc-500" />
            <span className="group-hover:hidden flex text-[10px] text-zinc-500 font-medium transition-all duration-1000">
              Upload
            </span>
          </label>
        )}
        <label
          htmlFor="file"
          className="absolute -bottom-1 -right-1 flex justify-center items-center gap-1 rounded-[8px] px-1.5 py-0.5 bg-surface hover:bg-surfaceSoft border border-boxHover text-[0.75rem] text-smtext"
        >
          <Pen size={13} />
          <span>Edit</span>
        </label>
      </div>
      <p className="rounded-lg border border-warning/40 bg-warning/10 px-4 py-2 text-[0.65rem] text-warning backdrop-blur-md">
        ⚠ Img Must be lower than 32 MB
      </p>
      <input
        onChange={onChangeImage}
        id="file"
        accept="image/*"
        className="hidden"
        type="file"
      />
    </section>
  );
}
