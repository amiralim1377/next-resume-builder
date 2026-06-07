export const LanguageDisplayType = {
  OVERALL: "overall",
  BREAKDOWN: "breakdown",
} as const;

export const ProficiencyDisplayType = {
  DESCRIPTIVE: "descriptive",
  GRAPHIC: "graphic",
  CEFR: "cefr",
} as const;

export type LanguageDisplayType =
  (typeof LanguageDisplayType)[keyof typeof LanguageDisplayType];
export type ProficiencyDisplayType =
  (typeof ProficiencyDisplayType)[keyof typeof ProficiencyDisplayType];

export type DisplayMode = `${LanguageDisplayType}-${ProficiencyDisplayType}`;
// Proficiency level options
export const DescriptiveLevels = [
  "Beginner",
  "Elementary",
  "Intermediate",
  "Advanced",
  "Proficient",
] as const;
export const CefrLevels = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
export const GraphicLevels = [1, 2, 3, 4, 5] as const;

export type DescriptiveLevel = (typeof DescriptiveLevels)[number];
export type CefrLevel = (typeof CefrLevels)[number];
export type GraphicLevel = (typeof GraphicLevels)[number];
