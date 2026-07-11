import { SiteLogo } from "@/components/svg/SiteLogo";
import { CustomLink } from "@/components/ui/CustomLink";
import { CustomText } from "@/components/ui/CustomText";
import { Language } from "@/lib/i18n/settings";
import { ThemeScheme } from "@/provider/themeProvider";
import { ColorPalette } from "@/provider/themeProvider/types";
import { cn } from "@/utils/cn";
import { TFunction } from "i18next";

type LogoWithTextProps = {
  t: TFunction<string, undefined>;
  theme: ThemeScheme;
  colors: Partial<ColorPalette>;
  lng: Language;
};

const LogoWithText = ({ colors, t, theme, lng }: LogoWithTextProps) => {
  return (
    <CustomLink href={`/${lng}`}>
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
    </CustomLink>
  );
};

export { LogoWithText };
