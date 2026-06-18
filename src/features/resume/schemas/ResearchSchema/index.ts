// src/features/resume/schemas/ResearchSchema.ts
import { TFunction } from "i18next";
import * as z from "zod/v4";

const YEAR_REGEX = /^\d{4}$/;

export const createResearchSchema = (t: TFunction<string, undefined>) => {
  return z.object({
    researchTitle: z
      .string()
      .min(1, { message: t("researchTitleRequired") })
      .max(200, { message: t("researchTitleTooLong") }),

    publisher: z
      .string()
      .min(1, { message: t("publisherRequired") })
      .max(150, { message: t("publisherTooLong") })
      .optional(),
    researchUrl: z
      .string()
      .url({ message: t("invalidUrl") })
      .or(z.literal(""))
      .transform((val) => (val === "" ? "" : val))
      .optional(),
    publicationMonth: z
      .string()
      .min(1, { message: t("publicationMonthRequired") })
      .optional(),
    publicationYear: z
      .string()
      .regex(YEAR_REGEX, { message: t("invalidYearFormat") })
      .optional(),
    summary: z
      .string()
      .trim()
      .max(3000, { message: t("summaryTooLong") })
      .optional(),
  });
};

export type ResearchValues = z.infer<ReturnType<typeof createResearchSchema>>;
