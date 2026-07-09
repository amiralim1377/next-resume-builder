import { CustomBadge } from "@/components/ui/CustomBadge";
import { CustomLabel } from "@/components/ui/CustomLabel";
import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { TFunction } from "i18next";
import { memo, useEffect, useState, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { RowStatus } from "@/features/resume/types/resume.types";
import { educationStatusEngine } from "@/features/resume/rules/education.rules";
import { useItemStatus } from "@/features/resume/hooks/useItemStatus";

type HeaderProps = {
  index: number;
  t: TFunction<string, undefined>;
};

const EducationAccordionHeaderComponent = ({ index, t }: HeaderProps) => {
  const {
    formState: { errors },
  } = useFormContext<ResumeFormValues>();
  const rowValues = useWatch({ name: `education.${index}` });

  const [displayedLabel, setDisplayedLabel] = useState("...");

  const degreeLevel = rowValues?.degreeLevel;
  const academicMajor = rowValues?.academicMajor;
  const rowError = !!errors.education?.[index];

  const status = useItemStatus(rowValues, rowError, educationStatusEngine);

  const currentTargetLabel = useMemo(() => {
    const degreeTranslated = degreeLevel ? t(`degree.${degreeLevel}`) : "";
    const majorText = academicMajor ?? "";
    return degreeTranslated || majorText
      ? `${degreeTranslated} ${majorText}`.trim()
      : "...";
  }, [degreeLevel, academicMajor, t]);

  const isTyping = currentTargetLabel !== displayedLabel;

  // ─── 2. Title Debounce Machine ──────────────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayedLabel(currentTargetLabel);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentTargetLabel]);

  // ─── 3. Status Calculation Engine ───────────────────────────────────
  const { badgeType, badgeLabel } = useMemo(() => {
    const badgeMap: Record<
      RowStatus,
      {
        badgeType: "default" | "warning" | "error" | "success";
        badgeLabel: string;
      }
    > = {
      empty: { badgeType: "default", badgeLabel: "empty" },
      draft: { badgeType: "warning", badgeLabel: "draft" },
      invalid: { badgeType: "error", badgeLabel: "invalid" },
      completed: { badgeType: "success", badgeLabel: "completed" },
    };

    return badgeMap[status];
  }, [status]);

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

      <CustomBadge type={badgeType}>{t(`status.${badgeLabel}`)}</CustomBadge>
    </div>
  );
};

export const EducationAccordionHeader = memo(EducationAccordionHeaderComponent);
