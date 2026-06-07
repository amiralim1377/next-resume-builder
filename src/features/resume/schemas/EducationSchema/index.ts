import { TFunction } from "i18next";
import { z } from "zod";

export const Degree_OPTIONS = [
  "belowDiploma",
  "diploma",
  "associate",
  "bachelor",
  "master",
  "PhD",
  "postdoc",
] as const;

export const createEducationSchema = (t: TFunction<string, undefined>) => {
  return z.object({
    degreeLevel: z
      .string()
      .refine(
        (val) =>
          Degree_OPTIONS.includes(val as (typeof Degree_OPTIONS)[number]),
        {
          message: t("selectEducationalLevel"),
        },
      ),
    academicMajor: z.string().min(1, { message: t("academicMajorRequired") }),
    concentration: z.string().min(1, { message: t("specializationRequired") }),
    institutionName: z.string().min(1, { message: t("institutionName") }),
    gradeAverage: z.string().min(1, { message: t("gradeAverageRequired") }),
    country: z.string().min(1, { message: t("countryRequired") }),
    province: z.string().min(1, { message: t("provinceRequired") }),
    city: z.string().min(1, { message: t("cityRequired") }),
    entryMonth: z.string().min(1, { message: t("entryMonthRequired") }),
    entryYear: z.string().min(1, { message: t("entryYearRequired") }),
    graduationMonth: z
      .string()
      .min(1, { message: t("graduationMonthRequired") }),
    graduationYear: z.string().min(1, { message: t("graduationYearRequired") }),
    isStudyingNow: z.boolean(),

    summary: z.string().optional(),
  });
};
