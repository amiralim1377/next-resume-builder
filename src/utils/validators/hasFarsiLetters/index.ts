import { farsiLettersRegex } from "@/utils/regex";

const hasFarsiLetters = (text: string | number) => {
  return farsiLettersRegex.test(typeof text === "number" ? String(text) : text);
};

export { hasFarsiLetters };
