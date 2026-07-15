"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ResumeFormWrapper } from "@/features/resume/components/ResumeFormWrapper";
import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { getDefaultResumeValues } from "@/features/resume/utils/formDefaultResumeValues";
import {
  useCreateResume,
  useSaveResumeStep,
} from "@/features/resume/hooks/use-resume-mutations";
import { ResumeStep } from "@/domain/dtos/resume.dto";
import { useTranslation } from "@/lib/i18n/client";
import { useLang } from "@/provider/lngProvider";

const NewResumePage = () => {
  const router = useRouter();

  const { lng } = useLang();
  const { t } = useTranslation(lng, "messages");

  const [resumeId, setResumeId] = useState<string | null>(null);

  const { mutate: createResume, isPending: isCreating } = useCreateResume();
  const { mutate: saveStep, isPending: isSaving } = useSaveResumeStep();

  useEffect(() => {
    const mockUserId = "user-unique-uuid-placeholder";

    createResume(mockUserId, {
      onSuccess: (newResume) => {
        if (newResume?.id) {
          setResumeId(newResume.id);
          console.log("✅ [SUCCESS]:", t("success_draftInitialized"));
        }
      },
      onError: (error) => {
        console.error("❌ [ERROR]:", t(error.message));
      },
    });
  }, [createResume, t]);

  const handleStepSubmit = async (step: ResumeStep, stepData: unknown) => {
    if (!resumeId) {
      console.error("❌ [ERROR]:", t("error_noActiveResume"));
      return;
    }

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
    router.push("/panel");
  };

  return (
    <div className="flex w-full items-center justify-center p-6">
      {resumeId ? (
        <ResumeFormWrapper
          initialData={getDefaultResumeValues()}
          mode="create"
          onSubmit={handleFinalSubmit}
          onStepChange={handleStepSubmit}
        />
      ) : (
        <div className="text-center font-medium text-neutral-500">
          {t("loading_initializingDraft")}
        </div>
      )}

      {(isCreating || isSaving) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 font-bold text-white backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900/90 p-6">
            <span className="text-lg">
              {isCreating
                ? t("loading_creatingResume")
                : t("loading_savingDraft")}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewResumePage;
