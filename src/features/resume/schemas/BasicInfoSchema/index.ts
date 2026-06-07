import { TFunction } from "i18next";
import { z } from "zod";

export const SEX_OPTIONS = ["male", "female"] as const;
export const MARITAL_OPTIONS = ["single", "married"] as const;
export const MILITARY_OPTIONS = ["completed", "exempt", "inProgress"] as const;

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
