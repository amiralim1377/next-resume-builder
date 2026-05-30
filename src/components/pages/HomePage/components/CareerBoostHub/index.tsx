"use client";
import { CustomLink } from "@/components/ui/customLink";
import { CustomText } from "@/components/ui/customText";
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
        "mb-8 flex items-center justify-center rounded-2xl bg-linear-to-r p-12",
        theme === "light"
          ? "from-brandPrimary to-brandActive text-inverse"
          : "from-accent to-accentDark text-textTertiary",
      )}
    >
      <div className="flex flex-col items-center space-y-8">
        <CustomText className="text-5xl font-black">
          {t("ReadyBoostCareer")}
        </CustomText>
        <CustomText className="text-xl leading-6 tracking-widest">
          {t("jobSeekersResume")}
        </CustomText>
        <CustomLink
          href={"#"}
          className={cn(
            "rounded-2xl p-6 transition-all duration-200 hover:-translate-y-0.5",
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
