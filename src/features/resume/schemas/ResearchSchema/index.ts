// src/features/resume/schemas/ResearchSchema.ts
import { TFunction } from "i18next";
import { z } from "zod";
import { isGenericRowEmpty } from "../../utils/isGenericRowEmpty";

// ─── Constants ────────────────────────────────────────────────────────────────
const identityT = ((key: string) => key) as TFunction;

// ─── Schema Factory ───────────────────────────────────────────────────────────
export const getStrictResearchSchema = (t: TFunction = identityT) => {
  const summarySchema = z.object({
    type: z.string(),
    content: z.array(z.any()),
  });

  return z.object({
    researchTitle: z
      .string()
      .trim()
      .min(1, { message: t("researchTitleRequired") })
      .max(200, { message: t("researchTitleTooLong") }),

    publisher: z
      .string()
      .trim()
      .min(1, { message: t("publisherRequired") })
      .max(150, { message: t("publisherTooLong") })
      .or(z.literal("")),

    // Handles empty string as valid for optional URLs
    researchUrl: z
      .string()
      .trim()
      .url({ message: t("invalidUrl") })
      .or(z.literal("")),

    publicationDate: z
      .string()
      .trim()
      .min(1, { message: t("publicationDateRequired") })
      .or(z.literal("")),

    summary: summarySchema,
  });
};

export type ResearchRowValues = z.infer<
  ReturnType<typeof getStrictResearchSchema>
>;

export const createResearchSchema = (t: TFunction<string, undefined>) => {
  return z.any().superRefine((data, ctx) => {
    if (isGenericRowEmpty(data)) return;

    const result = getStrictResearchSchema(t).safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        ctx.addIssue(issue as z.core.$ZodSuperRefineIssue);
      });
    }
  });
};
