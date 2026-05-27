"use client";
import { CustomBadge } from "@/components/ui/customBadge";
import { CustomLink } from "@/components/ui/customLink";
import { CustomText } from "@/components/ui/customText";
import { useTranslation } from "@/lib/i18n/client";
import { useLang } from "@/provider/lngProvider";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";
import { CheckCircle } from "@/components/svg/checkCircle";

function HeroSectionContent() {
  const { lng } = useLang();
  const { t } = useTranslation(lng, "home");
  const { colors, theme } = useThemeColors();
  return (
    <div className="flex flex-col items-start w-1/2 space-y-4 ">
      <CustomBadge
        className={
          "text-xs rounded-xl  bg-brandLight text-reverse-text-primary"
        }
      >
        {t("v2Available")}
      </CustomBadge>
      <div className="">
        <div>
          {lng == "fa" ? (
            <CustomText
              className={`capitalize font-black  text-6xl leading-tight ${theme === "dark" ? "text-brandPrimary" : ""}  `}
            >
              {t("inMinutes")}
            </CustomText>
          ) : (
            <CustomText className="font-black text-6xl leading-tight capitalize  ">
              {t("craftYourResume")}
            </CustomText>
          )}
        </div>

        <div className="flex gap-3   ">
          <CustomText
            className={`font-black text-6xl leading-tight capitalize ${theme === "light" ? "text-brandPrimary" : "text-white"} `}
          >
            {t("resume")}
          </CustomText>
          {lng == "en" ? (
            <CustomText className="font-black text-6xl leading-tight capitalize  ">
              {t("inMinutes")}
            </CustomText>
          ) : (
            <CustomText
              className={`font-black  text-6xl leading-tight capitalize ${theme === "dark" ? "text-brandPrimary" : ""} `}
            >
              {t("craftYourResume")}
            </CustomText>
          )}
        </div>
        <CustomText className="capitalize text-text-secondary ">
          {t("heroSectionMotoContent")}
        </CustomText>
      </div>
      <div className="flex items-center gap-6">
        <CustomLink
          className="capitalize px-6 py-3 rounded-lg text-white bg-linear-to-r from-brandPrimary to-state-info transition-all hover:-translate-y-1"
          href={"#"}
        >
          {t("buildMyResume")}
        </CustomLink>
        <CustomLink
          className="capitalize px-6 py-3 rounded-lg border border-text-muted text-text-primary hover:bg-brand-accent "
          href={"#"}
        >
          {t("login")}
        </CustomLink>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1">
          <CheckCircle size={14} color={colors.state?.success} />
          <CustomText className="text-sm  text-text-secondary">
            {t("totalFree")}
          </CustomText>
        </div>
        <div className="flex items-center gap-1">
          <CheckCircle size={14} color={colors.state?.success} />
          <CustomText className="text-sm  text-text-secondary">
            {t("atsFriendly")}
          </CustomText>
        </div>
      </div>
    </div>
  );
}
export { HeroSectionContent };
