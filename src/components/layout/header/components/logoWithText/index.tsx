import SiteLogo from "@/components/svg/SiteLogo";
import { CustomText } from "@/components/ui/customText";
import { ThemeScheme } from "@/provider/themeProvider";
import { ColorPalette } from "@/provider/themeProvider/types";
import { cn } from "@/utils/cn";
import { TFunction } from "i18next";

type LogoWithTextProps = {
  t: TFunction<string, undefined>;
  theme: ThemeScheme;
  colors: Partial<ColorPalette>;
};

const LogoWithText = ({ colors, t, theme }: LogoWithTextProps) => {
  return (
    <>
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
    </>
  );
};

export { LogoWithText };
