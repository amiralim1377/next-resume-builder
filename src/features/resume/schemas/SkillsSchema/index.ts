import { TFunction } from "i18next";
import { z } from "zod";

export const createSkillsSchema = (t: TFunction<string, undefined>) => {
  return z.object({
    summary: z.string().optional(),
    skillName: z.string().optional(),
    skillLevel: z.string().optional(),
  });
};
