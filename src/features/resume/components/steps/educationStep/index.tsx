import { useLang } from "@/provider/lngProvider";
import { EducationSection } from "./components/EducationSection";
import { useTranslation } from "@/lib/i18n/client";

function EducationStep() {
  const { lng } = useLang();
  const { t } = useTranslation(lng, "form");
  return (
    <div className="flex w-full flex-col space-y-8">
      <EducationSection t={t} lng={lng} />
    </div>
  );
}

export { EducationStep };
