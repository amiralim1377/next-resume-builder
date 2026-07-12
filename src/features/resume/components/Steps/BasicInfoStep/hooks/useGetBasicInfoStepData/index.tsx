import { useMemo } from "react";
import { cities } from "@/core/data/cities";
import { countriesData } from "@/core/data/countries";
import { monthsData } from "@/core/data/monthsData";
import { provincesData } from "@/core/data/province";
import {
  MARITAL_OPTIONS,
  MILITARY_OPTIONS,
  SEX_OPTIONS,
} from "@/features/resume/schemas/BasicInfoSchema";

import { Language } from "@/lib/i18n/settings";
import { TFunction } from "i18next";
import { toJalaali } from "jalaali-js";

type Option<T = string | number> = {
  value: T | "";
  text: string;
};

type UseGetBasicInfoStepDataProps = {
  t: TFunction<string, undefined>;
  lng: Language;
  provinceId?: number;
};

const addEmptyOption = <T extends Option>(
  options: T[],
): Option<T["value"]>[] => [{ value: "", text: "" }, ...options];

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

const generateYearOptions = (lng: Language): Option<string>[] => {
  const startYear = 1941;
  const currentYear = new Date().getFullYear();

  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => {
      const gregorianYear = startYear + index;

      if (lng === "fa") {
        const { jy } = toJalaali(gregorianYear, 3, 21);

        return {
          value: String(jy),
          text: String(jy),
        };
      }

      return {
        value: String(gregorianYear),
        text: String(gregorianYear),
      };
    },
  );

  return addEmptyOption(years);
};

const useGetBasicInfoStepData = ({
  t,
  lng,
  provinceId,
}: UseGetBasicInfoStepDataProps) => {
  return useMemo(() => {
    const sexOptions = createTranslatedOptions(SEX_OPTIONS, "sex", t);

    const maritalOptions = createTranslatedOptions(
      MARITAL_OPTIONS,
      "marital",
      t,
    );

    const militaryOptions = createTranslatedOptions(
      MILITARY_OPTIONS,
      "military",
      t,
    );

    const daysInMonthOptions = addEmptyOption(
      Array.from({ length: 31 }, (_, index) => ({
        value: String(index + 1),
        text: String(index + 1),
      })),
    );

    const monthOptions = addEmptyOption(
      lng === "fa"
        ? monthsData.jalali.map((month) => ({
            value: month.month_shamsi,
            text: month.month_shamsi,
          }))
        : monthsData.gregorian.map((month) => ({
            value: month.month_en,
            text: month.month_en,
          })),
    );

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

    return {
      sexOptions,
      maritalOptions,
      militaryOptions,
      daysInMonthOptions,
      monthOptions,
      yearOptions: generateYearOptions(lng),
      countryOptions,
      provinceOptions,
      cityOptions,
    };
  }, [t, lng, provinceId]);
};

export { useGetBasicInfoStepData };
