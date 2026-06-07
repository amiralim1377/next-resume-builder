import { Language } from "@/lib/i18n/settings";
import { TFunction } from "i18next";

type LanguageSectionProps = {
  t: TFunction<string, undefined>;
  lng: Language;
};

const LanguageSection = ({}: LanguageSectionProps) => {
  return <div>languageSection</div>;
};

export { LanguageSection };
