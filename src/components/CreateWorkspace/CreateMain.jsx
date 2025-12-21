import React from "react";
import UploadImage from "./CreateMain/UploadImage";
import WorkspaceName from "./CreateMain/WorkspaceName";
import CatMaxMemLimit from "./CreateMain/CatMaxMemLimit";
import WorkspaceDes from "./CreateMain/WorkspaceDes";
import WorkspaceTechStack from "./CreateMain/WorkspaceTechStack";
import { Loader2 } from "lucide-react";

export default function CreateMain(props) {
  return (
    <main className="w-full flex justify-center pb-20">
      <section className="w-[98%] xl:w-[90%] 2xl:w-[65%] mt-10 rounded-xl px-4 md:px-8 py-10 shadow-2xl bg-surface border border-boxHover">
        <h1 className="text-3xl font-bold text-center text-white mb-2">
          Create New Workspace
        </h1>
        <p className="text-smtext text-center text-sm mb-10">
          Please provide the details below to set up your team profile.
        </p>

        <form
          onSubmit={props.CraeteWorkspace}
          className="flex flex-col items-center max-w-4xl mx-auto"
        >
          {/* 1. CHANGE IMAGE */}
          <UploadImage img={props.img} />

          {/* 2. Workspace Name */}
          <WorkspaceName tite={props.tite} />

          {/* 3. Category && Maximum Member Limit */}
          <CatMaxMemLimit cat={props.cat} totalMem={props.totalMem} />

          {/* 4. Workspace Description*/}
          <WorkspaceDes des={props.des} />

          {/* 5. Workspace Tech Stack */}
          <WorkspaceTechStack actTags={props.actTags} />

          {/* 6. Create Workspace Workspace*/}
          <button
            disabled={props.isDisabled || props.isCreteing}
            type="submit"
            className="w-full bg-accent hover:bg-accent/90 text-text font-bold py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:pointer-events-none transition-all shadow-lg shadow-accent/20 tracking-widest"
          >
            {props.isCreteing ? (
              <>
                <Loader2 size={19} className="animate-spin text-text" />
                <span>Creating...</span>
              </>
            ) : (
              "Create Workspace"
            )}
          </button>
        </form>
      </section>
    </main>
  );
}
