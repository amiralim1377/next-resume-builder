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
};

const ResumeFormProvider = ({
  initialData,
  mode = "create",
}: ResumeFormProviderProps) => {
  const { form, triggerStep } = useResumeForm(initialData, mode);

  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<StepName>>(
    new Set(),
  );

  const currentStepConfig = RESUME_STEPS[currentStep];

  const handleNext = async () => {
    if (!currentStepConfig) return;

    // eslint-disable-next-line
    // const isValid = await triggerStep(currentStepConfig.fieldNames as any, {
    //   shouldFocus: true,
    // });

    // console.log("isValid:", isValid);

    const isValid = true;

    if (isValid) {
      setCompletedSteps((prev) => new Set(prev).add(currentStepConfig.id));

      if (currentStep < RESUME_STEPS.length - 1) {
        setCurrentStep((prev) => prev + 1);
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

  return (
    <FormProvider {...form}>
      <div className="mx-auto px-6">
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
        />
      </div>
    </FormProvider>
  );
};

export { ResumeFormProvider };
