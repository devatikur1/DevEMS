import React from "react";
import ListPlaceholder from "./DynamicContent/ListPlaceholder";
import GridPlaceholder from "./DynamicContent/GridPlaceholder";
import GridPgLoading from "./DynamicContent/GridPgLoading";
import ListPgLoading from "./DynamicContent/ListPgLoading";
import clsx from "clsx";

export default function DynamicContent({
  currentView,
  workspacesGetting,
  workspaceData,
}) {
  const skeletonCount = 6;

  return (
    <section className="mt-8 mb-20">
      <h1 className="pb-5 text-text font-semibold text-xl">Workspaces</h1>

      {/* --- GRID VIEW --- */}
      {currentView === "grid" && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {workspaceData.map((project, i) => (
            <GridPlaceholder key={project.id || i} project={project} />
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

      {!workspacesGetting && workspaceData.length === 0 && (
        <div className="text-center py-20 border border-dashed border-border rounded-xl">
          <p className="text-zinc-500 text-sm">No workspaces found.</p>
        </div>
      )}
    </section>
  );
}
