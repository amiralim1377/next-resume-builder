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
    <div className="flex items-center justify-between w-full bg-ui-bg   px-8 py-6 ">
      <div className="flex items-center gap-1">
        <SiteLogo size={50} color={colors.brand?.brandPrimary} />
        <CustomText
          className={cn(" font-black capitalize")}
          color={colors.brand?.brandPrimary}
          size={24}
        >
          {t("siteName")}
        </CustomText>
        <div>
          <button onClick={handleChangeTheme} className="border rounded-md p-2">
            change theme
          </button>
        </div>
      </div>
      <nav className="flex items-center justify-between gap-5 capitalize text-lg font-light  ">
        <CustomLink href={"#"}>{t("login")}</CustomLink>

        <CustomLink href={"#"}>{t("register")}</CustomLink>

        <CustomLink href={"#"}>{t("blog")}</CustomLink>

        <CustomLink
          href={"#"}
          className="bg-brand-primary text-white px-4 py-2 rounded-xl hover:bg-brand-primary/60 transition-all"
        >
          {t("aboutUs")}
        </CustomLink>
      </nav>
    </div>
  );
}

export { Header };
