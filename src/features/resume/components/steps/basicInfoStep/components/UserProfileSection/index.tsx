import { TFunction } from "i18next";
import { CustomResumeCardComponents } from "@/components/ui/CustomResumeCardComponents";
import { CustomControlledPhotoUploader } from "@/components/ui/CustomControlledPhotoUploader";
import { CustomLabel } from "@/components/ui/CustomLabel";
import { ImageUp } from "lucide-react";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";

type UserProfileSectionProps = {
  t: TFunction<string, undefined>;
};

const UserProfileSection = ({ t }: UserProfileSectionProps) => {
  const { colors } = useThemeColors();

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
