import { Language } from "@/lib/i18n/settings";
import { TFunction } from "i18next";
import { useFieldArray } from "react-hook-form";
import { SkillItem } from "./components/SkillItem";
import { CustomButton } from "@/components/ui/CustomButton";
import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { CustomLabel } from "@/components/ui/CustomLabel";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/NewCustomAccordion";
import { CoreSkillAccordionHeader } from "./components/CoreSkillAccordionHeader";

type CoreSkillsSectionSectionProps = {
  t: TFunction<string, undefined>;
  lng: Language;
};

const CoreSkillsSection = ({ lng, t }: CoreSkillsSectionSectionProps) => {
  const [activeAccordionId, setActiveAccordionId] = useState<
    string | undefined
  >();

  const { colors } = useThemeColors();
  const { fields, append, remove } = useFieldArray<ResumeFormValues, "skills">({
    name: "skills",
  });

  const addSkill = () => {
    append({
      skillLevel: "",
      skillName: "",
    });
  };

  useEffect(() => {
    if (fields.length > 0) {
      // eslint-disable-next-line
      setActiveAccordionId(fields[fields.length - 1].id);
    }
  }, [fields]);

  return (
    <div className="flex w-full flex-col space-y-2.5">
      <CustomLabel
        size="lg"
        variant="bold"
        icon={<Star color={colors.brand?.brandPrimary} />}
      >
        {t("coreSkills")}
      </CustomLabel>

      {fields.length === 0 ? (
        <div className="py-4 text-center text-sm opacity-60">
          No skills added yet
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2.5 rounded-lg p-5 shadow-lg md:grid-cols-2">
          {fields.map((field, index) => {
            return (
              <Accordion
                key={field.id}
                type="single"
                collapsible
                value={activeAccordionId}
                onValueChange={setActiveAccordionId}
              >
                <AccordionItem value={field.id} className="rounded-md border">
                  <AccordionTrigger className="px-3">
                    <CoreSkillAccordionHeader index={index} />
                  </AccordionTrigger>

                  <AccordionContent className="p-4">
                    <SkillItem
                      lng={lng}
                      t={t}
                      index={index}
                      onDelete={remove}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          })}
        </div>
      )}

      <CustomButton className="w-full" type="button" onClick={addSkill}>
        add
      </CustomButton>
    </div>
  );
};

export { CoreSkillsSection };
