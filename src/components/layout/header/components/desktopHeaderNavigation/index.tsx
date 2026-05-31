"use client";
import { CustomLink } from "@/components/ui/customLink";
import { ThemeToggleButton } from "../themeToggleButton";
import { usePathname } from "next/navigation";
import { Language } from "@/lib/i18n/settings";
import { TFunction } from "i18next";
import { ThemeScheme } from "@/provider/themeProvider";
import { ColorPalette } from "@/provider/themeProvider/types";
import { LanguageToggle } from "../languageToggle";

type DesktopHeaderNavigationProps = {
  onSwitchTheme: () => void;
  t: TFunction<string, undefined>;
  theme: ThemeScheme;
  colors: Partial<ColorPalette>;
  lng: Language;
};

const DesktopHeaderNavigation = ({
  onSwitchTheme,
  t,
  theme,
  colors,
  lng,
}: DesktopHeaderNavigationProps) => {
  const pathname = usePathname();

  const handleChangeTheme = () => {
    onSwitchTheme();
  };

  const changeLanguage = (next: Language) => {
    window.location.href =
      next === "fa"
        ? pathname.replace(/^\/en(?=\/|$)/, "/fa")
        : pathname.replace(/^\/fa(?=\/|$)/, "/en");
  };
  return (
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
  );
};

export { DesktopHeaderNavigation };
