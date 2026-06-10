import { CustomControlledInput } from "@/components/ui/CustomControlledInput";
import { CustomControlledSelect } from "@/components/ui/CustomControlledSelect";
import { Language } from "@/lib/i18n/settings";
import { CalendarType } from "@/types";
import { TFunction } from "i18next";
import { useState } from "react";
import { CustomRadio } from "@/components/ui/CustomRadio";
import { useGetSkillsInfoStepData } from "../../../SkillsStep/hooks/useGetSkillsInfoStepData";
import { CustomButton } from "@/components/ui/CustomButton";

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
    <div className="grid grid-cols-2 gap-4">
      <CustomControlledInput
        label={t("projectTitle")}
        name={`projects.${index}.projectTitle`}
      />

      <CustomControlledInput
        label={t("clientName")}
        name={`projects.${index}.clientName`}
      />

      <CustomControlledInput
        className="col-span-2"
        label={t("projectUrl")}
        placeholder={t("projectUrl")}
        name={`projects.${index}.projectUrl`}
      />

      <CustomControlledSelect
        name={`projects.${index}.projectMonth`}
        label={t("date")}
        options={monthOptions}
      />

      <CustomControlledInput
        name={`projects.${index}.projectYear`}
        label={t("year")}
        placeholder={t("projectYear")}
      />

      <div className="col-span-2">
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

      {index !== 0 && (
        <div className="col-span-2 flex justify-end">
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
