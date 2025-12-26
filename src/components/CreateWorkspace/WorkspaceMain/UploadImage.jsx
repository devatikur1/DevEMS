import { Pen, UploadCloud } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

export default function UploadImage({ img }) {
  const { imgData, setImgData } = img;
  // ---------------------
  // ✅ Image Change Fn
  // ---------------------
  function onChangeImage(e) {
    if (e?.target?.files[0].size < 32 * 1024 * 1024) {
      setImgData({
        file: e?.target?.files[0],
        url: URL.createObjectURL(e?.target?.files[0]),
      });
    } else {
      toast.error("Img Must be lower than 32 MB");
    }
  }
  return (
    <section className="flex items-center gap-4 mb-10">
      <div className="relative z-10 group bg-surface rounded-full">
        {imgData.url ? (
          <img
            src={imgData.url}
            alt="Avatar"
            className="w-28 h-28 object-cover rounded-full border-2 border-accent p-1 group-hover:scale-105 transition-all"
          />
        ) : (
          <label
            htmlFor="file"
            className="w-28 h-28 rounded-full border-2 border-dashed border-border bg-boxHover/10 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-zinc-800 transition-all"
          >
            <UploadCloud size={24} className="text-zinc-500" />
            <span className="text-[10px] text-zinc-500 font-medium">
              Upload
            </span>
          </label>
        )}
        <label
          htmlFor="file"
          className="absolute -bottom-1 -right-1 flex justify-center items-center gap-1 rounded-[8px] px-1.5 py-0.5 bg-surface border border-boxHover text-[0.75rem] text-smtext"
        >
          <Pen size={13} />
          <span>Edit</span>
        </label>
      </div>
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
