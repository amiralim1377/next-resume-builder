import { TFunction } from "i18next";
import * as z from "zod";
import { isGenericRowEmpty } from "../../utils/isGenericRowEmpty";

// ─── Constants ────────────────────────────────────────────────────────────────
const identityT = ((key: string) => key) as TFunction;

export const getStrictCoursesAndCertificationsSchema = (
  t: TFunction = identityT,
) => {
  return z.object({
    coursesAndCertificationsName: z
      .string()
      .trim()
      .min(1, { message: t("courseOrCertificationNameRequired") }),
    instituteName: z.string().optional(),
    certificateIssueDate: z.string().optional(),
    certificateUrl: z
      .string()
      .refine((value) => value === "" || z.url().safeParse(value).success, {
        message: t("invalidUrl"),
      })
      .optional(),
  });
};

export type CoursesAndCertificationsRowValues = z.infer<
  ReturnType<typeof getStrictCoursesAndCertificationsSchema>
>;

export const createCoursesAndCertificationsSchema = (
  t: TFunction<string, undefined>,
) => {
  return z.any().superRefine((data, ctx) => {
    if (isGenericRowEmpty(data)) return;

    const result = getStrictCoursesAndCertificationsSchema(t).safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        ctx.addIssue(issue as z.core.$ZodSuperRefineIssue);
      });
    }
  });
};
