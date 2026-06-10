"use client";

import { BasicInformation } from "../BasicInformation";
import { CustomResumeCardComponents } from "@/components/ui/CustomResumeCardComponents";
import { TFunction } from "i18next";
import { Language } from "@/lib/i18n/settings";

type BasicInfoSectionProps = {
  t: TFunction<string, undefined>;
  lng: Language;
};

function BasicInfoSection({ t, lng }: BasicInfoSectionProps) {
  return (
    <CustomResumeCardComponents calssName={"flex items-start"}>
      <BasicInformation lng={lng} t={t} />
    </CustomResumeCardComponents>
  );
}

export { BasicInfoSection };
