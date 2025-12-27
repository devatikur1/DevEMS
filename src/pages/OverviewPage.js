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

  const handleScrollChange = useCallback(async (value) => {
    console.log(value);

    if (
      value > 0.85 &&
      Array.from(lastWorkspaces).length === 0 &&
      !scrollTriggeredRef.current
    ) {
      scrollTriggeredRef.current = true;
      setWorkspacesGetting(true);

      try {
        const collectionRef = collection(db, `${userDt?.username}-workspace`);

        const Limit = 2;
        const q = query(
          collectionRef,
          startAfter(lastWorkspaces),
          orderBy("serialid", "asc"),
          limit(Limit)
        );
        const querySnapshot = await getDocs(q);
        const wdata = querySnapshot.docs.map((doc) => doc.data());
        if (wdata.length === Limit) {
          setLastWorkspace(querySnapshot.docs[querySnapshot.docs.length - 1]);
        }
        setWorkspace((p) => [...p, ...wdata]);
      } catch (error) {
        console.log(error);
      } finally {
        setWorkspacesGetting(false);
      }
    }
  }, []);

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
        />
      </div>
    </main>
  );
}
