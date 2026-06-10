"use client";
import { BasicInfoSection } from "./components/BasicInfoSection";
import { ContactInformation } from "./components/ContactInformationSection";
import { ResumeSummary } from "./components/ResumeSummary";
import { useLang } from "@/provider/lngProvider";
import { useTranslation } from "@/lib/i18n/client";
import { ProfilePhotoUploader } from "./components/ProfilePhotoUploader";

function BasicInfoStep() {
  const { lng } = useLang();
  const { t } = useTranslation(lng, "form");
  return (
    <div className="flex w-full flex-col space-y-8">
      <ProfilePhotoUploader t={t} />
      <BasicInfoSection lng={lng} t={t} />
      <ContactInformation t={t} />
      <ResumeSummary />
    </div>
  );
}

export { BasicInfoStep };
