import { TFunction } from "i18next";
import { z } from "zod";

const baseLanguageSchema = z.object({
  language: z
    .string()
    .min(1, "Language is required")
    .optional()
    .or(z.literal("")),
  description: z.string().optional().default(""),
});

// ==================== OVERALL LEVEL ====================
// نوع نمایش زبان:سطح کلی
//  نوع نمایش سطح تسلط:توصیفی
export const overallDescriptiveSchema = baseLanguageSchema.extend({
  displayMode: z.literal("overall-descriptive"),
  proficiencyData: z.object({
    level: z
      .enum([
        "Beginner",
        "Elementary",
        "Intermediate",
        "Advanced",
        "Proficient",
      ])
      .optional()
      .or(z.literal("")),
  }),
});

// نوع نمایش زبان:سطح کلی
//  نوع نمایش سطح تسلط:گرافیکی
export const overallGraphicSchema = baseLanguageSchema.extend({
  displayMode: z.literal("overall-graphic"),
  proficiencyData: z.object({
    level: z.number().min(1).max(5).optional().or(z.literal("")),
  }),
});

// نوع نمایش زبان:سطح کلی
// A-C :نوع نمایش سطح تسلط
export const overallCefrSchema = baseLanguageSchema.extend({
  displayMode: z.literal("overall-cefr"),
  proficiencyData: z.object({
    level: z
      .enum(["A1", "A2", "B1", "B2", "C1", "C2"])
      .optional()
      .or(z.literal("")),
  }),
});

// ==================== SKILL BREAKDOWN ====================
// نوع نمایش زبان:تفکیک مهارت ها
//  نوع نمایش سطح تسلط:توصیفی
export const breakdownDescriptiveSchema = baseLanguageSchema.extend({
  displayMode: z.literal("breakdown-descriptive"),
  proficiencyData: z.object({
    reading: z
      .enum([
        "Beginner",
        "Elementary",
        "Intermediate",
        "Advanced",
        "Proficient",
      ])
      .optional()
      .or(z.literal("")),
    writing: z
      .enum([
        "Beginner",
        "Elementary",
        "Intermediate",
        "Advanced",
        "Proficient",
      ])
      .optional()
      .or(z.literal("")),
    listening: z
      .enum([
        "Beginner",
        "Elementary",
        "Intermediate",
        "Advanced",
        "Proficient",
      ])
      .optional()
      .or(z.literal("")),
    speaking: z
      .enum([
        "Beginner",
        "Elementary",
        "Intermediate",
        "Advanced",
        "Proficient",
      ])
      .optional()
      .or(z.literal("")),
  }),
});
// نوع نمایش زبان:تفکیک مهارت ها
//  نوع نمایش سطح تسلط: گرافیکی
export const breakdownGraphicSchema = baseLanguageSchema.extend({
  displayMode: z.literal("breakdown-graphic"),
  proficiencyData: z.object({
    reading: z.number().min(1).max(5).optional().or(z.literal("")),
    writing: z.number().min(1).max(5).optional().or(z.literal("")),
    listening: z.number().min(1).max(5).optional().or(z.literal("")),
    speaking: z.number().min(1).max(5).optional().or(z.literal("")),
  }),
});

// نوع نمایش زبان:تفکیک مهارت ها
// A-C:نوع نمایش سطح تسل
export const breakdownCefrSchema = baseLanguageSchema.extend({
  displayMode: z.literal("breakdown-cefr"),
  proficiencyData: z.object({
    reading: z
      .enum(["A1", "A2", "B1", "B2", "C1", "C2"])
      .optional()
      .or(z.literal("")),
    writing: z
      .enum(["A1", "A2", "B1", "B2", "C1", "C2"])
      .optional()
      .or(z.literal("")),
    listening: z
      .enum(["A1", "A2", "B1", "B2", "C1", "C2"])
      .optional()
      .or(z.literal("")),
    speaking: z
      .enum(["A1", "A2", "B1", "B2", "C1", "C2"])
      .optional()
      .or(z.literal("")),
  }),
});

// displayModeSchema

export const displayModeSchema = z
  .enum([
    "overall-descriptive",
    "overall-graphic",
    "overall-cefr",
    "breakdown-descriptive",
    "breakdown-graphic",
    "breakdown-cefr",
  ])
  .or(z.literal(""));

export const createLanguageSchema = (t?: TFunction<string, undefined>) => {
  return z
    .discriminatedUnion("displayMode", [
      overallDescriptiveSchema,
      overallGraphicSchema,
      overallCefrSchema,
      breakdownDescriptiveSchema,
      breakdownGraphicSchema,
      breakdownCefrSchema,
    ])
    .or(
      z.object({
        language: z.string().optional().or(z.literal("")),
        displayMode: z.literal(""),
        proficiencyData: z.object({}).loose().optional().default({}),
        description: z.string().optional().default(""),
      }),
    );
};

export type LanguageValues = z.infer<ReturnType<typeof createLanguageSchema>>;
