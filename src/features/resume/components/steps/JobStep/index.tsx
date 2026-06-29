import { useLang } from "@/provider/lngProvider";
import { useTranslation } from "@/lib/i18n/client";
import { JobItem } from "./components/JobItem";
import { useFieldArray } from "react-hook-form";
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
import { useEffect, useRef, useState } from "react";
import { JobAccordionHeader } from "./components/JobAccordionHeader";
import { CustomResumeCardComponents } from "@/components/ui/CustomResumeCardComponents";

function JobStep() {
  const [activeAccordionId, setActiveAccordionId] = useState<string>("");
  const { lng } = useLang();
  const { t } = useTranslation(lng, "form");
  const { colors } = useThemeColors();
  const { fields, append, remove } = useFieldArray<ResumeFormValues, "job">({
    name: "job",
  });
  const prevLengthRef = useRef(fields.length);

  const onRowAdd = () => {
    append({
      status: "empty",
      jobTitle: "",
      companyName: "",
      country: "",
      province: "",
      city: "",
      entryDate: "",
      employmentEndYearDate: "",
      isCurrentlyWorkingHere: false,
      summary: {
        type: "",
        content: [],
      },
    });
  };

  useEffect(() => {
    const isRowAdded = fields.length > prevLengthRef.current;
    if (isRowAdded && fields.length > 0) {
      const lastFieldId = fields[fields.length - 1].id;
      setActiveAccordionId(lastFieldId);
    }
    prevLengthRef.current = fields.length;
  }, [fields]);

  const onDelete = (index: number) => {
    remove(index);
  };

  return (
    <div className="flex w-full flex-col space-y-2.5">
      <CustomResumeCardComponents>
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
                    <JobItem
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
      </CustomResumeCardComponents>

      <CustomButton type="button" onClick={onRowAdd}>
        ADD
      </CustomButton>
    </div>
  );
}

export { JobStep };
