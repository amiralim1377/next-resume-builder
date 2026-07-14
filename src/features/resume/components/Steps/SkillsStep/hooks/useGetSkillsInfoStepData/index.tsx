import { CEFR_LEVELS_DATA } from "@/core/data/CefrLevelsData";
import { DESCRIPTIVE_LEVELS_DATA } from "@/core/data/descriptiveLevelsData";
import { DISPLAY_MODE_DATA } from "@/core/data/languageDisplayModeData";
import { LANGUAGES_DATA } from "@/core/data/languagesData";
import { monthsData } from "@/core/data/monthsData";
import { GraphicLevels } from "@/features/resume/schemas/LanguageSchema/language";
import { Language } from "@/lib/i18n/settings";
import { CalendarType } from "@/types";
import { ReactNode, useMemo } from "react";

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

const GRAPHIC_LEVELS_OPTIONS = addEmptyOption(
  GraphicLevels.map((starItem) => ({
    value: Number(starItem),
    text: "⭐".repeat(starItem) + "☆".repeat(5 - Number(starItem)),
  })),
);

const useGetSkillsInfoStepData = ({
  lng,
  calendarType,
}: useGetSkillsInfoStepDataProps) => {
  return useMemo(() => {
    const isFa = lng === "fa";

    const languageOptions = addEmptyOption(
      (isFa ? LANGUAGES_DATA.fa : LANGUAGES_DATA.en).map((languageItem) => ({
        value: languageItem.value,
        text: languageItem.name,
      })),
    );

    const displayModeOptions = addEmptyOption(
      isFa ? DISPLAY_MODE_DATA.fa : DISPLAY_MODE_DATA.en,
    ).map((displayModeItem) => ({
      value: displayModeItem.value,
      text: displayModeItem.text,
    }));

    const descripitveLevelOptions = addEmptyOption(
      (isFa ? DESCRIPTIVE_LEVELS_DATA.fa : DESCRIPTIVE_LEVELS_DATA.en).map(
        (levelOptionItem) => ({
          value: levelOptionItem.value,
          text: levelOptionItem.name,
        }),
      ),
    );

    const cefrLevelsLevelOptions = addEmptyOption(
      (isFa ? CEFR_LEVELS_DATA.fa : CEFR_LEVELS_DATA.en).map(
        (lefrLevelsItem) => ({
          value: lefrLevelsItem.value,
          text: lefrLevelsItem.name,
        }),
      ),
    );

    const monthOptions = addEmptyOption(
      calendarType === "persian"
        ? monthsData.jalali.map((month) => ({
            value: month.month_shamsi,
            text: month.month_shamsi,
          }))
        : monthsData.gregorian.map((month) => ({
            value: month.month_en,
            text: month.month_en,
          })),
    );

    return {
      languageOptions,
      displayModeOptions,
      descripitveLevelOptions,
      cefrLevelsLevelOptions,
      graphicLevelsOptions: GRAPHIC_LEVELS_OPTIONS,
      monthOptions,
    };
  }, [lng, calendarType]);
};

export { useGetSkillsInfoStepData };
