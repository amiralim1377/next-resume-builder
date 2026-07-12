"use client";
import { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { basicInfoStatusEngine } from "@/features/resume/engines/basicInfoStep.engine";
import { educationStatusEngine } from "@/features/resume/engines/education.engine";
import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { SectionState } from "@/features/resume/types/resume.types";
import { jobStatusEngine } from "../engines/job.engine";

type StatusEngineWrapper = {
  getStepStatus: (rows: unknown, hasErrors: boolean) => SectionState;
};

const STEP_STATUS_ENGINES: Record<string, StatusEngineWrapper> = {
  basic: basicInfoStatusEngine as unknown as StatusEngineWrapper,
  education: educationStatusEngine as unknown as StatusEngineWrapper,
  job: jobStatusEngine as unknown as StatusEngineWrapper,
};

export const useSectionStatus = (
  stepId: string,
  primaryFieldName: keyof ResumeFormValues,
): SectionState => {
  const {
    formState: { errors },
  } = useFormContext<ResumeFormValues>();

  const stepRowsData = useWatch({ name: primaryFieldName });

  const hasSectionErrors = !!errors[primaryFieldName];

  const status = useMemo<SectionState>(() => {
    const engine = STEP_STATUS_ENGINES[stepId];
    if (!engine) return "empty";

    return engine.getStepStatus(stepRowsData, hasSectionErrors);
  }, [stepId, stepRowsData, hasSectionErrors]);

  return status;
};
