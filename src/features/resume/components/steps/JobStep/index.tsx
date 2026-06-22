import { useLang } from "@/provider/lngProvider";
import { useTranslation } from "@/lib/i18n/client";
import { JobSection } from "./components/JobSection";
import { useFieldArray, useWatch } from "react-hook-form";
import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { CustomButton } from "@/components/ui/CustomButton";
import { CustomLabel } from "@/components/ui/CustomLabel";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";
import { Briefcase } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/NewCustomAccordion";
import { useEffect, useState } from "react";
import { JobAccordionHeader } from "./components/JobAccordionHeader";

function JobStep() {
  const [activeAccordionId, setActiveAccordionId] = useState<string>("");
  const { lng } = useLang();
  const { t } = useTranslation(lng, "form");
  const { colors } = useThemeColors();
  const { fields, append, remove } = useFieldArray<ResumeFormValues, "job">({
    name: "job",
  });

  const onRowAdd = () => {
    append({
      jobTitle: "",
      companyName: "",
      country: "",
      province: "",
      city: "",
      entryMonth: "",
      entryYear: "",
      employmentEndMonth: "",
      employmentEndYear: "",
      isCurrentlyWorkingHere: false,
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
        icon={<Briefcase color={colors.brand?.brandPrimary} />}
      >
        {t("careerHistory")}
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
                  <JobAccordionHeader index={index} t={t} />
                </AccordionTrigger>
                <AccordionContent className="p-4">
                  <JobSection
                    t={t}
                    lng={lng}
                    onDelete={onDelete}
                    key={field.id}
                    index={index}
                  />
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      )}

      <CustomButton onClick={onRowAdd}>ADD</CustomButton>
    </div>
  );
}

export { JobStep };
