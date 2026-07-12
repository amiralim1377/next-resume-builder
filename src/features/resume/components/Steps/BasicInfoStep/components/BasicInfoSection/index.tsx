"use client";

import { CustomResumeCardComponents } from "@/components/ui/CustomResumeCardComponents";
import { CustomLabel } from "@/components/ui/CustomLabel";
import { FileUser } from "lucide-react";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";
import { BasicInformation } from "../BasicInformation";
import { useLang } from "@/provider/lngProvider";
import { useTranslation } from "@/lib/i18n/client";

function BasicInfoSection() {
  const { colors } = useThemeColors();
  const { lng } = useLang();
  const { t } = useTranslation(lng, "form");
  return (
    <CustomResumeCardComponents
      label={
        <CustomLabel
          size="lg"
          variant="bold"
          icon={<FileUser color={colors.brand?.brandPrimary} />}
        >
          {t("personalInfo")}
        </CustomLabel>
      }
    >
      <BasicInformation />
    </CustomResumeCardComponents>
  );
}

export { BasicInfoSection };
