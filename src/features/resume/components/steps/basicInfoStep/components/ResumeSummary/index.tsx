import { CustomControlledResumeSummary } from "@/components/ui/CustomControlledResumeSummary";
import { CustomResumeCardComponents } from "@/components/ui/CustomResumeCardComponents";
import { Language } from "@/lib/i18n/settings";
import { TFunction } from "i18next";

type ResumeSummaryProps = {
  t: TFunction<string, undefined>;
  lng: Language;
};

const ResumeSummary = ({}: ResumeSummaryProps) => {
  return (
    <CustomResumeCardComponents>
      <CustomControlledResumeSummary
        label="summary"
        name={`basicInfo.summary`}
      />
    </CustomResumeCardComponents>
  );
};

export { ResumeSummary };
