"use client";

import { useRouter } from "next/navigation";
import { CustomButton } from "@/components/ui/CustomButton";
import { useCreateResume } from "@/features/resume/hooks/use-resume-mutations";
import { Language } from "@/lib/i18n/settings";
import { TFunction } from "i18next";

type CreateResumeSidebarButtonProps = {
  t: TFunction<string, undefined>;
  lng: Language;
};

export const CreateResumeSidebarButton = ({
  t,
  lng,
}: CreateResumeSidebarButtonProps) => {
  const router = useRouter();
  const { mutate: createResume, isPending } = useCreateResume();

  const handleCreateNewResume = () => {
    const mockUserId = "user-unique-uuid-placeholder";

    createResume(mockUserId, {
      onSuccess: (newResume) => {
        if (newResume?.shortId) {
          router.push(`/${lng}/panel/builder/${newResume.shortId}`);
        }
      },
      onError: (error) => {
        console.error("❌ ساخت رزومه با خطا مواجه شد:", error.message);
      },
    });
  };

  return (
    <CustomButton
      variant="primary"
      onClick={handleCreateNewResume}
      disabled={isPending}
      className="w-full"
    >
      {isPending ? t("loading_creatingResume") : t("buildNewResume")}
    </CustomButton>
  );
};
