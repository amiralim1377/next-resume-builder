import { CustomControlledResumeSummary } from "@/components/ui/CustomControlledResumeSummary";
import { CustomLabel } from "@/components/ui/CustomLabel";
import { CustomResumeCardComponents } from "@/components/ui/CustomResumeCardComponents";
import { Language } from "@/lib/i18n/settings";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";
import { TFunction } from "i18next";
import { FileText } from "lucide-react";

type ResumeSummaryProps = {
  t: TFunction<string, undefined>;
  lng: Language;
};

const ResumeSummary = ({ t }: ResumeSummaryProps) => {
  const { colors } = useThemeColors();

  return (
    <CustomResumeCardComponents
      label={
        <CustomLabel
          size="lg"
          variant="bold"
          icon={<FileText color={colors.brand?.brandPrimary} />}
        >
          {t("resumeSummary")}
        </CustomLabel>
      }
    >
      <CustomControlledResumeSummary
        label="summary"
        name={`basicInfo.summary`}
        description={t("resumeSummaryDescription")}
        descriptionClassName="text-text-secondary mb-2 text-xs"
      />
    </CustomResumeCardComponents>
  );
};

export { ResumeSummary };
