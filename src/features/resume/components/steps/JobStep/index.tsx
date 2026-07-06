import { useLang } from "@/provider/lngProvider";
import { useTranslation } from "@/lib/i18n/client";
import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { CustomLabel } from "@/components/ui/CustomLabel";
import { Briefcase } from "lucide-react";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";
import { CustomResumeCardComponents } from "@/components/ui/CustomResumeCardComponents";
import { JobAccordionHeader } from "./components/JobAccordionHeader";
import { JobItem } from "./components/JobItem";
import { EmptyStep } from "../EmptyStep";
import { ArrayFieldStep } from "../../ArrayFieldStep";

function JobStep() {
  const { lng } = useLang();
  const { t } = useTranslation(lng, "form");
  const { colors } = useThemeColors();

  // Bulletproof typing to prevent status string widening
  const defaultObj: ResumeFormValues["job"][number] = {
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
  };

  return (
    <div className="flex w-full flex-col space-y-2.5">
      <CustomResumeCardComponents className="flex w-full flex-col space-y-2.5">
        <CustomLabel
          size="lg"
          variant="bold"
          description={t("addJobDescription")}
          descriptionSize="md"
          icon={<Briefcase color={colors.brand?.brandPrimary} />}
          divider
          dividerClassName={"pb-3"}
        >
          {t("careerHistory")}
        </CustomLabel>

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
          renderHeader={(index) => <JobAccordionHeader index={index} t={t} />}
          renderItem={(index, remove) => (
            <JobItem
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

export { JobStep };
