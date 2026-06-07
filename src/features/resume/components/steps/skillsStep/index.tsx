import { useTranslation } from "@/lib/i18n/client";
import { useLang } from "@/provider/lngProvider";
import { LanguageSection } from "./components/LanguageSection";
import { CoreSkillsSection } from "./components/CoreSkillsSection";

function SkillsStep() {
  const { lng } = useLang();
  const { t } = useTranslation(lng, "form");
  return (
    <div>
      <LanguageSection t={t} lng={lng} />
      <CoreSkillsSection t={t} lng={lng} />
      <LanguageSection t={t} lng={lng} />
    </div>
  );
}

export { SkillsStep };
