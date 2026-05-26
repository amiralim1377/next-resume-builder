import { useContext } from "react";
import { ThemeContext } from ".";
import { COLORS } from "./colors";

export const useThemeColors = () => {
  const { theme, switchTheme, setTheme } = useContext(ThemeContext);

  const colors = theme === "light" ? COLORS.lightTheme : COLORS.darkTheme;

  return { colors, theme, switchTheme, setTheme };
};
