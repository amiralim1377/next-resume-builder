import { createContext, useContext } from "react";

export type StepperContextType = {
  currentStep: number;
  handleNext: () => void;
  handlePrev: () => void;
  handleStepClick: (index: number) => void;
  isLastStep: boolean;
  isFirstStep: boolean;
};

export const StepperContext = createContext<StepperContextType | null>(null);

export const useStepper = () => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error("useStepper must be used inside a <ResumeFormProvider />");
  }
  return context;
};
