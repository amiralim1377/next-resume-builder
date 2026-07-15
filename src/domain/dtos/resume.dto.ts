import { z } from "zod";

export const ResumeStepEnum = z.enum([
  "profileImage",
  "basicInfo",
  "education",
  "job",
  "skills",
  "coursesAndCertifications",
  "projects",
  "research",
]);

export type ResumeStep = z.infer<typeof ResumeStepEnum>;
