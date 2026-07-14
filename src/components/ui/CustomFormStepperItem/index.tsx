"use client";

import { cn } from "@/utils/cn";
import { CheckCircle } from "@/components/svg/CheckCircle";
import { ConnectorLine } from "./components/ConnectorLine";
import { useLang } from "@/provider/lngProvider";
import { useTranslation } from "@/lib/i18n/client";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";

type Props = {
  stepNumber: number;
  title: string;
  isActive: boolean;
  isCompleted: boolean;
  isDraft: boolean;
  isEmpty: boolean;
  isInvalid: boolean;
  isLast: boolean;
  onClick: () => void;
};

export const FormStepperItem = ({
  stepNumber,
  title,
  isActive,
  isCompleted,
  isDraft,
  isEmpty,
  isInvalid,
  isLast,
  onClick,
}: Props) => {
  const { lng } = useLang();
  const { t } = useTranslation(lng, "form");
  const { colors } = useThemeColors();

  return (
    <div
      className="relative flex min-w-0 flex-1 cursor-pointer flex-col items-center gap-2"
      onClick={onClick}
    >
      {!isLast && (
        <ConnectorLine
          isDraft={isDraft}
          isInvalid={isInvalid}
          isCompleted={isCompleted}
          isActive={isActive}
          isEmpty={isEmpty}
        />
      )}

      <div
        className={cn(
          "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 bg-white transition-all duration-300",
          isEmpty && !isActive && "border-gray-200 bg-gray-100 text-gray-400",
          isDraft &&
            !isActive &&
            !isInvalid &&
            "border-state-warning text-state-warning",
          isCompleted && !isActive && "border-teal-600",
          isInvalid && !isActive && "border-state-error text-state-error",
          isActive && "border-blue-600 text-blue-600",
        )}
      >
        {isCompleted ? (
          <CheckCircle color={colors.state?.success} size={16} />
        ) : (
          <div className="h-3 w-3 rounded-full bg-current" />
        )}
      </div>

      <div className="mt-2 w-full max-w-full px-1 text-center">
        <p className="w-full truncate text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
          Step {stepNumber}
        </p>

        <p
          className={cn(
            "w-full truncate text-sm font-semibold",
            isInvalid
              ? "text-state-error"
              : isActive
                ? "text-gray-900"
                : "text-gray-600",
          )}
        >
          {t(title)}
        </p>

        <p
          className={cn(
            "mt-1 inline-block max-w-full truncate rounded px-2 py-0.5 text-xs",
            isCompleted
              ? "text-teal-600"
              : isInvalid
                ? "text-state-error"
                : isDraft
                  ? "text-text-warning"
                  : isActive
                    ? "text-blue-600"
                    : "text-gray-400",
          )}
        >
          {isCompleted
            ? t("status.completed")
            : isInvalid
              ? t("status.invalid")
              : isActive
                ? t("inProgress")
                : isDraft
                  ? t("status.draft")
                  : t("status.empty")}
        </p>
      </div>
    </div>
  );
};
