import { TFunction } from "i18next";
import * as z from "zod/v4";

// ─── Constants ────────────────────────────────────────────────────────────────
const YEAR_REGEX = /^\d{4}$/;

// ─── Schema Factory ───────────────────────────────────────────────────────────
export const createJobSchema = (t: TFunction<string, undefined>) => {
  const summarySchema = z.object({
    type: z.string(),
    content: z.array(z.any()),
  });

  // 1. EMPTY STATE SCHEMA (Flattened status)
  const emptyJobSchema = z.object({
    status: z.literal("empty"),
    jobTitle: z.string(),
    companyName: z.string(),
    country: z.string(),
    province: z.string(),
    city: z.string(),
    entryMonth: z.string(),
    entryYear: z.string(),
    employmentEndMonth: z.string(),
    employmentEndYear: z.string(),
    isCurrentlyWorkingHere: z.boolean(),
    summary: summarySchema,
  });

  // 2. STRICT STATE SCHEMA (Flattened status)
  const strictJobSchema = z.object({
    status: z.enum(["draft", "completed"]),

    jobTitle: z.string().min(1, { message: t("jobeRoleRequired") }),
    companyName: z.string().min(1, { message: t("companyNameRequired") }),

    // Location
    country: z.string().min(1, { message: t("countryRequired") }),
    province: z.string().min(1, { message: t("provinceRequired") }),
    city: z.string().min(1, { message: t("cityRequired") }),

    // Timeline
    entryMonth: z.string().min(1, { message: t("entryMonthRequired") }),
    entryYear: z
      .string()
      .regex(YEAR_REGEX, { message: t("invalidYearFormat") }),

    // Date ranges handled safely in downstream refinement
    employmentEndMonth: z.string(),
    employmentEndYear: z.string(),

    isCurrentlyWorkingHere: z.boolean(),
    summary: summarySchema,
  });

  // 3. DISCRIMINATED UNION WITH CONDITIONALS
  // We apply the cross-field dates logic at the root level if the row isn't empty.
  return z
    .discriminatedUnion("status", [emptyJobSchema, strictJobSchema])
    .superRefine((data, ctx) => {
      // Fast-exit if the user hasn't started typing into this row yet
      if (data.status === "empty") return;

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

        // Check that end date is after start date
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
