// src/features/resume/schemas/ProjectsSchema.ts
import { TFunction } from "i18next";
import * as z from "zod/v4";

// ─── Constants ────────────────────────────────────────────────────────────────
const YEAR_REGEX = /^\d{4}$/;

// ─── Schema Factory ───────────────────────────────────────────────────────────
export const createProjectsSchema = (t: TFunction<string, undefined>) => {
  // ─── Shared Rich Text Core ──────────────────────────────────────────────────
  // Reverted to strict object to satisfy React Hook Form's resolver types
  const summarySchema = z.object({
    type: z.string(),
    content: z.array(z.unknown()),
  });

  // ─── 1. EMPTY STATE SCHEMA ──────────────────────────────────────────────────
  const emptyProjectSchema = z.object({
    status: z.literal("empty"),
    projectTitle: z.string(),
    clientName: z.string(),
    projectUrl: z.string(),
    projectMonth: z.string(),
    projectYear: z.string(),
    summary: summarySchema,
  });

  // ─── 2. STRICT STATE SCHEMA ─────────────────────────────────────────────────
  const strictProjectSchema = z.object({
    status: z.enum(["draft", "completed"]),

    // Required Field
    projectTitle: z
      .string()
      .trim()
      .min(1, { message: t("projectTitleRequired") })
      .max(150, { message: t("projectTitleTooLong") }),

    // Optional Fields
    clientName: z
      .string()
      .trim()
      .max(100, { message: t("clientNameTooLong") }),

    projectUrl: z
      .string()
      .trim()
      .url({ message: t("invalidUrl") })
      .or(z.literal("")),

    projectMonth: z
      .string()
      .trim()
      .min(1, { message: t("projectMonthRequired") })
      .or(z.literal("")),

    projectYear: z
      .string()
      .trim()
      .regex(YEAR_REGEX, { message: t("invalidYearFormat") })
      .or(z.literal("")),

    summary: summarySchema,
  });

  // ─── 3. DISCRIMINATED UNION ─────────────────────────────────────────────────
  return z.discriminatedUnion("status", [
    emptyProjectSchema,
    strictProjectSchema,
  ]);
};

export type ProjectValues = z.infer<ReturnType<typeof createProjectsSchema>>;
