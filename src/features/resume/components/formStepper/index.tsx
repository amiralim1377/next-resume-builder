import { FormStepperItem } from "@/components/ui/CustomFormStepperItem";
import { StepConfig, StepName } from "../../types/resume.types";

type FormStepperProps = {
  currentStep: number;
  completedSteps: Set<StepName>;
  onStepClick: (index: number) => void;
  steps: StepConfig[];
};

const FormStepper = ({
  currentStep,
  completedSteps,
  onStepClick,
  steps,
}: FormStepperProps) => {
  return (
    <div className="flex w-full justify-between">
      {steps.map((step, index) => {
        const isCompleted = completedSteps.has(step.id);
        const isActive = index === currentStep;
        const isPending = index > currentStep && !isCompleted;

        return (
          <FormStepperItem
            key={step.id}
            stepNumber={index + 1}
            title={step.titleKey}
            isActive={isActive}
            isCompleted={isCompleted}
            isPending={isPending}
            isLast={index === steps.length - 1}
            onClick={() => onStepClick(index)}
          />
        );
      })}
    </div>
  );
};

export { FormStepper };
