import { CustomControlledInput } from "@/components/ui/CustomControlledInput";
import { CustomControlledSelect } from "@/components/ui/CustomControlledSelect";
import { Language } from "@/lib/i18n/settings";
import { CalendarType } from "@/types";
import { TFunction } from "i18next";
import { useState } from "react";
import { CustomRadio } from "@/components/ui/CustomRadio";
import { useGetSkillsInfoStepData } from "../../../SkillsStep/hooks/useGetSkillsInfoStepData";
import { CustomButton } from "@/components/ui/CustomButton";
import { ProjectSummary } from "../ProjectSummary";

type ProjectItemProps = {
  index: number;
  onDelete: (index: number) => void;
  t: TFunction<string, undefined>;
  lng: Language;
};

const ProjectItem = ({ index, lng, onDelete, t }: ProjectItemProps) => {
  const [calendarType, setCalendarType] = useState<CalendarType>(
    lng === "en" ? "gregorian" : "jalali",
  );

  const { monthOptions } = useGetSkillsInfoStepData({ calendarType, lng });

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-6">
        <CustomControlledInput
          label={t("projectTitle")}
          name={`projects.${index}.projectTitle`}
        />
      </div>

      <div className="col-span-12 md:col-span-6">
        <CustomControlledInput
          label={t("clientName")}
          name={`projects.${index}.clientName`}
        />
      </div>

      <div className="col-span-12">
        <CustomControlledInput
          label={t("projectUrl")}
          placeholder={t("projectUrl")}
          name={`projects.${index}.projectUrl`}
        />
      </div>

      <div className="col-span-12 md:col-span-6">
        <CustomControlledSelect
          name={`projects.${index}.projectMonth`}
          label={t("date")}
          options={monthOptions}
        />
      </div>

      <div className="col-span-12 md:col-span-6">
        <CustomControlledInput
          name={`projects.${index}.projectYear`}
          label={t("year")}
          placeholder={t("projectYear")}
        />
      </div>

      <div className="col-span-12">
        <CustomRadio.Group className="flex flex-row gap-4">
          <CustomRadio
            checked={calendarType === "jalali"}
            onChange={() => setCalendarType("jalali")}
            label={t("solarHijri")}
          />

          <CustomRadio
            checked={calendarType === "gregorian"}
            onChange={() => setCalendarType("gregorian")}
            label={t("gregorian")}
          />
        </CustomRadio.Group>
      </div>

      <div className="col-span-12">
        <ProjectSummary t={t} index={index} />
      </div>

      {index !== 0 && (
        <div className="col-span-12 flex justify-end">
          <CustomButton
            type="button"
            onClick={() => onDelete(index)}
            variant="outlined-negative"
          >
            {t("deleteThis")}
          </CustomButton>
        </div>
      )}
    </div>
  );
};

export { ProjectItem };
