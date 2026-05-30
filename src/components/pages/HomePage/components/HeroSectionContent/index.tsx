"use client";
import { CustomBadge } from "@/components/ui/customBadge";
import { CustomLink } from "@/components/ui/customLink";
import { CustomText } from "@/components/ui/customText";
import { useTranslation } from "@/lib/i18n/client";
import { useLang } from "@/provider/lngProvider";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";
import { CheckCircle } from "@/components/svg/checkCircle";
import { cn } from "@/utils/cn";
import { useHeroClasses } from "./hook/useHeroClasses";

function HeroSectionContent() {
  const { lng } = useLang();
  const { t } = useTranslation(lng, "home");
  const { colors, theme } = useThemeColors();

  const { baseTextClass, defaultColorClass, highlightColorClass } =
    useHeroClasses(theme);
  return (
    <div
      className={cn(
        "mx-auto flex flex-col items-center space-y-4 text-center md:w-1/2 md:items-start",
        lng === "fa" ? "md:text-right" : "md:text-left",
      )}
    >
      <CustomBadge
        className={
          "bg-brandLight text-reverse-text-primary hidden rounded-xl text-xs md:block"
        }
      >
        {t("v2Available")}
      </CustomBadge>
      <div>
        {lng === "fa" ? (
          <>
            <CustomText className={cn(baseTextClass, defaultColorClass)}>
              {t("inMinutes")}
            </CustomText>
            <CustomText className={cn(baseTextClass, defaultColorClass)}>
              <span className={highlightColorClass}>{t("resume")}</span>{" "}
              {t("craftYourResume")}
            </CustomText>
          </>
        ) : (
          <>
            <CustomText className={cn(baseTextClass, defaultColorClass)}>
              {t("craftYourResume")}
            </CustomText>
            <CustomText className={cn(baseTextClass, defaultColorClass)}>
              <span className={highlightColorClass}>{t("resume")}</span>{" "}
              {t("inMinutes")}
            </CustomText>
          </>
        )}
      </div>

      <CustomText className="text-text-secondary text-justify text-sm capitalize md:w-full">
        {t("heroSectionMotoContent")}
      </CustomText>

      <div className="flex items-center gap-6">
        <CustomLink
          className="from-brandPrimary to-state-info rounded-md bg-linear-to-r px-3 py-1.5 text-sm text-white capitalize transition-all duration-700 ease-in-out hover:-translate-y-1 hover:shadow-lg md:rounded-lg md:px-6 md:py-3"
          href={"#"}
        >
          {t("buildMyResume")}
        </CustomLink>

        <CustomLink
          className="border-text-muted text-text-primary hover:bg-brand-accent rounded-sm border px-3 py-1.5 text-sm capitalize md:rounded-lg md:px-6 md:py-3"
          href={"#"}
        >
          {t("login")}
        </CustomLink>
      </div>
      <div className="flex w-full flex-col items-center gap-6 md:flex-row">
        <div className="flex items-center gap-1">
          <CheckCircle size={14} color={colors.state?.success} />
          <CustomText className="text-text-secondary text-xs md:text-sm">
            {t("totalFree")}
          </CustomText>
        </div>
        <div className="flex gap-1">
          <CheckCircle size={14} color={colors.state?.success} />
          <CustomText className="text-text-secondary text-xs md:text-sm">
            {t("atsFriendly")}
          </CustomText>
        </div>
      </div>
    </div>
  );
}
export { HeroSectionContent };
