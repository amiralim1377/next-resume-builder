import { CustomLabel } from "@/components/ui/CustomLabel";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";
import {
  ArrowDown,
  ArrowUp,
  BadgeCheck,
  Briefcase,
  CopyIcon,
  Trash2Icon,
} from "lucide-react";

import { useLang } from "@/provider/lngProvider";
import { useTranslation } from "@/lib/i18n/client";
import { CoursesAndCertificationsRowValues } from "@/features/resume/schemas/CoursesAndCertificationsSchema";
import { CustomResumeCardComponents } from "@/components/ui/CustomResumeCardComponents";
import { cn } from "@/utils/cn";
import { ArrayFieldStep } from "@/features/resume/components/ArrayFieldStep";
import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { EmptyStep } from "../../../EmptyStep";
import { AccordionRowAction } from "@/features/resume/components/AccordionRowAction";
import { CoursesCertificationsAccordionHeader } from "./components/CoursesCertificationsAccordionHeader";
import { CoursesCertificationsItem } from "./components/CoursesCertificationsItem";

const CoursesCertificationsSection = () => {
  const { lng } = useLang();
  const { t } = useTranslation(lng, "form");
  const { colors } = useThemeColors();

  const defaultObj: CoursesAndCertificationsRowValues = {
    coursesAndCertificationsName: "",
    instituteName: "",
    certificateIssueDate: "",
    certificateUrl: "",
  };

  return (
    <div className="flex w-full flex-col space-y-2.5">
      <CustomResumeCardComponents
        className={cn(
          "flex w-full flex-col space-y-2.5",
          "transition-colors duration-300",
        )}
        label={
          <CustomLabel
            size="lg"
            variant="bold"
            icon={<BadgeCheck color={colors.brand?.brandPrimary} />}
          >
            {t("trainingAndCertificates")}
          </CustomLabel>
        }
      >
        <ArrayFieldStep<ResumeFormValues>
          fieldName="CoursesCertificationsSection"
          addButtonLabel={t("add")}
          emptyRowValues={defaultObj}
          renderEmptyState={(append) => (
            <EmptyStep
              iconSize={32}
              iconColor="text-brandLight"
              icon={Briefcase}
              title={t("noJobAddedYet")}
              description={t("emptyStepJobDescription")}
              buttonLabel={t("addJob")}
              onClick={append}
            />
          )}
          renderHeader={(index, remove, copy, move, isFirst, isLast) => (
            <CoursesCertificationsAccordionHeader
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
            <CoursesCertificationsItem index={index} t={t} lng={lng} />
          )}
        />
      </CustomResumeCardComponents>
    </div>
  );
};

export { CoursesCertificationsSection };
