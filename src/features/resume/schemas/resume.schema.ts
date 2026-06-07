import { TFunction } from "i18next";
import { z } from "zod";
import { createBasicInfoSchema } from "./BasicInfoSchema";
import { createEducationSchema } from "./EducationSchema";
import { createJobSchema } from "./JobSchema";

export const createResumeSchema = (t: TFunction<string, undefined>) => {
  return z.object({
    basicInfo: createBasicInfoSchema(t),
    education: z.array(createEducationSchema(t)),
    job: z.array(createJobSchema(t)),
  });
};

export type BasicInfoValues = z.infer<ReturnType<typeof createBasicInfoSchema>>;
export type EducationValues = z.infer<ReturnType<typeof createEducationSchema>>;
export type JobValues = z.infer<ReturnType<typeof createJobSchema>>;

export type ResumeFormValues = {
  basicInfo: BasicInfoValues;
  education: EducationValues[];
  job: JobValues[];
};

export const STEP_FIELDS: Record<number, string[]> = {
  0: [
    "basicInfo.firstName",
    "basicInfo.lastName",
    "basicInfo.jobTitle",
    "basicInfo.email",
    "basicInfo.phone",
    "basicInfo.sex",
    "basicInfo.summary",
    "basicInfo.birthday",
    "basicInfo.militaryServiceStatus",
    "basicInfo.maritalStatus",
    "basicInfo.webSite",
  ],
};
