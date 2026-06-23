import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { hasRichTextContent, RichTextNode } from "@/utils/richText";
import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

const RowStatusObserver = ({ index }: { index: number }) => {
  const { setValue } = useFormContext<ResumeFormValues>();

  const rowValues = useWatch({ name: `education.${index}` });
  const currentStatus = rowValues?.status;

  useEffect(() => {
    if (!rowValues || currentStatus !== "empty") return;

    const hasUserInteracted = Object.entries(rowValues).some(([key, value]) => {
      if (key === "status") return false;
      if (key === "summary") return hasRichTextContent(value as RichTextNode);
      if (key === "isStudyingNow") return value === true;
      return value !== "" && value !== undefined && value !== null;
    });

    if (hasUserInteracted) {
      setValue(`education.${index}.status`, "draft", {
        shouldValidate: false,
        shouldDirty: false,
        shouldTouch: false,
      });
    }
  }, [rowValues, currentStatus, index, setValue]);

  return null;
};

export { RowStatusObserver };
