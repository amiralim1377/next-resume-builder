// src/features/resume/schemas/ProjectsSchema.ts
import { TFunction } from "i18next";
import * as z from "zod";
import { isGenericRowEmpty } from "../../utils/isGenericRowEmpty";

// ─── Constants ────────────────────────────────────────────────────────────────
const identityT = ((key: string) => key) as TFunction;

// ─── Schema Factory ───────────────────────────────────────────────────────────
export const getStrictProjectSchema = (t: TFunction = identityT) => {
  const summarySchema = z.object({
    type: z.string(),
    content: z.array(z.unknown()),
  });

  return z.object({
    projectTitle: z
      .string()
      .trim()
      .min(1, { message: t("projectTitleRequired") })
      .max(150, { message: t("projectTitleTooLong") }),

    clientName: z
      .string()
      .trim()
      .max(100, { message: t("clientNameTooLong") })
      .optional()
      .or(z.literal("")),

    projectUrl: z
      .string()
      .trim()
      .url({ message: t("invalidUrl") })
      .or(z.literal(""))
      .optional(),

    projectDate: z
      .string()
      .trim()
      .min(1, { message: t("projectDateRequired") }),

    summary: summarySchema,
  });
};

export type ProjectRowValues = z.infer<
  ReturnType<typeof getStrictProjectSchema>
>;

export const createProjectSchema = (t: TFunction<string, undefined>) => {
  return z.any().superRefine((data, ctx) => {
    if (isGenericRowEmpty(data)) return;

    const result = getStrictProjectSchema(t).safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        ctx.addIssue(issue as z.core.$ZodSuperRefineIssue);
      });
    }
  });
};
