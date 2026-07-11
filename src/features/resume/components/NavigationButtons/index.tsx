"use client";

import { useFormContext } from "react-hook-form";
import { ResumeFormValues } from "../../schemas/resume.schema";
import { CustomButton } from "@/components/ui/CustomButton";
import { LoadingView } from "@/components/ui/CustomLoadingView";
import { useLang } from "@/provider/lngProvider";
import { useTranslation } from "@/lib/i18n/client";

interface NavigationButtonsProps {
  onNext: () => void;
  onPrev: () => void;
  isLastStep: boolean;
  isFirstStep: boolean;
  isLoading?: boolean;
  onSaveDraft?: () => void;
}

function NavigationButtons({
  onNext,
  onPrev,
  isLastStep,
  isFirstStep,
  isLoading = false,
  onSaveDraft,
}: NavigationButtonsProps) {
  const { lng } = useLang();
  const { t } = useTranslation(lng, "form");
  const {
    formState: { isSubmitting },
  } = useFormContext<ResumeFormValues>();

  return (
    <div className="flex items-center justify-between pt-8">
      {!isFirstStep && (
        <CustomButton
          type="button"
          variant="outlined"
          onClick={onPrev}
          disabled={isFirstStep || isLoading}
          className="flex min-w-30 items-center gap-2"
        >
          {t("back")}
        </CustomButton>
      )}

      <div className="flex items-center gap-3">
        {/* Save Draft Button */}
        {onSaveDraft && !isLastStep && (
          <CustomButton
            type="button"
            variant="secondary"
            onClick={onSaveDraft}
            disabled={isLoading || isSubmitting}
            className="flex items-center gap-2"
          >
            <div>save logo</div>
            {t("saveDraft")}
          </CustomButton>
        )}

        {/* Next / Submit Button */}
        <CustomButton
          type={isLastStep ? "submit" : "button"}
          onClick={isLastStep ? undefined : onNext}
          disabled={isLoading || isSubmitting}
          className="flex items-center justify-center gap-2"
        >
          {isLoading || isSubmitting ? (
            <>
              <LoadingView />
            </>
          ) : isLastStep ? (
            <>{t("saveResume")}</>
          ) : (
            <>{t("next")}</>
          )}
        </CustomButton>
      </div>
    </div>
  );
}

export { NavigationButtons };
