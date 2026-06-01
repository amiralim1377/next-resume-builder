import { CustomUserInfo } from "@/components/ui/CustomUserInfo";
import amiralimoradiniaImage from "@public/images/IMG_20251101_203439_943.jpg";
import { TFunction } from "i18next";

type PanelSidebarUserInfoProps = {
  t: TFunction<string, undefined>;
};

function PanelSidebarUserInfo({ t }: PanelSidebarUserInfoProps) {
  const userData = {
    initialRating: 5,
    stories: t("firstSuccessStories"),
    userName: t("amirAliMoradiNia"),
    label: t("froneEndDeveloper"),
    avatarShape: "circle",
    avatarSrc: amiralimoradiniaImage,
    avatarStatus: "online",
  };

  return (
    <div>
      <CustomUserInfo
        nameClassName="capitalize text-base text-text-primary font-semibold"
        labelClassName="text-xs text-textTertiary"
        userName={userData.userName}
        label={userData.label}
        avatarSrc={userData.avatarSrc}
        avatarSize="md"
      />
    </div>
  );
}

export { PanelSidebarUserInfo };
