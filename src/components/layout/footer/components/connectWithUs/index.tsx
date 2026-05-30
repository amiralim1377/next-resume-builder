"use client";
import { LinkdinSvg } from "@/components/svg/linkdinSvg";
import { CustomLabel } from "@/components/ui/customLabel";
import { CustomLink } from "@/components/ui/customLink";
import { useTranslation } from "@/lib/i18n/client";
import { useLang } from "@/provider/lngProvider";

function ConnectWithUs() {
  const { lng } = useLang();
  const { t } = useTranslation(lng, "footer");
  const amiraliMoradiLinkdin = "https://www.linkedin.com/in/amiralimoradi/";

  return (
    <div>
      <div className="w-fit">
        <CustomLabel
          classNames={{
            labelClassName: "text-white text-base font-semibold",
            wrapperClassName: "flex flex-col ",
          }}
        >
          {t("connectWithUs")}
        </CustomLabel>
        <div className="mt-8">
          <CustomLink href={amiraliMoradiLinkdin}>
            <LinkdinSvg size={25} />
          </CustomLink>
        </div>
      </div>
    </div>
  );
}

export { ConnectWithUs };
