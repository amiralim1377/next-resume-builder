import { CustomButton } from "@/components/ui/CustomButton";
import { Language } from "@/lib/i18n/settings";
import { TFunction } from "i18next";
import { useFieldArray } from "react-hook-form";
import { LanguageItem } from "./components/LanguageItem";
import { CustomLabel } from "@/components/ui/CustomLabel";
import { Globe } from "lucide-react";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/NewCustomAccordion";
import { useEffect, useState } from "react";
import { LanguageAccordionHeader } from "./components/LanguageAccordionHeader";

type LanguageSectionProps = {
  t: TFunction<string, undefined>;
  lng: Language;
};

const LanguageSection = ({ t, lng }: LanguageSectionProps) => {
  const [activeAccordionId, setActiveAccordionId] = useState<string>("");
  const { colors } = useThemeColors();
  const { fields, append, remove } = useFieldArray({
    name: "languages",
  });

  const addLanguage = () => {
    const newRow = {
      language: "",
      displayMode: "",
      proficiencyData: { level: "" },
      description: "",
    };
    append(newRow);
  };
  useEffect(() => {
    if (fields.length > 0) {
      const lastFieldId = fields[fields.length - 1].id;
      // eslint-disable-next-line
      setActiveAccordionId(lastFieldId);
    }
  }, [fields.length, fields]);

  return (
    <div className="flex w-full flex-col space-y-2.5">
      <CustomLabel
        size="lg"
        variant="bold"
        icon={<Globe color={colors.brand?.brandPrimary} />}
      >
        {t("languages")}
      </CustomLabel>

      {fields.length === 0 ? (
        <div className="py-4 text-center text-sm opacity-60">
          No lng added yet
        </div>
      ) : (
        <Accordion
          type="single"
          collapsible
          className="w-full space-y-2 rounded-lg p-5 shadow-lg"
          value={activeAccordionId}
          onValueChange={setActiveAccordionId}
        >
          {fields.map((field, index) => {
            return (
              <AccordionItem key={field.id} value={field.id}>
                <AccordionTrigger>
                  <LanguageAccordionHeader lng={lng} index={index} />
                </AccordionTrigger>
                <AccordionContent className="p-4">
                  <LanguageItem
                    lng={lng}
                    t={t}
                    index={index}
                    onDelete={remove}
                  />
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      )}

      <CustomButton className="w-full" type="button" onClick={addLanguage}>
        add
      </CustomButton>
    </div>
  );
};

export { LanguageSection };
