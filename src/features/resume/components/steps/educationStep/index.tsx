import { useLang } from "@/provider/lngProvider";
import { useTranslation } from "@/lib/i18n/client";
import { CustomButton } from "@/components/ui/CustomButton";
import { useFieldArray, useWatch } from "react-hook-form";
import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { CustomLabel } from "@/components/ui/CustomLabel";
import { GraduationCap } from "lucide-react";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/NewCustomAccordion";
import { useEffect, useState } from "react";
import { EducationItem } from "./components/EducationItem";
import { EducationAccordionHeader } from "./components/EducationAccordionHeader";

function EducationStep() {
  const [activeAccordionId, setActiveAccordionId] = useState<string>("");
  const { lng } = useLang();
  const { t } = useTranslation(lng, "form");
  const { colors } = useThemeColors();
  const { fields, append, remove } = useFieldArray<
    ResumeFormValues,
    "education"
  >({
    name: "education",
  });

  const onRowAdd = () => {
    append({
      degreeLevel: "",
      academicMajor: "",
      concentration: "",
      institutionName: "",
      gradeAverage: "",
      country: "",
      province: "",
      city: "",
      entryMonth: "",
      entryYear: "",
      graduationMonth: "",
      graduationYear: "",
      isStudyingNow: false,
      summary: {
        type: "",
        content: [],
      },
    });
  };

  useEffect(() => {
    if (fields.length > 0) {
      const lastFieldId = fields[fields.length - 1].id;
      // eslint-disable-next-line
      setActiveAccordionId(lastFieldId);
    }
  }, [fields.length]);

  const onDelete = (index: number) => {
    remove(index);
  };
  return (
    <div className="flex w-full flex-col space-y-2.5">
      <CustomLabel
        size="lg"
        variant="bold"
        icon={<GraduationCap color={colors.brand?.brandPrimary} />}
      >
        {t("academicHistory")}
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
                  <EducationAccordionHeader index={index} t={t} />
                </AccordionTrigger>
                <AccordionContent className="p-4">
                  <EducationItem
                    index={index}
                    onDelete={onDelete}
                    t={t}
                    lng={lng}
                  />
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      )}

      <CustomButton className="" onClick={onRowAdd}>
        ADD
      </CustomButton>
    </div>
  );
}

export { EducationStep };
