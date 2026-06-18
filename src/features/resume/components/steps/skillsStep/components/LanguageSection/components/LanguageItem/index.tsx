import { CustomControlledSelect } from "@/components/ui/CustomControlledSelect";
import { TFunction } from "i18next";
import { useGetSkillsInfoStepData } from "../../../../hooks/useGetSkillsInfoStepData";
import { Language } from "@/lib/i18n/settings";
import { useFormContext, useWatch } from "react-hook-form";
import { CustomButton } from "@/components/ui/CustomButton";
import { OverallProficiencyFields } from "../OverallProficiencyFields";
import { BreakdownProficiencyFields } from "../BreakdownProficiencyFields";
import { useEffect } from "react";

type LanguageItemProps = {
  index: number;
  onDelete: (index: number) => void;
  t: TFunction<string, undefined>;
  lng: Language;
};

const LanguageItem = ({ t, index, lng, onDelete }: LanguageItemProps) => {
  const { resetField, setValue } = useFormContext();
  const { languageOptions, displayModeOptions } = useGetSkillsInfoStepData({
    lng,
  });

  const languageWatch = useWatch({
    name: `languages.${index}.language`,
    exact: true,
  });

  useEffect(() => {
    setValue(`languages.${index}.displayMode`, undefined);

    setValue(`languages.${index}.proficiencyData`, {});
  }, [languageWatch]);

  const displayMode = useWatch({
    name: `languages.${index}.displayMode`,
  }) as string | undefined;

  const [langType, profType] = displayMode?.split("-") ?? ["", ""];

  useEffect(() => {
    if (!displayMode) return;
    const isBreakdown = displayMode.includes("breakdown");
    resetField(`languages.${index}.proficiencyData`, {
      defaultValue: isBreakdown
        ? { reading: "", writing: "", listening: "", speaking: "" }
        : { level: "" },
    });
  }, [index, displayMode, resetField]);

  return (
    <div className="grid">
      <CustomControlledSelect
        label={t("languageName")}
        name={`languages.${index}.language`}
        options={languageOptions}
      />

      <CustomControlledSelect
        label={t("languageDisplayType")}
        name={`languages.${index}.displayMode` as const}
        options={displayModeOptions}
      />

      {/* Dynamic Proficiency Fields */}
      {langType === "overall" ? (
        <OverallProficiencyFields
          t={t}
          index={index}
          profType={profType}
          lng={lng}
        />
      ) : (
        <BreakdownProficiencyFields
          lng={lng}
          t={t}
          index={index}
          profType={profType}
        />
      )}

      {index !== 0 && (
        <CustomButton
          onClick={() => onDelete(index)}
          variant="outlined-negative"
        >
          {t("deleteThis")}
        </CustomButton>
      )}
    </div>
  );
};

export { LanguageItem };
