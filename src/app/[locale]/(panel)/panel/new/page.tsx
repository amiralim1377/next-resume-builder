"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ResumeFormWrapper } from "@/features/resume/components/ResumeFormWrapper";
import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { getDefaultResumeValues } from "@/features/resume/utils/formDefaultResumeValues";

// هوک‌های جهش دیتای تان‌استک
import {
  useCreateResume,
  useSaveResumeStep,
} from "@/features/resume/hooks/use-resume-mutations";
import { ResumeStep } from "@/domain/dtos/resume.dto";

import { useTranslation } from "@/lib/i18n/client";
// import { Language } from "@/lib/i18n/settings"; // (اگر استفاده نمی‌شود می‌توانید این خط را حذف کنید)
import { useLang } from "@/provider/lngProvider";

const NewResumePage = () => {
  // 🔥 ۱. رفع ارور router با تعریف کردن هوک در ابتدای کامپوننت
  const router = useRouter();

  const { lng } = useLang();
  const { t } = useTranslation(lng, "messages");

  // ذخیره شناسه رزومه ساخته‌شده در استیت برای استفاده در مراحل بعدی
  const [resumeId, setResumeId] = useState<string | null>(null);

  // ۱. هوک ایجاد ردیف اولیه در دیتابیس
  const { mutate: createResume, isPending: isCreating } = useCreateResume();

  // ۲. هوک ذخیره خودکار گام‌به‌گام پیش‌نویس
  const { mutate: saveStep, isPending: isSaving } = useSaveResumeStep();

  // ⚡ ایجاد خودکار رکورد رزومه در دیتابیس به محض لود شدن صفحه (Mount)
  useEffect(() => {
    // شناسه کاربر فرضی
    const mockUserId = "user-unique-uuid-placeholder";

    createResume(mockUserId, {
      onSuccess: (newResume) => {
        // 🔥 ۲. رفع ارور possibly undefined با اضافه کردن شرط و Optional Chaining
        if (newResume?.id) {
          setResumeId(newResume.id);
          // لاگ موفقیت ساخت پیش‌نویس اولیه در سرور
          console.log("✅ [SUCCESS]:", t("success_draftInitialized"));
        }
      },
      onError: (error) => {
        // لاگ خطای ساخت پیش‌نویس اولیه
        console.error("❌ [ERROR]:", t(error.message));
      },
    });
  }, [createResume, t]);

  // 🔄 ذخیره خودکار هر مرحله به محض کلیک روی دکمه بعدی/قبلی در فرم
  const handleStepSubmit = async (step: ResumeStep, stepData: unknown) => {
    if (!resumeId) {
      console.error("❌ [ERROR]:", t("error_noActiveResume"));
      return;
    }

    saveStep(
      { resumeId, step, data: stepData },
      {
        onSuccess: () => {
          // لاگ موفقیت ذخیره خودکار گام
          console.log(
            `✅ [SUCCESS] Step [${step}] saved successfully:`,
            t("success_draftSaved"),
          );
        },
        onError: (error) => {
          // لاگ خطای ذخیره گام
          console.error(
            `❌ [ERROR] Saving step [${step}] failed:`,
            t(error.message),
          );
        },
      },
    );
  };

  // 🎓 سابمیت نهایی کل فرم در مرحله ششم
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
      {/* فقط زمانی فرم را رندر می‌کنیم که شناسه رزومه از سرور گرفته شده باشد */}
      {resumeId ? (
        <ResumeFormWrapper
          initialData={getDefaultResumeValues()}
          mode="create"
          onSubmit={handleFinalSubmit}
          onStepChange={handleStepSubmit} // ثبت تغییرات گام به گام
        />
      ) : (
        <div className="text-center font-medium text-neutral-500">
          {t("loading_initializingDraft")}
        </div>
      )}

      {/* نمایش لودینگ در حین ساخت اولیه یا ذخیره‌سازی ابری مراحل */}
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
