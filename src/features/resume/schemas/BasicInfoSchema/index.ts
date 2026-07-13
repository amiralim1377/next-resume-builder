import { TFunction } from "i18next";
import * as z from "zod/v4";
import { isGenericRowEmpty } from "../../utils/isGenericRowEmpty";

export const SEX_OPTIONS = ["male", "female"] as const;
export const MARITAL_OPTIONS = ["single", "married"] as const;
export const MILITARY_OPTIONS = ["completed", "exempt", "inProgress"] as const;

const identityT = ((key: string) => key) as TFunction;
// ─── Schema Factory ───────────────────────────────────────────────────────────
export const getStrictBasicInfoSchema = (t: TFunction = identityT) => {
  const summarySchema = z.object({
    type: z.string(),
    content: z.array(z.any()).optional(),
  });

  return z.object({
    firstName: z
      .string()
      .trim()
      .min(1, { message: t("firstNameRequired") })
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
      .trim()
      .min(1, { message: t("lastNameRequired") })
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
      .trim()
      .min(1, { message: t("jobTitleRequired") })
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

    birthDate: z
      .string()
      .min(1, { message: t("birthDateRequired") })
      .regex(/^\d{4}-\d{2}-\d{2}$/, { message: t("invalidDateFormat") })
      .refine(
        (val) => {
          const date = new Date(val);
          return !isNaN(date.getTime());
        },
        { message: t("invalidDate") },
      )
      .refine((val) => new Date(val) <= new Date(), {
        message: t("birthDateFuture"),
      })
      .refine(
        (val) => {
          const date = new Date(val);
          const age = new Date().getFullYear() - date.getFullYear();
          return age <= 120;
        },
        {
          message: t("invalidBirthDate"),
        },
      ),

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
      .trim()
      .optional()
      .refine((val) => !val || val.length >= 5, {
        message: t("addressFiveCharacters"),
      })
      .refine((val) => !val || val.length <= 100, {
        message: t("addressHundredCharacters"),
      })
      .refine((val) => !val || /[a-zA-Zآ-ی]/.test(val), {
        message: t("addressMustContainLetters"),
      })
      .refine((val) => !val || !val.includes("@"), {
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

    summary: summarySchema.optional(),
  });
};

export type BasicInfoRowValues = z.infer<
  ReturnType<typeof getStrictBasicInfoSchema>
>;

export const createBasicInfoSchema = (t: TFunction<string, undefined>) => {
  return z.any().superRefine((data, ctx) => {
    if (isGenericRowEmpty(data)) return;

    const result = getStrictBasicInfoSchema(t).safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        ctx.addIssue(issue as z.core.$ZodSuperRefineIssue);
      });
    }
  });
};
