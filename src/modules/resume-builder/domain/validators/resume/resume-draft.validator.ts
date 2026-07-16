import { z } from "zod";
import { ResumeStepSchema } from "../../dtos/resume.dto";

export const ResumeDraftValidator = z.object({
  resumeId: z.uuid({ message: "error_invalidResumeId" }),
  step: ResumeStepSchema,
  data: z.any(),
});

export type ResumeDraftInput = z.infer<typeof ResumeDraftValidator>;
