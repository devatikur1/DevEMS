import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Toolbar from "../components/Overview/Toolbar";
import DynamicContent from "../components/Overview/DynamicContent";
import { AppContext } from "../context/AppContext";

export default function OverviewPage() {
  // 🔹 useContext context
  const { overviewdt } = useContext(AppContext);
  const { workspaces, setWorkspace, workspacesGetting, setWorkspacesGetting } =
    overviewdt;

  // 🔹 Router &&  State
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentView, setCurrentView] = useState(
    searchParams.get("view") === "list" ? "list" : "grid"
  );
  const [workspaceData, setworkspaceData] = useState([]);

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

  // ---------------------
  // ✅ Render
  // ---------------------
  return (
    <main className="w-full flex justify-center text-text min-h-screen bg-transparent">
      <div className="w-[95%] xl:w-[90%] 2xl:w-[71%] pt-10">
        {/* 🛠️ Toolbar Section */}
        <Toolbar currentView={currentView} updateView={updateView} />

        {/* 📑 Dynamic Content Area */}
        <DynamicContent
          currentView={currentView}
          workspaceData={workspaceData}
        />
      </div>
    </main>
  );
}
