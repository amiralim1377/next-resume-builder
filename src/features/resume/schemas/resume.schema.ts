import { z } from "zod";

export const basicInfoSchema = z.object({
  firstName: z.string().min(1, "required"),
  lastName: z.string().min(1, "required"),
  jobTitle: z.string().optional(),
  sex: z.enum(["male", "female", ""]).refine(Boolean, {
    message: "لطفاً جنسیت را انتخاب کنید",
  }),
  email: z.email("Invalid email format"),
  birthday: z.object({
    day: z.string(),
    month: z.string(),
    year: z.string(),
  }),
  militaryServiceStatus: z.enum(["completed", "exempt", "in_progress", ""]),
  maritalStatus: z.enum(["single", "married", ""]),
  mobileNumber: z.string().regex(/^(09\d{9}|\+989\d{9}|0989\d{9})$/, {
    message:
      "شماره موبایل وارد شده معتبر نیست. لطفاً با فرمت‌های 09xxxxxxxxx، 0989xxxxxxxxx یا +989xxxxxxxxx وارد کنید.",
  }),

  phone: z.string().min(10, "Invalid phone number"),
  webSite: z.url("Please enter a valid website URL").optional(),
  country: z.string(),
  province: z.string(),
  city: z.string(),
  address: z.string(),
  summary: z.string().optional(),
});

export const resumeSchema = z.object({
  basicInfo: basicInfoSchema,
});

export type ResumeFormValues = z.infer<typeof resumeSchema>;
export type BasicInfoValues = z.infer<typeof basicInfoSchema>;

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
