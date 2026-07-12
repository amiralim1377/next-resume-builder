import { useLang } from "@/provider/lngProvider";
import { useTranslation } from "@/lib/i18n/client";
import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { CustomLabel } from "@/components/ui/CustomLabel";
import {
  ArrowDown,
  ArrowUp,
  Briefcase,
  CopyIcon,
  Trash2Icon,
} from "lucide-react";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";
import { CustomResumeCardComponents } from "@/components/ui/CustomResumeCardComponents";
import { JobAccordionHeader } from "./components/JobAccordionHeader";
import { JobItem } from "./components/JobItem";
import { EmptyStep } from "../EmptyStep";
import { ArrayFieldStep } from "../../ArrayFieldStep";
import { JobRowValues } from "@/features/resume/schemas/JobSchema";
import { AccordionRowAction } from "../../AccordionRowAction";
import { cn } from "@/utils/cn";

function JobStep() {
  const { lng } = useLang();
  const { t } = useTranslation(lng, "form");
  const { colors } = useThemeColors();

  const defaultObj: JobRowValues = {
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
            description={t("addJobDescription")}
            descriptionSize="md"
            icon={<Briefcase color={colors.brand?.brandPrimary} />}
          >
            {t("careerHistory")}
          </CustomLabel>
        }
      >
        <ArrayFieldStep<ResumeFormValues>
          fieldName="job"
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
            <JobAccordionHeader
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
          renderItem={(index) => <JobItem index={index} t={t} lng={lng} />}
        />
      </CustomResumeCardComponents>
    </div>
  );
}

export { JobStep };
