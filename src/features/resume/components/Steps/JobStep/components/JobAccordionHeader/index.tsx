import { CustomBadge } from "@/components/ui/CustomBadge";
import { CustomLabel } from "@/components/ui/CustomLabel";
import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { createJobSchema } from "@/features/resume/schemas/JobSchema"; // Adjust path as needed
import { TFunction } from "i18next";
import { memo, useEffect, useState, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";

type HeaderProps = {
  index: number;
  t: TFunction<string, undefined>;
};

const JobAccordionHeaderComponent = ({ index, t }: HeaderProps) => {
  const {
    formState: { errors },
    setValue,
  } = useFormContext<ResumeFormValues>();

  const [displayedLabel, setDisplayedLabel] = useState("...");
  const [isTyping, setIsTyping] = useState(false);
  const rowValues = useWatch({ name: `job.${index}` });

  const jobTitle = rowValues?.jobTitle;
  const companyName = rowValues?.companyName;
  const currentStatus = rowValues?.status;

  // 1. Clever Title Debouncing (Kept your excellent logic!)
  useEffect(() => {
    // eslint-disable-next-line
    setIsTyping(true);

    const targetLabel =
      jobTitle || companyName
        ? `${jobTitle ?? ""} ${companyName ?? ""}`.trim()
        : "...";

    const timer = setTimeout(() => {
      setDisplayedLabel(targetLabel);
      setIsTyping(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [jobTitle, companyName]);

  // =========================================================
  // STATE VALIDATION MACHINE (Refactored to use Zod)
  // =========================================================
  const isCompleted = useMemo(() => {
    if (!rowValues) return false;
    if (errors.job?.[index]) return false;
    const jobSchema = createJobSchema(t);
    const result = jobSchema.safeParse({
      ...rowValues,
      status: "completed",
    });

    return result.success;
  }, [rowValues, errors.job, index, t]);

  // ─── 3. State Synchronization Engine ────────────────────────────────
  useEffect(() => {
    if (!rowValues) return;

    if (isCompleted && currentStatus !== "completed") {
      setValue(`job.${index}.status`, "completed", {
        shouldDirty: true,
        shouldValidate: true,
      });
    } else if (!isCompleted && currentStatus === "completed") {
      // If the user deletes a required field, revert the status back to draft
      setValue(`job.${index}.status`, "draft", {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [isCompleted, currentStatus, index, setValue, rowValues]);

  const isDraft = !isCompleted && currentStatus === "draft";
  const badgeType = isCompleted ? "success" : isDraft ? "warning" : "default";

  return (
    <div className="flex w-full items-center justify-between pr-4">
      <div className="flex items-center gap-2">
        <CustomLabel size="lg">{displayedLabel}</CustomLabel>

        {isTyping && (
          <span className="text-muted-foreground animate-pulse text-xs font-normal italic transition-all">
            ({t("typing")})
          </span>
        )}
      </div>

      <CustomBadge type={badgeType}>
        {isCompleted
          ? t("status.completed")
          : t(`status.${currentStatus ?? "empty"}`)}
      </CustomBadge>
    </div>
  );
};

export const JobAccordionHeader = memo(JobAccordionHeaderComponent);
