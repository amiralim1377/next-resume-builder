import { CustomControlledInput } from "@/components/ui/CustomControlledInput";
import { Language } from "@/lib/i18n/settings";
import { CalendarType } from "@/types";
import { TFunction } from "i18next";
import { memo, useCallback, useState } from "react";
import { CustomRadio } from "@/components/ui/CustomRadio";
import { ResearchSummary } from "../ResearchSummary";
import { CustomControlledCalendar } from "@/components/ui/CustomControlledCalendar";

type ResearchItemProps = {
  t: TFunction<string, undefined>;
  lng: Language;
  index: number;
};

const ResearchItemComponent = ({ index, lng, t }: ResearchItemProps) => {
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
      {/* Research Title */}
      <div className="col-span-12 md:col-span-6">
        <CustomControlledInput
          label={t("researchTitle")}
          name={`research.${index}.researchTitle`}
        />
      </div>

      {/* Publisher */}
      <div className="col-span-12 md:col-span-6">
        <CustomControlledInput
          label={t("publisher")}
          name={`research.${index}.publisher`}
        />
      </div>

      {/*publicationDate*/}
      <div className="col-span-12 md:col-span-6">
        <CustomControlledCalendar
          name={`research.${index}.publicationDate`}
          label={t("publicationDate")}
          calendarSystem={calendarType}
        />
      </div>

      {/* Related Link */}
      <div className="col-span-6">
        <CustomControlledInput
          label={t("researchUrl")}
          name={`research.${index}.researchUrl`}
        />
      </div>

      {/* Calendar Type */}
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

      {/* Summary */}
      <div className="col-span-12">
        <ResearchSummary index={index} t={t} />
      </div>
    </div>
  );
};

export const ResearchItem = memo(ResearchItemComponent);
