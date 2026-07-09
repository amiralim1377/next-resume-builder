"use client";

import { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { FormStepperItem } from "@/components/ui/CustomFormStepperItem";
import { basicInfoStatusEngine } from "@/features/resume/rules/basicInfoStep.rules";
import { educationStatusEngine } from "@/features/resume/rules/education.rules";
import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { RESUME_STEPS } from "@/features/resume/constants/steps";
import { SectionState } from "@/features/resume/types/resume.types";

type StatusEngineWrapper = {
  getStepStatus: (rows: unknown, hasErrors: boolean) => SectionState;
};

const STEP_STATUS_ENGINES: Record<string, StatusEngineWrapper> = {
  basic: basicInfoStatusEngine as unknown as StatusEngineWrapper,
  education: educationStatusEngine as unknown as StatusEngineWrapper,
};

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
  const {
    formState: { errors },
  } = useFormContext<ResumeFormValues>();

  const primaryFieldName = step.fieldNames[0] as keyof ResumeFormValues;

  const stepRowsData = useWatch({ name: primaryFieldName });
  const hasSectionErrors = !!errors[primaryFieldName];

  const status = useMemo<SectionState>(() => {
    const engine = STEP_STATUS_ENGINES[step.id];
    return engine
      ? engine.getStepStatus(stepRowsData, hasSectionErrors)
      : "empty";
  }, [step.id, stepRowsData, hasSectionErrors]);

  console.log(STEP_STATUS_ENGINES);

  const isCompleted = status === "completed";
  const isPending = !isActive && (status === "empty" || status === "draft");

  return (
    <FormStepperItem
      stepNumber={index + 1}
      title={step.titleKey}
      isActive={isActive}
      isCompleted={isCompleted}
      isPending={isPending}
      isLast={isLast}
      onClick={onClick}
    />
  );
};
