import { ReactNode } from "react";
import { hasFarsiLetters } from "../validators/hasFarsiLetters";

export const getFontFamily = (text: string | number | ReactNode) => {
  return typeof text === "string" || typeof text === "number"
    ? hasFarsiLetters(text)
      ? "var(--yekanbakh)"
      : "var(--inter)"
    : "inherit";
};
