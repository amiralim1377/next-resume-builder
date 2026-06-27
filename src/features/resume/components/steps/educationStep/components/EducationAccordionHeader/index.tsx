import { CustomBadge } from "@/components/ui/CustomBadge";
import { CustomLabel } from "@/components/ui/CustomLabel";
import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { createEducationSchema } from "@/features/resume/schemas/EducationSchema";
import { TFunction } from "i18next";
import { memo, useEffect, useState, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";

type HeaderProps = {
  index: number;
  t: TFunction<string, undefined>;
};

const EducationAccordionHeaderComponent = ({ index, t }: HeaderProps) => {
  const {
    formState: { errors },
    setValue,
  } = useFormContext<ResumeFormValues>();

  const rowValues = useWatch({ name: `education.${index}` });
  const [displayedLabel, setDisplayedLabel] = useState("...");
  const [isTyping, setIsTyping] = useState(false);

  const degreeLevel = rowValues?.degreeLevel;
  const academicMajor = rowValues?.academicMajor;
  const currentStatus = rowValues?.status;

  // ─── 1. Title Debounce Machine ──────────────────────────────────────
  useEffect(() => {
    // eslint-disable-next-line
    setIsTyping(true);

    const degreeTranslated = degreeLevel ? t(`degree.${degreeLevel}`) : "";
    const majorText = academicMajor ?? "";
    const targetLabel =
      degreeTranslated || majorText
        ? `${degreeTranslated} ${majorText}`.trim()
        : "...";

    const timer = setTimeout(() => {
      setDisplayedLabel(targetLabel);
      setIsTyping(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [degreeLevel, academicMajor, t]);

  // ─── 2. Zod Validation Machine ──────────────────────────────────────
  const isCompleted = useMemo(() => {
    if (!rowValues) return false;
    if (errors.education?.[index]) return false;

    // Evaluate row against full completed criteria
    const educationSchema = createEducationSchema(t);
    const result = educationSchema.safeParse({
      ...rowValues,
      status: "completed",
    });

    return result.success;
  }, [rowValues, errors.education, index, t]);

  const isDraft = !isCompleted && currentStatus === "draft";
  const badgeType = isCompleted ? "success" : isDraft ? "warning" : "default";

  // ─── 3. State Synchronization Engine ────────────────────────────────
  useEffect(() => {
    if (!rowValues) return;

    if (isCompleted && currentStatus !== "completed") {
      setValue(`education.${index}.status`, "completed", {
        shouldDirty: false,
      });
    } else if (!isCompleted && currentStatus === "completed") {
      setValue(`education.${index}.status`, "draft", { shouldDirty: false });
    }
  }, [isCompleted, currentStatus, index, setValue, rowValues]);

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

export const EducationAccordionHeader = memo(EducationAccordionHeaderComponent);
