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
        <CustomText className="text-text-secondary block text-5xl font-bold tracking-tight">
          {t("successStories")}
        </CustomText>
        <CustomText className="text-text-secondary block text-xl font-semibold">
          {t("successStoriesContentMoto")}
        </CustomText>
      </div>
      <SuccessStoriesList t={t} />
    </>
  );
}

export { SuccessStories };
