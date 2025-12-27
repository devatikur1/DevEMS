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
    setNoWorkspace,
    workspacesGetting,
    setWorkspacesGetting,
    lastWorkspaces,
    setLastWorkspace,
  } = overviewdt;

  // 🔹 Router &&  State
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentView, setCurrentView] = useState("grid");
  const [currentSort, setCurrentSort] = useState("date");
  const [currentDirection, setCurrentDirection] = useState("asc");
  const [workspaceData, setworkspaceData] = useState([]);
  const [showSortMenuBar, setShowSortMenuBar] = useState(false);

  // 🔹 Ref
  const scrollTriggeredRef = useRef(false);

  // -----------------------------
  // ✅ Chage Tilte base on Load
  // ----------------------------
  useEffect(() => {
    document.title = "DevEMS - Workspaces";
  }, []);

  // -------------------------
  // ✅ Toolbar Handlers
  // -------------------------

  /* 🔹 View Change Function */
  const updateView = (newView) => {
    const params = new URLSearchParams(searchParams);
    params.set("view", newView);
    setSearchParams(params);
    setShowSortMenuBar(false);
  };

  /* 🔹 Sort Change Function */
  const updateSort = (newSort) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", newSort);
    setSearchParams(params);
    setShowSortMenuBar(false);
  };

  /* 🔹 Direction Change Function */
  const updateDirection = (newDri) => {
    const params = new URLSearchParams(searchParams);
    params.set("direction", newDri);
    setSearchParams(params);
    setShowSortMenuBar(false);
  };

  /* 🔹 Direction Change Function */
  const handleSearchChange = (e) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);
    if (value !== "") {
      params.set("q", value);
    } else {
      params.delete("q");
    }
    setSearchParams(params);
  };

  // ----------------------------------------------------
  // ✅ Sync URL with State & Handle Sorting (Logic Fix)
  // ----------------------------------------------------
  useEffect(() => {
    // 1. Sync States from URL
    const view = searchParams.get("view") === "list" ? "list" : "grid";
    const sort =
      searchParams.get("sort") === "name"
        ? "name"
        : searchParams.get("sort") === "score"
        ? "score"
        : "date";
    const direction = searchParams.get("direction") === "desc" ? "desc" : "asc";
    const queryTerm = searchParams.get("q") || "";

    setCurrentView(view);
    setCurrentSort(sort);
    setCurrentDirection(direction);

    let sortedData = [...workspaces];

    
      sortedData = workspaces.filter((item) =>
        item.name.toLowerCase().includes(queryTerm.toLowerCase())
      );
    

    // 2. Sorting Logic
    if (sort === "name") {
      sortedData.sort((a, b) =>
        direction === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
    } else if (sort === "score") {
      sortedData.sort((a, b) => {
        const scoreA = parseFloat(a.performance);
        const scoreB = parseFloat(b.performance);
        return direction === "asc" ? scoreA - scoreB : scoreB - scoreA;
      });
    } else {
      sortedData.sort((a, b) =>
        direction === "asc" ? a.serialid - b.serialid : b.serialid - a.serialid
      );
    }
    setworkspaceData(sortedData);
    setNoWorkspace(sortedData.length === 0);
  }, [searchParams, workspaces, currentDirection, setNoWorkspace]);

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
        <Toolbar
          currentView={currentView}
          currentSort={currentSort}
          currentDirection={currentDirection}
          updateView={updateView}
          updateSort={updateSort}
          updateDirection={updateDirection}
          showSortMenuBar={showSortMenuBar}
          setShowSortMenuBar={setShowSortMenuBar}
          searchParams={searchParams}
          handleSearchChange={handleSearchChange}
        />

        {/* Dynamic Content Area */}
        <DynamicContent
          currentView={currentView}
          workspacesGetting={workspacesGetting}
          workspaceData={workspaceData}
          noWorkspaces={noWorkspaces}
          role={userDt?.role}
          searchParams={searchParams}
        />
      </div>
    </main>
  );
}
