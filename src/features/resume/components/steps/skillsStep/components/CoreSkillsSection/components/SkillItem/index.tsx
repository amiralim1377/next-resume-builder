import { CustomControlledInput } from "@/components/ui/CustomControlledInput";
import { CustomControlledSelect } from "@/components/ui/CustomControlledSelect";
import { Language } from "@/lib/i18n/settings";
import { TFunction } from "i18next";
import { UseFieldArrayRemove } from "react-hook-form";
import { useGetSkillsInfoStepData } from "../../../../hooks/useGetSkillsInfoStepData";
import { CustomButton } from "@/components/ui/CustomButton";

type SkillItemProps = {
  lng: Language;
  t: TFunction<string, undefined>;
  index: number;
  onDelete: UseFieldArrayRemove;
};

const SkillItem = ({ index, lng, onDelete, t }: SkillItemProps) => {
  const { graphicLevelsOptions } = useGetSkillsInfoStepData({
    lng,
  });
  return (
    <div className="grid grid-cols-2 gap-4">
      <CustomControlledInput
        name={`skills.${index}.skillName`}
        label={t("skillName")}
        placeholder={
          index === 0
            ? t("firstSkillPlaceholder")
            : index === 1
              ? t("secondSkillPlaceholder")
              : t("skillName")
        }
      />

      <CustomControlledSelect
        name={`skills.${index}.skillLevel` as const}
        label={t("level")}
        options={graphicLevelsOptions}
      />

      <CustomButton
        className="w-1/2 capitalize"
        type="button"
        variant="outlined-negative"
        onClick={() => onDelete(index)}
      >
        {t("deleteThis")}
      </CustomButton>
    </div>
  );
};

export { SkillItem };
