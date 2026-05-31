"use client";
import { useTranslation } from "@/lib/i18n/client";
import { CustomText } from "../../ui/customText";
import { useLang } from "@/provider/lngProvider";
import SiteLogo from "../../svg/SiteLogo";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";
import { cn } from "@/utils/cn";
import { CustomLink } from "@/components/ui/customLink";
import { ThemeToggleButton } from "./components/themeToggleButton";
import { LanguageToggle } from "./components/languageToggle";
import { usePathname } from "next/navigation";
import { Language } from "@/lib/i18n/settings";

function Header() {
  const { lng } = useLang();
  const { t } = useTranslation(lng, "common");
  const { colors } = useThemeColors();
  const pathname = usePathname();
  const { switchTheme, theme } = useThemeColors();

  const handleChangeTheme = () => {
    switchTheme();
  };

  const changeLanguage = (next: Language) => {
    window.location.href =
      next === "fa"
        ? pathname.replace(/^\/en(?=\/|$)/, "/fa")
        : pathname.replace(/^\/fa(?=\/|$)/, "/en");
  };

  return (
    <div className="bg-ui-bg border-ui-border flex w-full items-center justify-between border-b px-8 py-6">
      <div className="flex items-center gap-1">
        <SiteLogo
          size={50}
          color={
            theme === "light"
              ? colors.brand?.brandPrimary
              : colors.text?.secondary
          }
        />
        <CustomText
          className={cn("font-black capitalize")}
          color={
            theme === "light"
              ? colors.brand?.brandPrimary
              : colors.text?.secondary
          }
          size={24}
        >
          {t("siteName")}
        </CustomText>
      </div>
      <nav className="flex items-center justify-between gap-5 text-lg font-light capitalize">
        <CustomLink
          href={"#"}
          className="text-text-secondary hover:text-brandLight relative transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
        >
          {t("login")}
        </CustomLink>

        <CustomLink
          href={"#"}
          className="text-text-secondary hover:text-brandLight relative transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
        >
          {t("register")}
        </CustomLink>

        <CustomLink
          href={"#"}
          className="text-text-secondary hover:text-brandLight relative transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
        >
          {t("blog")}
        </CustomLink>

        <CustomLink
          href={"#"}
          className="bg-brandPrimary text-brandText hover:bg-brandHover hover:shadow-brandPrimary/20 rounded-xl px-5 py-2 transition-all duration-300 ease-in-out hover:shadow-lg active:scale-95"
        >
          {t("aboutUs")}
        </CustomLink>
        <ThemeToggleButton
          onChange={handleChangeTheme}
          colors={colors}
          theme={theme}
        />
        <LanguageToggle onChangeLanguage={changeLanguage} t={t} lng={lng} />
      </nav>
    </div>
  );
}

export { Header };
