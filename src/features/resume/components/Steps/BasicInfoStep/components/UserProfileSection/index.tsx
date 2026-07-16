import { CustomResumeCardComponents } from "@/components/ui/CustomResumeCardComponents";
import { CustomControlledPhotoUploader } from "@/components/ui/CustomControlledPhotoUploader";
import { CustomLabel } from "@/components/ui/CustomLabel";
import { ImageUp } from "lucide-react";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";
import { useLang } from "@/provider/lngProvider";
import { useTranslation } from "@/lib/i18n/client";
import { useUploadProfileImage } from "@/features/resume/hooks/use-resume-mutations";

const UserProfileSection = () => {
  const { colors } = useThemeColors();
  const { lng } = useLang();
  const { t } = useTranslation(lng, "form");

  const { mutateAsync: uploadImage, isPending: isUploading } =
    useUploadProfileImage();

  const handleProfileImageUpload = async (file: File) => {
    try {
      const imageUrl = await uploadImage(file);
      return imageUrl;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(t(error.message));
      }

      throw new Error(t("upload_failed"));
    }
  };

  return (
    <CustomResumeCardComponents
      className="w-full"
      label={
        <CustomLabel
          size="lg"
          variant="bold"
          icon={<ImageUp color={colors.brand?.brandPrimary} />}
        >
          {t("uploadResumePhoto")}
        </CustomLabel>
      }
    >
      <CustomControlledPhotoUploader
        onUploadProcess={handleProfileImageUpload}
        t={t}
        label="hi"
        name="profileImage"
        isImageUploading={isUploading}
      />
    </CustomResumeCardComponents>
  );
};

export { UserProfileSection };
