import { CustomResumeCardComponents } from "@/components/ui/CustomResumeCardComponents";
import { Language } from "@/lib/i18n/settings";
import { TFunction } from "i18next";
import { useFieldArray } from "react-hook-form";
import { SkillItem } from "./components/SkillItem";
import { CustomButton } from "@/components/ui/CustomButton";
import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";

type CoreSkillsSectionSectionProps = {
  t: TFunction<string, undefined>;
  lng: Language;
};

const CoreSkillsSection = ({ lng, t }: CoreSkillsSectionSectionProps) => {
  const { fields, append, remove } = useFieldArray<ResumeFormValues, "skills">({
    name: "skills",
  });

  const addSkill = () => {
    append({
      skillLevel: "",
      skillName: "",
    });
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-2.5">
        {fields.map((field, index) => {
          return (
            <CustomResumeCardComponents key={field.id}>
              <SkillItem lng={lng} t={t} index={index} onDelete={remove} />
            </CustomResumeCardComponents>
          );
        })}
      </div>

      <CustomButton className="my-4 w-full" type="button" onClick={addSkill}>
        add
      </CustomButton>
    </div>
  );
};

export { CoreSkillsSection };
