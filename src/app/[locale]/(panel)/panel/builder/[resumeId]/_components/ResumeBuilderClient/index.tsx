"use client";

import { useRouter } from "next/navigation";
import { ResumeFormWrapper } from "@/features/resume/components/ResumeFormWrapper";
import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { getDefaultResumeValues } from "@/features/resume/utils/formDefaultResumeValues";
import { useSaveResumeStep } from "@/features/resume/hooks/use-resume-mutations";
import { ResumeStep } from "@/domain/dtos/resume.dto";
import { useTranslation } from "@/lib/i18n/client";
import { useLang } from "@/provider/lngProvider";

interface ResumeBuilderClientProps {
  resumeId: string;
  initialData?: Partial<ResumeFormValues>;
}

export const ResumeBuilderClient = ({
  resumeId,
  initialData,
}: ResumeBuilderClientProps) => {
  const router = useRouter();
  const { lng } = useLang();
  const { t } = useTranslation(lng, "messages");

  const { mutate: saveStep, isPending: isSaving } = useSaveResumeStep();

  const mergedData: ResumeFormValues = {
    ...getDefaultResumeValues(),
    ...(initialData || {}),
  };

  const handleStepSubmit = async (step: ResumeStep, stepData: unknown) => {
    saveStep(
      { resumeId, step, data: stepData },
      {
        onSuccess: () => {
          console.log(
            `✅ [SUCCESS] Step [${step}] saved successfully:`,
            t("success_draftSaved"),
          );
        },
        onError: (error) => {
          console.error(
            `❌ [ERROR] Saving step [${step}] failed:`,
            t(error.message),
          );
        },
      },
    );
  };

  const handleFinalSubmit = async (data: ResumeFormValues) => {
    console.log(
      "✅ [PROCESS] Final submitting process for resume:",
      resumeId,
      data,
    );
    console.log("✅ [SUCCESS]:", t("success_resumeCreated"));
    router.push(`/${lng}/panel`);
  };

  return (
    <div className="flex w-full items-center justify-center p-6">
      <ResumeFormWrapper
        initialData={mergedData}
        mode="edit"
        onSubmit={handleFinalSubmit}
        onStepChange={handleStepSubmit}
      />

      {isSaving && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 font-bold text-white backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900/90 p-6">
            <span className="text-lg">{t("loading_savingDraft")}</span>
          </div>
        </div>
      )}
    </div>
  );
};
