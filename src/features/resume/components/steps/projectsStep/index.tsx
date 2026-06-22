import { useTranslation } from "@/lib/i18n/client";
import { useLang } from "@/provider/lngProvider";
import { useFieldArray } from "react-hook-form";
import { ProjectItem } from "./components/ProjectItem";
import { CustomButton } from "@/components/ui/CustomButton";
import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { CustomLabel } from "@/components/ui/CustomLabel";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";
import { FolderKanban } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/NewCustomAccordion";
import { ProjectAccordionHeader } from "./components/ProjectAccordionHeader";

function ProjectsStep() {
  const [activeAccordionId, setActiveAccordionId] = useState<string>("");
  const { lng } = useLang();
  const { t } = useTranslation(lng, "form");
  const { colors } = useThemeColors();

  const { fields, append, remove } = useFieldArray<
    ResumeFormValues,
    "projects"
  >({
    name: "projects",
  });

  const onRowAdd = () => {
    append({
      clientName: "",
      summary: {
        type: "",
        content: [],
      },
      projectMonth: "",
      projectTitle: "",
      projectUrl: "",
      projectYear: "",
    });
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
        icon={<FolderKanban color={colors.brand?.brandPrimary} />}
      >
        {t("projects")}
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
                  <ProjectAccordionHeader index={index} />
                </AccordionTrigger>
                <AccordionContent className="p-4">
                  <ProjectItem
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
      <CustomButton className="w-full" onClick={onRowAdd}>
        ADD
      </CustomButton>
    </div>
  );
}

export { ProjectsStep };
