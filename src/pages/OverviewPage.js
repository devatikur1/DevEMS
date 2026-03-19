/* eslint-disable no-throw-literal */
/* eslint-disable react-hooks/exhaustive-deps */
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
import { deleteDoc, doc, orderBy, where } from "firebase/firestore";
import toast from "react-hot-toast";
import useFunction from "../hooks/useFunction";
import useFirestore from "../hooks/useFirestore";

export default function OverviewPage() {
  // 🔹 useContext context
  const { overviewdt, authId, containerRef } = useContext(AppContext);
  const { userDt } = authId;
  const { workspaces, setWorkspace } = overviewdt;

  // 🔹 Router &&  State
  const [searchParams, setSearchParams] = useSearchParams();
  const [workspaceData, setworkspaceData] = useState([]);
  const [showSortMenuBar, setShowSortMenuBar] = useState(false);

  // 🔹 Workplace-State
  const [currentUid, setCurrentUid] = useState("");

  const [workspacesGetting, setWorkspacesGetting] = useState(false);
  const [lastWorkspaces, setLastWorkspace] = useState(null);
  const [totalWorkplace, setTotalWorkplace] = useState(0);
  const [importedWorkplace, setImportedWorkplace] = useState(0);

  // 🔹 Ref
  const scrollTriggeredRef = useRef(false);

  // 🔹 Custom Hook
  const { paramsUrl } = useFunction();

  const { getData, getCount } = useFirestore();

  useEffect(() => {
    document.title = "DevEMS - Overview";
    let refarene = searchParams.get("ref") || userDt?.username;
    console.log(refarene);

    // 🔹 Get Workspaces Data
    if (refarene) {
      setWorkspacesGetting(true);
      setWorkspace([]);
      (async () => {
        try {
          // 1. Get User Uid
          let uid;
          if (refarene === userDt?.username) {
            uid = userDt?.uid;
          } else {
            const getDataa = await getData({
              collId: "username",
              docId: refarene,
            });
            if (getDataa.status && getDataa.data === null)
              throw { code: "No Workspace" };
            if (!getDataa.status) throw { code: "No Workspace" };
            uid = getDataa.data?.uid;
          }

          setCurrentUid(uid);
          console.log(uid);

          // 2. Get Collection er Count
          const { status, count, error } = await getCount({
            collId: "workspace",
            whereQuery: [where("leadUid", "==", uid)],
          });
          if (!status) throw { code: error };
          setTotalWorkplace(count);

          // 3. Then Check count < 0 tahole Get Data
          if (count > 0) {
            const { status, data, lastOne, error } = getData({
              collId: "workspace",
              isQuery: true,
              whereQuery: [where("leadUid", "==", uid)],
              limitt: 10,
            });
            console.log(data);
            
            if (status) {
              setImportedWorkplace(data.length);
              setWorkspace(data);
              if (count > data.length) {
                setLastWorkspace(lastOne);
              } else {
                setLastWorkspace(null);
              }
            } else throw { code: error };
          } else throw { code: "No Workspace" };
        } catch (error) {
          console.log(error);
          setWorkspace([]);
          setLastWorkspace(null);
        } finally {
          setWorkspacesGetting(false);
        }
      })();
    }
  }, [userDt?.uid]);

  // -------------------------
  // ✅ Toolbar Handlers
  // -------------------------

  /* 🔹 View Change Function */
  const updateView = (newView) => {
    paramsUrl({
      get: searchParams,
      set: setSearchParams,
      key: "view",
      value: newView,
    });
    setShowSortMenuBar(false);
  };

  /* 🔹 Sort Change Function */
  const updateSort = (newSort) => {
    paramsUrl({
      get: searchParams,
      set: setSearchParams,
      key: "sort",
      value: newSort,
    });
    setShowSortMenuBar(false);
  };

  /* 🔹 Direction Change Function */
  const updateDirection = (newDri) => {
    paramsUrl({
      get: searchParams,
      set: setSearchParams,
      key: "direction",
      value: newDri,
    });
    setShowSortMenuBar(false);
  };

  /* 🔹 Direction Change Function */
  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (value !== "") {
      paramsUrl({
        get: searchParams,
        set: setSearchParams,
        key: "q",
        value: value,
      });
    } else {
      paramsUrl({
        type: "del",
        get: searchParams,
        set: setSearchParams,
        key: "q",
      });
    }
  };

  // ----------------------------------------------------
  // ✅ Sync URL with State & Handle Sorting (Logic Fix)
  // ----------------------------------------------------
  useEffect(() => {
    // 1. Sync States from URL
    const sort =
      searchParams.get("sort") === "name"
        ? "name"
        : searchParams.get("sort") === "score"
          ? "score"
          : "date";
    const direction = searchParams.get("direction") === "desc" ? "desc" : "asc";
    const queryTerm = searchParams.get("q") || "";

    let sortedData = [...workspaces];

    sortedData = workspaces.filter((item) =>
      item.name.toLowerCase().includes(queryTerm.toLowerCase()),
    );

    // 2. Sorting Logic
    if (sort === "name") {
      sortedData.sort((a, b) =>
        direction === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name),
      );
    } else if (sort === "score") {
      sortedData.sort((a, b) => {
        const scoreA = parseFloat(a.performance);
        const scoreB = parseFloat(b.performance);
        return direction === "asc" ? scoreA - scoreB : scoreB - scoreA;
      });
    } else {
      sortedData.sort((a, b) =>
        direction === "asc" ? a.serialid - b.serialid : b.serialid - a.serialid,
      );
    }
    setworkspaceData(sortedData);
  }, [searchParams, workspaces]);

  // -------------------------
  // ✅ Delete Worksplace Fn
  // -------------------------

  const deleteWorksplace = async (id) => {
    try {
      toast.promise(
        async () => {
          await deleteDoc(doc(db, "workspace", id));
          setWorkspace((prev) => prev.filter((wp) => wp.id !== id));
        },
        {
          loading: "Worksplace Deleteing...",
          success: <span>Worksplace Successfully!</span>,
          error: <span>Could not Deleted Worksplace .</span>,
        },
      );
    } catch (error) {
      toast.error(error);
    }
  };

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
          const { status, data, lastOne, error } = getData({
            collId: "workspace",
            isQuery: true,
            whereQuery: [where("leadUid", "==", currentUid)],
            limitt: 11,
            startAfterr: lastWorkspaces,
          });
          if (status) {
            let newDataCount = importedWorkplace + data.length;
            setImportedWorkplace(newDataCount);
            setWorkspace(data);
            if (totalWorkplace > newDataCount) {
              setLastWorkspace(lastOne);
            } else {
              setLastWorkspace(null);
            }
          } else throw { code: error };
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
      importedWorkplace,
      lastWorkspaces,
      setWorkspace,
      totalWorkplace,
      userDt?.uid,
    ],
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
    <main className="relative z-50 w-full flex justify-center text-text min-h-screen bg-transparent">
      <figure className="w-[95%] xl:w-[90%] 2xl:w-[71%] pt-10">
        {/* Toolbar Section */}
        <Toolbar
          updateView={updateView}
          updateSort={updateSort}
          updateDirection={updateDirection}
          handleSearchChange={handleSearchChange}
          showSortMenuBar={showSortMenuBar}
          setShowSortMenuBar={setShowSortMenuBar}
        />

        {/* Dynamic Content Area */}
        <DynamicContent
          workspacesGetting={workspacesGetting}
          workspaceData={workspaceData}
          role={userDt?.role}
          searchParams={searchParams}
          deleteWorksplace={deleteWorksplace}
        />
      </figure>
    </main>
  );
}
