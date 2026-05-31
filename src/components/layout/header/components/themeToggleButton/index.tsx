import { memo } from "react";
import { DarkSvg } from "@/components/svg/darkSvg";
import { LightSvg } from "@/components/svg/lightSvg";
import { ThemeScheme } from "@/provider/themeProvider";
import { ColorPalette } from "@/provider/themeProvider/types";

type ThemeToggleButtonProps = {
  theme: ThemeScheme;
  onChange: () => void;
  colors: Partial<ColorPalette>;
};

const ThemeToggleButton = memo(function ThemeToggleButton({
  theme,
  onChange,
  colors,
}: ThemeToggleButtonProps) {
  const Icon = theme === "light" ? DarkSvg : LightSvg;
  const iconColor = colors.text?.secondary ?? "#000";

  return (
    <button
      type="button"
      onClick={onChange}
      className="cursor-pointer"
      aria-label="Toggle theme"
    >
      <Icon className="hover:text-brandLight select-none" color={iconColor} />
    </button>
  );
});

export { ThemeToggleButton };
