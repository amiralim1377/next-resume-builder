import { useLang } from "@/provider/lngProvider";
import { useTranslation } from "@/lib/i18n/client";
import { CustomButton } from "@/components/ui/CustomButton";
import { useFieldArray } from "react-hook-form";
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
import { useEffect, useRef, useState } from "react";

import { CustomResumeCardComponents } from "@/components/ui/CustomResumeCardComponents";
import { EducationAccordionHeader } from "./components/EducationAccordionHeader";
import { EducationItem } from "./components/EducationItem";

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

  const prevLengthRef = useRef(fields.length);

  const onRowAdd = () => {
    append({
      status: "empty",
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
      summary: { type: "doc", content: [] },
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
          icon={<GraduationCap color={colors.brand?.brandPrimary} />}
        >
          {t("academicHistory")}
        </CustomLabel>

        {fields.length === 0 ? (
          <div className="py-4 text-center text-sm opacity-60">
            {t("noEducationAddedYet", "No education history added yet.")}
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
                <AccordionItem
                  className="flex w-full flex-col gap-4"
                  key={field.id}
                  value={field.id}
                >
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
      </CustomResumeCardComponents>

      <CustomButton type="button" className="" onClick={onRowAdd}>
        ADD
      </CustomButton>
    </div>
  );
}

export { EducationStep };
