import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";
import Toolbar from "../components/Overview/Toolbar";
import DynamicContent from "../components/Overview/DynamicContent";
import { AppContext, db } from "../context/AppContext";
import { useScroll } from "framer-motion";
import {
  collection,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";

export default function OverviewPage() {
  // 🔹 useContext context
  const { overviewdt, authId, containerRef } = useContext(AppContext);
  const { userDt } = authId;
  const {
    workspaces,
    setWorkspace,
    noWorkspaces,
    workspacesGetting,
    setWorkspacesGetting,
    lastWorkspaces,
    setLastWorkspace,
  } = overviewdt;

  // 🔹 Router &&  State
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentView, setCurrentView] = useState(
    searchParams.get("view") === "list" ? "list" : "grid"
  );
  const [workspaceData, setworkspaceData] = useState([]);

  // 🔹 Ref
  const scrollTriggeredRef = useRef(null);

  // -----------------------------
  // ✅ Chage Tilte base on Load
  // ----------------------------
  useEffect(() => {
    document.title = "DevEMS - Workspaces";
  }, []);

  // --------------------------------------------------
  // ✅ Change workspaces Data depent of workspaces
  // -------------------------------------------------
  useEffect(() => {
    console.log(workspaces);
    setworkspaceData(workspaces);
  }, [workspaces]);

  // -------------------------
  // ✅ View Change Function
  // -------------------------
  const updateView = (newView) => {
    const params = new URLSearchParams(searchParams);
    params.set("view", newView);
    setSearchParams(params);
  };

  // -------------------------
  // ✅ Sync URL with State
  // -------------------------
  useEffect(() => {
    const view = searchParams.get("view");
    if (view === "list") {
      setCurrentView("list");
    } else {
      setCurrentView("grid");
    }
  }, [searchParams]);

  // --------------------------------------
  // ✅ INFINITE SCROLL FOR SUBSCRIPTIONS
  // --------------------------------------
  const { scrollYProgress } = useScroll({ container: containerRef });

  const handleScrollChange = useCallback(
    async (value) => {
      if (
        value > 0.85 &&
        lastWorkspaces !== null &&
        !scrollTriggeredRef.current
      ) {
        scrollTriggeredRef.current = true;
        setWorkspacesGetting(true);

        try {
          const collectionRef = collection(db, `${userDt?.username}-workspace`);
          // 1. Get Collection er Count
          const countsnap = await getCountFromServer(collectionRef);
          const count = countsnap.data().count;

          // 3. Then Check count < 0 tahole Get Data
          if (count - workspaceData?.length > 0) {
            const Limit = 11;
            const q = query(
              collectionRef,
              orderBy("serialid", "asc"),
              limit(Limit),
              startAfter(lastWorkspaces)
            );
            const querySnapshot = await getDocs(q);
            const wdata = querySnapshot.docs.map((doc) => doc.data());
            if (wdata.length === Limit) {
              setLastWorkspace(
                querySnapshot.docs[querySnapshot.docs.length - 1]
              );
            } else {
              setLastWorkspace(null);
            }
            setWorkspace((p) => [...p, ...wdata]);
          } else {
            setWorkspace([]);
            setLastWorkspace(null);
          }
        } catch (error) {
          console.log(error);
          setWorkspace([]);
          setLastWorkspace(null);
        } finally {
          setWorkspacesGetting(false);
          setTimeout(() => {
            scrollTriggeredRef.current = false;
          }, 1000);
        }
      }
    },
    [
      lastWorkspaces,
      setLastWorkspace,
      setWorkspace,
      setWorkspacesGetting,
      userDt?.username,
      workspaceData.length,
    ]
  );

  useEffect(() => {
    if (!scrollYProgress) return;
    const unsubscribe = scrollYProgress.on("change", handleScrollChange);
    return () => unsubscribe?.();
  }, [scrollYProgress, handleScrollChange]);

  // ---------------------
  // ✅ Render
  // ---------------------
  return (
    <main className="w-full flex justify-center text-text min-h-screen bg-transparent">
      <div className="w-[95%] xl:w-[90%] 2xl:w-[71%] pt-10">
        {/* Toolbar Section */}
        <Toolbar currentView={currentView} updateView={updateView} />

        {/* Dynamic Content Area */}
        <DynamicContent
          currentView={currentView}
          workspacesGetting={workspacesGetting}
          workspaceData={workspaceData}
          noWorkspaces={noWorkspaces}
          role={userDt?.role}
        />
      </div>
    </main>
  );
}
