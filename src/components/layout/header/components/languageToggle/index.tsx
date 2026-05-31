"use client";
import { CustomDropdown } from "@/components/ui/customDropdown";
import { CustomText } from "@/components/ui/customText";
import { Language } from "@/lib/i18n/settings";
import { TFunction } from "i18next";
import { memo } from "react";

type LanguageToggleProps = {
  t: TFunction<string, undefined>;
  lng: Language;
  onChangeLanguage: (lng: Language) => void;
};

const LanguageToggle = memo(function LanguageToggle({
  t,
  lng,
  onChangeLanguage,
}: LanguageToggleProps) {
  return (
    <CustomDropdown
      hasIcon
      inTransparentBackGround={false}
      isInMainHeader
      title={lng}
      classNames={{
        container: "px-4",
        titleContainer: "flex items-center",
        title: "font-semibold text-text-secondary ",
        dropdownClassName: "bg-dropdown  p-4  text-textTertiary text-lg  ",
      }}
    >
      <CustomText onClick={() => onChangeLanguage("fa")}>
        {t("farsi")}
      </CustomText>
      <CustomText onClick={() => onChangeLanguage("en")}>
        {t("english")}
      </CustomText>
    </CustomDropdown>
  );
});

export { LanguageToggle };
