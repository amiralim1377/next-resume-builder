"use client";
import { FormProvider } from "react-hook-form";
import { useCallback, useMemo, useRef, useState } from "react";
import { useResumeForm } from "../../hooks/useResumeForm";
import { ResumeFormValues } from "../../schemas/resume.schema";
import { RESUME_STEPS } from "../../constants/steps";
import StepWrapper from "../StepWrapper";
import { FormStepper } from "../FormStepper";
import { NavigationButtons } from "../NavigationButtons";
import { ResumeFormContext } from "./ResumeFormContext";

type ResumeFormProviderProps = {
  initialData?: Partial<ResumeFormValues>;
  mode?: "create" | "edit";
  onSubmit?: (data: ResumeFormValues) => Promise<void>;
};

const ResumeFormProvider = ({
  initialData,
  mode = "create",
  onSubmit,
}: ResumeFormProviderProps) => {
  const form = useResumeForm(initialData, mode);
  const [currentStep, setCurrentStep] = useState(0);

  const currentStepConfig = RESUME_STEPS[currentStep];

  const handleFormSubmit = useCallback(async () => {
    const values = form.getValues();
    try {
      await onSubmit?.(values);
      console.log("✅ Final Resume Data:", values);
    } catch (error) {
      console.error("❌ Submit failed:", error);
    }
  }, [form, onSubmit]);

  const handleNext = useCallback(async () => {
    if (!currentStepConfig) return;

    const isValid = await form.trigger(
      currentStepConfig.fieldNames as unknown as Parameters<
        typeof form.trigger
      >[0],
      {
        shouldFocus: true,
      },
    );

    if (isValid) {
      if (currentStep < RESUME_STEPS.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        await handleFormSubmit();
      }
    }
  }, [currentStep, currentStepConfig, form, handleFormSubmit]);

  const handlePrev = useCallback(() => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const handleStepClick = useCallback((index: number) => {
    setCurrentStep(index);
  }, []);

  const providerValue = useMemo(
    () => ({
      currentStep,
      setCurrentStep,
      handleNext,
      handlePrev,
      handleStepClick,
    }),
    [currentStep, handleNext, handlePrev, handleStepClick],
  );

  return (
    <ResumeFormContext.Provider value={providerValue}>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="mx-auto grid w-full grid-rows-[auto_1fr_auto] gap-6"
        >
          <FormStepper />
          <StepWrapper currentStep={currentStep} />
          <NavigationButtons
            onNext={handleNext}
            onPrev={handlePrev}
            isLastStep={currentStep === RESUME_STEPS.length - 1}
            isFirstStep={currentStep === 0}
            onSaveDraft={async () => {
              const values = form.getValues();
              console.log("💾 Draft Saved:", values);
            }}
          />
        </form>
      </FormProvider>
    </ResumeFormContext.Provider>
  );
};

export { ResumeFormProvider };
