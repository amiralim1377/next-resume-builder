import { CustomControlledInput } from "@/components/ui/CustomControlledInput";
import { Language } from "@/lib/i18n/settings";
import { CalendarType } from "@/types";
import { TFunction } from "i18next";
import { useState } from "react";
import { CustomRadio } from "@/components/ui/CustomRadio";
import { CustomButton } from "@/components/ui/CustomButton";
import { CustomControlledSelect } from "@/components/ui/CustomControlledSelect";
import { useGetResearchInfoStepData } from "../../hooks/useGetResearchInfoStepData";

type ResearchItemProps = {
  t: TFunction<string, undefined>;
  lng: Language;
  onDelete: (index: number) => void;
  index: number;
};

const ResearchItem = ({ index, lng, onDelete, t }: ResearchItemProps) => {
  const [calendarType, setCalendarType] = useState<CalendarType>(
    lng === "en" ? "gregorian" : "jalali",
  );

  const { monthOptions } = useGetResearchInfoStepData({
    calendarType,
    lng,
  });
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Research Title */}
      <CustomControlledInput
        label={t("researchTitle")}
        name={`research.${index}.researchTitle`}
      />

      {/* Publisher */}
      <CustomControlledInput
        label={t("publisher")}
        name={`research.${index}.publisher`}
      />

      {/* Related Link */}
      <CustomControlledInput
        className="col-span-2"
        label={t("researchUrl")}
        name={`research.${index}.researchUrl`}
        placeholder={t("researchUrl")}
      />

      {/* Publication Month */}
      <CustomControlledSelect
        name={`research.${index}.publicationMonth`}
        label={t("publicationMonth")}
        options={monthOptions}
      />

      {/* Publication Year */}
      <CustomControlledInput
        name={`research.${index}.publicationYear`}
        label={t("publicationYear")}
      />

      {/* Calendar Type */}
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

      {/* Delete Button */}
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

export { ResearchItem };
