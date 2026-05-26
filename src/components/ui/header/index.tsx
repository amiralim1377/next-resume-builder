"use client";
import { useTranslation } from "@/lib/i18n/client";
import { CustomText } from "../customText";
import { useLang } from "@/provider/lngProvider";
import SiteLogo from "../svg/SiteLogo";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";
import { cn } from "@/utils/cn";

function Header() {
  const { lng } = useLang();
  const { t } = useTranslation(lng, "common");
  const { colors } = useThemeColors();
  return (
    <div className="flex items-center justify-between w-full  px-8 py-6 ">
      <div className="flex items-center gap-1">
        <SiteLogo size={50} color={colors.brand?.brandPrimary} />
        <CustomText
          className={cn(" font-black capitalize")}
          color={colors.brand?.brandPrimary}
          size={24}
        >
          {t("siteName")}
        </CustomText>
      </div>
      <nav className="flex items-center justify-between gap-5 capitalize">
        <div>{t("register")}</div>
        <div>{t("login")}</div>
        <div>{t("blog")}</div>
        <div>{t("aboutUs")}</div>
      </nav>
    </div>
  );
}

export { Header };
