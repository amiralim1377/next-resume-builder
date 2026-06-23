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

// ─── Helpers ──────────────────────────────────────────────────────────────────

const parseGrade = (val: string): number => {
  const normalized = val.trim().replace(",", ".");
  return parseFloat(normalized);
};

const isValidGrade = (val: string): boolean => {
  const num = parseGrade(val);
  return !isNaN(num) && num >= GRADE_MIN && num <= GRADE_MAX;
};

// ─── Schema Factory ───────────────────────────────────────────────────────────

export const createEducationSchema = (t: TFunction<string, undefined>) => {
  const summarySchema = z.object({
    type: z.string(),
    content: z.array(z.any()),
  });

  // 1. EMPTY STATE SCHEMA (Flattened status)
  const emptyEducationSchema = z.object({
    status: z.literal("empty"), // Lifted to the root object layout
    degreeLevel: z.string(),
    academicMajor: z.string(),
    concentration: z.string(),
    institutionName: z.string(),
    gradeAverage: z.string(),
    country: z.string(),
    province: z.string(),
    city: z.string(),
    entryMonth: z.string(),
    entryYear: z.string(),
    graduationMonth: z.string(),
    graduationYear: z.string(),
    isStudyingNow: z.boolean(),
    summary: summarySchema,
  });

  // 2. STRICT STATE SCHEMA (Flattened status)
  const strictEducationSchema = z.object({
    status: z.enum(["draft", "completed"]), // Added and lifted to the root

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
    summary: summarySchema,
  });

  // 3. DISCRIMINATED UNION
  // Provides direct literal key mapping for lightning-fast evaluations
  return z.discriminatedUnion("status", [
    emptyEducationSchema,
    strictEducationSchema,
  ]);
};
