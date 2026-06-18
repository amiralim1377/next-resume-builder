import { CustomControlledResumeSummary } from "@/components/ui/CustomControlledResumeSummary";
import { CustomResumeCardComponents } from "@/components/ui/CustomResumeCardComponents";
import { Language } from "@/lib/i18n/settings";
import { TFunction } from "i18next";

type ResumeSummaryProps = {
  t: TFunction<string, undefined>;
  lng: Language;
};

const ResumeSummary = ({ t }: ResumeSummaryProps) => {
  return (
    <CustomResumeCardComponents>
      <CustomControlledResumeSummary
        label="summary"
        name={`basicInfo.summary`}
        description={t("resumeSummaryDescription")}
        descriptionClassName="text-text-secondary mb-2 text-xs"
      />
    </CustomResumeCardComponents>
  );
};

export { ResumeSummary };
