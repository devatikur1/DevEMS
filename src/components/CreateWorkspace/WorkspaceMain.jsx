import React, { useState } from "react";
import ProgressBar from "./WorkspaceMain/ProgressBar";
import Heading from "./WorkspaceMain/Heading";
import FormContainer from "./WorkspaceMain/FormContainer";

export default function WorkspaceMain(props) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (props.tite?.title || "").trim().length > 0;
      case 2:
        return (
          (props.cat?.category || "") !== "" &&
          (props.totalMem?.totalMembers || 0) > 0
        );
      case 3:
        return (props.des?.description || "").trim().length >= 10;
      default:
        return false;
    }
  };

  return (
    <main className="bg-bg flex flex-col items-center justify-start pt-12 pb-20 px-4">
      {/* 🔹 Progress Bar Section */}
      <ProgressBar totalSteps={totalSteps} currentStep={currentStep} />

      {/* 🔹 Heading Section */}
      <Heading totalSteps={totalSteps} currentStep={currentStep} />

      {/* 🔹 Form Container (Clean Surface) */}
      <section className="w-full max-w-2xl">
        <FormContainer
          totalSteps={totalSteps}
          setCurrentStep={setCurrentStep}
          currentStep={currentStep}
          props={props}
          isStepValid={isStepValid}
        />
      </section>
    </main>
  );
}
