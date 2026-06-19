// src/features/resume/schemas/ProjectsSchema.ts
import { TFunction } from "i18next";
import * as z from "zod/v4";

const YEAR_REGEX = /^\d{4}$/;

export const createProjectsSchema = (t: TFunction<string, undefined>) => {
  return z.object({
    projectTitle: z
      .string()
      .min(1, { message: t("projectTitleRequired") })
      .max(150, { message: t("projectTitleTooLong") }),

    clientName: z
      .string()
      .min(1, { message: t("clientNameRequired") })
      .max(100, { message: t("clientNameTooLong") })
      .optional(),
    projectUrl: z
      .string()
      .url({ message: t("invalidUrl") })
      .or(z.literal(""))
      .transform((val) => (val === "" ? "" : val))
      .optional(),
    projectMonth: z
      .string()
      .min(1, { message: t("projectMonthRequired") })
      .optional(),
    projectYear: z
      .string()
      .regex(YEAR_REGEX, { message: t("invalidYearFormat") })
      .optional(),
    // summary: z
    //   .string()
    //   .trim()
    //   .max(2000, { message: t("summaryTooLong") })
    //   .optional(),
    summary: z.object({
      type: z.string(),
      content: z.array(z.any()),
    }),
  });
};

export type ProjectValues = z.infer<ReturnType<typeof createProjectsSchema>>;
