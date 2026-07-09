// src/features/resume/schemas/ResearchSchema.ts
import { TFunction } from "i18next";
import { z } from "zod";

// ─── Constants ────────────────────────────────────────────────────────────────
const YEAR_REGEX = /^\d{4}$/;

// ─── Schema Factory ───────────────────────────────────────────────────────────
export const createResearchSchema = (t: TFunction<string, undefined>) => {
  // ─── Shared Rich Text Core ──────────────────────────────────────────────────
  // Strict object definition to satisfy React Hook Form Resolver types
  const summarySchema = z.object({
    type: z.string(),
    content: z.array(z.unknown()),
  });

  // ─── 1. EMPTY STATE SCHEMA ──────────────────────────────────────────────────
  const emptyResearchSchema = z.object({
    status: z.literal("empty"),
    researchTitle: z.string(),
    publisher: z.string(),
    researchUrl: z.string(),
    publicationDate: z.string(),
    summary: summarySchema,
  });

  // ─── 2. STRICT STATE SCHEMA ─────────────────────────────────────────────────
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
      .max(150, { message: t("publisherTooLong") })
      .or(z.literal("")),

    // Handles empty string as valid for optional URLs
    researchUrl: z
      .string()
      .trim()
      .url({ message: t("invalidUrl") })
      .or(z.literal("")),

    publicationDate: z
      .string()
      .trim()
      .min(1, { message: t("publicationDateRequired") })
      .or(z.literal("")),

    summary: summarySchema,
  });

  // ─── 3. DISCRIMINATED UNION ─────────────────────────────────────────────────
  return z.discriminatedUnion("status", [
    emptyResearchSchema,
    strictResearchSchema,
  ]);
};

export type ResearchValues = z.infer<ReturnType<typeof createResearchSchema>>;
