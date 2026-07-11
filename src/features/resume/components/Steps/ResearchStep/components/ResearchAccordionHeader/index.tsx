import { CustomBadge } from "@/components/ui/CustomBadge";
import { CustomLabel } from "@/components/ui/CustomLabel";
import { createResearchSchema } from "@/features/resume/schemas/ResearchSchema";
import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { Language } from "@/lib/i18n/settings";
import { TFunction } from "i18next";
import { useEffect, useMemo, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

type HeaderProps = {
  index: number;
  t: TFunction<string, undefined>;
  lng?: Language;
};

const ResearchAccordionHeader = ({ index, t }: HeaderProps) => {
  const {
    formState: { errors },
    setValue,
  } = useFormContext<ResumeFormValues>();

  const [displayedLabel, setDisplayedLabel] = useState("...");
  const [isTyping, setIsTyping] = useState(false);

  const rowValues = useWatch({ name: `research.${index}` });
  const researchTitle = rowValues?.researchTitle;
  const publisher = rowValues?.publisher;
  const currentStatus = rowValues?.status;

  useEffect(() => {
    // eslint-disable-next-line
    setIsTyping(true);

    const targetLabel =
      researchTitle || publisher
        ? `${researchTitle ?? ""}  ${publisher ?? ""}`.trim()
        : "...";

    const timer = setTimeout(() => {
      setDisplayedLabel(targetLabel);
      setIsTyping(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [researchTitle, publisher]);

  // =========================================================
  // STATE VALIDATION MACHINE (Refactored to use Zod)
  // =========================================================
  const isCompleted = useMemo(() => {
    if (!rowValues) return false;

    if (errors.research?.[index]) return false;
    const researchSchema = createResearchSchema(t);
    const result = researchSchema.safeParse({
      ...rowValues,
      status: "completed",
    });

    return result.success;
  }, [rowValues, errors.research, index, t]);

  // ─── 3. State Synchronization Engine ────────────────────────────────
  useEffect(() => {
    if (!rowValues) return;

    if (isCompleted && currentStatus !== "completed") {
      setValue(`research.${index}.status`, "completed", {
        shouldDirty: true,
        shouldValidate: true,
      });
    } else if (!isCompleted && currentStatus === "completed") {
      // If the user deletes a required field, revert the status back to draft
      setValue(`research.${index}.status`, "draft", {
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

export { ResearchAccordionHeader };
