/**
 * Checks whether a Rich Text node contains actual user-entered content.
 *
 * Rich text editors often store empty content as a nested JSON structure,
 * so checking only for the existence of the object is not enough.
 *
 * Returns:
 * - true  → if any non-empty text content exists
 * - false → if the node is empty or contains only whitespace
 */

export type RichTextNode = {
  type?: string;
  text?: string;
  content?: RichTextNode[];
  [key: string]: unknown; // Captures tracking items like 'attrs' safely
};

const hasResumeEditorContent = (
  node: RichTextNode | null | undefined,
): boolean => {
  if (!node) return false;

  if (typeof node.text === "string" && node.text.trim().length > 0) {
    return true;
  }

  if (Array.isArray(node.content)) {
    return node.content.some(hasResumeEditorContent);
  }

  return false;
};

export { hasResumeEditorContent };
