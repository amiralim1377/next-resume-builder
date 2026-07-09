import { TFunction } from "i18next";
import * as z from "zod";
import { isGenericRowEmpty } from "../../rules/generic.rules";

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

const identityT = ((key: string) => key) as TFunction;
// ─── Schema Factory ───────────────────────────────────────────────────────────
export const getStrictEducationSchema = (t: TFunction = identityT) => {
  const summarySchema = z.object({
    type: z.string(),
    content: z.array(z.any()),
  });

  return z
    .object({
      degreeLevel: z.enum(DEGREE_OPTIONS, {
        message: t("selectEducationalLevel"),
      }),

      academicMajor: z.string().min(1, {
        message: t("academicMajorRequired"),
      }),

      concentration: z.string().min(1, {
        message: t("specializationRequired"),
      }),

      institutionName: z.string().min(1, {
        message: t("institutionName"),
      }),

      gradeAverage: z
        .string()
        .min(1, {
          message: t("gradeAverageRequired"),
        })
        .refine(isValidGrade, {
          message: t("invalidGradeAverage"),
        }),

      country: z.string().min(1, {
        message: t("countryRequired"),
      }),

      province: z.string().min(1, {
        message: t("provinceRequired"),
      }),

      city: z.string().min(1, {
        message: t("cityRequired"),
      }),

      entryDate: z.string().min(1, {
        message: t("educationStartDateRequired"),
      }),

      graduationDate: z.string(),

      isStudyingNow: z.boolean(),

      summary: summarySchema,
    })
    .superRefine((data, ctx) => {
      if (!data.isStudyingNow) {
        if (!data.graduationDate || data.graduationDate.trim() === "") {
          ctx.addIssue({
            code: "custom",
            path: ["graduationDate"],
            message: t("educationGraduationDateRequired"),
          });
          return;
        }

        if (data.entryDate && data.graduationDate) {
          const startDate = new Date(data.entryDate).getTime();
          const endDate = new Date(data.graduationDate).getTime();

          if (
            !Number.isNaN(startDate) &&
            !Number.isNaN(endDate) &&
            endDate < startDate
          ) {
            ctx.addIssue({
              code: "custom",
              path: ["graduationDate"],
              message: t("endDateBeforeStartDate"),
            });
          }
        }
      }
    });
};

export type EducationRowValues = z.infer<
  ReturnType<typeof getStrictEducationSchema>
>;

export const createEducationSchema = (t: TFunction<string, undefined>) => {
  return z.any().superRefine((data, ctx) => {
    if (isGenericRowEmpty(data)) return;

    const result = getStrictEducationSchema(t).safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        ctx.addIssue(issue as z.core.$ZodSuperRefineIssue);
      });
    }
  });
};
