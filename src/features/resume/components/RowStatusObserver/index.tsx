import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { hasResumeEditorContent, RichTextNode } from "@/utils/richText";
import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

type ArraySectionKey =
  | "education"
  | "job"
  | "languages"
  | "skills"
  | "coursesAndCertifications"
  | "projects"
  | "research";

type RowStatusObserverProps = {
  fieldName: ArraySectionKey;
  index: number;
};

const RowStatusObserver = ({ fieldName, index }: RowStatusObserverProps) => {
  const { setValue } = useFormContext<ResumeFormValues>();

  // 2. Watch the specific slice dynamically
  // eslint-disable-next-line
  const rowValues = useWatch({ name: `${fieldName}.${index}` as any });
  const currentStatus = rowValues?.status;

  // console.log("currentStatus :", currentStatus);

  useEffect(() => {
    if (!rowValues || currentStatus !== "empty") return;

    const hasUserInteracted = Object.entries(rowValues).some(([key, value]) => {
      if (key === "status") return false;
      if (key === "summary")
        return hasResumeEditorContent(value as RichTextNode);

      if (typeof value === "boolean") return value === true;

      return value !== "" && value !== undefined && value !== null;
    });

    if (hasUserInteracted) {
      // eslint-disable-next-line
      setValue(`${fieldName}.${index}.status` as any, "draft", {
        shouldValidate: false,
        shouldDirty: false,
        shouldTouch: false,
      });
    }
  }, [rowValues, currentStatus, index, setValue, fieldName]);

  return null;
};

export { RowStatusObserver };
