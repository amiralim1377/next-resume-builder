import { Language } from "@/lib/i18n/settings";
import { TFunction } from "i18next";

type CoreSkillsSectionSectionProps = {
  t: TFunction<string, undefined>;
  lng: Language;
};

const CoreSkillsSection = ({}: CoreSkillsSectionSectionProps) => {
  return <div>CoreSkillsSection</div>;
};

export { CoreSkillsSection };
