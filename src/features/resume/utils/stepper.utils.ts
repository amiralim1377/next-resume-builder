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
  index,
}: calculateStepStatusProps): SectionState => {
  const safeErrors = errors as Record<string, unknown>;
  const hasErrors = step.fieldNames.some((field) => !!safeErrors[field]);
  if (hasErrors) return "invalid";

  const safeValues = values as Record<string, unknown>;

  const hasData = step.fieldNames.some((field) => {
    const value = safeValues[field];
    if (Array.isArray(value)) {
      return value.some((row) => {
        if (!row) return false;

        if (row.status === "completed" || row.status === "draft") {
          return true;
        }

        if (row.status === "empty") {
          return Object.entries(row).some(([key, v]) => {
            if (key === "status") return false;

            if (key === "summary") {
              return hasResumeEditorContent(v as RichTextNode);
            }

            return v !== "" && v !== null && v !== undefined && v !== false;
          });
        }

        return false;
      });
    }
    return hasActualContent(value);
  });

  // console.log(`hasData for ${index + 1}:`, hasData);

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
