import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { CustomLabel } from "@/components/ui/CustomLabel";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";
import { ArrowDown, ArrowUp, CopyIcon, Star, Trash2Icon } from "lucide-react";
import { SkillItem } from "./components/SkillItem";
import { useLang } from "@/provider/lngProvider";
import { useTranslation } from "@/lib/i18n/client";
import { CustomResumeCardComponents } from "@/components/ui/CustomResumeCardComponents";
import { cn } from "@/utils/cn";
import { ArrayFieldStep } from "@/features/resume/components/ArrayFieldStep";
import { EmptyStep } from "../../../EmptyStep";
import { AccordionRowAction } from "@/features/resume/components/AccordionRowAction";
import { SkillsRowValues } from "@/features/resume/schemas/SkillsSchema";
import { CoreSkillAccordionHeader } from "./components/CoreSkillAccordionHeader";

const CoreSkillsSection = () => {
  const { lng } = useLang();
  const { t } = useTranslation(lng, "form");
  const { colors } = useThemeColors();

  const defaultObj: SkillsRowValues = {
    skillLevel: "",
    skillName: "",
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
            icon={<Star color={colors.brand?.brandPrimary} />}
          >
            {t("coreSkills")}
          </CustomLabel>
        }
      >
        <ArrayFieldStep<ResumeFormValues>
          fieldName="skills"
          addButtonLabel={t("add")}
          emptyRowValues={defaultObj}
          isGrid={true}
          listClassName="grid grid-cols-1 md:grid-cols-2 gap-4"
          renderEmptyState={(append) => (
            <EmptyStep
              iconSize={32}
              iconColor="text-brandLight"
              icon={Star}
              title={t("noSkillAddedYet")}
              description={t("emptyStepSkillDescription")}
              buttonLabel={t("addSkill")}
              onClick={append}
            />
          )}
          renderHeader={(index, remove, copy, move, isFirst, isLast) => (
            <CoreSkillAccordionHeader
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
          renderItem={(index) => <SkillItem index={index} t={t} lng={lng} />}
        />
      </CustomResumeCardComponents>
    </div>
  );
};

export { CoreSkillsSection };
