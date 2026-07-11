import { cities } from "@/core/data/cities";
import { countriesData } from "@/core/data/countries";
import { monthsData } from "@/core/data/monthsData";
import { provincesData } from "@/core/data/province";
import { Language } from "@/lib/i18n/settings";
import { CalendarType } from "@/types";

type Option<T = string | number> = {
  value: T | "";
  text: string;
};

type UseGetJobInfoStepDataProps = {
  lng?: Language;
  provinceId: string;
  calendarType: CalendarType;
};

const addEmptyOption = <T extends Option>(
  options: T[],
): Option<T["value"]>[] => [{ value: "", text: "" }, ...options];

const useGetJobInfoStepData = ({
  lng,
  provinceId,
  calendarType,
}: UseGetJobInfoStepDataProps) => {
  const countryOptions = addEmptyOption(
    countriesData.map((country) => ({
      value: country.Name_EN,
      text: lng === "fa" ? country.Name_FA : country.Name_EN,
    })),
  );

  const provinceOptions = addEmptyOption(
    provincesData.map((province) => ({
      value: province.id,
      text: province.name,
    })),
  );

  const filteredCities = cities.filter(
    (city) => city.province_id === Number(provinceId),
  );

  const cityOptions = addEmptyOption(
    filteredCities.map((city) => ({
      value: city.name,
      text: city.name,
    })),
  );

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
    countryOptions,
    provinceOptions,
    cityOptions,
    monthOptions,
  };
};

export { useGetJobInfoStepData };
