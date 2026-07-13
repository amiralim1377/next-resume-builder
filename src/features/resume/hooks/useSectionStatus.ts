"use client";
import { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { SectionState } from "@/features/resume/types/resume.types";
import { RESUME_STEPS } from "../constants/steps";

// ─── 1. Imports (Engines) ────────────────────────────────────────────────
import { basicInfoStatusEngine } from "@/features/resume/engines/basicInfoStep.engine";
import { educationStatusEngine } from "@/features/resume/engines/education.engine";
import { jobStatusEngine } from "../engines/job.engine";
import { ProjectStatusEngine } from "../engines/project.engine";
import { researchStatusEngine } from "../engines/research.engine";
import { skillsStepStatusEngine } from "../engines/skillsStep.engine";

export type ResumeStepId = (typeof RESUME_STEPS)[number]["id"];

// ─── 2. Adapters Architecture ───────────────────────────────────────────
type StandardStatusEngine = (
  watchedDataArray: unknown[],
  hasErrorsArray: boolean[],
) => SectionState;

const withSingleField = <T, R>(
  engineGetStatus: (data: T, hasError: boolean) => R,
): StandardStatusEngine => {
  return (dataArray, errorsArray) => {
    const primaryData = dataArray[0] as T;
    const hasAnyError = errorsArray.some(Boolean);

    return engineGetStatus(primaryData, hasAnyError) as SectionState;
  };
};

const withCompositeFields = <T extends unknown[], E extends boolean[], R>(
  engineGetStatus: (dataArray: T, errorsArray: E) => R,
): StandardStatusEngine => {
  return (dataArray, errorsArray) => {
    return engineGetStatus(dataArray as T, errorsArray as E) as SectionState;
  };
};

// ─── 3. The Registry ────────────────────────────────────────────────────
const STEP_STATUS_ENGINES: Partial<Record<ResumeStepId, StandardStatusEngine>> =
  {
    basic: withSingleField(basicInfoStatusEngine.getStepStatus),
    education: withSingleField(educationStatusEngine.getStepStatus),
    job: withSingleField(jobStatusEngine.getStepStatus),
    projects: withSingleField(ProjectStatusEngine.getStepStatus),
    research: withSingleField(researchStatusEngine.getStepStatus),
    skills: withCompositeFields(skillsStepStatusEngine.getStepStatus),
  };

// ─── 4. The Smart Hook ──────────────────────────────────────────────────
export const useSectionStatus = (
  stepId: ResumeStepId,
  fieldNames: (keyof ResumeFormValues)[] | keyof ResumeFormValues,
): SectionState => {
  const {
    formState: { errors },
  } = useFormContext<ResumeFormValues>();

  const safeFieldNames = useMemo(() => {
    return Array.isArray(fieldNames) ? fieldNames : [fieldNames];
  }, [fieldNames]);

  const stepRowsDataArray = useWatch({ name: safeFieldNames as string[] });

  const hasErrorsArray = useMemo(() => {
    return safeFieldNames.map((fieldName) => !!errors[fieldName]);
  }, [errors, safeFieldNames]);

  const status = useMemo<SectionState>(() => {
    const engineAdapter = STEP_STATUS_ENGINES[stepId];
    if (!engineAdapter) return "empty";

    return engineAdapter(stepRowsDataArray, hasErrorsArray);
  }, [stepId, stepRowsDataArray, hasErrorsArray]);

  return status;
};
