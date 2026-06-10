import { TFunction } from "i18next";
import { z } from "zod";

export const createResearchSchema = (t: TFunction<string, undefined>) => {
  return z.object({
    researchTitle: z.string().optional(),

    publisher: z.string().optional(),

    researchUrl: z.string().url(t("invalidUrl")).optional().or(z.literal("")),

    publicationMonth: z.string().optional(),

    publicationYear: z.string().optional(),
  });
};
