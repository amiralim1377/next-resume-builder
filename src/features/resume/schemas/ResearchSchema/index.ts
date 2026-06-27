// src/features/resume/schemas/ResearchSchema.ts
import { TFunction } from "i18next";
import { z } from "zod";

// ─── Constants ────────────────────────────────────────────────────────────────
const YEAR_REGEX = /^\d{4}$/;

// ─── Schema Factory ───────────────────────────────────────────────────────────
export const createResearchSchema = (t: TFunction<string, undefined>) => {
  // ─── Shared Rich Text Fallback Core ─────────────────────────────────────────
  // Preprocesses uninitialized or empty rich-text blocks to prevent structure crashes
  const summarySchema = z.preprocess(
    (val) => {
      if (!val || typeof val !== "object" || Object.keys(val).length === 0) {
        return { type: "doc", content: [] };
      }
      return val;
    },
    z.object({
      type: z.string().default("doc"),
      content: z.array(z.unknown()).default([]),
    }),
  );

  // ─── 1. EMPTY STATE SCHEMA ──────────────────────────────────────────────────
  // Highly permissive baseline mapping to absorb un-interacted form state values cleanly
  const emptyResearchSchema = z.object({
    status: z.literal("empty"),
    researchTitle: z
      .string()
      .nullish()
      .transform((v) => v ?? ""),
    publisher: z
      .string()
      .nullish()
      .transform((v) => v ?? ""),
    researchUrl: z
      .string()
      .nullish()
      .transform((v) => v ?? ""),
    publicationMonth: z
      .string()
      .nullish()
      .transform((v) => v ?? ""),
    publicationYear: z
      .string()
      .nullish()
      .transform((v) => v ?? ""),
    summary: summarySchema,
  });

  // ─── 2. STRICT STATE SCHEMA ─────────────────────────────────────────────────
  // Evaluated the split-second a user interacts with a row or tries to submit
  const strictResearchSchema = z.object({
    status: z.enum(["draft", "completed"]),

    researchTitle: z
      .string()
      .trim()
      .min(1, { message: t("researchTitleRequired") })
      .max(200, { message: t("researchTitleTooLong") }),

    publisher: z
      .string()
      .trim()
      .min(1, { message: t("publisherRequired") })
      .max(150, { message: t("publisherTooLong") }),

    // Optional URL field: handles raw empty string transitions gracefully without tripping URL regex
    researchUrl: z
      .string()
      .trim()
      .url({ message: t("invalidUrl") })
      .or(z.literal(""))
      .nullish()
      .transform((v) => v ?? ""),

    publicationMonth: z
      .string()
      .trim()
      .min(1, { message: t("publicationMonthRequired") }),

    // Assuming year is required based on typical resume constraints.
    // If it's optional, you can append `.or(z.literal(""))` like the URL field.
    publicationYear: z
      .string()
      .trim()
      .min(1, { message: t("invalidYearFormat") }) // Prevents empty string bypass before regex
      .regex(YEAR_REGEX, { message: t("invalidYearFormat") }),

    summary: summarySchema,
  });

  // ─── 3. DISCRIMINATED UNION RUNTIME ROUTER ──────────────────────────────────
  return z.discriminatedUnion("status", [
    emptyResearchSchema,
    strictResearchSchema,
  ]);
};

export type ResearchValues = z.infer<ReturnType<typeof createResearchSchema>>;
