"use client";
import { FormProvider, useWatch } from "react-hook-form";
import { useCallback, useMemo, useState } from "react";
import { useResumeForm } from "../../hooks/useResumeForm";
import { SectionState, StepName } from "../../types/resume.types";
import { ResumeFormValues } from "../../schemas/resume.schema";
import { RESUME_STEPS } from "../../constants/steps";
import { calculateStepStatus } from "../../utils/stepper.utils";
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
  const { errors } = form.formState;

  const [currentStep, setCurrentStep] = useState(0);

  const formValues = useWatch({ control: form.control });

  const stepStatuses = useMemo((): Record<StepName, SectionState> => {
    const statuses = {} as Record<StepName, SectionState>;

    RESUME_STEPS.forEach((step, index) => {
      statuses[step.id] = calculateStepStatus({
        step,
        values: formValues,
        errors,
        index,
      });
    });

    return statuses;
  }, [formValues, errors]);

  // console.log("stepStatuses", stepStatuses);

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
      stepStatuses,
      handleNext,
      handlePrev,
      handleStepClick,
    }),
    [currentStep, stepStatuses, handleNext, handlePrev, handleStepClick],
  );

  return (
    <ResumeFormContext.Provider value={providerValue}>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="mx-auto grid w-full grid-rows-[auto_1fr_auto] gap-6"
        >
          <FormStepper
            steps={RESUME_STEPS}
            currentStep={currentStep}
            stepStatuses={stepStatuses}
            onStepClick={handleStepClick}
          />
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
