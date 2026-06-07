import { StarSvg } from "@/components/svg/StarSvg";
import { CEFR_LEVELS_DATA } from "@/core/data/CefrLevelsData";
import { DESCRIPTIVE_LEVELS_DATA } from "@/core/data/descriptiveLevelsData";
import { DISPLAY_MODE_DATA } from "@/core/data/languageDisplayModeData";
import { LANGUAGES_DATA } from "@/core/data/languagesData";
import { GraphicLevels } from "@/features/resume/types/language";
import { Language } from "@/lib/i18n/settings";
import { ReactNode } from "react";

type Option<T = string | number> = {
  value: T | "";
  text: string | ReactNode;
};

type useGetSkillsInfoStepDataProps = {
  lng?: Language;
};

const addEmptyOption = <T extends Option>(
  options: T[],
): Option<T["value"]>[] => [{ value: "", text: "" }, ...options];

const useGetSkillsInfoStepData = ({ lng }: useGetSkillsInfoStepDataProps) => {
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
  return {
    languageOptions,
    displayModeOptions,
    descripitveLevelOptions,
    cefrLevelsLevelOptions,
    graphicLevelsOptions,
  };
};

export { useGetSkillsInfoStepData };
