import { useTranslation } from "@/lib/i18n/client";
import { useLang } from "@/provider/lngProvider";
import { ProjectItem } from "./components/ProjectItem";
import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { CustomLabel } from "@/components/ui/CustomLabel";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";
import { FolderKanban } from "lucide-react";
import { ProjectAccordionHeader } from "./components/ProjectAccordionHeader";
import { ArrayFieldStep } from "../../ArrayFieldStep";
import { CustomResumeCardComponents } from "@/components/ui/CustomResumeCardComponents";
import { EmptyStep } from "../EmptyStep";

function ProjectsStep() {
  const { lng } = useLang();
  const { t } = useTranslation(lng, "form");
  const { colors } = useThemeColors();

  const defaultObj: ResumeFormValues["projects"][number] = {
    projectTitle: "",
    clientName: "",
    projectDate: "",
    projectUrl: "",
    status: "empty",
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
          icon={<FolderKanban color={colors.brand?.brandPrimary} />}
          description={t("addProjectsDescription")}
          descriptionSize="md"
          divider
          dividerClassName={"pb-3"}
        >
          {t("projects")}
        </CustomLabel>

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
          renderHeader={(index) => (
            <ProjectAccordionHeader index={index} t={t} />
          )}
          renderItem={(index, remove) => (
            <ProjectItem
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

export { ProjectsStep };
