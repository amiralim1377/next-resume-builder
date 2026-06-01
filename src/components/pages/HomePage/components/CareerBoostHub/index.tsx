"use client";
import { CustomLink } from "@/components/ui/CustomLink";
import { CustomText } from "@/components/ui/CustomText";
import { useTranslation } from "@/lib/i18n/client";
import { useLang } from "@/provider/lngProvider";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";
import { cn } from "@/utils/cn";

function CareerBoostHub() {
  const { lng } = useLang();
  const { t } = useTranslation(lng, "home");
  const { theme } = useThemeColors();
  return (
    <div
      className={cn(
        "mb-16 flex items-center justify-center rounded-2xl bg-linear-to-r p-6 lg:p-12",
        theme === "light"
          ? "from-brandPrimary to-brandActive text-inverse"
          : "from-accent to-accentDark text-textTertiary",
      )}
    >
      <div className="flex flex-col items-center justify-center space-y-4 text-center md:space-y-8">
        <CustomText className="text-xl font-bold md:text-5xl md:font-black">
          {t("ReadyBoostCareer")}
        </CustomText>
        <CustomText className="text-xs leading-6 tracking-widest md:text-xl">
          {t("jobSeekersResume")}
        </CustomText>
        <CustomLink
          href={"#"}
          className={cn(
            "rounded-md p-3 text-sm transition-all duration-200 hover:-translate-y-0.5 lg:rounded-2xl lg:p-6",
            theme === "dark"
              ? "border"
              : "bg-white text-black hover:bg-white/55",
          )}
        >
          {t("cta_button")}
        </CustomLink>
      </div>
    </div>
  );
}

export { CareerBoostHub };
