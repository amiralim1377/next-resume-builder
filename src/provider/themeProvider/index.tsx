"use client";
import { persistKeys } from "@/core/constants/persistKeys";
import { setCookie } from "cookies-next";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

export type ThemeScheme = "light" | "dark";

interface ThemeContextProps {
  theme: ThemeScheme;
  setTheme: Dispatch<SetStateAction<ThemeScheme>>;
  switchTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: "dark",
  setTheme: () => undefined,
  switchTheme: () => undefined,
});

interface ThemeProviderProps {
  children: ReactNode | ReactNode[];
  themeFromCookie: ThemeScheme;
}

const ThemeProvider = ({ children, themeFromCookie }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<ThemeScheme>(themeFromCookie || "dark");

  const switchTheme = () => {
    const themeToSet = theme === "dark" ? "light" : "dark";
    setCookie(persistKeys.NEXT_RESUME_BUILDER_THEME, themeToSet, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    if (typeof document !== "undefined") {
      document
        ?.querySelector("html")
        ?.setAttribute("data-color-scheme", themeToSet);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
