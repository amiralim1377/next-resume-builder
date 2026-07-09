import { useLang } from "@/provider/lngProvider";
import { useTranslation } from "@/lib/i18n/client";
import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { CustomLabel } from "@/components/ui/CustomLabel";
import { GraduationCap } from "lucide-react";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";
import { CustomResumeCardComponents } from "@/components/ui/CustomResumeCardComponents";
import { EducationAccordionHeader } from "./components/EducationAccordionHeader";
import { EducationItem } from "./components/EducationItem";
import { EmptyStep } from "../EmptyStep";
import { ArrayFieldStep } from "../../ArrayFieldStep";

function EducationStep() {
  const { lng } = useLang();
  const { t } = useTranslation(lng, "form");
  const { colors } = useThemeColors();

  const defaultObj: ResumeFormValues["education"][number] = {
    degreeLevel: "",
    academicMajor: "",
    concentration: "",
    institutionName: "",
    gradeAverage: "",
    country: "",
    province: "",
    city: "",
    entryDate: "",
    graduationDate: "",
    isStudyingNow: false,
    summary: {
      type: "",
      content: [],
    },
  };

  return (
    <div className="flex w-full flex-col space-y-2.5">
      <CustomResumeCardComponents className="flex w-full flex-col space-y-2.5">
        <CustomLabel
          size="lg"
          variant="bold"
          description={t("addEducationDescription")}
          descriptionSize="md"
          icon={<GraduationCap color={colors.brand?.brandPrimary} />}
          divider
          dividerClassName={"pb-3"}
        >
          {t("academicHistory")}
        </CustomLabel>

        <ArrayFieldStep<ResumeFormValues>
          fieldName="education"
          addButtonLabel={t("add")}
          emptyRowValues={defaultObj}
          renderEmptyState={(append) => (
            <EmptyStep
              iconSize={32}
              iconColor="text-brandLight"
              icon={GraduationCap}
              title={t("noEducationAddedYet")}
              description={t("emptyStepEducationDescription")}
              buttonLabel={t("addEducation")}
              onClick={append}
            />
          )}
          renderHeader={(index) => (
            <EducationAccordionHeader index={index} t={t} />
          )}
          renderItem={(index, remove) => (
            <EducationItem
              index={index}
              onDelete={() => remove(index)}
              t={t}
              lng={lng}
            />
          )}
        />
      </CustomResumeCardComponents>
    </div>
  );
}

export { EducationStep };
