import { useMemo } from "react";
import { cities } from "@/core/data/cities";
import { countriesData } from "@/core/data/countries";
import { monthsData } from "@/core/data/monthsData";
import { provincesData } from "@/core/data/province";
import { DEGREE_OPTIONS } from "@/features/resume/schemas/EducationSchema";
import { Language } from "@/lib/i18n/settings";
import { CalendarType } from "@/types";
import { TFunction } from "i18next";

type Option<T = string | number> = {
  value: T | "";
  text: string;
};

type UseGetBasicInfoStepDataProps = {
  t: TFunction<string, undefined>;
  lng?: Language;
  provinceId: string;
  calendarType: CalendarType;
};

const EMPTY_OPTION: Option<string> = { value: "", text: "" };

const addEmptyOption = <T extends Option>(
  options: T[],
): Option<T["value"]>[] => [EMPTY_OPTION as Option<T["value"]>, ...options];

const createTranslatedOptions = <T extends readonly string[]>(
  options: T,
  translationKey: string,
  t: TFunction,
): Option<string>[] =>
  addEmptyOption(
    options.map((value) => ({
      value,
      text: t(`${translationKey}.${value}`),
    })),
  );

const useGetEducationInfoStepData = ({
  lng,
  t,
  provinceId,
  calendarType,
}: UseGetBasicInfoStepDataProps) => {
  const degreeOptions = useMemo(
    () => createTranslatedOptions(DEGREE_OPTIONS, "degree", t),
    [t],
  );

  const countryOptions = useMemo(
    () =>
      addEmptyOption(
        countriesData.map((country) => ({
          value: country.Name_EN,
          text: lng === "fa" ? country.Name_FA : country.Name_EN,
        })),
      ),
    [lng],
  );

  const provinceOptions = useMemo(
    () =>
      addEmptyOption(
        provincesData.map((province) => ({
          value: province.id,
          text: province.name,
        })),
      ),
    [],
  );

  const cityOptions = useMemo(() => {
    const numericProvinceId = Number(provinceId);

    if (!numericProvinceId) return [EMPTY_OPTION];

    const filteredCities = cities.filter(
      (city) => city.province_id === numericProvinceId,
    );

    return addEmptyOption(
      filteredCities.map((city) => ({
        value: city.name,
        text: city.name,
      })),
    );
  }, [provinceId]);

  const monthOptions = useMemo(() => {
    if (calendarType === "persian") {
      return addEmptyOption(
        monthsData.jalali.map((month) => ({
          value: month.month_shamsi,
          text: month.month_shamsi,
        })),
      );
    }

    return addEmptyOption(
      monthsData.gregorian.map((month) => ({
        value: month.month_en,
        text: month.month_en,
      })),
    );
  }, [calendarType]);

  return {
    degreeOptions,
    countryOptions,
    provinceOptions,
    cityOptions,
    monthOptions,
  };
};

export { useGetEducationInfoStepData };
