import { CustomResumeCardComponents } from "@/components/ui/CustomResumeCardComponents";
import { CustomControlledPhotoUploader } from "@/components/ui/CustomControlledPhotoUploader";
import { CustomLabel } from "@/components/ui/CustomLabel";
import { ImageUp } from "lucide-react";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";
import { useLang } from "@/provider/lngProvider";
import { useTranslation } from "@/lib/i18n/client";
import { uploadProfileImageAction } from "@/actions/upload.actions";

const UserProfileSection = () => {
  const { colors } = useThemeColors();
  const { lng } = useLang();
  const { t } = useTranslation(lng, "form");

  const handleProfileImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const result = await uploadProfileImageAction(formData);

    if (result.success && result.url) {
      return result.url;
    }
    throw new Error(result.error || "آپلود با خطا مواجه شد");
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
      />
    </CustomResumeCardComponents>
  );
};

export { UserProfileSection };
