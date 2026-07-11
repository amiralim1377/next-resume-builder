import { monthsData } from "@/core/data/monthsData";
import { Language } from "@/lib/i18n/settings";
import { CalendarType } from "@/types";

type Option<T = string | number> = {
  value: T | "";
  text: string;
};

type useGetResearchInfoStepDataProps = {
  lng?: Language;
  calendarType: CalendarType;
};

const addEmptyOption = <T extends Option>(
  options: T[],
): Option<T["value"]>[] => [{ value: "", text: "" }, ...options];

const useGetResearchInfoStepData = ({
  lng,
  calendarType,
}: useGetResearchInfoStepDataProps) => {
  const monthOptions = addEmptyOption(
    calendarType === "persian"
      ? monthsData.jalali.map((month) => ({
          value: month.month_shamsi,
          text: month.month_shamsi,
        }))
      : monthsData.gregorian.map((month) => ({
          value: month.month_en,
          text: lng === "fa" ? month.month_en : month.month_en,
        })),
  );

  return {
    monthOptions,
  };
};

export { useGetResearchInfoStepData };
