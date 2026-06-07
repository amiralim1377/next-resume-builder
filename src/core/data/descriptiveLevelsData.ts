export const DESCRIPTIVE_LEVELS_DATA = {
  fa: [
    { value: "Beginner", name: "مبتدی" },
    { value: "Elementary", name: "مقدماتی" },
    { value: "Intermediate", name: "متوسط" },
    { value: "Advanced", name: "پیشرفته" },
    { value: "Proficient", name: "مسلط" },
  ],

  en: [
    { value: "Beginner", name: "Beginner" },
    { value: "Elementary", name: "Elementary" },
    { value: "Intermediate", name: "Intermediate" },
    { value: "Advanced", name: "Advanced" },
    { value: "Proficient", name: "Proficient" },
  ],
} as const;

export const DESCRIPTIVE_LEVELS = [
  "Beginner",
  "Elementary",
  "Intermediate",
  "Advanced",
  "Proficient",
] as const;

export type DescriptiveLevel = (typeof DESCRIPTIVE_LEVELS)[number];
