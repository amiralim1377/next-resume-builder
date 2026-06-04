import { cities } from "@/core/data/cities";
import { countriesData } from "@/core/data/countries";
import { monthsData } from "@/core/data/monthsData";
import { provincesData } from "@/core/data/province";
import { basicInfoSchema } from "@/features/resume/schemas/resume.schema";
import { Language } from "@/lib/i18n/settings";
import { TFunction } from "i18next";
import { toJalaali } from "jalaali-js";

type useGetBasicInfoStepData = {
  t: TFunction<string, undefined>;
  lng: Language;
  provinceId?: number;
};

const useGetBasicInfoStepData = ({
  t,
  lng,
  provinceId,
}: useGetBasicInfoStepData) => {
  const sexEnum = basicInfoSchema.shape.sex.options;
  const militaryEnum = basicInfoSchema.shape.militaryServiceStatus.options;
  const maritalEnum = basicInfoSchema.shape.maritalStatus.options;

  // eslint-disable-next-line
  const addEmptyOption = (options: any[]): any[] => [
    { value: "", text: "" },
    ...options,
  ];
  const sexOptions = addEmptyOption(
    sexEnum.map((val) => ({
      value: val,
      text: val === "" ? t("none") : t(`sex.${val}`),
    })),
  );

  const maritalOptions = addEmptyOption(
    maritalEnum.map((val) => ({
      value: val,
      text: val === "" ? t("none") : t(`marital.${val}`),
    })),
  );

  const militaryOptions = addEmptyOption(
    militaryEnum.map((val) => ({
      value: val,
      text: val === "" ? t("none") : t(`military.${val}`),
    })),
  );

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  const daysInMonthOptions = addEmptyOption(
    daysInMonth.map((val) => ({
      value: val,
      text: val,
    })),
  );

  const monthOptions = addEmptyOption(
    monthsData.map((month) => ({
      value: lng === "fa" ? month.month_shamsi : month.month_en,
      text: lng === "fa" ? month.month_shamsi : month.month_en,
    })),
  );

  function generateYearOptions(lng: Language) {
    const start = 1941;
    const end = 2026;

    const years = Array.from({ length: end - start + 1 }, (_, i) => {
      const gYear = start + i;

      if (lng === "fa") {
        const j = toJalaali(gYear, 3, 21);
        return {
          value: String(j.jy),
          text: j.jy,
        };
      }

      return {
        value: String(gYear),
        text: gYear,
      };
    });

    return addEmptyOption(years);
  }
  const yearOptions = generateYearOptions(lng);

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
    yearOptions,
    countryOptions,
    provinceOptions,
    cityOptions,
  };
};

export { useGetBasicInfoStepData };
