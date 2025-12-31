import React from "react";
import clsx from "clsx";
import Placeholder from "./DynamicContent/Placeholder";
import GridPgLoading from "./DynamicContent/GridPgLoading";
import ListPgLoading from "./DynamicContent/ListPgLoading";

export default function DynamicContent({
  role,
  searchParams,
  currentView,
  workspacesGetting,
  noWorkspaces,
  workspaceData,
  deleteWorksplace,
}) {
  return (
    <section className="mt-8 mb-20 overflow-hidden">
      <h1 className="pb-5 text-text font-semibold text-xl">Workspaces</h1>
      {/* VIEW */}
      <ul
        className={clsx(
          "overflow-hidden",
          currentView === "grid" &&
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5",
          currentView === "list" &&
            "flex flex-col bg-surface border border-border rounded-lg"
        )}
      >
        {workspaceData.length > 0 && workspaceData.map((project, i) => (
          <Placeholder
            key={project.id || i}
            project={project}
            isFast={i === 0}
            isLast={i === workspaceData.length + Number(workspacesGetting) - 1}
            role={role}
            searchParams={searchParams}
            deleteWorksplace={deleteWorksplace}
            isGrid={currentView === "grid" ? true : false}
          />
        ))}
        {currentView === "grid" &&
          workspacesGetting &&
          [...Array(10)].map((_, i) => <GridPgLoading key={i} />)}

        {currentView === "list" &&
          workspacesGetting &&
          [...Array(10)].map((_, i) => (
            <ListPgLoading
              key={i}
              isFast={workspaceData.length === 0 && i === 0}
              isLast={i === 9}
            />
          ))}
      </ul>

      {noWorkspaces && workspaceData.length === 0 && (
        <div className="text-center py-20 border border-dashed border-border rounded-xl">
          <p className="text-zinc-500 text-sm">No workspaces found.</p>
        </div>
      )}
    </section>
  );
}
