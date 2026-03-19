/* eslint-disable no-throw-literal */
import React, { useContext, useEffect, useState } from "react";
import Header from "../components/custom/Header";
import WorkspaceMain from "../components/CreateWorkspace/WorkspaceMain";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import useFunction from "../hooks/useFunction";
import useFirestore from "../hooks/useFirestore";

// -------------------
// ✅ Main Fn
// -------------------
export default function CreateWorkspacePage() {
  // 🔹 useContext context
  const { authId, overviewdt } = useContext(AppContext);
  const { userDt } = authId;
  const { setWorkspace } = overviewdt;

  // 🔹 State && useNavigate
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgData, setImgData] = useState({ file: null, url: null });
  const [activeTags, setActiveTags] = useState([]);
  const [category, setCategory] = useState("");
  const [totalMembers, setTotalMembers] = useState(0);

  const [isCreteing, setIsCreteing] = useState(false);
  const [error, setError] = useState({
    status: false,
    text: "",
    type: "suc",
  });

  // 🔹 Custom Hook
  const { uploadImageFn, getErrMsg, genWSID } = useFunction();
  const { setData, getCount } = useFirestore();

  // -----------------------------
  // ✅ Chage Tilte base on Load
  // ----------------------------
  useEffect(() => {
    document.title = "DevEMS - Create Workspace";
  }, []);

  // ----------------------------
  // ✅ When Craete Workspace
  // ----------------------------
  async function CraeteWorkspacefn(e) {
    e.preventDefault();
    setIsCreteing(true);
    try {
      let finalPhotoURL;

      // 🔹 1. ImgBB Upload
      if (imgData.file !== null) {
        const { isError, url, msg } = await uploadImageFn(imgData.file);
        if (!isError) {
          finalPhotoURL = url;
        } else {
          console.log(getErrMsg(msg));
          finalPhotoURL = `https://cdn.auth0.com/avatars/${title.slice(0, 1) || 1}.png`;
        }
      }

      // Optional Get Count
      const { status, count } = await getCount({ collId: "workspace" });
      if (!status) throw { code: "error" };
      const serialsnapCount = count;

      // 🔹 2. Firestore Database Update
      const newTeam = {
        id: await genWSID(),
        name: title,
        favicon: finalPhotoURL,
        category: category,
        description: description,
        lastUpdate: new Date().toISOString(),
        status: "Active",
        members: 1,
        maxMembers: totalMembers > 10 ? Number(totalMembers) : "Unlimited",
        lead: userDt?.name || "",
        leadEmail: userDt?.email || "",
        leadUid: userDt?.uid || "",
        tags: activeTags,
        performance: "0%",
        projectsCount: 0,
        activeTasks: 0,
        "WS-ID": serialsnapCount,
      };

      const setDataa = await setData({
        collId: "workspace",
        docId: newTeam?.id,
        data: newTeam,
      });
      if (!setDataa.status) throw { code: error };
      setWorkspace((p) => [newTeam, ...p]);
      setTimeout(async () => {
        navigate("/u");
      }, 2000);
    } catch (error) {
      setError({
        status: true,
        text: getErrMsg(error),
        type: "err",
      });
    } finally {
      setTimeout(async () => {
        setIsCreteing(false);
      }, 1998);
    }
  }

  // ---------------------
  // ✅ Render
  // ---------------------
  return (
    <aside className="relative w-full h-screen overflow-y-auto">
      <Header
        className={"border-b border-border pb-3.5 sticky top-0 z-50"}
        link={"/u"}
        isLogo={false}
        isLogoName={false}
        text={"New Project"}
      />
      <WorkspaceMain
        img={{ imgData, setImgData }}
        tite={{ title, setTitle }}
        des={{ description, setDescription }}
        actTags={{ activeTags, setActiveTags }}
        cat={{ category, setCategory }}
        totalMem={{ totalMembers, setTotalMembers }}
        CraeteWorkspacefn={CraeteWorkspacefn}
        isCreteing={isCreteing}
      />
    </aside>
  );
}
