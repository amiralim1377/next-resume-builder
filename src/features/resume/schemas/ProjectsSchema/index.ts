import { TFunction } from "i18next";
import { z } from "zod";

export const createProjectsSchema = (t: TFunction<string, undefined>) => {
  return z.object({
    projectTitle: z.string().optional(),

    clientName: z.string().optional(),

    projectUrl: z.string().url(t("invalidUrl")).optional().or(z.literal("")),

    projectMonth: z.string().optional(),

    projectYear: z.string().optional(),

    description: z.string().optional(),
  });
};
