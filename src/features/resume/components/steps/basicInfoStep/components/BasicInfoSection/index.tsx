"use client";

import { ProfilePhotoUploader } from "../ProfilePhotoUploader";
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
      <ProfilePhotoUploader t={t} />
      <BasicInformation lng={lng} t={t} />
    </CustomResumeCardComponents>
  );
}

export { BasicInfoSection };
