"use client";
import { useTranslation } from "@/lib/i18n/client";
import { CustomText } from "../../ui/customText";
import { useLang } from "@/provider/lngProvider";
import SiteLogo from "../../svg/SiteLogo";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";
import { cn } from "@/utils/cn";
import { CustomLink } from "@/components/ui/customLink";

function Header() {
  const { lng } = useLang();
  const { t } = useTranslation(lng, "common");
  const { colors } = useThemeColors();
  const { switchTheme, theme } = useThemeColors();
  console.log(theme);

  const handleChangeTheme = () => {
    switchTheme();
  };
  return (
    <div className="bg-ui-surface flex w-full items-center justify-between px-8 py-6">
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
        <div>
          <button onClick={handleChangeTheme} className="rounded-md border p-2">
            change theme
          </button>
        </div>
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
      </nav>
    </div>
  );
}

export { Header };
