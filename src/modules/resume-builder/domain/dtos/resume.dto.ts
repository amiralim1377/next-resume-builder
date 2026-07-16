import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { z } from "zod";

export const ResumeStepSchema = z.enum([
  "profileImage",
  "basicInfo",
  "education",
  "job",
  "skills",
  "coursesAndCertifications",
  "projects",
  "research",
]);

export type ResumeStep = z.infer<typeof ResumeStepSchema>;

export interface ResumeDto extends Omit<ResumeFormValues, "profileImage"> {
  id: string;
  shortId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  profileImage: string | null;
}
