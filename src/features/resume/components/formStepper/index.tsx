"use client";
import { FormStepperItem } from "@/components/ui/CustomFormStepperItem";
import { SectionState, StepConfig, StepName } from "../../types/resume.types";

type FormStepperProps = {
  currentStep: number;
  stepStatuses: Record<StepName, SectionState>;
  onStepClick: (index: number) => void;
  steps: StepConfig[];
};

const FormStepper = ({
  currentStep,
  stepStatuses,
  onStepClick,
  steps,
}: FormStepperProps) => {
  return (
    <div className="flex w-full justify-between">
      {steps.map((step, index) => {
        // 1. Grab the real-time status evaluated by our utility engine
        const status = stepStatuses[step.id];

        // 2. Map the engineering statuses cleanly onto your visual flags
        const isActive = index === currentStep;
        const isCompleted = status === "completed";

        // A step is pending if it's not active, hasn't been touched yet, or is a draft
        const isPending =
          !isActive && (status === "empty" || status === "draft");

        return (
          <FormStepperItem
            key={step.id}
            stepNumber={index + 1}
            title={step.titleKey} // Pass titleKey or step.title depending on your i18n setup
            isActive={isActive}
            isCompleted={isCompleted}
            isPending={isPending}
            isLast={index === steps.length - 1}
            onClick={() => onStepClick(index)}

            // 💡 Production Tip: If your CustomFormStepperItem component supports
            // error indicators or draft indicators, you can pass them down like this:
            // isInvalid={status === "invalid"}
            // isDraft={status === "draft"}
          />
        );
      })}
    </div>
  );
};

export { FormStepper };
