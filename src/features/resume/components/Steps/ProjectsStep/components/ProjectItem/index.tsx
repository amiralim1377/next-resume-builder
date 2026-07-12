import { CustomControlledInput } from "@/components/ui/CustomControlledInput";
import { Language } from "@/lib/i18n/settings";
import { CalendarType } from "@/types";
import { TFunction } from "i18next";
import { memo, useCallback, useState } from "react";
import { CustomRadio } from "@/components/ui/CustomRadio";
import { ProjectSummary } from "../ProjectSummary";
import { CustomControlledCalendar } from "@/components/ui/CustomControlledCalendar";

type ProjectItemProps = {
  index: number;
  t: TFunction<string, undefined>;
  lng: Language;
};

const ProjectItemComponent = ({ index, lng, t }: ProjectItemProps) => {
  const [calendarType, setCalendarType] = useState<CalendarType>(
    lng === "en" ? "gregorian" : "persian",
  );

  const handleSetPersian = useCallback(() => {
    setCalendarType("persian");
  }, []);

  const handleSetGregorian = useCallback(() => {
    setCalendarType("gregorian");
  }, []);

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
          placeholder={t("optional")}
        />
      </div>

      <div className="col-span-12 md:col-span-6">
        <CustomControlledCalendar
          name={`projects.${index}.projectDate`}
          label={t("projectDate")}
          calendarSystem={calendarType}
          placeholder={t("optional")}
        />
      </div>

      <div className="col-span-6">
        <CustomControlledInput
          label={t("projectUrl")}
          name={`projects.${index}.projectUrl`}
          placeholder={t("optional")}
        />
      </div>

      <div className="col-span-12">
        <CustomRadio.Group className="flex flex-row gap-4">
          <CustomRadio
            checked={calendarType === "persian"}
            onChange={handleSetPersian}
            label={t("solarHijri")}
          />

          <CustomRadio
            checked={calendarType === "gregorian"}
            onChange={handleSetGregorian}
            label={t("gregorian")}
          />
        </CustomRadio.Group>
      </div>

      <div className="col-span-12">
        <ProjectSummary t={t} index={index} />
      </div>
    </div>
  );
};

export const ProjectItem = memo(ProjectItemComponent);
