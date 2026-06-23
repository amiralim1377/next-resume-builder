import { ResumeFormValues } from "../schemas/resume.schema";
import { StepConfig, SectionState } from "../types/resume.types";
import { FieldErrors } from "react-hook-form";

type calculateStepStatusProps = {
  step: StepConfig;
  values: Partial<ResumeFormValues>;
  errors: FieldErrors<ResumeFormValues>;
};

const calculateStepStatus = ({
  errors,
  step,
  values,
}: calculateStepStatusProps): SectionState => {
  const hasErrors = step.fieldNames.some((field) => !!errors[field]);
  if (hasErrors) return "invalid";

  const hasData = step.fieldNames.some((field) => {
    const value = values[field];
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "object" && value !== null)
      return Object.values(value).some(Boolean);
    return !!value;
  });

  if (!hasData) return "empty";

  for (const field of step.fieldNames) {
    const value = values[field];
    if (Array.isArray(value)) {
      const allRowsCompleted = value.every(
        (item) => item?.status === "completed",
      );

      if (!allRowsCompleted) return "draft";
    }
  }

  return "completed";
};

export { calculateStepStatus };
