import { useLang } from "@/provider/lngProvider";
import { useTranslation } from "@/lib/i18n/client";
import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { CustomLabel } from "@/components/ui/CustomLabel";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";
import { PenLine } from "lucide-react";
import { ResearchItem } from "./components/ResearchItem";
import { ResearchAccordionHeader } from "./components/ResearchAccordionHeader";
import { ArrayFieldStep } from "../../ArrayFieldStep";
import { CustomResumeCardComponents } from "@/components/ui/CustomResumeCardComponents";
import { EmptyStep } from "../EmptyStep";

function ResearchStep() {
  const { lng } = useLang();
  const { t } = useTranslation(lng, "form");
  const { colors } = useThemeColors();

  const defaultObj: ResumeFormValues["research"][number] = {
    status: "empty",
    publicationDate: "",
    publisher: "",
    researchTitle: "",
    researchUrl: "",
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
          icon={<PenLine color={colors.brand?.brandPrimary} />}
          description={t("addResearchDescription")}
          descriptionSize="md"
          divider
          dividerClassName="pb-3"
        >
          {t("researchAndPublications")}
        </CustomLabel>

        <ArrayFieldStep<ResumeFormValues>
          fieldName="research"
          addButtonLabel={t("add")}
          emptyRowValues={defaultObj}
          renderEmptyState={(append) => (
            <EmptyStep
              iconSize={32}
              iconColor="text-brandLight"
              icon={PenLine}
              title={t("noResearchAddedYet")}
              description={t("emptyStepResearchDescription")}
              buttonLabel={t("addResearch")}
              onClick={append}
            />
          )}
          renderHeader={(index) => (
            <ResearchAccordionHeader index={index} t={t} />
          )}
          renderItem={(index, remove) => (
            <ResearchItem
              index={index}
              lng={lng}
              t={t}
              onDelete={() => remove(index)}
            />
          )}
        />
      </CustomResumeCardComponents>
    </div>
  );
}

export { ResearchStep };
