import { MemoizedGenericAccordionHeader } from "@/features/resume/components/GenericAccordionHeader";
import { educationStatusEngine } from "@/features/resume/engines/education.engine";
import { EducationRowValues } from "@/features/resume/schemas/EducationSchema";
import { TFunction } from "i18next";
import { memo } from "react";

type HeaderProps = {
  index: number;
  t: TFunction<string, undefined>;
  actionsSlot?: React.ReactNode;
};

const titleDependencies: Array<keyof EducationRowValues & string> = [
  "degreeLevel",
  "academicMajor",
];

const formatTitle = (values: unknown[], t: TFunction<string, undefined>) => {
  const [degreeLevel, academicMajor] = values as [
    string | undefined,
    string | undefined,
  ];
  const degreeTranslated = degreeLevel ? t(`degree.${degreeLevel}`) : "";
  const majorText = academicMajor ?? "";
  return degreeTranslated || majorText
    ? `${degreeTranslated} ${majorText}`.trim()
    : "...";
};

const EducationAccordionHeaderComponent = ({
  index,
  t,
  actionsSlot,
}: HeaderProps) => {
  return (
    <MemoizedGenericAccordionHeader<EducationRowValues>
      name="education"
      index={index}
      engine={educationStatusEngine}
      titleDependencies={titleDependencies}
      formatTitle={formatTitle}
      t={t}
      actionsSlot={actionsSlot}
    />
  );
};

export const EducationAccordionHeader = memo(EducationAccordionHeaderComponent);
