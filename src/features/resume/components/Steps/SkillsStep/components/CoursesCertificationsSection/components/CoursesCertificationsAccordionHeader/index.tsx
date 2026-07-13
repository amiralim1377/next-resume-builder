import { MemoizedGenericAccordionHeader } from "@/features/resume/components/GenericAccordionHeader";
import { jobStatusEngine } from "@/features/resume/engines/job.engine";
import { CoursesAndCertificationsRowValues } from "@/features/resume/schemas/CoursesAndCertificationsSchema";
import { Language } from "@/lib/i18n/settings";
import { TFunction } from "i18next";

type HeaderProps = {
  index: number;
  t: TFunction<string, undefined>;
  lng?: Language;
  actionsSlot?: React.ReactNode;
};

const titleDependencies: Array<
  keyof CoursesAndCertificationsRowValues & string
> = ["coursesAndCertificationsName", "instituteName"];

const formatTitle = (values: unknown[]) => {
  const [jobTitle, companyName] = values as [
    string | undefined,
    string | undefined,
  ];

  const title = [jobTitle, companyName].filter(Boolean).join(" ");

  return title || "...";
};

const CoursesCertificationsAccordionHeader = ({
  index,
  actionsSlot,
  t,
}: HeaderProps) => {
  return (
    <MemoizedGenericAccordionHeader<CoursesAndCertificationsRowValues>
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

export { CoursesCertificationsAccordionHeader };
