import { CustomControlledResumeSummary } from "@/components/ui/CustomControlledResumeSummary";
import { TFunction } from "i18next";

type ResearchSummaryProps = {
  t: TFunction<string, undefined>;
  index: number;
};

const ResearchSummary = ({ index, t }: ResearchSummaryProps) => {
  return (
    <CustomControlledResumeSummary
      label="summary"
      name={`research.${index}.summary`}
      description={t("researchItemDescription")}
      descriptionClassName="text-text-secondary my-2 text-xs"
    />
  );
};

export { ResearchSummary };
