"use client";

import { CustomText } from "@/components/ui/customText";
import { useTranslation } from "@/lib/i18n/client";
import { useLang } from "@/provider/lngProvider";
import { SuccessStoriesList } from "../SuccessStoriesList";

function SuccessStories() {
  const { lng } = useLang();
  const { t } = useTranslation(lng, "home");
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-y-10">
        <CustomText className="text-text-secondary block text-3xl font-bold tracking-tight md:text-5xl">
          {t("successStories")}
        </CustomText>
        <CustomText className="text-text-secondary block text-lg font-semibold md:text-xl">
          {t("successStoriesContentMoto")}
        </CustomText>
      </div>
      <SuccessStoriesList t={t} />
    </>
  );
}

export { SuccessStories };
