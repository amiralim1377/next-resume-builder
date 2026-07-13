import { TFunction } from "i18next";
import * as z from "zod";
import { isGenericRowEmpty } from "../../utils/isGenericRowEmpty";

const identityT = ((key: string) => key) as TFunction;

export const getStrictSkillSchema = (t: TFunction = identityT) => {
  return z.object({
    skillName: z.string().min(1, {
      message: t("skillNameRequired"),
    }),
    skillLevel: z.string().min(1, {
      message: t("skillLevelRequired"),
    }),
  });
};

export type SkillsRowValues = z.infer<ReturnType<typeof getStrictSkillSchema>>;

export const createSkillsSchema = (t: TFunction<string, undefined>) => {
  return z.any().superRefine((data, ctx) => {
    if (isGenericRowEmpty(data)) return;

    const result = getStrictSkillSchema(t).safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        ctx.addIssue(issue as z.core.$ZodSuperRefineIssue);
      });
    }
  });
};
