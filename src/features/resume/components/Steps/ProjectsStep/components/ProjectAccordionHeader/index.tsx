import { MemoizedGenericAccordionHeader } from "@/features/resume/components/GenericAccordionHeader";
import { ProjectStatusEngine } from "@/features/resume/engines/project.engine";
import { ProjectRowValues } from "@/features/resume/schemas/ProjectsSchema";
import { Language } from "@/lib/i18n/settings";
import { TFunction } from "i18next";

type HeaderProps = {
  index: number;
  t: TFunction<string, undefined>;
  lng?: Language;
  actionsSlot?: React.ReactNode;
};

const titleDependencies: Array<keyof ProjectRowValues & string> = [
  "projectTitle",
  "clientName",
];

const formatTitle = (values: unknown[]) => {
  const [projectTitle, clientName] = values as [
    string | undefined,
    string | undefined,
  ];

  const title = [projectTitle, clientName].filter(Boolean).join(" ");

  return title || "...";
};

const ProjectAccordionHeader = ({ index, t, actionsSlot }: HeaderProps) => {
  return (
    <MemoizedGenericAccordionHeader<ProjectRowValues>
      name="projects"
      index={index}
      engine={ProjectStatusEngine}
      titleDependencies={titleDependencies}
      formatTitle={formatTitle}
      t={t}
      actionsSlot={actionsSlot}
    />
  );
};

export { ProjectAccordionHeader };
