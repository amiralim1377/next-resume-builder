import { z } from "zod";
import { ResumeStepEnum } from "../../resume.dto";

export const ResumeFinalValidator = z.object({
  resumeId: z.uuid({ message: "error_invalidResumeId" }),
  step: ResumeStepEnum,
  data: z.any(),
});
