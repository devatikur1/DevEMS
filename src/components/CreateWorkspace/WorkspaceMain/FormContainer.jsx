import React from "react";
import { Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import UploadImg from "../../custom/UploadImg";
import WorkspaceName from "./form/WorkspaceName";
import CatMaxMemLimit from "./form/CatMaxMemLimit";
import WorkspaceDes from "./form/WorkspaceDes";
import WorkspaceTechStack from "./form/WorkspaceTechStack";

export default function FormContainer({
  totalSteps,
  setCurrentStep,
  currentStep,
  props,
  isStepValid,
}) {
  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (currentStep === totalSteps) {
          isStepValid() && props.CraeteWorkspacefn(e);
        } else {
          isStepValid() && nextStep();
        }
      }}
      className="space-y-10"
    >
      {/* STEP 1: Identity */}
      {currentStep === 1 && (
        <div className="flex flex-col items-center space-y-8 animate-in fade-in zoom-in-95 duration-500">
          <UploadImg img={props.img?.imgData} setImg={props.img?.setImgData} />
          <div className="w-full">
            <WorkspaceName tite={props.tite} />
          </div>
        </div>
      )}

      {/* STEP 2: Capacity */}
      {currentStep === 2 && (
        <div className="w-full space-y-8 animate-in fade-in zoom-in-95 duration-500">
          <CatMaxMemLimit cat={props.cat} totalMem={props.totalMem} />
          <WorkspaceDes des={props.des} />
        </div>
      )}

      {/* STEP 3: Content */}
      {currentStep === 3 && (
        <div className="w-full space-y-8 animate-in fade-in zoom-in-95 duration-500">
          <WorkspaceTechStack actTags={props.actTags} />
        </div>
      )}

      {/* 🔹 Action Buttons */}
      <div className="flex flex-col gap-2 w-full pt-5">
        <button
          disabled={!isStepValid() || props.isCreteing}
          type="submit"
          className="relative group mt-3 w-full h-12 text-textPrimary bg-accent font-medium rounded-xl shadow-lg border border-border active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-accent/60 flex items-center justify-center gap-2 overflow-hidden"
        >
          {/* Shine Animation inside button */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shine duration-700" />

          {props.isCreteing ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              <span className="tracking-widest uppercase text-xs">
                Creating...
              </span>
            </>
          ) : (
            <>
              <span className="tracking-wider text-sm font-semibold">
                {currentStep === totalSteps ? "Launch Workspace" : "Continue"}
              </span>
              {currentStep !== totalSteps && (
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              )}
            </>
          )}
        </button>

        {/* 2. Secondary Action: Go Back */}
        {currentStep > 1 && (
          <button
            type="button"
            onClick={prevStep}
            className="mt-2 w-full h-12 text-textPrimary bg-surfaceSoft hover:bg-boxHover font-medium rounded-xl shadow-lg border border-border hover:border-hover active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform duration-300"
            />
            <span className="font-medium tracking-wide">Go back</span>
          </button>
        )}
      </div>
    </form>
  );
}
