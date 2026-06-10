import { CEFR_LEVELS_DATA } from "@/core/data/CefrLevelsData";
import { DESCRIPTIVE_LEVELS_DATA } from "@/core/data/descriptiveLevelsData";
import { DISPLAY_MODE_DATA } from "@/core/data/languageDisplayModeData";
import { LANGUAGES_DATA } from "@/core/data/languagesData";
import { monthsData } from "@/core/data/monthsData";
import { GraphicLevels } from "@/features/resume/schemas/LanguageSchema/language";
import { Language } from "@/lib/i18n/settings";
import { CalendarType } from "@/types";
import { ReactNode } from "react";

type Option<T = string | number> = {
  value: T | "";
  text: string | ReactNode;
};

type useGetSkillsInfoStepDataProps = {
  lng?: Language;
  calendarType?: CalendarType;
};

const addEmptyOption = <T extends Option>(
  options: T[],
): Option<T["value"]>[] => [{ value: "", text: "" }, ...options];

const useGetSkillsInfoStepData = ({
  lng,
  calendarType,
}: useGetSkillsInfoStepDataProps) => {
  const languageOptions = addEmptyOption(
    (lng === "fa" ? LANGUAGES_DATA.fa : LANGUAGES_DATA.en).map(
      (languageItem) => ({
        value: languageItem.value,
        text: languageItem.name,
      }),
    ),
  );

  const displayModeOptions = addEmptyOption(
    lng === "fa" ? DISPLAY_MODE_DATA.fa : DISPLAY_MODE_DATA.en,
  ).map((displayModeItem) => ({
    value: displayModeItem.value,
    text: displayModeItem.text,
  }));

  const descripitveLevelOptions = addEmptyOption(
    (lng === "fa"
      ? DESCRIPTIVE_LEVELS_DATA.fa
      : DESCRIPTIVE_LEVELS_DATA.en
    ).map((levelOptionItem) => ({
      value: levelOptionItem.value,
      text: levelOptionItem.name,
    })),
  );

  const cefrLevelsLevelOptions = addEmptyOption(
    (lng === "fa" ? CEFR_LEVELS_DATA.fa : CEFR_LEVELS_DATA.en).map(
      (lefrLevelsItem) => ({
        value: lefrLevelsItem.value,
        text: lefrLevelsItem.name,
      }),
    ),
  );

  const graphicLevelsOptions = addEmptyOption(
    GraphicLevels.map((starItem) => ({
      value: Number(starItem),
      text: "★".repeat(starItem),
    })),
  );

  const monthOptions = addEmptyOption(
    calendarType === "jalali"
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
    languageOptions,
    displayModeOptions,
    descripitveLevelOptions,
    cefrLevelsLevelOptions,
    graphicLevelsOptions,
    monthOptions,
  };
};

export { useGetSkillsInfoStepData };
