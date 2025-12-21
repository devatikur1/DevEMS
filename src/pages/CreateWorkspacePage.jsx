import React, { useContext, useEffect, useState } from "react";
import Header from "../components/U/Header";
import CreateMain from "../components/CreateWorkspace/CreateMain";
import { AppContext, db } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { collection, doc, getCountFromServer, setDoc } from "firebase/firestore";

// ----------------------------
// ✅ generate Unique Id
// ----------------------------
function generateUniqueId() {
  if (crypto?.randomUUID) {
    return crypto.randomUUID();
  }
  return (
    Date.now().toString(36) + "-" + Math.random().toString(36).substr(2, 9)
  );
}

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

  async function CraeteWorkspace(e) {
    e.preventDefault();
    setIsCreteing(true);
    try {
      let finalPhotoURL;
      // 🔹 1. ImgBB Upload
      if (imgData.file) {
        const formData = new FormData();
        formData.append("image", imgData.file);

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

      // Optional Get Count
      const ssnap = await getCountFromServer(collection(db, `${userDt?.username}-workspace`));
      const ssnapCount = ssnap.data().count
      const msnap = await getCountFromServer(collection(db, "workspace"));
      const msnapCount = msnap.data().count
      
      // 🔹 2. Firestore Database Update
      const newTeam = {
        id: generateUniqueId(),
        name: title,
        favicon:
          finalPhotoURL ||
          "https://cdn-icons-png.flaticon.com/512/919/919851.png",
        category: category,
        description: description,
        lastUpdate: new Date().toISOString(),
        status: "Active",
        members: 1,
        maxMembers: totalMembers >= 10 ? Number(totalMembers) : "Unlimited",
        leadName: userDt?.name || "",
        leadUserName: userDt?.username || "",
        leadUid: userDt?.uid || "",
        tags: activeTags,
        performance: "0%",
        projectsCount: 0,
        mid: msnapCount,
        sid: ssnapCount,
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
      setWorkspace((p) => [newTeam ,...p]);
      toast.success("Profile Updated Successfully!");
      navigate("/u")
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Update failed, please try again.");
    } finally {
      setIsCreteing(false)
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
      <Header className={"border-b border-border pb-4 sticky top-0 z-50"} />
      <CreateMain
        img={{ imgData, setImgData }}
        tite={{ title, setTitle }}
        des={{ description, setDescription }}
        actTags={{ activeTags, setActiveTags }}
        cat={{ category, setCategory }}
        totalMem={{ totalMembers, setTotalMembers }}
        CraeteWorkspace={CraeteWorkspace}
        isDisabled={isDisabled}
        isCreteing={isCreteing}
      />
    </aside>
  );
}
