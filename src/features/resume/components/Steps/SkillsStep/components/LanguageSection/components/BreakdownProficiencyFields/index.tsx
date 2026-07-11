// components/BreakdownProficiencyFields.tsx
import { CustomControlledSelect } from "@/components/ui/CustomControlledSelect";
import { Language } from "@/lib/i18n/settings";
import { TFunction } from "i18next";
import { useGetSkillsInfoStepData } from "../../../../hooks/useGetSkillsInfoStepData";

type BreakdownProficiencyFieldsProps = {
  index: number;
  profType: string;
  t: TFunction<string, undefined>;
  lng: Language;
};

const BreakdownProficiencyFields = ({
  index,
  profType,
  lng,
  t,
}: BreakdownProficiencyFieldsProps) => {
  const {
    graphicLevelsOptions,
    cefrLevelsLevelOptions,
    descripitveLevelOptions,
  } = useGetSkillsInfoStepData({ lng });

  const skillFields = [
    { key: "reading", label: t("reading") },
    { key: "writing", label: t("writing") },
    { key: "listening", label: t("listening") },
    { key: "speaking", label: t("speaking") },
  ] as const;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {skillFields.map(({ key, label }) => (
        <div key={key}>
          {profType === "descriptive" && (
            <CustomControlledSelect
              name={`languages.${index}.proficiencyData.${key}` as const}
              label={label}
              options={descripitveLevelOptions}
            />
          )}

          {profType === "cefr" && (
            <CustomControlledSelect
              name={`languages.${index}.proficiencyData.${key}` as const}
              label={label}
              options={cefrLevelsLevelOptions}
            />
          )}

          {profType === "graphic" && (
            <CustomControlledSelect
              name={`languages.${index}.proficiencyData.${key}` as const}
              label={label}
              options={graphicLevelsOptions}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export { BreakdownProficiencyFields };
