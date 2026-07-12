import { CustomControlledResumeSummary } from "@/components/ui/CustomControlledResumeSummary";
import { TFunction } from "i18next";

type JobSummaryProps = {
  t: TFunction<string, undefined>;
  index: number;
};

const JobSummary = ({ index, t }: JobSummaryProps) => {
  return (
    <CustomControlledResumeSummary
      label="summary"
      name={`job.${index}.summary`}
      description={t("jobDescriptionHint")}
      descriptionClassName="text-text-secondary my-2 text-xs"
    />
  );
};

export { JobSummary };
