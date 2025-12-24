import React from "react";
import ListPlaceholder from "./DynamicContent/ListPlaceholder";
import GridPlaceholder from "./DynamicContent/GridPlaceholder";

export default function DynamicContent({ currentView, workspaceData }) {
  return (
    <section className="mt-8 mb-20">
      <h1 className="pb-5 us">Workspaces</h1>
      {currentView === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Grid Placeholder Cards */}
          {workspaceData.map((project, i) => (
            <GridPlaceholder key={i} project={project} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col bg-surface border border-border rounded-lg">
          {/* List Placeholder Rows */}
          {workspaceData.map((i) => (
            <ListPlaceholder
              key={i}
              isBorder={workspaceData.length !== i}
              i={i}
            />
          ))}
        </div>
      )}
    </section>
  );
}
