"use client";

import { RESUME_STEPS } from "../../constants/steps";
import { StepObserver } from "./StepObserver";

const FormStepper = () => {
  return (
    <div className="flex w-full justify-between">
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
