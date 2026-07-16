"use client";
import { FormProvider } from "react-hook-form";
import { useMemo } from "react";
import { ResumeFormValues } from "../../schemas/resume.schema";
import StepWrapper from "../StepWrapper";
import { FormStepper } from "../FormStepper";
import { NavigationButtons } from "../NavigationButtons";
import { StepperContext } from "./StepperContext";
import { ResumeStep } from "@/domain/dtos/resume.dto";
import { useResumeFormManager } from "./hooks/useResumeFormManager";

type ResumeFormProviderProps = {
  initialData?: Partial<ResumeFormValues>;
  mode?: "create" | "edit";
  onSubmit?: (data: ResumeFormValues) => Promise<void>;
  onStepChange?: (step: ResumeStep, data: unknown) => void;
};

const ResumeFormWrapper = ({
  initialData,
  mode = "create",
  onSubmit,
  onStepChange,
}: ResumeFormProviderProps) => {
  const {
    form,
    currentStep,
    isLastStep,
    isFirstStep,
    handleNext,
    handlePrev,
    handleStepClick,
    executeSubmit,
  } = useResumeFormManager({ mode, initialData, onSubmit, onStepChange });

  const stepperValue = useMemo(
    () => ({
      currentStep,
      handleNext,
      handlePrev,
      handleStepClick,
      isLastStep,
      isFirstStep,
    }),
    [
      currentStep,
      handleNext,
      handlePrev,
      handleStepClick,
      isLastStep,
      isFirstStep,
    ],
  );

  return (
    <FormProvider {...form}>
      <StepperContext.Provider value={stepperValue}>
        <form
          onSubmit={executeSubmit}
          className="mx-auto grid w-full grid-rows-[auto_1fr_auto] gap-6"
        >
          <FormStepper />
          <StepWrapper currentStep={currentStep} />
          <NavigationButtons
            onNext={handleNext}
            onPrev={handlePrev}
            isLastStep={isLastStep}
            isFirstStep={isFirstStep}
          />
        </form>
      </StepperContext.Provider>
    </FormProvider>
  );
};

export { ResumeFormWrapper };
