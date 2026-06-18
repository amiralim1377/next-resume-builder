import { CustomControlledResumeSummary } from "@/components/ui/CustomControlledResumeSummary";
import { TFunction } from "i18next";

type EducationSummaryProps = {
  t: TFunction<string, undefined>;
  index: number;
};

const EducationSummary = ({ t, index }: EducationSummaryProps) => {
  return (
    <CustomControlledResumeSummary
      label="summary"
      name={`education.${index}.summary`}
      description={t("educationDescription")}
      descriptionClassName="text-text-secondary my-2 text-xs"
    />
  );
};

export { EducationSummary };
