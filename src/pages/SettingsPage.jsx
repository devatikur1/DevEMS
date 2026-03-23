import React, { useContext, useLayoutEffect, useState } from "react";
import Header from "../components/settings/Header";
import { useSearchParams } from "react-router-dom";
import useFunction from "../hooks/useFunction";
import NavBar from "../components/settings/NavBar";
import Appearance from "../components/settings/Appearance";
import { AppContext } from "../context/AppContext";

export default function SettingsPage() {
  // 🔹 useContext context
  const { settingsdt, authId, isLogged } = useContext(AppContext);
  const { userDt } = authId;
  const { theme, setTheme, accent, setAccent, font, setFont } = settingsdt;

  // 🔹 Router &&  State
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  // 🔹 Custom Hook
  const { paramsUrl } = useFunction();
  //   const { getData, getCount } = useFirestore();

  // 🔹 Centralized Logic: Shob settings ekhane thakbe
  const [formData, setFormData] = useState({
    name: "Ayman Sadiq",
    username: "ayman_dev",
    email: "emp1@dev-ems.com",
    bio: "Senior Frontend Developer focusing on scalable UI architecture.",
    location: "Dhaka, Bangladesh",
    photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ayman",
    role: "admin",
    department: "Engineering",
    position: "Senior Developer",
    timezone: "UTC+6 (Dhaka)",
    language: "English (US)",
    twoFactor: true,
    emailNotifications: {
      tasks: true,
      system: false,
      marketing: false,
    },
    theme: "dark",
    compactMode: false,
  });

  // -------------------------
  // ✅ Appearance
  // -------------------------

  const handleThemeChange = (id) => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(id);
    let { fontId, fontClass } = JSON.parse(localStorage.getItem("setting")) || {};
    localStorage.setItem(
      "setting",
      JSON.stringify({
        themeName: id,
        fontId: fontId || "",
        fontClass: fontClass || "",
      }),
    );
    setTheme(id);
  };

  const handleFontChange = (id, fontClass, obj) => {
    const root = document.documentElement;
    root.classList.remove("font1", "font2", "font3", "font4");
    root.classList.add(fontClass);
    root.dataset.font = id;
    let { themeName, } = JSON.parse(localStorage.getItem("setting")) || {};
    localStorage.setItem(
      "setting",
      JSON.stringify({
        themeName: themeName || "",
        fontId: id,
        fontClass: fontClass,
      }),
    );
    localStorage.setItem("font", JSON.stringify(obj));
    setFont(id);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    // Logic: Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveMessage("Changes saved successfully!");
      setTimeout(() => setSaveMessage(""), 3000);
    }, 1000);
  };

  return (
    <main className="relative z-50 w-full flex justify-center text-textPrimary h-auto bg-bg antialiased">
      <div className="w-[95%] xl:w-[90%] 2xl:w-[75%] pt-10">
        {/* 🔹 Header Section */}
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* 🔹 Sidebar Navigation (Professional Design) */}
          <NavBar
            paramsUrl={paramsUrl}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />

          {/* 🔹 Main Form Area */}
          <div className="lg:col-span-9 bg-surface rounded-xl border border-border overflow-hidden shadow-2xl shadow-shadow/50">
            <form onSubmit={handleSave} className="p-8 md:p-12 space-y-10">
              {searchParams.get("tab") === "appearance" && (
                <Appearance
                  theme={theme}
                  accent={accent}
                  font={font}
                  setAccent={setAccent}
                  handleThemeChange={handleThemeChange}
                  handleFontChange={handleFontChange}
                />
              )}

              {/* 🔹 Action Footer */}
              {searchParams.get("tab") !== "appearance" && (
                <div className="pt-8 border-t border-border flex items-center justify-between">
                  <button
                    type="button"
                    className="text-sm font-bold text-error hover:bg-error/10 px-4 py-2 rounded-lg transition"
                  >
                    Reset to Default
                  </button>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      className="px-6 py-2.5 rounded-xl text-sm font-bold text-textMuted hover:text-textPrimary transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="px-10 py-2.5 rounded-xl bg-accent hover:bg-accentHover text-white text-sm font-black shadow-[0_8px_20px_rgba(59,130,246,0.3)] transition-all active:scale-95 disabled:opacity-50"
                    >
                      {isSaving ? "SYNCING..." : "SAVE CHANGES"}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
