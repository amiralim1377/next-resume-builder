import { useTranslation } from "@/lib/i18n/client";
import { useLang } from "@/provider/lngProvider";
import { LanguageSection } from "./components/LanguageSection";
import { CoreSkillsSection } from "./components/CoreSkillsSection";
import { CoursesCertificationsSection } from "./components/CoursesCertificationsSection";

function SkillsStep() {
  const { lng } = useLang();
  const { t } = useTranslation(lng, "form");
  return (
    <div className="flex w-full flex-col space-y-2.5">
      <LanguageSection t={t} lng={lng} />
      <CoreSkillsSection t={t} lng={lng} />
      <CoursesCertificationsSection />
    </div>
  );
}

export { SkillsStep };
