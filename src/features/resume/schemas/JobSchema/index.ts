import { TFunction } from "i18next";
import * as z from "zod";

// ─── Schema Factory ───────────────────────────────────────────────────────────
export const createJobSchema = (t: TFunction<string, undefined>) => {
  const summarySchema = z.object({
    type: z.string(),
    content: z.array(z.any()),
  });

  // 1. EMPTY STATE SCHEMA
  const emptyJobSchema = z.object({
    status: z.literal("empty"),
    jobTitle: z.string(),
    companyName: z.string(),
    country: z.string(),
    province: z.string(),
    city: z.string(),

    entryDate: z.string(),
    employmentEndYearDate: z.string(),
    isCurrentlyWorkingHere: z.boolean(),

    summary: summarySchema,
  });

  // 2. STRICT STATE SCHEMA
  const strictJobSchema = z.object({
    status: z.enum(["draft", "completed"]),

    jobTitle: z.string().min(1, { message: t("jobeRoleRequired") }),
    companyName: z.string().min(1, { message: t("companyNameRequired") }),

    // Location
    country: z.string().min(1, { message: t("countryRequired") }),
    province: z.string().min(1, { message: t("provinceRequired") }),
    city: z.string().min(1, { message: t("cityRequired") }),

    entryDate: z.string().min(1, {
      message: t("startDateRequired"),
    }),

    employmentEndYearDate: z.string(),

    isCurrentlyWorkingHere: z.boolean(),
    summary: summarySchema,
  });

  // 3. DISCRIMINATED UNION WITH CONDITIONALS
  return z
    .discriminatedUnion("status", [emptyJobSchema, strictJobSchema])
    .superRefine((data, ctx) => {
      // Fast-exit if the user hasn't started typing into this row yet
      if (data.status === "empty") return;

      const isCurrentlyWorking = data.isCurrentlyWorkingHere;

      // If NOT currently working, require end date and validate it
      if (!isCurrentlyWorking) {
        // 1. Check if the end date is missing
        if (
          !data.employmentEndYearDate ||
          data.employmentEndYearDate.trim() === ""
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["employmentEndYearDate"],
            message: t("jobEndDateRequired"),
          });
          return; // Stop here to prevent invalid date math below
        }

        // 2. Check that end date is after start date
        if (data.entryDate && data.employmentEndYearDate) {
          // Convert the Calendar ISO strings to timestamps for easy comparison
          const startDate = new Date(data.entryDate).getTime();
          const endDate = new Date(data.employmentEndYearDate).getTime();

          if (
            !Number.isNaN(startDate) &&
            !Number.isNaN(endDate) &&
            endDate < startDate
          ) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ["employmentEndYearDate"], // Attach the error to the End Date field
              message: t("endDateBeforeStartDate"),
            });
          }
        }
      }
    });
};
