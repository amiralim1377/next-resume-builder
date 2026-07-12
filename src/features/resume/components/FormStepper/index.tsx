"use client";

import { RESUME_STEPS } from "../../constants/steps";
import { StepObserver } from "./StepObserver";
import { useStepper } from "../ResumeFormWrapper/StepperContext";

const FormStepper = () => {
  const { handleStepClick, currentStep } = useStepper();

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
