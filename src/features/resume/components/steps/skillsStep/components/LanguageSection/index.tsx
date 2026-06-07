import { CustomButton } from "@/components/ui/CustomButton";
import { CustomResumeCardComponents } from "@/components/ui/CustomResumeCardComponents";
import { Language } from "@/lib/i18n/settings";
import { TFunction } from "i18next";
import { useFieldArray } from "react-hook-form";
import { LanguageItem } from "./components/LanguageItem";

type LanguageSectionProps = {
  t: TFunction<string, undefined>;
  lng: Language;
};

const LanguageSection = ({ t, lng }: LanguageSectionProps) => {
  const { fields, append, remove } = useFieldArray({
    name: "languages",
  });

  const addLanguage = () => {
    append({
      language: "",
      displayMode: "",
      proficiencyData: { level: "" },
      description: "",
    });
  };

  return (
    <div>
      {fields.map((field, index) => (
        <CustomResumeCardComponents calssName="mt-2" key={field.id}>
          <LanguageItem lng={lng} t={t} index={index} onDelete={remove} />
        </CustomResumeCardComponents>
      ))}

      <CustomButton className="my-4 w-full" type="button" onClick={addLanguage}>
        add
      </CustomButton>
    </div>
  );
};

export { LanguageSection };
