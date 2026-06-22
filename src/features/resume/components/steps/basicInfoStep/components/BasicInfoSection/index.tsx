"use client";

import { BasicInformation } from "../BasicInformation";
import { CustomResumeCardComponents } from "@/components/ui/CustomResumeCardComponents";
import { TFunction } from "i18next";
import { Language } from "@/lib/i18n/settings";
import { CustomLabel } from "@/components/ui/CustomLabel";
import { FileUser } from "lucide-react";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";

type BasicInfoSectionProps = {
  t: TFunction<string, undefined>;
  lng: Language;
};

function BasicInfoSection({ t, lng }: BasicInfoSectionProps) {
  const { colors } = useThemeColors();
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
      <BasicInformation lng={lng} t={t} />
    </CustomResumeCardComponents>
  );
}

export { BasicInfoSection };
