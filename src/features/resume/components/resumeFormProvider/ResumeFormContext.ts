import { createContext, useContext } from "react";

export type ResumeFormContextType = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  handleNext: () => Promise<void>;
  handlePrev: () => void;
  handleStepClick: (index: number) => void;
};

export const ResumeFormContext = createContext<ResumeFormContextType | null>(
  null,
);

export const useResumeFormContext = () => {
  const context = useContext(ResumeFormContext);
  if (!context) {
    throw new Error(
      "useResumeFormContext must be used inside a <ResumeFormProvider />",
    );
  }
  return context;
};
