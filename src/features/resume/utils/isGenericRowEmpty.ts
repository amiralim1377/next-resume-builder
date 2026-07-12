import { hasResumeEditorContent, RichTextNode } from "@/utils/richText";

export const isGenericRowEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined) return true;

  if (typeof value === "string") {
    return value.trim().length === 0;
  }

  if (typeof value === "boolean") {
    return !value;
  }

  if (Array.isArray(value)) {
    return value.length === 0 || value.every(isGenericRowEmpty);
  }

  if (typeof value === "object") {
    if ("type" in value && "content" in value) {
      return !hasResumeEditorContent(value as RichTextNode);
    }

    const values = Object.values(value);
    if (values.length === 0) return true;

    return values.every(isGenericRowEmpty);
  }

  return true;
};
