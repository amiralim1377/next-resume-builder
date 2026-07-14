"use client";

import { useRouter } from "next/navigation";
import { ResumeFormWrapper } from "@/features/resume/components/ResumeFormWrapper";
import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { getDefaultResumeValues } from "@/features/resume/utils/formDefaultResumeValues";
import { useCreateResume } from "@/features/resume/hooks/use-resume-mutations";

const NewResumePage = () => {
  const router = useRouter();

  // ۱. فراخوانی هوک تان‌استک کوئری برای ساخت رزومه
  const { mutate: createResume, isPending } = useCreateResume();

  const handleFinalSubmit = async (data: ResumeFormValues) => {
    console.log("✅ Full Resume Data Submitted:", data);

    // TODO: این آیدی بعداً از سیستم احراز هویت (Auth) به صورت داینامیک خوانده خواهد شد
    const mockUserId = "user-unique-uuid-placeholder";

    // ۲. جایگزین کردن Fetch سنتی با میوتیشن تان‌استک
    createResume(mockUserId, {
      onSuccess: (newResume) => {
        console.log("savedSuccessfully");

        // ۳. پس از ذخیره موفق، کاربر را به داشبورد پنل یا صفحه نمایش رزومه‌ها برمی‌گردانیم
        router.push("/panel");
      },
      onError: (error) => {
        console.error("Submit failed:", error.message);
      },
    });
  };

  return (
    <div className="flex w-full items-center justify-center p-6">
      <ResumeFormWrapper
        initialData={getDefaultResumeValues()}
        mode="create"
        onSubmit={handleFinalSubmit}
        // نکته اختیاری: اگر کامپوننت Wrapper شما قابلیت دریافت دکمه لودینگ دارد، می‌توانید isPending را به آن پاس دهید
      />

      {/* نمایش یک لودینگ سراسری و شیک در حین پردازش دیتابیس */}
      {isPending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 font-bold text-white">
          در حال ثبت و پیکربندی رزومه در دیتابیس...
        </div>
      )}
    </div>
  );
};

export default NewResumePage;
