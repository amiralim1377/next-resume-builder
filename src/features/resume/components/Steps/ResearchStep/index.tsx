import { useLang } from "@/provider/lngProvider";
import { useTranslation } from "@/lib/i18n/client";
import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { CustomLabel } from "@/components/ui/CustomLabel";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";
import {
  ArrowDown,
  ArrowUp,
  CopyIcon,
  PenLine,
  Trash2Icon,
} from "lucide-react";
import { ResearchItem } from "./components/ResearchItem";
import { ResearchAccordionHeader } from "./components/ResearchAccordionHeader";
import { ArrayFieldStep } from "../../ArrayFieldStep";
import { CustomResumeCardComponents } from "@/components/ui/CustomResumeCardComponents";
import { EmptyStep } from "../EmptyStep";
import { ResearchRowValues } from "@/features/resume/schemas/ResearchSchema";
import { AccordionRowAction } from "../../AccordionRowAction";

function ResearchStep() {
  const { lng } = useLang();
  const { t } = useTranslation(lng, "form");
  const { colors } = useThemeColors();

  const defaultObj: ResearchRowValues = {
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
          renderHeader={(index, remove, copy, move, isFirst, isLast) => (
            <ResearchAccordionHeader
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
          renderItem={(index) => <ResearchItem index={index} lng={lng} t={t} />}
        />
      </CustomResumeCardComponents>
    </div>
  );
}

export { ResearchStep };
