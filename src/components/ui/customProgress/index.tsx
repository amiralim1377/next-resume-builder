"use colors";
import { CSSProperties } from "react";
import { cn } from "@/utils/cn";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";
import { useLang } from "@/provider/lngProvider";

interface CustomProgressProps {
  value?: number;
  className?: string;
  style?: CSSProperties;
  height: string | number;
}

const CustomProgress = ({
  value = 25,
  height = 2,
  className,
  style,
}: CustomProgressProps) => {
  const { colors } = useThemeColors();
  const { lng } = useLang();

  const normalizedValue = Math.min(Math.max(value || 0, 0), 100);

  return (
    <div
      className={cn(
        "bg-progressContainer relative w-full overflow-hidden rounded-sm",
        className,
      )}
      style={{ height, ...style }}
      role="progressbar"
      aria-valuenow={normalizedValue}
      aria-valuemin={0}
      aria-valuemax={100}
      dir={lng === "fa" ? "rtl" : "ltr"}
    >
      <div
        className="h-full transition-[width] duration-300 ease-in-out"
        style={{
          width: `${normalizedValue}%`,
          backgroundColor: colors.brand?.brandPrimary,
        }}
      />
    </div>
  );
};

export { CustomProgress };
