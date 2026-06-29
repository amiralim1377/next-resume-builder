import { TFunction } from "i18next";
import * as z from "zod/v4";

export const createCoursesAndCertificationsSchema = (
  t: TFunction<string, undefined>,
) => {
  return z.object({
    coursesAndCertificationsName: z.string().optional(),
    instituteName: z.string().optional(),
    certificateIssueDate: z.string().optional(),
    certificateUrl: z
      .string()
      .url(t("invalidUrl"))
      .optional()
      .or(z.literal("")),
  });
};
