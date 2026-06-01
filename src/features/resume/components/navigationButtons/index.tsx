"use client";

import { useFormContext } from "react-hook-form";
import { ResumeFormValues } from "../../schemas/resume.schema";
import { CustomButton } from "@/components/ui/customButton";
import { LoadingView } from "@/components/ui/loadingView";

interface NavigationButtonsProps {
  onNext: () => void;
  onPrev: () => void;
  isLastStep: boolean;
  isFirstStep: boolean;
  isLoading?: boolean;
}

function NavigationButtons({
  onNext,
  onPrev,
  isLastStep,
  isFirstStep,
  isLoading = false,
}: NavigationButtonsProps) {
  const {
    formState: { isSubmitting, isValid },
  } = useFormContext<ResumeFormValues>();

  return (
    <div className="mt-10 flex items-center justify-between border-t border-gray-200 pt-8 dark:border-gray-800">
      <CustomButton
        type="button"
        variant="outlined"
        onClick={onPrev}
        disabled={isFirstStep || isLoading}
        className="flex min-w-30 items-center gap-2"
      >
        قبلی
      </CustomButton>

      <div className="flex items-center gap-3">
        <CustomButton
          type={isLastStep ? "submit" : "button"}
          onClick={isLastStep ? undefined : onNext}
          disabled={isLoading || isSubmitting}
          className="flex min-w-35 items-center justify-center gap-2"
        >
          {isLoading || isSubmitting ? (
            <>
              <LoadingView />
            </>
          ) : isLastStep ? (
            <>
              <div>save</div>
            </>
          ) : (
            <>
              <div>arrow right</div>
            </>
          )}
        </CustomButton>
      </div>
    </div>
  );
}

export { NavigationButtons };
