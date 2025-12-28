import React from "react";
import ListPlaceholder from "./DynamicContent/ListPlaceholder";
import GridPlaceholder from "./DynamicContent/GridPlaceholder";
import GridPgLoading from "./DynamicContent/GridPgLoading";
import ListPgLoading from "./DynamicContent/ListPgLoading";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

export default function DynamicContent({
  role,
  searchParams,
  currentView,
  workspacesGetting,
  noWorkspaces,
  workspaceData,
  deleteWorksplace,
}) {
  const skeletonCount = 6;
  const navigte = useNavigate();
  return (
    <section className="mt-8 mb-20 overflow-hidden">
      <h1 className="pb-5 text-text font-semibold text-xl">Workspaces</h1>

      {/* --- GRID VIEW --- */}
      {currentView === "grid" && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 overflow-hidden">
          {workspaceData.map((project, i) => (
            <GridPlaceholder
              key={project.id || i}
              project={project}
              role={role}
              searchParams={searchParams}
              deleteWorksplace={deleteWorksplace}
            />
          ))}
          {workspacesGetting &&
            [...Array(skeletonCount)].map((_, i) => <GridPgLoading key={i} />)}
        </ul>
      )}

      {/* --- LIST VIEW --- */}
      {currentView === "list" && (
        <ul
          className={clsx(
            "flex flex-col bg-surface border border-border rounded-lg overflow-hidden",
            workspaceData.length === 0 && "border-none"
          )}
        >
          {workspaceData.map((project, i) => (
            <ListPlaceholder
              key={project.id || i}
              project={project}
              isFast={i === 0}
              isLast={i === workspaceData.length - 1}
              role={role}
              searchParams={searchParams}
              deleteWorksplace={deleteWorksplace}
            />
          ))}

          {workspacesGetting &&
            [...Array(skeletonCount)].map((_, i) => (
              <ListPgLoading
                key={i}
                isFast={i === 0}
                isLast={i === skeletonCount - 1}
              />
            ))}
        </ul>
      )}

      {noWorkspaces && workspaceData.length === 0 && (
        <div className="text-center py-20 border border-dashed border-border rounded-xl">
          <p className="text-zinc-500 text-sm">No workspaces found.</p>
        </div>
      )}
    </section>
  );
}
