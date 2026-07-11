"use client";
import { CustomProgressLabel } from "@/components/ui/CustomProgressLabel";
import { CustomText } from "@/components/ui/CustomText";
import { useTranslation } from "@/lib/i18n/client";
import { useLang } from "@/provider/lngProvider";

function AboutSite() {
  const { lng } = useLang();
  const { t } = useTranslation(lng, "footer");
  return (
    <div className="flex flex-col items-start">
      <CustomProgressLabel
        classNames={{
          labelClassName: " text-white  font-semibold ",
        }}
      >
        {t("aboutNextResume")}
      </CustomProgressLabel>

      <CustomText className="text-text-secondary mt-4 text-justify text-xs text-wrap md:text-sm lg:mt-8">
        {t("aboutNextResumeContent")}
      </CustomText>
    </div>
  );
}

export { AboutSite };
