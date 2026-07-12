import { TFunction } from "i18next";
import * as z from "zod";
import { isGenericRowEmpty } from "../../utils/isGenericRowEmpty";

// ─── Schema Factory ───────────────────────────────────────────────────────────

const identityT = ((key: string) => key) as TFunction;

export const getStrictJobSchema = (t: TFunction = identityT) => {
  const summarySchema = z.object({
    type: z.string(),
    content: z.array(z.any()),
  });

  return z
    .object({
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
    })
    .superRefine((data, ctx) => {
      const isCurrentlyWorking = data.isCurrentlyWorkingHere;

      // If NOT currently working, require end date and validate it
      if (!isCurrentlyWorking) {
        // 1. Check if the end date is missing
        if (
          !data.employmentEndYearDate ||
          data.employmentEndYearDate.trim() === ""
        ) {
          ctx.addIssue({
            code: "custom",
            path: ["employmentEndYearDate"],
            message: t("jobEndDateRequired"),
          });
          return;
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
              code: "custom",
              path: ["employmentEndYearDate"], // Attach the error to the End Date field
              message: t("endDateBeforeStartDate"),
            });
          }
        }
      }
    });
};

export type JobRowValues = z.infer<ReturnType<typeof getStrictJobSchema>>;

export const createJobSchema = (t: TFunction<string, undefined>) => {
  return z.any().superRefine((data, ctx) => {
    if (isGenericRowEmpty(data)) return;

    const result = getStrictJobSchema(t).safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        ctx.addIssue(issue as z.core.$ZodSuperRefineIssue);
      });
    }
  });
};
