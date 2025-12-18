import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AppContext, auth, db } from "../../context/AppContext";
import { signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import ProfileModalOverlay from "./Header/ProfileModalOverlay";
import QuickMenu from "./Header/QuickMenu";

export default function Header() {
  // 🔹 useContext context
  const { authId } = useContext(AppContext);
  const { setIsLogged, setUserDt, userDt } = authId;

  // 🔹 State
  const [showOpBar, setShowOpBar] = useState(false);
  const [showPrOpBar, setShowPrOpBar] = useState(false);
  const [pUrl, setPUrl] = useState("");
  const [name, setName] = useState("");
  const [updateLod, setUpdateLod] = useState(false);

  // 🔹 router-dom
  const [searchParams, setSearchParams] = useSearchParams();

  // ---------------------
  // ✅ Show Profile Fns
  // ---------------------

  /* 🔹 1 When Click Profile Btn */
  function openProfile() {
    setSearchParams({ profile_setting: "true" });
    setShowPrOpBar(true);
  }

  /* 🔹 2 When Close Profile*/
  const closeProfile = () => {
    setSearchParams({});
    setShowPrOpBar(false);
  };

  /* 🔹 3 When Enter Website Use Link  */
  useEffect(() => {
    if (searchParams.get("profile_setting") === "true") {
      openProfile();
    } else {
      closeProfile();
    }
  }, [searchParams]);

  // ---------------------
  // ✅ Logout Function
  // ---------------------
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("isLogged");
      localStorage.removeItem("userDt");
      setIsLogged(false);
      setUserDt({});
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setShowOpBar(false);
    }
  };

  // -----------------------------
  // ✅ Profile Update Function
  // ----------------------------
  const handlePrUpdate = async () => {
    try {
      setUpdateLod(true);
      let finalPhotoURL = userDt?.photoURL;

      // 🔹 1. ImgBB Upload
      if (pUrl.file) {
        const formData = new FormData();
        formData.append("image", pUrl.file);

        const apiKey = "82961e2fd2171ce2e924fc0337aa7124";

        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          {
            method: "POST",
            body: formData,
          }
        );

        const resData = await response.json();

        if (resData.success) {
          finalPhotoURL = resData.data.url;
        } else {
          throw new Error("ImgBB upload failed");
        }
      }

      // 🔹 2. Firestore Database Update
      const updatedData = {
        ...userDt,
        name: name || userDt?.name,
        photoURL: finalPhotoURL,
      };
      await setDoc(doc(db, "users", userDt.uid), updatedData, { merge: true });

      // 🔹 3. State update & cleanup 
      localStorage.setItem("userDt", JSON.stringify(updatedData));
      setUserDt(updatedData);
      setPUrl({});
      setName("");
      setShowPrOpBar(false);
      toast.success("Profile Updated Successfully!");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Update failed, please try again.");
    } finally {
      setUpdateLod(false);
    }
  };

  // ---------------------
  // ✅ Render
  // ---------------------
  return (
    <>
      {/* Main Header */}
      <header className="relative z-[100] w-full h-[55px] bg-surface border-b border-border flex justify-center items-center select-none">
        <section className="w-full flex items-center justify-between px-5">
          <article>
            <div className="min-w-5 min-h-5"></div>
          </article>
          <article>
            <h1 className="text-xl font-bold tracking-tighter text-white">
              DevEMS
            </h1>
          </article>
          <article
            className="cursor-pointer"
            onClick={() => setShowOpBar(!showOpBar)}
          >
            <img
              src={userDt?.photoURL || "https://cdn.auth0.com/avatars/E.png"}
              alt="user"
              className="w-8 h-8 rounded-full border border-accent shadow-[0_0_10px_rgba(var(--accent-rgb),0.3)] object-cover hover:scale-105 transition-transform"
            />
          </article>
        </section>
      </header>

      {/* User Quick Menu Dropdown */}
      <AnimatePresence>
        {showOpBar && (
          <QuickMenu
            userDt={userDt}
            openProfile={openProfile}
            closeProfile={closeProfile}
            setShowOpBar={setShowOpBar}
            handleLogout={handleLogout}
          />
        )}
      </AnimatePresence>

      {/* Profile Modal Overlay */}
      <AnimatePresence>
        {showPrOpBar && (
          <ProfileModalOverlay
            closeProfile={closeProfile}
            name={name}
            setName={setName}
            pUrl={pUrl}
            setPUrl={setPUrl}
            photoURL={
              pUrl?.url ||
              userDt?.photoURL ||
              `https://cdn.auth0.com/avatars/${
                userDt?.name.split("")[0] || "E"
              }.png`
            }
            userDt={userDt}
            handlePrUpdate={handlePrUpdate}
            updateLod={updateLod}
          />
        )}
      </AnimatePresence>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
