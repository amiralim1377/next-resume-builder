import { hasResumeEditorContent, RichTextNode } from "@/utils/richText";
import { ResumeFormValues } from "../schemas/resume.schema";
import { StepConfig, SectionState } from "../types/resume.types";
import { FieldErrors } from "react-hook-form";

type calculateStepStatusProps = {
  step: StepConfig;
  values: Partial<ResumeFormValues>;
  errors: FieldErrors<ResumeFormValues>;
  index: number;
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
  const hasErrors = step.fieldNames.some((field) => !!errors[field]);
  if (hasErrors) return "invalid";

  console.log(`hasErrors ${index + 1}:`, hasErrors);

  const hasData = step.fieldNames.some((field) => {
    const value = values[field];
    return hasActualContent(value);
  });

  if (!hasData) return "empty";

  console.log(`hasData ${index + 1}:`, hasData);

  if (!hasData) return "empty";

  for (const field of step.fieldNames) {
    console.log(`field ${index + 1}:`, field);

    const value = values[field];
    console.log(`value ${index + 1}:`, value);

    if (Array.isArray(value)) {
      const allRowsCompleted = value.every(
        (item) => item?.status === "completed",
      );

      console.log(`allRowsCompleted ${index + 1}:`, allRowsCompleted);

      if (!allRowsCompleted) return "draft";
    }
  }

  return "completed";
};

export { calculateStepStatus };
