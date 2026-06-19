"use client";
import { FormProvider } from "react-hook-form";
import { useState } from "react";
import { useResumeForm } from "../../hooks/useResumeForm";
import { StepName } from "../../types/resume.types";
import { ResumeFormValues } from "../../schemas/resume.schema";
import { RESUME_STEPS } from "../../constants/steps";
import { NavigationButtons } from "../NavigationButtons";
import { FormStepper } from "../FormStepper";
import StepWrapper from "../StepWrapper";

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
  const {
    form,
    triggerStep,
    formState: { errors },
  } = useResumeForm(initialData, mode);

  console.log("errors:", errors);

  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<StepName>>(
    new Set(),
  );

  const currentStepConfig = RESUME_STEPS[currentStep];

  const handleNext = async () => {
    if (!currentStepConfig) return;

    const isValid = await triggerStep(currentStepConfig.fieldNames as any);

    if (isValid) {
      setCompletedSteps((prev) => new Set(prev).add(currentStepConfig.id));

      if (currentStep < RESUME_STEPS.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        // Last step → Submit the form
        await handleFormSubmit();
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleStepClick = (index: number) => {
    if (index <= currentStep || completedSteps.has(RESUME_STEPS[index].id)) {
      setCurrentStep(index);
    }

    // setCurrentStep(index);
  };

  const handleFormSubmit = async () => {
    const values = form.getValues();

    try {
      await onSubmit?.(values);
      console.log("✅ Final Resume Data:", values); // ← Your log here
    } catch (error) {
      console.error("❌ Submit failed:", error);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="mx-auto px-6"
      >
        <FormStepper
          steps={RESUME_STEPS}
          currentStep={currentStep}
          completedSteps={completedSteps}
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
            // TODO: Save draft API call
          }}
        />
      </form>
    </FormProvider>
  );
};

export { ResumeFormProvider };
