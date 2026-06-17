"use client";
import { BasicInfoSection } from "./components/BasicInfoSection";
import { ContactInformation } from "./components/ContactInformationSection";
import { ResumeSummary } from "./components/ResumeSummary";
import { useLang } from "@/provider/lngProvider";
import { useTranslation } from "@/lib/i18n/client";
import { UserProfileSection } from "./components/UserProfileSection";

function BasicInfoStep() {
  const { lng } = useLang();
  const { t } = useTranslation(lng, "form");
  return (
    <div className="flex w-full flex-col space-y-8">
      <UserProfileSection t={t} />
      <BasicInfoSection lng={lng} t={t} />
      <ContactInformation t={t} />
      <ResumeSummary lng={lng} t={t} />
    </div>
  );
}

export { BasicInfoStep };
