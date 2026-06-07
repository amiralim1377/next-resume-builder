import { TFunction } from "i18next";
import { z } from "zod";

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
