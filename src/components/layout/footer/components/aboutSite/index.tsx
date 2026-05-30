"use client";
import { CustomLabel } from "@/components/ui/customLabel";
import { CustomText } from "@/components/ui/customText";
import { useTranslation } from "@/lib/i18n/client";
import { useLang } from "@/provider/lngProvider";

function AboutSite() {
  const { lng } = useLang();
  const { t } = useTranslation(lng, "footer");
  return (
    <div className="flex flex-col items-start">
      <CustomLabel
        classNames={{
          labelClassName: " text-white  font-semibold ",
          wrapperClassName: "flex flex-col  ",
        }}
      >
        {t("aboutNextResume")}
      </CustomLabel>

      <CustomText className="text-text-secondary mt-4 text-justify text-xs text-wrap md:text-sm lg:mt-8">
        {t("aboutNextResumeContent")}
      </CustomText>
    </div>
  );
}

export { AboutSite };
