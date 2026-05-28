"use client";
import { CustomBadge } from "@/components/ui/customBadge";
import { CustomLink } from "@/components/ui/customLink";
import { CustomText } from "@/components/ui/customText";
import { useTranslation } from "@/lib/i18n/client";
import { useLang } from "@/provider/lngProvider";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";
import { CheckCircle } from "@/components/svg/checkCircle";
import { cn } from "@/utils/cn";

function HeroSectionContent() {
  const { lng } = useLang();
  const { t } = useTranslation(lng, "home");
  const { colors, theme } = useThemeColors();
  return (
    <div className="flex w-1/2 flex-col items-start space-y-4">
      <CustomBadge
        className={"bg-brandLight text-reverse-text-primary rounded-xl text-xs"}
      >
        {t("v2Available")}
      </CustomBadge>
      <div className="">
        <div>
          {lng == "fa" ? (
            <CustomText
              className={cn(
                "text-6xl leading-tight font-black capitalize",
                theme === "dark" && "text-brandPrimary",
              )}
            >
              {t("inMinutes")}
            </CustomText>
          ) : (
            <CustomText
              className={cn(
                "text-6xl leading-tight font-black capitalize",
                theme === "dark" && "text-brandPrimary",
              )}
            >
              {t("craftYourResume")}
            </CustomText>
          )}
        </div>

        <div className="flex gap-3">
          <CustomText
            className={cn(
              "text-6xl leading-tight font-black capitalize",
              theme === "light" ? "text-brandPrimary" : "text-white",
            )}
          >
            {t("resume")}
          </CustomText>
          {lng == "en" ? (
            <CustomText
              className={cn(
                "text-6xl leading-tight font-black capitalize",
                theme === "dark" && "text-brandPrimary",
              )}
            >
              {t("inMinutes")}
            </CustomText>
          ) : (
            <CustomText
              className={cn(
                "text-6xl leading-tight font-black capitalize",
                theme === "dark" ? "text-brandPrimary" : "",
              )}
            >
              {t("craftYourResume")}
            </CustomText>
          )}
        </div>
        <CustomText className="text-text-secondary capitalize">
          {t("heroSectionMotoContent")}
        </CustomText>
      </div>
      <div className="flex items-center gap-6">
        <CustomLink
          className="from-brandPrimary to-state-info rounded-lg bg-linear-to-r px-6 py-3 text-white capitalize transition-all hover:-translate-y-1"
          href={"#"}
        >
          {t("buildMyResume")}
        </CustomLink>
        <CustomLink
          className="border-text-muted text-text-primary hover:bg-brand-accent rounded-lg border px-6 py-3 capitalize"
          href={"#"}
        >
          {t("login")}
        </CustomLink>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1">
          <CheckCircle size={14} color={colors.state?.success} />
          <CustomText className="text-text-secondary text-sm">
            {t("totalFree")}
          </CustomText>
        </div>
        <div className="flex items-center gap-1">
          <CheckCircle size={14} color={colors.state?.success} />
          <CustomText className="text-text-secondary text-sm">
            {t("atsFriendly")}
          </CustomText>
        </div>
      </div>
    </div>
  );
}
export { HeroSectionContent };
