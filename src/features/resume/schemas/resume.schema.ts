import { TFunction } from "i18next";
import { z } from "zod";

export const SEX_OPTIONS = ["male", "female"] as const;
export const MARITAL_OPTIONS = ["single", "married"] as const;
export const MILITARY_OPTIONS = ["completed", "exempt", "inProgress"] as const;
export const Degree_OPTIONS = [
  "belowDiploma",
  "diploma",
  "associate",
  "bachelor",
  "master",
  "PhD",
  "postdoc",
] as const;

export const createBasicInfoSchema = (t: TFunction<string, undefined>) => {
  return z.object({
    firstName: z.string().min(1, { message: t("firstNamerequired") }),
    lastName: z.string().min(1, { message: t("lastNamerequired") }),
    jobTitle: z.string().min(1, { message: t("jobTitlerequired") }),
    sex: z
      .string()
      .refine(
        (val) => SEX_OPTIONS.includes(val as (typeof SEX_OPTIONS)[number]),
        {
          message: t("selectGender"),
        },
      ),
    maritalStatus: z
      .string()
      .refine(
        (val) =>
          MARITAL_OPTIONS.includes(val as (typeof MARITAL_OPTIONS)[number]),
        {
          message: t("maritalStatusMessage"),
        },
      ),
    militaryServiceStatus: z
      .string()
      .refine(
        (val) =>
          MILITARY_OPTIONS.includes(val as (typeof MILITARY_OPTIONS)[number]),
        {
          message: t("militaryServiceStatusMessage"),
        },
      ),
    email: z.email({ message: t("invalidEmail") }),

    birthday: z.object({
      day: z.string().min(1, t("birthdayDayRequired")),
      month: z.string().min(1, t("birthdayMonthRequired")),
      year: z.string().min(1, t("birthdayYearRequired")),
    }),

    mobileNumber: z.string().regex(/^(09\d{9}|\+989\d{9}|0989\d{9})$/, {
      message: t("invalidMobile"),
    }),

    phone: z.string().min(10, { message: t("invalidMobile") }),

    country: z.string().min(1, { message: t("countryRequired") }),
    province: z.string().min(1, { message: t("provinceRequired") }),
    city: z.string().min(1, { message: t("cityRequired") }),
    address: z
      .string()
      .min(5, { message: t("addressFiveCharacters") })
      .max(100, { message: "addressHundredCharacters" }),
    webSite: z
      .string()
      .url({ message: t("invalidUrl") })
      .or(z.literal(""))
      .optional(),
    summary: z.string().optional(),
  });
};

export const createEducationSchema = (t: TFunction<string, undefined>) => {
  return z.object({
    degreeLevel: z
      .string()
      .refine(
        (val) =>
          Degree_OPTIONS.includes(val as (typeof Degree_OPTIONS)[number]),
        {
          message: t("selectEducationalLevel"),
        },
      ),
    academicMajor: z.string().min(1, { message: t("academicMajorRequired") }),
    concentration: z.string().min(1, { message: t("specializationRequired") }),
    institutionName: z.string().min(1, { message: t("institutionName") }),
    gradeAverage: z.string().min(1, { message: t("gradeAverageRequired") }),
    country: z.string().min(1, { message: t("countryRequired") }),
    province: z.string().min(1, { message: t("provinceRequired") }),
    city: z.string().min(1, { message: t("cityRequired") }),
    entryMonth: z.string().min(1, { message: t("entryMonthRequired") }),
    entryYear: z.string().min(1, { message: t("entryYearRequired") }),
    graduationMonth: z
      .string()
      .min(1, { message: t("graduationMonthRequired") }),
    graduationYear: z.string().min(1, { message: t("graduationYearRequired") }),
    isStudyingNow: z.boolean(),

    summary: z.string().optional(),
  });
};

export const createJobSchema = (t: TFunction<string, undefined>) => {
  return z.object({
    summary: z.string().optional(),
    jobTitle: z.string().min(1, { message: t("jobeRoleRequired") }),
    companyName: z.string().min(1, { message: t("companyNameRequired") }),
    country: z.string().min(1, { message: t("countryRequired") }),
    province: z.string().min(1, { message: t("provinceRequired") }),
    city: z.string().min(1, { message: t("cityRequired") }),
    entryMonth: z.string().min(1, { message: t("entryMonthRequired") }),
    entryYear: z.string().min(1, { message: t("entryYearRequired") }),
    employmentEndMonth: z
      .string()
      .min(1, { message: t("graduationMonthRequired") }),
    employmentEndYear: z
      .string()
      .min(1, { message: t("graduationYearRequired") }),
    isCurrentlyWorkingHere: z.boolean(),
  });
};

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
