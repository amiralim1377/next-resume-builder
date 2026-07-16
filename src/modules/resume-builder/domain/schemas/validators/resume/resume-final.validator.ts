import { z } from "zod";

export const ResumeFinalValidator = z.object({
  resumeId: z.uuid({ message: "error_invalidResumeId" }),

  basicInfo: z.any().refine((val) => val !== null && typeof val === "object", {
    message: "error_basicInfoRequired",
  }),

  education: z.array(z.any(), { message: "error_educationMustBeArray" }),
  job: z.array(z.any(), { message: "error_jobMustBeArray" }),
  skills: z.array(z.any(), { message: "error_skillsMustBeArray" }),
  coursesAndCertifications: z.array(z.any(), {
    message: "error_coursesMustBeArray",
  }),
  projects: z.array(z.any(), { message: "error_projectsMustBeArray" }),
  research: z.array(z.any(), { message: "error_researchMustBeArray" }),
});

export type ResumeFinalInput = z.infer<typeof ResumeFinalValidator>;
