import { hasResumeEditorContent, RichTextNode } from "@/utils/richText";
import { ResumeFormValues } from "../schemas/resume.schema";
import { StepConfig, SectionState } from "../types/resume.types";
import { DeepPartial, FieldErrors } from "react-hook-form";

type calculateStepStatusProps = {
  step: StepConfig;
  values: DeepPartial<ResumeFormValues>;
  errors: FieldErrors<ResumeFormValues>;
  index?: number;
};

const hasActualContent = (value: unknown): boolean => {
  if (value === null || value === undefined || value === "") return false;

  if (Array.isArray(value)) {
    return value.length > 0 && value.some(hasActualContent);
  }

  if (typeof value === "object") {
    if ("type" in value && "content" in value) {
      return hasResumeEditorContent(value as RichTextNode);
    }

    return Object.values(value).some(hasActualContent);
  }

  return !!value;
};

const calculateStepStatus = ({
  errors,
  step,
  values,
}: calculateStepStatusProps): SectionState => {
  const safeErrors = errors as Record<string, unknown>;
  const hasErrors = step.fieldNames.some((field) => !!safeErrors[field]);
  if (hasErrors) return "invalid";

  const safeValues = values as Record<string, unknown>;

  const hasData = step.fieldNames.some((field) => {
    const value = safeValues[field];
    return hasActualContent(value);
  });

  if (!hasData) return "empty";

  for (const field of step.fieldNames) {
    const value = safeValues[field];

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
