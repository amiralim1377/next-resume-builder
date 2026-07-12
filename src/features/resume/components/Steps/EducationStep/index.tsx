import { useLang } from "@/provider/lngProvider";
import { useTranslation } from "@/lib/i18n/client";
import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { CustomLabel } from "@/components/ui/CustomLabel";
import {
  ArrowDown,
  ArrowUp,
  CopyIcon,
  GraduationCap,
  Trash2Icon,
} from "lucide-react";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";
import { CustomResumeCardComponents } from "@/components/ui/CustomResumeCardComponents";
import { EducationAccordionHeader } from "./components/EducationAccordionHeader";
import { EducationItem } from "./components/EducationItem";
import { EmptyStep } from "../EmptyStep";
import { ArrayFieldStep } from "../../ArrayFieldStep";
import { AccordionRowAction } from "../../AccordionRowAction";
import {
  DegreeLevel,
  EducationRowValues,
} from "@/features/resume/schemas/EducationSchema";

type EducationDraftValues = Omit<EducationRowValues, "degreeLevel"> & {
  degreeLevel: DegreeLevel | "";
};

function EducationStep() {
  const { lng } = useLang();
  const { t } = useTranslation(lng, "form");
  const { colors } = useThemeColors();

  const defaultObj: EducationDraftValues = {
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
      <CustomResumeCardComponents
        className="flex w-full flex-col space-y-2.5"
        label={
          <CustomLabel
            size="lg"
            variant="bold"
            description={t("addEducationDescription")}
            descriptionSize="md"
            icon={<GraduationCap color={colors.brand?.brandPrimary} />}
          >
            {t("academicHistory")}
          </CustomLabel>
        }
      >
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
          renderHeader={(index, remove, copy, move, isFirst, isLast) => (
            <EducationAccordionHeader
              index={index}
              t={t}
              actionsSlot={
                <>
                  {!isFirst && (
                    <AccordionRowAction
                      icon={
                        <ArrowUp className="text-text-secondary hover:text-brandHover hover:ring-brandHover h-7 w-7 rounded-md p-1 transition-all hover:ring-2 hover:ring-offset-2" />
                      }
                      onClick={() => move(index, index - 1)}
                      title={t("moveUp")}
                    />
                  )}
                  {!isLast && (
                    <AccordionRowAction
                      icon={
                        <ArrowDown className="text-text-secondary hover:text-brandHover hover:ring-brandHover h-7 w-7 rounded-md p-1 transition-all hover:ring-2 hover:ring-offset-2" />
                      }
                      onClick={() => move(index, index + 1)}
                      title={t("moveDown")}
                    />
                  )}
                  <AccordionRowAction
                    icon={
                      <CopyIcon className="text-text-secondary hover:text-brandHover hover:ring-brandHover h-7 w-7 rounded-md p-1 transition-all hover:ring-2 hover:ring-offset-2" />
                    }
                    onClick={() => copy(index)}
                    variant="default"
                    title={t("duplicate")}
                  />
                  <AccordionRowAction
                    icon={
                      <Trash2Icon className="text-text-secondary hover:text-state-error hover:ring-state-error h-7 w-7 rounded-md p-1 transition-all hover:ring-2 hover:ring-offset-2" />
                    }
                    onClick={() => remove(index)}
                    variant="danger"
                    title={t("delete")}
                  />
                </>
              }
            />
          )}
          renderItem={(index) => (
            <EducationItem index={index} t={t} lng={lng} />
          )}
        />
      </CustomResumeCardComponents>
    </div>
  );
}

export { EducationStep };
