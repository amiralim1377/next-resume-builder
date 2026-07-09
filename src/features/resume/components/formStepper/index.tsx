"use client";

import { useFormContext } from "react-hook-form";
import { RESUME_STEPS } from "../../constants/steps";
import { useResumeFormContext } from "../ResumeFormProvider/ResumeFormContext";
import { StepObserver } from "./StepObserver";

const FormStepper = () => {
  const { handleStepClick, currentStep } = useResumeFormContext();
  const {
    formState: { errors },
  } = useFormContext();
  console.log("errors in formState :", errors);

  return (
    <div className="flex w-full justify-between">
      {RESUME_STEPS.map((step, index) => (
        <StepObserver
          key={step.id}
          step={step}
          index={index}
          isActive={index === currentStep}
          isLast={index === RESUME_STEPS.length - 1}
          onClick={() => handleStepClick(index)}
        />
      ))}
    </div>
  );
};

export { FormStepper };
