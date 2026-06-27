// src/features/resume/schemas/ProjectsSchema.ts
import { TFunction } from "i18next";
import * as z from "zod/v4";

// ─── Constants ────────────────────────────────────────────────────────────────
const YEAR_REGEX = /^\d{4}$/;

// ─── Schema Factory ───────────────────────────────────────────────────────────
export const createProjectsSchema = (t: TFunction<string, undefined>) => {
  // ─── Shared Rich Text Fallback Core ─────────────────────────────────────────
  // Preprocesses uninitialized or empty rich-text blocks to prevent structure crashes
  // Replaced z.any() with z.unknown() to satisfy strict ESLint rules
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
  const emptyProjectSchema = z.object({
    status: z.literal("empty"),
    projectTitle: z
      .string()
      .nullish()
      .transform((v) => v ?? ""),
    clientName: z
      .string()
      .nullish()
      .transform((v) => v ?? ""),
    projectUrl: z
      .string()
      .nullish()
      .transform((v) => v ?? ""),
    projectMonth: z
      .string()
      .nullish()
      .transform((v) => v ?? ""),
    projectYear: z
      .string()
      .nullish()
      .transform((v) => v ?? ""),
    summary: summarySchema,
  });

  // ─── 2. STRICT STATE SCHEMA ─────────────────────────────────────────────────
  // Evaluated the split-second a user interacts with a row or tries to submit
  const strictProjectSchema = z.object({
    status: z.enum(["draft", "completed"]),

    projectTitle: z
      .string()
      .trim()
      .min(1, { message: t("projectTitleRequired") })
      .max(150, { message: t("projectTitleTooLong") }),

    // Optional text field: allowed to be empty, but capped if filled
    clientName: z
      .string()
      .trim()
      .min(1, { message: t("clientNameRequired") })
      .max(100, { message: t("clientNameTooLong") })
      .nullish()
      .transform((v) => v ?? ""),

    // Optional URL field: handles raw empty string transitions gracefully without tripping URL regex
    projectUrl: z
      .string()
      .trim()
      .url({ message: t("invalidUrl") })
      .or(z.literal(""))
      .nullish()
      .transform((v) => v ?? ""),

    projectMonth: z
      .string()
      .trim()
      .min(1, { message: t("projectMonthRequired") }),

    projectYear: z
      .string()
      .trim()
      .min(1, { message: t("projectYearRequired") })
      .regex(YEAR_REGEX, { message: t("invalidYearFormat") }),

    summary: summarySchema,
  });

  // ─── 3. DISCRIMINATED UNION RUNTIME ROUTER ──────────────────────────────────
  return z.discriminatedUnion("status", [
    emptyProjectSchema,
    strictProjectSchema,
  ]);
};

export type ProjectValues = z.infer<ReturnType<typeof createProjectsSchema>>;
