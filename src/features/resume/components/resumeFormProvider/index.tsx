"use client";
import { FormProvider, Path } from "react-hook-form";
import { useCallback, useMemo, useState } from "react";
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

  const handleNext = useCallback(async () => {
    if (!currentStepConfig) return;

    const fieldsToValidate =
      currentStepConfig.fieldNames as Path<ResumeFormValues>[];

    const isValid = await form.trigger(fieldsToValidate, {
      shouldFocus: true,
    });

    if (isValid) {
      if (currentStep < RESUME_STEPS.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        form.handleSubmit(handleFormSubmit)();
      }
    }
  }, [currentStep, currentStepConfig, form, handleFormSubmit]);

  const handlePrev = useCallback(() => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  // 🚀 اصلاح باگ UX: بررسی اعتبارسنجی استپ فعلی قبل از اجازه حرکت به استپ‌های جلوتر
  const handleStepClick = useCallback(
    async (targetIndex: number) => {
      if (targetIndex < currentStep) {
        setCurrentStep(targetIndex);
      } else if (targetIndex > currentStep) {
        if (!currentStepConfig) return;

        const fieldsToValidate =
          currentStepConfig.fieldNames as Path<ResumeFormValues>[];
        const isValid = await form.trigger(fieldsToValidate, {
          shouldFocus: true,
        });

        if (isValid) {
          setCurrentStep(targetIndex);
        }
      }
    },
    [currentStep, currentStepConfig, form],
  );

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
