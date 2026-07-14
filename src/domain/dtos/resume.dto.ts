import { z } from "zod";
import { TFunction } from "i18next";
import { createResumeSchema } from "@/features/resume/schemas/resume.schema";

const serverTranslator = ((key: string) => key) as TFunction<string, undefined>;

export const serverResumeSchema = createResumeSchema(serverTranslator);

export const ResumeStepEnum = z.enum([
  "profileImage",
  "basicInfo",
  "education",
  "job",
  "languages",
  "skills",
  "coursesAndCertifications",
  "projects",
  "research",
]);

export type ResumeStep = z.infer<typeof ResumeStepEnum>;

export const UpdateResumeStepSchema = z.object({
  resumeId: z.uuid(),
  step: ResumeStepEnum,
  data: z.any(),
});

export type UpdateResumeStepInput = z.infer<typeof UpdateResumeStepSchema>;

export const getStepValidator = (step: ResumeStep) => {
  const stepSchema = serverResumeSchema.shape[step];
  if (!stepSchema) {
    throw new Error(`Validation schema not found for step: ${step}`);
  }
  return stepSchema;
};
