/* eslint-disable no-throw-literal */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AppContext, db } from "../../context/AppContext";
import { deleteDoc, doc } from "firebase/firestore";
import { AnimatePresence } from "framer-motion";
import QuickMenu from "./Header/QuickMenu";
import ProfileModalOverlay from "./Header/ProfileModalOverlay";
import uploadImageFn from "../../function/UploadImageFn";
import useAuthProvider from "../../hooks/useAuthProvider";
import { getErrorMessage } from "../../function/getErrorMessage";
import { findUniqueUsername } from "../../function/findUniqueUsername";
import useFirestore from "../../hooks/useFirestore";
import delParamsOnUrl from "../../function/delParamsOnUrl";

export default function Header({ className = "" }) {
  // 🔹 useContext context
  const { authId } = useContext(AppContext);
  const { setUserDt, userDt } = authId;

  // 🔹 router-dom
  const [searchParams, setSearchParams] = useSearchParams();

  // 🔹 State
  const [quickMenuDetails, setQuickMenuDetails] = useState({
    show: false,
    x: 0,
    y: 0,
  });

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [imgData, setImgData] = useState({
    file: {},
    url: "",
  });
  const [authMsg, setAuthMsg] = useState({
    status: false,
    text: "",
    type: "suc",
  });
  const [loding, setLoding] = useState(false);

  // 🔹 Cutom Hook
  const { logOut } = useAuthProvider(setAuthMsg);
  const { setData } = useFirestore();

  // -----------------------------
  // ✅ Close Profile
  // ----------------------------
  const closeProfile = () => {
    setName("");
    setImgData("");
    setImgData({
      file: {},
      url: "",
    });
    delParamsOnUrl({
      get: searchParams,
      set: setSearchParams,
      key: "profile_setting",
      value: "true",
    });
  };

  // -----------------------------
  // ✅ Profile Update Function
  // ----------------------------
  const handlePrUpdate = async () => {
    try {
      setLoding(true);
      setAuthMsg({ status: false, text: "", type: "suc" });
      let finalPhotoURL = userDt?.photoURL;

      // 🔹 1. ImgBB Upload
      if (imgData?.url) {
        if (!imgData?.file) throw { code: "custom/image-not-select" };
        const imgDt = await uploadImageFn(imgData.file);
        if (imgDt.isError) throw { code: imgDt.msg };
        finalPhotoURL = imgDt.url;
      }

      const userNameIsUniqe = await findUniqueUsername(`@${username}`);

      //  🔹 Optional When Chage Username The Firestore Update
      if (userNameIsUniqe) {
        await deleteDoc(doc(db, "username", userDt?.username));
        await setData({
          collId: "username",
          docId: `@${username}`,
          data: { email: userDt?.email },
        });
      }

      // 🔹 2. Firestore Database Update
      const updatedData = {
        ...userDt,
        name: name.trim() || userDt?.name,
        username: `@${username}` || userDt?.username,
        photoURL: finalPhotoURL,
      };
      await setData({
        collId: "users",
        docId: userDt?.email,
        data: updatedData,
      });

      // 🔹 3. State update & cleanup
      localStorage.setItem("userDt", JSON.stringify(updatedData));
      setUserDt(updatedData);
      setName("");
      closeProfile();
    } catch (error) {
      setAuthMsg({
        status: true,
        text: getErrorMessage(error),
        type: "err",
      });
    } finally {
      setLoding(false);
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
        className={`relative z-[100] w-full flex justify-center items-center select-none *:select-none text-textPrimary bg-surface ${className}`}
      >
        <section className="w-full flex items-center justify-between px-5 pt-4">
          <article>
            <Link to={"/"} className="min-w-4 min-h-4 md:min-w-5 md:min-h-5">
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
            <h1 className="text-[1.1rem] md:text-[1.15rem] font-bold tracking-tighter text-textPrimary">
              DevEMS
            </h1>
          </article>
          <article
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              const rect = e.currentTarget.getBoundingClientRect();
              setQuickMenuDetails((p) => ({
                show: !p.show,
                x: rect.top + rect.height + 10,
                y: Math.max(8, rect.right - 235),
              }));
            }}
          >
            <img
              src={
                userDt?.photoURL ||
                `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
                  userDt?.name
                )}`
              }
              alt={userDt?.name || "user"}
              className="size-[25px] md:size-[30px]  rounded-full border border-accent object-cover hover:scale-105 transition-transform"
            />
          </article>
        </section>
      </header>
      {/* User Quick Menu Dropdown */}
      <AnimatePresence>
        {quickMenuDetails.show && (
          <QuickMenu
            userDt={userDt}
            quickMenuDetails={quickMenuDetails}
            setQuickMenuDetails={setQuickMenuDetails}
            logOut={logOut}
          />
        )}
      </AnimatePresence>
      {/* Profile Modal Overlay */}
      <AnimatePresence>
        {searchParams.get("profile_setting") === "true" && (
          <ProfileModalOverlay
            name={name}
            setName={setName}
            username={username}
            setUsername={setUsername}
            authMsg={authMsg}
            imgData={imgData}
            setImgData={setImgData}
            photoURL={
              imgData?.url ||
              userDt?.photoURL ||
              `https://cdn.auth0.com/avatars/${
                userDt?.name.split("")[0] || "E"
              }.png`
            }
            userDt={userDt}
            handlePrUpdate={handlePrUpdate}
            loding={loding}
            closeProfile={closeProfile}
          />
        )}
      </AnimatePresence>
    </>
  );
}
