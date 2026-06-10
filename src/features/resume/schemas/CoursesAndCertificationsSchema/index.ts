import { TFunction } from "i18next";
import { z } from "zod";

export const createCoursesAndCertificationsSchema = (
  t: TFunction<string, undefined>,
) => {
  return z.object({
    coursesAndCertificationsName: z.string().optional(),
    instituteName: z.string().optional(),
    certificateIssueMonth: z.string().optional(),
    certificateIssueYear: z.string().optional(),
    certificateUrl: z
      .string()
      .url(t("invalidUrl"))
      .optional()
      .or(z.literal("")),
  });
};
