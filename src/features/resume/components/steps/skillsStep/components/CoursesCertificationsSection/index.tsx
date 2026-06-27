import { Language } from "@/lib/i18n/settings";
import { TFunction } from "i18next";
import { useFieldArray } from "react-hook-form";
import { CustomButton } from "@/components/ui/CustomButton";
import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { CustomLabel } from "@/components/ui/CustomLabel";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";
import { BadgeCheck } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/NewCustomAccordion";
import { CoursesCertificationsAccordionHeader } from "./components/CoursesCertificationsAccordionHeader";
import { CoursesCertificationsItem } from "./components/CoursesCertificationsItem";

type CoursesCertificationsSectionProps = {
  t: TFunction<string, undefined>;
  lng: Language;
};

const DEFAULT_COURSE_CERTIFICATION: ResumeFormValues["coursesAndCertifications"][number] =
  {
    coursesAndCertificationsName: "",
    instituteName: "",
    certificateIssueMonth: "",
    certificateIssueYear: "",
    certificateUrl: "",
  };

const CoursesCertificationsSection = ({
  lng,
  t,
}: CoursesCertificationsSectionProps) => {
  const [activeAccordionId, setActiveAccordionId] = useState<string>("");
  const { colors } = useThemeColors();
  const { fields, append, remove } = useFieldArray<
    ResumeFormValues,
    "coursesAndCertifications"
  >({
    name: "coursesAndCertifications",
  });

  const addCoursesCertifications = () => {
    append(DEFAULT_COURSE_CERTIFICATION);
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
        icon={<BadgeCheck color={colors.brand?.brandPrimary} />}
      >
        {t("trainingAndCertificates")}
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
                  <CoursesCertificationsAccordionHeader index={index} />
                </AccordionTrigger>
                <AccordionContent className="p-4">
                  <CoursesCertificationsItem
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

      <CustomButton
        className="w-full"
        type="button"
        onClick={addCoursesCertifications}
      >
        add
      </CustomButton>
    </div>
  );
};

export { CoursesCertificationsSection };
