import { ThemeScheme } from "@/provider/themeProvider";

function useHeroClasses(theme: ThemeScheme) {
  const baseTextClass =
    "text-4xl md:text-6xl  leading-tight font-black capitalize";
  const defaultColorClass =
    theme === "dark" ? "text-text-primary" : "text-text-primary";
  const highlightColorClass =
    theme === "light" ? "text-brandPrimary" : "text-brandPrimary";

  return { baseTextClass, defaultColorClass, highlightColorClass };
}

export { useHeroClasses };
