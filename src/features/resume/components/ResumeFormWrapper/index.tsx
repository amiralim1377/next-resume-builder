"use client";
import { FormProvider, FieldErrors } from "react-hook-form";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useResumeForm } from "../../hooks/useResumeForm";
import { ResumeFormValues } from "../../schemas/resume.schema";
import { RESUME_STEPS } from "../../constants/steps";
import StepWrapper from "../StepWrapper";
import { FormStepper } from "../FormStepper";
import { NavigationButtons } from "../NavigationButtons";
import { useAutoSave } from "../../hooks/useAutoSave";
import { get } from "idb-keyval";
import { StepperContext } from "./StepperContext";

const AutoSaveManager = () => {
  useAutoSave("current_resume_draft");
  return null;
};

type ResumeFormProviderProps = {
  initialData?: Partial<ResumeFormValues>;
  mode?: "create" | "edit";
  onSubmit?: (data: ResumeFormValues) => Promise<void>;
};

const ResumeFormWrapper = ({
  initialData,
  mode = "create",
  onSubmit,
}: ResumeFormProviderProps) => {
  const form = useResumeForm(initialData, mode);
  const [currentStep, setCurrentStep] = useState(0);

  const isLastStep = currentStep === RESUME_STEPS.length - 1;
  const isFirstStep = currentStep === 0;

  const { reset } = form;

  useEffect(() => {
    const restoreDraftData = async () => {
      try {
        if (mode === "create") {
          const savedDraft = await get("current_resume_draft");
          if (savedDraft) {
            reset(savedDraft);
            console.log("🔄 Draft successfully restored from IndexedDB");
          }
        }
      } catch (error) {
        console.error("❌ Failed to restore draft from IndexedDB", error);
      }
    };

    restoreDraftData();
  }, [reset, mode]);

  const handleFormSubmit = useCallback(
    async (values: ResumeFormValues) => {
      try {
        await onSubmit?.(values);
        console.log("✅ Final Resume Data Submitted Successfully:", values);
      } catch (error) {
        console.error("❌ Submit failed:", error);
      }
    },
    [onSubmit],
  );

  const onInvalidSubmit = useCallback(
    (errors: FieldErrors<ResumeFormValues>) => {
      const firstErrorStepIndex = RESUME_STEPS.findIndex((step) =>
        step.fieldNames.some((fieldName) => errors[fieldName]),
      );

      if (firstErrorStepIndex !== -1 && firstErrorStepIndex !== currentStep) {
        setCurrentStep(firstErrorStepIndex);
        console.warn(
          `Redirected to step ${firstErrorStepIndex + 1} due to validation errors.`,
        );
      }
    },
    [currentStep],
  );

  const handleNext = useCallback(
    (e?: React.BaseSyntheticEvent) => {
      if (isLastStep) {
        form.handleSubmit(handleFormSubmit, onInvalidSubmit)(e);
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    },
    [isLastStep, form, handleFormSubmit, onInvalidSubmit],
  );

  const handlePrev = useCallback(() => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const handleStepClick = useCallback((targetIndex: number) => {
    setCurrentStep(targetIndex);
  }, []);

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

  const executeSubmit = form.handleSubmit(handleFormSubmit, onInvalidSubmit);

  return (
    <FormProvider {...form}>
      <StepperContext.Provider value={stepperValue}>
        <AutoSaveManager />
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
            onSaveDraft={async () => {
              const values = form.getValues();
              console.log("💾 Draft Saved:", values);
            }}
          />
        </form>
      </StepperContext.Provider>
    </FormProvider>
  );
};

export { ResumeFormWrapper };
