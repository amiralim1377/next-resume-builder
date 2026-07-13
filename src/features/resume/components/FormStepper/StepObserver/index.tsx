"use client";
import { FormStepperItem } from "@/components/ui/CustomFormStepperItem";
import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { RESUME_STEPS } from "@/features/resume/constants/steps";
import { useSectionStatus } from "@/features/resume/hooks/useSectionStatus";
import { useMemo } from "react";

interface StepObserverProps {
  step: (typeof RESUME_STEPS)[0];
  index: number;
  isActive: boolean;
  isLast: boolean;
  onClick: () => void;
}

export const StepObserver = ({
  step,
  index,
  isActive,
  isLast,
  onClick,
}: StepObserverProps) => {
  const status = useSectionStatus(
    step.id,
    step.fieldNames as (keyof ResumeFormValues)[],
  );
  const isCompleted = status === "completed";
  const isDraft = status === "draft";
  const isEmpty = status === "empty";
  const isInvalid = status === "invalid";

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
        onClick={onClick}
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
      onClick,
    ],
  );
};
