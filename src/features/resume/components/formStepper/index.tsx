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
    <div className="flex justify-between">
      {steps.map((step, index) => (
        <StepItem
          key={step.id}
          step={step}
          isActive={currentStep === index}
          isCompleted={completedSteps.has(step.id)}
          onClick={() => onStepClick(index)}
        />
      ))}
    </div>
  );
};

export { FormStepper };
