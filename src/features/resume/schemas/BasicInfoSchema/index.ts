import { TFunction } from "i18next";
import * as z from "zod/v4";

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
      .optional()
      .refine((val) => !val || val.length >= 8, {
        message: t("invalidPhone"),
      })
      .refine((val) => !val || !val.includes("@"), {
        message: t("cannotContainEmail"),
      })
      .refine((val) => !val || !/[\u0600-\u06FF]/.test(val), {
        message: t("noPersianCharacters"),
      }),

    location: z.object({
      country: z
        .string({
          error: t("countryRequired"),
        })
        .min(1, { message: t("countryRequired") })
        .refine((val) => !val.includes("@"), {
          message: t("cannotContainEmail"),
        }),

      province: z
        .string({
          error: t("provinceRequired"),
        })
        .min(1, { message: t("provinceRequired") })
        .refine((val) => !val.includes("@"), {
          message: t("cannotContainEmail"),
        }),

      city: z
        .string({
          error: t("cityRequired"),
        })
        .min(1, { message: t("cityRequired") })
        .refine((val) => !val.includes("@"), {
          message: t("cannotContainEmail"),
        }),
    }),

    address: z
      .string()
      .min(5, { message: t("addressFiveCharacters") })
      .max(100, { message: t("addressHundredCharacters") })
      .refine((value) => /[a-zA-Zآ-ی]/.test(value), {
        message: t("addressMustContainLetters"),
      })
      .refine((val) => !val.includes("@"), {
        message: t("cannotContainEmail"),
      }),

    webSite: z
      .string()
      .transform((val) => val.trim())
      .refine(
        (val) => {
          if (!val) return true;

          return !/[\u0600-\u06FF]/.test(val);
        },
        {
          message: t("urlNoPersianCharacters"),
        },
      )
      .transform((val) => {
        if (!val) return "";

        if (!val.startsWith("http://") && !val.startsWith("https://")) {
          return `https://${val}`;
        }

        return val;
      })
      .refine(
        (val) => {
          if (!val) return true;

          try {
            new URL(val);
            return true;
          } catch {
            return false;
          }
        },
        {
          message: t("invalidUrl"),
        },
      )
      .optional(),

    summary: z
      .union([
        z.object({
          type: z.string(),
          content: z.array(z.any()).optional(),
        }),
        z.string(),
        z.literal(""),
      ])
      .optional(),
  });
};
