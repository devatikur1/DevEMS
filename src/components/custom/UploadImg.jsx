import { Pen, UploadCloud, AlertCircle } from "lucide-react";
import React, { useEffect, useState } from "react";


export default function UploadImg({ img, setImg }) {
  const [error, setError] = useState(null);

  // ---------------------
  // ✅ Image Change Fn
  // ---------------------
  function onChangeImage(e) {
    const file = e?.target?.files[0];

    if (!file) return;

    if (file.size < 32 * 1024 * 1024) {
      setError(null);
      setImg({
        file: file,
        url: URL.createObjectURL(file),
      });
    } else {
      setError("Img Must be lower than 32 MB");
      setImg({ file: null, url: null });
    }
  }

  // Logic: Memory leak bondho korar jonno object URL revoke kora
  useEffect(() => {
    return () => {
      if (img?.url) URL.revokeObjectURL(img.url);
    };
  }, [img?.url]);

  return (
    <section className="flex flex-col items-center gap-6">
      <div className="relative z-10 group">
        {img?.url ? (
          <div className="relative">
            <img
              src={img?.url}
              alt="Avatar"
              className="w-32 h-32 object-cover rounded-full border-2 border-accent/30 p-1 group-hover:border-accent group-hover:scale-[1.02] transition-all duration-500 shadow-lg shadow-accent/10"
            />

            <label
              htmlFor="file"
              className="absolute bottom-1 -right-1 flex justify-center items-center gap-1.5 rounded-full px-3 py-1 bg-surface border border-border text-[10px] font-bold uppercase tracking-wider text-textMuted cursor-pointer hover:bg-hover hover:text-textPrimary transition-all duration-300 shadow-xl"
            >
              <Pen size={10} />
              <span>Edit</span>
            </label>
          </div>
        ) : (
          <label
            htmlFor="file"
            className="relative w-32 h-32 rounded-full border border-dashed border-border/80 bg-surfaceSoft/20 backdrop-blur-md flex flex-col items-center justify-center gap-1 cursor-pointer transition-all duration-500 hover:border-accent/50 hover:bg-surfaceSoft/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] active:scale-95 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <UploadCloud
              size={22}
              className="text-textMuted group-hover:text-accent group-hover:-translate-y-0.5 transition-all duration-500 z-10"
            />
            <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-textMuted/80 group-hover:text-textPrimary transition-all duration-500 z-10 text-center px-2">
              Add Photo
            </span>
          </label>
        )}
      </div>

      {error && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          <p className="flex items-center gap-2 rounded-lg border border-error/30 bg-error/10 px-4 py-2 text-[0.65rem] font-bold text-error backdrop-blur-md uppercase tracking-widest">
            <AlertCircle size={12} />
            <span>⚠ {error}</span>
          </p>
        </div>
      )}

      {!error && !img.url && (
        <p className="text-[10px] text-textMuted font-medium tracking-wide opacity-50">
          Max size: 32MB
        </p>
      )}

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
