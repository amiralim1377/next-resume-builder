"use client";
import { CustomDropdown } from "@/components/ui/customDropdown";
import { CustomText } from "@/components/ui/customText";
import { useTranslation } from "@/lib/i18n/client";
import { useLang } from "@/provider/lngProvider";
import { usePathname } from "next/navigation";
import { memo } from "react";

const LanguageToggle = memo(function LanguageToggle() {
  const { lng } = useLang();
  const pathname = usePathname();
  const { t } = useTranslation(lng, "common");
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
        dropdownClassName: " bg-dropdown p-4  text-textTertiary text-lg  ",
      }}
    >
      <CustomText
        onClick={() => {
          window.location.href = pathname.replace("/en", "/fa");
        }}
      >
        {t("farsi")}
      </CustomText>
      <CustomText
        onClick={() => {
          window.location.href = pathname.replace("/fa", "/en");
        }}
      >
        {t("english")}
      </CustomText>
    </CustomDropdown>
  );
});

export { LanguageToggle };
