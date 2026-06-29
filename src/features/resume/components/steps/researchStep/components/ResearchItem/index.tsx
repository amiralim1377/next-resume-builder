import { CustomControlledInput } from "@/components/ui/CustomControlledInput";
import { Language } from "@/lib/i18n/settings";
import { CalendarType } from "@/types";
import { TFunction } from "i18next";
import { useState } from "react";
import { CustomRadio } from "@/components/ui/CustomRadio";
import { CustomButton } from "@/components/ui/CustomButton";
import { CustomControlledSelect } from "@/components/ui/CustomControlledSelect";

import { RowStatusObserver } from "@/features/resume/components/RowStatusObserver";
import { useGetResearchInfoStepData } from "../../hooks/useGetResearchInfoStepData";
import { ResearchSummary } from "../ResearchSummary";

type ResearchItemProps = {
  t: TFunction<string, undefined>;
  lng: Language;
  onDelete: (index: number) => void;
  index: number;
};

const ResearchItem = ({ index, lng, onDelete, t }: ResearchItemProps) => {
  const [calendarType, setCalendarType] = useState<CalendarType>(
    lng === "en" ? "gregorian" : "persian",
  );

  const { monthOptions } = useGetResearchInfoStepData({
    calendarType,
    lng,
  });
  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Background worker tracking state changes cleanly */}
      <RowStatusObserver index={index} fieldName="research" />

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

      {/* Related Link */}
      <div className="col-span-12">
        <CustomControlledInput
          label={t("researchUrl")}
          name={`research.${index}.researchUrl`}
          placeholder={t("researchUrl")}
        />
      </div>

      {/* Publication Month */}
      <div className="col-span-12 md:col-span-6">
        <CustomControlledSelect
          name={`research.${index}.publicationMonth`}
          label={t("publicationMonth")}
          options={monthOptions}
        />
      </div>

      {/* Publication Year */}
      <div className="col-span-12 md:col-span-6">
        <CustomControlledInput
          name={`research.${index}.publicationYear`}
          label={t("publicationYear")}
        />
      </div>

      {/* Calendar Type */}
      <div className="col-span-12">
        <CustomRadio.Group className="flex flex-row gap-4">
          <CustomRadio
            checked={calendarType === "persian"}
            onChange={() => setCalendarType("persian")}
            label={t("solarHijri")}
          />

          <CustomRadio
            checked={calendarType === "gregorian"}
            onChange={() => setCalendarType("gregorian")}
            label={t("gregorian")}
          />
        </CustomRadio.Group>
      </div>

      {/* Summary */}
      <div className="col-span-12">
        <ResearchSummary index={index} t={t} />
      </div>

      {/* Delete Button */}
      <div className="col-span-12 flex justify-end">
        <CustomButton
          type="button"
          onClick={() => onDelete(index)}
          variant="outlined-negative"
          className="w-full"
        >
          {t("deleteThis")}
        </CustomButton>
      </div>
    </div>
  );
};

export { ResearchItem };
