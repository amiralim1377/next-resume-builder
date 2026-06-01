import { TFunction } from "i18next";
import { getHref } from "@/utils/getHref";
import { CustomButton } from "@/components/ui/CustomButton";
import { StyledLink } from "@/components/ui/CustomStyledLink";
import { RoutesName } from "@/core/constants/routesName";
import { Language } from "@/lib/i18n/settings";

type PanelSidebarNavigationProps = {
  t: TFunction<string, undefined>;
  lng: Language;
};

function PanelSidebarNavigation({ t, lng }: PanelSidebarNavigationProps) {
  return (
    <>
      <StyledLink
        variant="primary"
        href={getHref({ lng, destination: RoutesName.newResume })}
      >
        {t("buildNewResume")}
      </StyledLink>
      <StyledLink
        href={getHref({ lng, destination: RoutesName.panel })}
        variant="primary"
      >
        {t("dashboard")}
      </StyledLink>
      <StyledLink href={getHref({ lng, destination: RoutesName.myResume })}>
        {t("myResumes")}
      </StyledLink>
      <StyledLink
        href={getHref({ lng, destination: RoutesName.resumeTemplates })}
      >
        {t("resumeTemplates")}
      </StyledLink>
      <StyledLink href={getHref({ lng, destination: RoutesName.help })}>
        {t("helpGuide")}
      </StyledLink>
      <StyledLink href={getHref({ lng, destination: RoutesName.settings })}>
        {t("settings")}
      </StyledLink>
      <CustomButton variant="outlined-negative">{t("exit")}</CustomButton>
    </>
  );
}

export { PanelSidebarNavigation };
