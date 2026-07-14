"use client";
import { FormStepperItem } from "@/components/ui/CustomFormStepperItem";
import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { RESUME_STEPS } from "@/features/resume/constants/steps";
import { useSectionStatus } from "@/features/resume/hooks/useSectionStatus";
import { useMemo } from "react";
import { useStepper } from "../../ResumeFormWrapper/StepperContext";

interface StepObserverProps {
  step: (typeof RESUME_STEPS)[0];
  index: number;
  isLast: boolean;
}

export const StepObserver = ({ step, index, isLast }: StepObserverProps) => {
  const { handleStepClick, currentStep } = useStepper();

  const status = useSectionStatus(
    step.id,
    step.fieldNames as (keyof ResumeFormValues)[],
  );
  const isCompleted = status === "completed";
  const isDraft = status === "draft";
  const isEmpty = status === "empty";
  const isInvalid = status === "invalid";
  const isActive = index === currentStep;

  return useMemo(
    () => (
      <FormStepperItem
        stepNumber={index + 1}
        title={step.titleKey}
        isActive={isActive}
        isCompleted={isCompleted}
        isDraft={isDraft}
        isEmpty={isEmpty}
        isInvalid={isInvalid}
        isLast={isLast}
        onClick={() => handleStepClick(index)}
      />
    ),
    [
      index,
      step.titleKey,
      isActive,
      isCompleted,
      isDraft,
      isEmpty,
      isInvalid,
      isLast,
      handleStepClick,
    ],
  );
};
