import { CustomButton } from "@/components/ui/CustomButton";
import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { useTranslation } from "@/lib/i18n/client";
import { useLang } from "@/provider/lngProvider";
import { useFieldArray } from "react-hook-form";
import { ResearchItem } from "./components/ResearchItem";
import { CustomLabel } from "@/components/ui/CustomLabel";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";
import { PenLine } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/NewCustomAccordion";
import { ResearchAccordionHeader } from "./components/ResearchAccordionHeader";

function ResearchStep() {
  const [activeAccordionId, setActiveAccordionId] = useState<string>("");
  const { lng } = useLang();
  const { t } = useTranslation(lng, "form");
  const { colors } = useThemeColors();
  const { fields, append, remove } = useFieldArray<
    ResumeFormValues,
    "research"
  >({
    name: "research",
  });

  const onRowAdd = () => {
    append({
      publicationMonth: "",
      publicationYear: "",
      publisher: "",
      researchTitle: "",
      researchUrl: "",
      summary: {
        type: "",
        content: [],
      },
    });
  };

  const onDelete = (index: number) => {
    remove(index);
  };

  useEffect(() => {
    if (fields.length > 0) {
      const lastFieldId = fields[fields.length - 1].id;
      // eslint-disable-next-line
      setActiveAccordionId(lastFieldId);
    }
  }, [fields.length]);

  return (
    <div className="flex w-full flex-col space-y-2.5">
      <CustomLabel
        size="lg"
        variant="bold"
        icon={<PenLine color={colors.brand?.brandPrimary} />}
      >
        {t("researchAndPublications")}
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
                  <ResearchAccordionHeader index={index} />
                </AccordionTrigger>
                <AccordionContent className="p-4">
                  <ResearchItem
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

export { ResearchStep };
