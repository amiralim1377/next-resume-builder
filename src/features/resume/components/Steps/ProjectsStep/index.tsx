import { useTranslation } from "@/lib/i18n/client";
import { useLang } from "@/provider/lngProvider";
import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { CustomLabel } from "@/components/ui/CustomLabel";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";
import {
  ArrowDown,
  ArrowUp,
  CopyIcon,
  FolderKanban,
  Trash2Icon,
} from "lucide-react";
import { ProjectAccordionHeader } from "./components/ProjectAccordionHeader";
import { ArrayFieldStep } from "../../ArrayFieldStep";
import { CustomResumeCardComponents } from "@/components/ui/CustomResumeCardComponents";
import { EmptyStep } from "../EmptyStep";
import { ProjectRowValues } from "@/features/resume/schemas/ProjectsSchema";
import { AccordionRowAction } from "../../AccordionRowAction";
import { ProjectItem } from "./components/ProjectItem";

function ProjectsStep() {
  const { lng } = useLang();
  const { t } = useTranslation(lng, "form");
  const { colors } = useThemeColors();

  const defaultObj: ProjectRowValues = {
    projectTitle: "",
    clientName: "",
    projectDate: "",
    projectUrl: "",
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
            icon={<FolderKanban color={colors.brand?.brandPrimary} />}
            description={t("addProjectsDescription")}
            descriptionSize="md"
          >
            {t("projects")}
          </CustomLabel>
        }
      >
        <ArrayFieldStep<ResumeFormValues>
          fieldName="projects"
          addButtonLabel={t("add")}
          emptyRowValues={defaultObj}
          renderEmptyState={(append) => (
            <EmptyStep
              iconSize={32}
              iconColor="text-brandLight"
              icon={FolderKanban}
              title={t("noProjectAddedYet")}
              description={t("emptyStepProjectDescription")}
              buttonLabel={t("addProject")}
              onClick={append}
            />
          )}
          renderHeader={(index, remove, copy, move, isFirst, isLast) => (
            <ProjectAccordionHeader
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
          renderItem={(index) => <ProjectItem index={index} lng={lng} t={t} />}
        />
      </CustomResumeCardComponents>
    </div>
  );
}

export { ProjectsStep };
