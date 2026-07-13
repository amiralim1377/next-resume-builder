import { MemoizedGenericAccordionHeader } from "@/features/resume/components/GenericAccordionHeader";
import { coreSkillStatusEngine } from "@/features/resume/engines/coreSkills.engine";
import { SkillsRowValues } from "@/features/resume/schemas/SkillsSchema";
import { Language } from "@/lib/i18n/settings";
import { TFunction } from "i18next";

type HeaderProps = {
  index: number;
  t: TFunction<string, undefined>;
  lng?: Language;
  actionsSlot?: React.ReactNode;
};

const titleDependencies: Array<keyof SkillsRowValues & string> = [
  "skillName",
  "skillLevel",
];

const formatTitle = (values: unknown[]) => {
  const [skillLevel, skillName] = values as [
    string | undefined,
    string | undefined,
  ];

  const title = [skillName, skillLevel].filter(Boolean).join(" ");

  return title || "...";
};

const CoreSkillAccordionHeader = ({ index, actionsSlot, t }: HeaderProps) => {
  return (
    <MemoizedGenericAccordionHeader<SkillsRowValues>
      name="skills"
      index={index}
      engine={coreSkillStatusEngine}
      titleDependencies={titleDependencies}
      formatTitle={formatTitle}
      t={t}
      actionsSlot={actionsSlot}
    />
  );
};

export { CoreSkillAccordionHeader };
