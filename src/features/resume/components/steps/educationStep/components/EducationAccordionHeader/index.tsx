import { CustomLabel } from "@/components/ui/CustomLabel";
import { TFunction } from "i18next";
import { memo, useEffect, useState } from "react";
import { useWatch, useFormContext } from "react-hook-form";
import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { CustomBadge } from "@/components/ui/CustomBadge";

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

  // =========================================================
  // STATE VALIDATION MACHINE
  // =========================================================
  const rowErrors = errors.education?.[index];
  const hasNoValidationErrors = !rowErrors;

  const hasCoreFieldsFilled =
    !!rowValues?.degreeLevel &&
    !!rowValues?.academicMajor &&
    !!rowValues?.institutionName &&
    !!rowValues?.country &&
    !!rowValues?.province &&
    !!rowValues?.city &&
    !!rowValues?.entryMonth &&
    !!rowValues?.entryYear;

  const hasValidGraduationDate =
    !!rowValues?.isStudyingNow ||
    (!!rowValues?.graduationMonth && !!rowValues?.graduationYear);

  const isCompleted =
    hasCoreFieldsFilled && hasValidGraduationDate && hasNoValidationErrors;
  const isDraft = !isCompleted && currentStatus === "draft";

  const badgeType = isCompleted ? "success" : isDraft ? "warning" : "default";

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
