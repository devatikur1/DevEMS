import React from "react";

export default function UploadImage({ img }) {
  const { imgData, setImgData } = img;
  return (
    <section className="flex items-center gap-4 mb-10">
      <div className="relative z-10 group bg-surface rounded-full overflow-hidden">
        <img
          src={
            imgData.url ||
            "https://cdn-icons-png.flaticon.com/512/2450/2450254.png"
          }
          alt="Avatar"
          className="w-28 h-28 object-cover rounded-full border-2 border-accent p-1 group-hover:scale-105 transition-all"
        />
        <label
          htmlFor="file"
          className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity text-[10px] text-text font-bold"
        >
          Change Image
        </label>
      </div>
      <input
        onChange={(e) =>
          setImgData({
            url: URL.createObjectURL(e.target.files[0]),
            file: e.target.files[0],
          })
        }
        id="file"
        accept="image/*"
        className="hidden"
        type="file"
      />
    </section>
  );
}
