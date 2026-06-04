import { TFunction } from "i18next";
import { z } from "zod";

export const SEX_OPTIONS = ["male", "female", ""] as const;
export const MARITAL_OPTIONS = ["single", "married", ""] as const;
export const MILITARY_OPTIONS = ["completed", "exempt", ""] as const;

export const createBasicInfoSchema = (t: TFunction<string, undefined>) => {
  return z.object({
    firstName: z.string().min(1, { message: t("firstNamerequired") }),
    lastName: z.string().min(1, { message: t("lastNamerequired") }),
    jobTitle: z.string().min(1, { message: t("jobTitlerequired") }),
    sex: z.enum(SEX_OPTIONS).refine(Boolean, {
      message: t("selectGender"),
    }),
    email: z.email({ message: t("invalidEmail") }),
    birthday: z.object({
      day: z.string().min(1, "birthdayDayRequired"),
      month: z.string().min(1, "birthdayMonthRequired"),
      year: z.string().min(1, "birthdayYearRequired"),
    }),
    militaryServiceStatus: z
      .enum(MILITARY_OPTIONS)
      .refine((val) => ["completed", "exempt", "in_progress"].includes(val), {
        message: t("militaryServiceStatusMessage"),
      }),
    maritalStatus: z
      .enum(MARITAL_OPTIONS)
      .refine((val) => ["single", "married"].includes(val), {
        message: t("maritalStatusMessage"),
      }),
    mobileNumber: z.string().regex(/^(09\d{9}|\+989\d{9}|0989\d{9})$/, {
      message: t("invalidMobile"),
    }),
    phone: z.string().min(10, { message: t("invalidMobile") }),
    webSite: z.url({ message: t("invalidUrl") }).optional(),
    country: z.string(),
    province: z.string(),
    city: z.string(),
    address: z.string(),
    summary: z.string().optional(),
  });
};

// eslint-disable-next-line
export const createResumeSchema = (t: TFunction<string, undefined>) => {
  return z.object({
    basicInfo: createBasicInfoSchema(t),
  });
};

export type BasicInfoValues = z.infer<ReturnType<typeof createBasicInfoSchema>>;

export type ResumeFormValues = {
  basicInfo: BasicInfoValues;
};

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
