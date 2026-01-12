import { Pen, UploadCloud } from "lucide-react";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

export default function UploadImg({ img, setImg }) {

  function onChangeImage(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }

    if (file.size > 32 * 1024 * 1024) {
      toast.error("Image must be lower than 32 MB");
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setImg({
      file,
      url: previewUrl,
    });
  }

  useEffect(() => {
    return () => {
      if (img?.url) URL.revokeObjectURL(img.url);
    };
  }, [img?.url]);

  return (
    <section className="flex flex-col items-center gap-6 mb-10">
      <div className="relative group">
        <label htmlFor="file" className="cursor-pointer">
          {img?.url ? (
            <img
              src={img.url}
              alt="Avatar"
              className="w-28 h-28 rounded-full object-cover border-2 border-accent p-1 transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="w-28 h-28 rounded-full border-2 border-dashed border-border bg-surfaceSoft flex flex-col items-center justify-center gap-2">
              <UploadCloud size={24} className="text-textMuted" />
              <span className="group-hover:hidden transition-all duration-300 text-[10px] text-textMuted font-medium">
                Upload
              </span>
            </div>
          )}
        </label>

        {/* Edit button always visible on mobile, hover effect on desktop */}
        <label
          htmlFor="file"
          className="absolute -bottom-1 -right-1 flex items-center gap-1 px-2 py-0.5 rounded-md bg-surfaceHard border border-border text-[11px] text-textMuted transition-transform hover:scale-110"
        >
          <Pen size={12} />
          Edit
        </label>
      </div>

      <p className="rounded-md border border-warningSoft/20  text-warning bg-warning/10 px-4 py-2 text-[0.65rem]">
        ⚠ Image must be lower than 32 MB
      </p>

      <input
        id="file"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onChangeImage}
      />
    </section>
  );
}
