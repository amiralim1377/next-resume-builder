import { z } from "zod";

export const basicInfoSchema = z.object({
  firstName: z.string().min(1, "required"),
  lastName: z.string().min(1, "required"),
  jobTitle: z.string().optional(),
  email: z.email("Invalid email format"),
  phone: z.string().min(10, "Invalid phone number"),
  sex: z.enum(["male", "female", "other", "prefer_not_to_say"]),
  summary: z.string().min(1, "required"),
  birthday: z.iso.datetime(),
  militaryServiceStatus: z.enum([
    "completed",
    "exempt",
    "in_progress",
    "not_applicable",
  ]),
  maritalStatus: z.enum([
    "single",
    "married",
    "divorced",
    "widowed",
    "separated",
  ]),
});

export const resumeSchema = z.object({
  basicInfo: basicInfoSchema,
});

export type ResumeFormValues = z.infer<typeof resumeSchema>;

// eslint-disable-next-line
export const STEP_FIELDS: Record<number, any[]> = {
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
  ],
};
