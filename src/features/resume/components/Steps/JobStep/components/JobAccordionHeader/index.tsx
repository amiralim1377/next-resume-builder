import { JobRowValues } from "@/features/resume/schemas/JobSchema"; // Adjust path as needed
import { TFunction } from "i18next";
import { memo } from "react";
import { MemoizedGenericAccordionHeader } from "@/features/resume/components/GenericAccordionHeader";
import { jobStatusEngine } from "@/features/resume/engines/job.engine";

type HeaderProps = {
  index: number;
  t: TFunction<string, undefined>;
  actionsSlot?: React.ReactNode;
};

const titleDependencies: Array<keyof JobRowValues & string> = [
  "jobTitle",
  "companyName",
];

const formatTitle = (values: unknown[]) => {
  const [jobTitle, companyName] = values as [
    string | undefined,
    string | undefined,
  ];

  const title = [jobTitle, companyName].filter(Boolean).join(" ");

  return title || "...";
};

const JobAccordionHeaderComponent = ({
  index,
  t,
  actionsSlot,
}: HeaderProps) => {
  return (
    <MemoizedGenericAccordionHeader<JobRowValues>
      name="job"
      index={index}
      engine={jobStatusEngine}
      titleDependencies={titleDependencies}
      formatTitle={formatTitle}
      t={t}
      actionsSlot={actionsSlot}
    />
  );
};

export const JobAccordionHeader = memo(JobAccordionHeaderComponent);
