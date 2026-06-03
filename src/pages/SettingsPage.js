/* eslint-disable no-throw-literal */
import React, { useContext, useState, useEffect } from "react";
import Header from "../components/Settings/Header";
import { useSearchParams } from "react-router-dom";
import useFunction from "../hooks/useFunction";
import NavBar from "../components/Settings/NavBar";
import Appearance from "../components/Settings/Appearance";
import Profile from "../components/Settings/Profile";
import { AppContext } from "../context/AppContext";
import useFirestore from "../hooks/useFirestore";
import NotFoundPage from "../components/Settings/NotFoundPage";
import { gooeyToast, GooeyToaster } from "goey-toast";
import { motion } from "framer-motion";

export default function SettingsPage() {
  // 🔹 useContext context
  const { settingsdt, authId } = useContext(AppContext);
  const { userDt, setUserDt } = authId;
  const { theme, setTheme, accent, setAccent, font, setFont } = settingsdt;

  // 🔹 Router &&  State
  const [isChange, setIsChange] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState("Available");
  const [isSaving, setIsSaving] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // 🔹 Custom Hook
  const { paramsUrl, genEmailbaseUid } = useFunction();
  const { setData } = useFirestore();

  // 🔹 Centralized Logic: Shob settings ekhane thakbe
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    description: "",
    location: "",
    photoURL: "",
    role: "",
    lastUpdated: "",
    department: "",
    position: "",
  });

  // -------------------------
  // ✅ Initialize FormData
  // -------------------------
  useEffect(() => {
    if (userDt && Object.keys(userDt).length > 0) {
      setFormData((prev) => ({
        ...prev,
        name: userDt.name || prev.name,
        username: userDt.username.replace(/@/gi, "") || prev.username,
        email: userDt.email || prev.email,
        description: userDt.description || prev.description,
        location: userDt.location || prev.location,
        photoURL: userDt.photoURL || prev.photoURL,
        role: userDt.role || prev.role,
        lastUpdated: userDt.lastUpdated || prev.lastUpdated,
        department: userDt.department || prev.department,
        position: userDt.position || prev.position,
      }));
      console.log(userDt);
    }
  }, [userDt]);

  useEffect(() => {
    let changed = false;

    for (const key in formData) {
      if (!Object.hasOwn(formData, key)) continue;

      const currentValue = String(formData[key] || "").trim();
      const oldValue = String(userDt[key] || "").trim();

      if (currentValue !== oldValue) {
        changed = true;
        break;
      }
    }

    setIsChange(changed);
  }, [formData, userDt]);

  // -------------------------
  // ✅ Profile
  // -------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  function GetCurrentLocation() {
    if (!navigator.geolocation) {
      return gooeyToast.error("Unsupported Browser");
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          if (!latitude || !longitude) {
            throw {
              title: "Location Error",
              message: "Failed to detect your current location.",
            };
          }

          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
          );

          if (!response.ok) {
            throw {
              title: "API Error",
              message: "Failed to fetch your location details.",
            };
          }

          const data = await response.json();

          const location = `${data.address.town || data.address.city || data.address.village || "Unknown Area"}, ${data.address.state || ""}, ${data.address.country || ""}`;

          setFormData((prev) => ({
            ...prev,
            location,
          }));

          gooeyToast.success("Location Synced");
        } catch (error) {
          gooeyToast.error(error.message || "Something went wrong", {
            description: error.title || "Error",
          });
        }
      },

      () => {
        gooeyToast.error(
          "Please allow location access in your browser settings.",
          {
            description: "Permission Denied",
          },
        );
      },
    );
  }

  const handleSave = async (e) => {
    e.preventDefault();
    if (!isChange || usernameStatus !== "Available") return;
    setIsSaving(true);

    try {
      const docId = genEmailbaseUid(userDt.email);
      let date = new Date();
      const updatedData = {
        ...userDt,
        name: formData.name,
        username: `@${formData.username}`,
        description: formData.description,
        location: formData.location,
        photoURL: formData.photoURL,
        lastUpdated: date,
        ...(userDt.role === "employee" && {
          department: formData.department,
          position: formData.position,
        }),
      };

      const res = await setData({
        collId: "users",
        docId: docId,
        data: updatedData,
      });

      if (res.status) {
        setUserDt((prev) => {
          localStorage.setItem("userDt", JSON.stringify(updatedData));
          return updatedData;
        });
        gooeyToast.success("Changes saved successfully!");
      } else {
        gooeyToast.error("Failed to save changes.");
      }
    } catch (error) {
      console.error(error);
      gooeyToast.error("An error occurred.");
    } finally {
      setIsSaving(false);
    }
  };

  // -------------------------
  // ✅ Appearance
  // -------------------------
  const handleThemeChange = (id) => {
    const root = document.documentElement;
    root.dataset.themeId = id;
    root.classList.remove("light", "dark");
    root.classList.add(id);

    localStorage.removeItem("themeId");
    localStorage.setItem("themeId", id);
    setTheme(id);
  };

  const handleAccentColor = (id) => {
    const root = document.documentElement;
    root.dataset.accentId = id;
    root.classList.remove(
      "sky-blue",
      "neon-purple",
      "cyan-neon",
      "emerald-green",
      "rose-pink",
    );
    root.classList.add(id);

    localStorage.removeItem("accentId");
    localStorage.setItem("accentId", id);
    setAccent(id);
  };

  const handleFontChange = (id) => {
    const root = document.documentElement;
    root.dataset.fontId = id;
    root.classList.remove(
      "inter",
      "plus-jakarta-sans",
      "manrope",
      "general-sans",
      "sora",
      "outfit",
    );
    root.classList.add(id);

    localStorage.removeItem("fontId");
    localStorage.setItem("fontId", id);
    setFont(id);
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="relative z-50 w-full flex justify-center text-textPrimary bg-bg antialiased"
    >
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
          <div className="lg:col-span-9 bg-surface rounded-xl border border-border shadow-2xl shadow-shadow/50 mb-10">
            <aside className="px-2 py-8 md:p-12 space-y-10">
              {!searchParams.get("tab") ||
              searchParams.get("tab") === "profile" ? (
                <Profile
                  formData={formData}
                  setFormData={setFormData}
                  handleChange={handleChange}
                  LastUsername={userDt.username}
                  usernameStatus={usernameStatus}
                  setUsernameStatus={setUsernameStatus}
                  GetCurrentLocation={GetCurrentLocation}
                  handleSave={handleSave}
                  isChange={isChange}
                  isSaving={isSaving}
                />
              ) : searchParams.get("tab") === "appearance" ? (
                <Appearance
                  theme={theme}
                  accent={accent}
                  font={font}
                  handleThemeChange={handleThemeChange}
                  handleAccentColor={handleAccentColor}
                  handleFontChange={handleFontChange}
                />
              ) : (
                <NotFoundPage text={searchParams.get("tab")} />
              )}
            </aside>
          </div>
        </div>
        <GooeyToaster
          position="bottom-right"
          theme={theme === "light" ? "dark" : "light"}
        />
      </div>
    </motion.main>
  );
}
