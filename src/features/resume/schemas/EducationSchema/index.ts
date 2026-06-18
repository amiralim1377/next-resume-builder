import { TFunction } from "i18next";
import * as z from "zod/v4";

// ─── Constants ────────────────────────────────────────────────────────────────

export const DEGREE_OPTIONS = [
  "belowDiploma",
  "diploma",
  "associate",
  "bachelor",
  "master",
  "PhD",
  "postdoc",
] as const;
export type DegreeLevel = (typeof DEGREE_OPTIONS)[number];

const YEAR_REGEX = /^\d{4}$/;
const GRADE_MIN = 0;
const GRADE_MAX = 100;
const SUMMARY_MAX_LENGTH = 3000;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const parseGrade = (val: string): number => {
  const normalized = val.trim().replace(",", ".");
  return parseFloat(normalized);
};

const isValidGrade = (val: string): boolean => {
  const num = parseGrade(val);
  return !isNaN(num) && num >= GRADE_MIN && num <= GRADE_MAX;
};

export const createEducationSchema = (t: TFunction<string, undefined>) => {
  return z.object({
    // Academic
    degreeLevel: z
      .enum(DEGREE_OPTIONS, {
        message: t("selectEducationalLevel"),
      })
      .or(z.literal("")),

    academicMajor: z.string().min(1, { message: t("academicMajorRequired") }),
    concentration: z.string().min(1, { message: t("specializationRequired") }),
    institutionName: z.string().min(1, { message: t("institutionName") }),

    gradeAverage: z
      .string()
      .min(1, { message: t("gradeAverageRequired") })
      .refine(isValidGrade, { message: t("invalidGradeAverage") }),

    // Location
    country: z.string().min(1, { message: t("countryRequired") }),
    province: z.string().min(1, { message: t("provinceRequired") }),
    city: z.string().min(1, { message: t("cityRequired") }),

    // Timeline
    entryMonth: z.string().min(1, { message: t("entryMonthRequired") }),

    entryYear: z.string().regex(YEAR_REGEX, {
      message: t("invalidYearFormat"),
    }),

    graduationMonth: z
      .string()
      .min(1, { message: t("graduationMonthRequired") }),

    graduationYear: z
      .string()
      .min(1, { message: t("graduationYearRequired") })
      .regex(YEAR_REGEX, {
        message: t("invalidYearFormat"),
      }),

    isStudyingNow: z.boolean(),

    summary: z
      .string()
      .trim()
      .max(SUMMARY_MAX_LENGTH, { message: t("summaryTooLong") })
      .optional(),
  });
};
