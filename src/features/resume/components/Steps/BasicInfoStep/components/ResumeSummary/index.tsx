import { CustomControlledResumeSummary } from "@/components/ui/CustomControlledResumeSummary";
import { CustomLabel } from "@/components/ui/CustomLabel";
import { CustomResumeCardComponents } from "@/components/ui/CustomResumeCardComponents";
import { useTranslation } from "@/lib/i18n/client";
import { useLang } from "@/provider/lngProvider";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";
import { FileText } from "lucide-react";

const ResumeSummary = () => {
  const { colors } = useThemeColors();
  const { lng } = useLang();
  const { t } = useTranslation(lng, "form");

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
