import { z } from "zod";
import { ResumeStepEnum } from "../../resume.dto";

export const ResumeDraftValidator = z.object({
  resumeId: z.uuid({ message: "error_invalidResumeId" }),

  step: ResumeStepEnum,

  data: z.any(),
});

export type ResumeDraftInput = z.infer<typeof ResumeDraftValidator>;
