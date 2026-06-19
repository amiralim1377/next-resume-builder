import { TFunction } from "i18next";
import * as z from "zod/v4";

const YEAR_REGEX = /^\d{4}$/;

export const createJobSchema = (t: TFunction<string, undefined>) => {
  return z
    .object({
      summary: z.object({
        type: z.string(),
        content: z.array(z.any()),
      }),
      jobTitle: z.string().min(1, { message: t("jobeRoleRequired") }),
      companyName: z.string().min(1, { message: t("companyNameRequired") }),
      country: z.string().min(1, { message: t("countryRequired") }),
      province: z.string().min(1, { message: t("provinceRequired") }),
      city: z.string().min(1, { message: t("cityRequired") }),
      entryMonth: z.string().min(1, { message: t("entryMonthRequired") }),
      entryYear: z
        .string()
        .regex(YEAR_REGEX, { message: t("invalidYearFormat") }),
      employmentEndMonth: z
        .string()
        .min(1, { message: t("graduationMonthRequired") }),
      employmentEndYear: z
        .string()
        .min(1, { message: t("graduationYearRequired") }),
      isCurrentlyWorkingHere: z.boolean(),
    })
    .superRefine((data, ctx) => {
      const isCurrentlyWorking = data.isCurrentlyWorkingHere;

      // If NOT currently working, require end date
      if (!isCurrentlyWorking) {
        if (!data.employmentEndMonth?.trim()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["employmentEndMonth"],
            message: t("employmentEndMonthRequired"),
          });
        }

        if (!data.employmentEndYear?.trim()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["employmentEndYear"],
            message: t("employmentEndYearRequired"),
          });
        }

        // Optional: Check that end date is after start date
        const startYear = Number(data.entryYear);
        const endYear = Number(data.employmentEndYear);

        if (
          data.entryYear &&
          data.employmentEndYear &&
          !Number.isNaN(startYear) &&
          !Number.isNaN(endYear) &&
          endYear < startYear
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["employmentEndYear"],
            message: t("endDateBeforeStartDate"),
          });
        }
      }
    });
};
