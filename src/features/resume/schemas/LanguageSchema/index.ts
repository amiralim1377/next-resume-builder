import { TFunction } from "i18next";
import * as z from "zod/v4";
import { CefrLevels, createDisplayMode, DescriptiveLevels } from "./language";

const baseLanguageSchema = z.object({
  language: z.string().optional(),
});

// ==================== OVERALL LEVEL ====================
// نوع نمایش زبان:سطح کلی
//  نوع نمایش سطح تسلط:توصیفی
export const overallDescriptiveSchema = baseLanguageSchema.extend({
  displayMode: z.literal(createDisplayMode("overall", "descriptive")),
  proficiencyData: z.object({
    level: z.enum(DescriptiveLevels).optional().or(z.literal("")),
  }),
});

// نوع نمایش زبان:سطح کلی
//  نوع نمایش سطح تسلط:گرافیکی
export const overallGraphicSchema = baseLanguageSchema.extend({
  displayMode: z.literal(createDisplayMode("overall", "graphic")),
  proficiencyData: z.object({
    level: z.number().min(1).max(5).optional().or(z.literal("")),
  }),
});

// نوع نمایش زبان:سطح کلی
// A-C :نوع نمایش سطح تسلط
export const overallCefrSchema = baseLanguageSchema.extend({
  displayMode: z.literal(createDisplayMode("overall", "cefr")),
  proficiencyData: z.object({
    level: z.enum(CefrLevels).optional().or(z.literal("")),
  }),
});

// ==================== SKILL BREAKDOWN ====================
// نوع نمایش زبان:تفکیک مهارت ها
//  نوع نمایش سطح تسلط:توصیفی
export const breakdownDescriptiveSchema = baseLanguageSchema.extend({
  displayMode: z.literal(createDisplayMode("breakdown", "descriptive")),
  proficiencyData: z.object({
    reading: z.enum(DescriptiveLevels).optional().or(z.literal("")),
    writing: z.enum(DescriptiveLevels).optional().or(z.literal("")),
    listening: z.enum(DescriptiveLevels).optional().or(z.literal("")),
    speaking: z.enum(DescriptiveLevels).optional().or(z.literal("")),
  }),
});
// نوع نمایش زبان:تفکیک مهارت ها
//  نوع نمایش سطح تسلط: گرافیکی
export const breakdownGraphicSchema = baseLanguageSchema.extend({
  displayMode: z.literal(createDisplayMode("breakdown", "graphic")),
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
  displayMode: z.literal(createDisplayMode("breakdown", "cefr")),
  proficiencyData: z.object({
    reading: z.enum(CefrLevels).optional().or(z.literal("")),
    writing: z.enum(CefrLevels).optional().or(z.literal("")),
    listening: z.enum(CefrLevels).optional().or(z.literal("")),
    speaking: z.enum(CefrLevels).optional().or(z.literal("")),
  }),
});

export const createLanguageSchema = (t?: TFunction<string, undefined>) => {
  return z
    .union([
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
        proficiencyData: z.object({}).loose().optional(),
      }),
    );
};

export type LanguageValues = z.infer<ReturnType<typeof createLanguageSchema>>;
