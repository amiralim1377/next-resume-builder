"use client";

import { RESUME_STEPS } from "../../constants/steps";
import { StepObserver } from "./StepObserver";

const FormStepper = () => {
  return (
    <div className="stepper-container grid w-full grid-cols-6 gap-4">
      {RESUME_STEPS.map((step, index) => (
        <StepObserver
          key={step.id}
          step={step}
          index={index}
          isLast={index === RESUME_STEPS.length - 1}
        />
      ))}
    </div>
  );
};

export { FormStepper };
