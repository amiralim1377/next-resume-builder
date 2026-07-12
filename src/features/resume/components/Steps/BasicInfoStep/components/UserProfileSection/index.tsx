import { CustomResumeCardComponents } from "@/components/ui/CustomResumeCardComponents";
import { CustomControlledPhotoUploader } from "@/components/ui/CustomControlledPhotoUploader";
import { CustomLabel } from "@/components/ui/CustomLabel";
import { ImageUp } from "lucide-react";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";
import { useLang } from "@/provider/lngProvider";
import { useTranslation } from "@/lib/i18n/client";

const UserProfileSection = () => {
  const { colors } = useThemeColors();
  const { lng } = useLang();
  const { t } = useTranslation(lng, "form");

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
      <CustomControlledPhotoUploader t={t} label="hi" name="profileImage" />
    </CustomResumeCardComponents>
  );
};

export { UserProfileSection };
