import { MemoizedGenericAccordionHeader } from "@/features/resume/components/GenericAccordionHeader";
import { CoursesCertificationsStatusEngine } from "@/features/resume/engines/coursesCertifications.engine";
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
  const [coursesAndCertificationsName, instituteName] = values as [
    string | undefined,
    string | undefined,
  ];

  const title = [coursesAndCertificationsName, instituteName]
    .filter(Boolean)
    .join(" ");

  return title || "...";
};

const CoursesCertificationsAccordionHeader = ({
  index,
  actionsSlot,
  t,
}: HeaderProps) => {
  return (
    <MemoizedGenericAccordionHeader<CoursesAndCertificationsRowValues>
      name="coursesAndCertifications"
      index={index}
      engine={CoursesCertificationsStatusEngine}
      titleDependencies={titleDependencies}
      formatTitle={formatTitle}
      t={t}
      actionsSlot={actionsSlot}
    />
  );
};

export { CoursesCertificationsAccordionHeader };
