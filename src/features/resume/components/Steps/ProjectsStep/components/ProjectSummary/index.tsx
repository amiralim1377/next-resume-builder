import { CustomControlledResumeSummary } from "@/components/ui/CustomControlledResumeSummary";
import { TFunction } from "i18next";

type ProjectSummaryProps = {
  t: TFunction<string, undefined>;
  index: number;
};

const ProjectSummary = ({ index, t }: ProjectSummaryProps) => {
  return (
    <CustomControlledResumeSummary
      label="summary"
      name={`projects.${index}.summary`}
      description={t("projectItemDescription")}
      descriptionClassName="text-text-secondary my-2 text-xs"
    />
  );
};

export { ProjectSummary };
