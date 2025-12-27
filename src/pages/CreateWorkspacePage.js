import React, { useContext, useEffect, useState } from "react";
import Header from "../components/U/Header";
import WorkspaceMain from "../components/CreateWorkspace/WorkspaceMain";
import { AppContext, db } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  collection,
  doc,
  getCountFromServer,
  setDoc,
} from "firebase/firestore";
import { UploadImage } from "../function/UploadImage";

// ----------------------------
// ✅ Generate Unique Id
// ----------------------------
function generateUniqueId() {
  if (crypto?.randomUUID) {
    return crypto.randomUUID();
  }
  return (
    Date.now().toString(36) + "-" + Math.random().toString(36).substr(2, 9)
  );
}

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
  const [imgData, setImgData] = useState({});
  const [activeTags, setActiveTags] = useState([]);
  const [category, setCategory] = useState([]);
  const [totalMembers, setTotalMembers] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isCreteing, setIsCreteing] = useState(false);

  // ----------------------------
  // ✅ When Craete Workspace
  // ----------------------------

  async function CraeteWorkspacefn(e) {
    e.preventDefault();
    setIsCreteing(true);
    try {
      let finalPhotoURL =
        "https://cdn-icons-png.flaticon.com/512/919/919851.png";
      // 🔹 1. ImgBB Upload
      if (imgData.file) {
        const res = await UploadImage(imgData.file);
        if (res.isError === false) {
          console.log(res.url);
          finalPhotoURL = res.url;
        } else {
          toast.error(res.msg || "Image Upload Error");
          return;
        }
      }

      // Optional Get Count
      const snap = await getCountFromServer(collection(db, "workspace"));
      const serialsnapCount = snap.data().count;

      // 🔹 2. Firestore Database Update
      const newTeam = {
        id: generateUniqueId(),
        name: title,
        favicon: finalPhotoURL,
        category: category,
        description: description,
        lastUpdate: new Date().toISOString(),
        status: "Active",
        members: 1,
        maxMembers: totalMembers >= 10 ? Number(totalMembers) : "Unlimited",
        lead: userDt?.name || "",
        leadUserName: userDt?.username || "",
        leadId: userDt?.uid || "",
        tags: activeTags,
        performance: "0%",
        projectsCount: 0,
        activeTasks: 0,
        serialid: serialsnapCount,
      };
      console.log(newTeam);

      await setDoc(doc(db, "workspace", newTeam.id), newTeam, {
        merge: true,
      });
      await setDoc(
        doc(db, `${userDt?.username}-workspace`, newTeam.id),
        newTeam,
        {
          merge: true,
        }
      );
      setWorkspace((p) => [newTeam, ...p]);
      toast.success("Profile Updated Successfully!");
      navigate("/u");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Update failed, please try again.");
    } finally {
      setIsCreteing(false);
    }
  }

  useEffect(() => {
    let checkDisabled =
      title.trim() === "" ||
      description.trim() === "" ||
      activeTags.length === 0 ||
      category === "" ||
      !imgData.url;

    setIsDisabled(checkDisabled);
  }, [title, description, activeTags, imgData, category]);

  // ---------------------
  // ✅ Render
  // ---------------------
  return (
    <aside className="relative w-full h-screen overflow-y-auto">
      <Header className={"border-b border-border pb-3.5 sticky top-0 z-50"} />
      <WorkspaceMain
        img={{ imgData, setImgData }}
        tite={{ title, setTitle }}
        des={{ description, setDescription }}
        actTags={{ activeTags, setActiveTags }}
        cat={{ category, setCategory }}
        totalMem={{ totalMembers, setTotalMembers }}
        CraeteWorkspacefn={CraeteWorkspacefn}
        isDisabled={isDisabled}
        isCreteing={isCreteing}
      />
    </aside>
  );
}
