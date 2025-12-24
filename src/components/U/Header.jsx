/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AppContext, auth, db } from "../../context/AppContext";
import { signOut } from "firebase/auth";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import QuickMenu from "./Header/QuickMenu";
import ProfileModalOverlay from "./Header/ProfileModalOverlay";
import { UploadImage } from "../../function/UploadImage";

export default function Header({ className= ""}) {
  // 🔹 useContext context
  const { authId } = useContext(AppContext);
  const { setIsLogged, setUserDt, userDt } = authId;

  // 🔹 router-dom
  const [searchParams, setSearchParams] = useSearchParams();

  // 🔹 State
  const [showOpBar, setShowOpBar] = useState(false);
  const [showPrOpBar, setShowPrOpBar] = useState(
    searchParams.get("profile_setting") === "true" ? true : false
  );
  const [pUrl, setPUrl] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [usernameIsDoText, setUsernameIsDoText] = useState({});
  const [updateLod, setUpdateLod] = useState(false);

  // ---------------------
  // ✅ Show Profile Fns
  // ---------------------

  /* 🔹 1 When Click Profile Btn */
  function openProfile() {
    const params = new URLSearchParams(searchParams);
    params.set("profile_setting", "true");

    setSearchParams(params);
    setShowPrOpBar(true);
  }

  /* 🔹 2 When Close Profile */
  const closeProfile = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("profile_setting");

    setSearchParams(params);
    setShowPrOpBar(false);
  };

  /* 🔹 3 When Enter Website Use Link  */
  useEffect(() => {
    if (searchParams.get("profile_setting") === "true") {
      setShowPrOpBar(true);
    } else {
      setShowPrOpBar(false);
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
  // ✅ On  Update Username
  // ----------------------------
  async function onUpdateUserName(value) {
    setUsernameIsDoText({
      status: "warning",
      text: "Checking...",
    });
    let mainValue = `@${value.replace("@", "").trim().toLowerCase()}`;
    setUsername(mainValue);
    if (value.length < 2) {
      setUsernameIsDoText({ status: "", text: "" });
      return;
    }
    try {
      const docSnap = await getDoc(doc(db, "username", mainValue));

      console.log(docSnap.data());

      if (docSnap.exists()) {
        setUsernameIsDoText({
          status: "warning",
          text: "This username is already taken.",
        });
      } else {
        setUsernameIsDoText({
          status: "success",
          text: "Username is available!",
        });
      }
    } catch (error) {
      console.error("Username check error:", error);
      setUsernameIsDoText({
        status: "error",
        text: "Something went wrong. Please try again.",
      });
    }
  }

  // -----------------------------
  // ✅ Profile Update Function
  // ----------------------------
  const handlePrUpdate = async () => {
    try {
      setUpdateLod(true);
      let finalPhotoURL = userDt?.photoURL;

      // 🔹 1. ImgBB Upload
      if (pUrl.file) {
        const res = await UploadImage(pUrl.file);
        if (!res.isError) {
          finalPhotoURL = res.url;
        } else {
          toast.error(res.msg);
          return;
        }
      }

      //  🔹 Optional When Chage Username The Firestore Update
      if (username !== userDt?.username) {
        await deleteDoc(doc(db, "username", userDt?.username));
        await setDoc(
          doc(db, "username", username),
          {
            uid: userDt?.uid,
          },
          {
            merge: true,
          }
        );
      }

      // 🔹 2. Firestore Database Update
      const updatedData = {
        ...userDt,
        name: name || userDt?.name,
        username: username || userDt?.username,
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
      {" "}
      {/* Main Header */}
      <header
        className={`w-full flex justify-center items-center select-none *:select-none bg-surface ${className}`}
      >
        <section className="w-full flex items-center justify-between px-5 pt-4">
          <article>
            <Link to={"/"} className="min-w-5 min-h-5">
              <svg
                width="20"
                height="20"
                viewBox="0 0 76 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M38 0L76 65H0L38 0Z" fill="white" />
              </svg>
            </Link>
          </article>
          <article>
            <h1 className="text-[1.15rem] font-bold tracking-tighter text-white">
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
              className="w-[30px] h-[30px] rounded-full border border-accent object-cover hover:scale-105 transition-transform"
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
            username={username}
            onUpdateUserName={onUpdateUserName}
            usernameIsDoText={usernameIsDoText}
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
    </>
  );
}
