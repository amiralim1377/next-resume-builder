import { TFunction } from "i18next";
import { z } from "zod";

export const SEX_OPTIONS = ["male", "female"] as const;
export const MARITAL_OPTIONS = ["single", "married"] as const;
export const MILITARY_OPTIONS = ["completed", "exempt", "inProgress"] as const;

export const createBasicInfoSchema = (t: TFunction<string, undefined>) => {
  return z.object({
    firstName: z
      .string()
      .min(1, { message: t("firstNamerequired") })
      .refine((value) => !/^\d+$/.test(value), {
        message: t("numberIsNotAllowed"),
      })
      .refine((val) => !val.includes("@"), {
        message: t("cannotContainEmail"),
      })
      .regex(/^[a-zA-Zآ-ی]+(\s[a-zA-Zآ-ی]+)*$/, {
        message: t("invalidNameCharacters"),
      }),

    lastName: z
      .string()
      .min(1, { message: t("lastNamerequired") })
      .refine((value) => !/^\d+$/.test(value), {
        message: t("numberIsNotAllowed"),
      })
      .refine((val) => !val.includes("@"), {
        message: t("cannotContainEmail"),
      })
      .regex(/^[a-zA-Zآ-ی]+(\s[a-zA-Zآ-ی]+)*$/, {
        message: t("invalidLastNameCharacters"),
      }),

    jobTitle: z
      .string()
      .min(1, { message: t("jobTitlerequired") })
      .refine((value) => !/^\d+$/.test(value), {
        message: t("numberIsNotAllowed"),
      })
      .refine((val) => !val.includes("@"), {
        message: t("cannotContainEmail"),
      })
      .regex(/^[a-zA-Zآ-ی]+([-\s_][a-zA-Zآ-ی]+)*$/, {
        message: t("invalidJobTitleCharacters"),
      }),
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
    email: z
      .email({ message: t("invalidEmail") })
      .min(5, { message: t("invalidEmail") })
      .max(124, { message: t("emailTooLong") })
      .refine((val) => !/\s/.test(val), { message: t("emailNoSpacesAllowed") })
      .refine((val) => /^[^\u0600-\u06FF]+$/.test(val), {
        message: t("emailNoPersianCharacters"),
      }),

    birthday: z.object({
      day: z.string().min(1, t("birthdayDayRequired")),
      month: z.string().min(1, t("birthdayMonthRequired")),
      year: z.string().min(1, t("birthdayYearRequired")),
    }),

    mobileNumber: z
      .string()
      .min(11, { message: t("min11charMobile") })
      .refine((val) => !val.includes("@"), {
        message: t("cannotContainEmail"),
      })
      .regex(/^(09\d{9}|\+989\d{9}|0989\d{9})$/, {
        message: t("invalidMobile"),
      })
      .refine((val) => !/[\u0600-\u06FF]/.test(val), {
        message: t("noPersianCharacters"),
      }),

    phone: z
      .string()
      .min(8, { message: t("invalidPhone") })
      .refine((val) => !val.includes("@"), {
        message: t("cannotContainEmail"),
      })
      .refine((val) => !/[\u0600-\u06FF]/.test(val), {
        message: t("noPersianCharacters"),
      }),

    country: z
      .string()
      .min(1, { message: t("countryRequired") })
      .refine((val) => !val.includes("@"), {
        message: t("cannotContainEmail"),
      }),
    province: z
      .string()
      .min(1, { message: t("provinceRequired") })
      .refine((val) => !val.includes("@"), {
        message: t("cannotContainEmail"),
      }),
    city: z
      .string()
      .min(1, { message: t("cityRequired") })
      .refine((val) => !val.includes("@"), {
        message: t("cannotContainEmail"),
      }),
    address: z
      .string()
      .min(5, { message: t("addressFiveCharacters") })
      .max(100, { message: "addressHundredCharacters" })
      .refine((value) => /[a-zA-Zآ-ی]/.test(value), {
        message: t("addressMustContainLetters"),
      })
      .refine((val) => !val.includes("@"), {
        message: t("cannotContainEmail"),
      }),

    webSite: z
      .string()
      .trim()
      .optional()
      .transform((val) => {
        if (!val) return "";

        if (!val.startsWith("http://") && !val.startsWith("https://")) {
          return `https://${val}`;
        }

        return val;
      })
      // ❌ no Persian
      .refine((val) => !/[\u0600-\u06FF]/.test(val), {
        message: t("urlNoPersianCharacters"),
      })
      .refine(
        (val) => {
          if (!val) return true;

          const domainRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

          return domainRegex.test(val);
        },
        {
          message: t("invalidUrl"),
        },
      ),

    summary: z.string().optional(),
  });
};
