import { MemoizedGenericAccordionHeader } from "@/features/resume/components/GenericAccordionHeader";
import { researchStatusEngine } from "@/features/resume/engines/research.engine";
import { ResearchRowValues } from "@/features/resume/schemas/ResearchSchema";
import { Language } from "@/lib/i18n/settings";
import { TFunction } from "i18next";

type HeaderProps = {
  index: number;
  t: TFunction<string, undefined>;
  lng?: Language;
  actionsSlot?: React.ReactNode;
};

const titleDependencies: Array<keyof ResearchRowValues & string> = [
  "researchTitle",
  "publisher",
];

const formatTitle = (values: unknown[]) => {
  const [researchTitle, publisher] = values as [
    string | undefined,
    string | undefined,
  ];

  const title = [researchTitle, publisher].filter(Boolean).join(" ");

  return title || "...";
};

const ResearchAccordionHeader = ({ index, t, actionsSlot }: HeaderProps) => {
  return (
    <MemoizedGenericAccordionHeader<ResearchRowValues>
      name="research"
      index={index}
      engine={researchStatusEngine}
      titleDependencies={titleDependencies}
      formatTitle={formatTitle}
      t={t}
      actionsSlot={actionsSlot}
    />
  );
};

export { ResearchAccordionHeader };
