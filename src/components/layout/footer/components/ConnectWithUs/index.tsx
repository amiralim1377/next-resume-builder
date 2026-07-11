"use client";
import { LinkdinSvg } from "@/components/svg/LinkdinSvg";
import { CustomProgressLabel } from "@/components/ui/CustomProgressLabel";
import { CustomLink } from "@/components/ui/CustomLink";
import { socialLinks } from "@/core/constants/socialLinks";
import { useTranslation } from "@/lib/i18n/client";
import { useLang } from "@/provider/lngProvider";

function ConnectWithUs() {
  const { lng } = useLang();
  const { t } = useTranslation(lng, "footer");

  return (
    <div className="flex w-fit flex-col items-start">
      <CustomProgressLabel
        classNames={{
          labelClassName: "text-white text-base font-semibold",
          wrapperClassName: "flex flex-col ",
        }}
      >
        {t("connectWithUs")}
      </CustomProgressLabel>
      <div className="mt-4 lg:mt-8">
        <CustomLink href={socialLinks.linkedin}>
          <LinkdinSvg size={25} />
        </CustomLink>
      </div>
    </div>
  );
}

export { ConnectWithUs };
