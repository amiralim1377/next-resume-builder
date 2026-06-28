"use client";
import { CSSProperties } from "react";
import { cn } from "@/utils/cn";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";
import { useLang } from "@/provider/lngProvider";

interface CustomProgressProps {
  value?: number;
  className?: string;
  style?: CSSProperties;
  height?: string | number; // height when horizontal, length when vertical
  width?: string | number; // thickness when vertical, ignored when horizontal
  layout?: "row" | "column";
}

const CustomProgress = ({
  value = 25,
  height = 6,
  width = 6,
  className,
  style,
  layout = "column",
}: CustomProgressProps) => {
  const { colors } = useThemeColors();
  const { lng } = useLang();
  const normalizedValue = Math.min(Math.max(value || 0, 0), 100);

  const isVertical = layout === "row";

  return (
    <div
      className={cn(
        "bg-progressContainer overflow-hidden rounded-sm",
        isVertical ? "shrink-0" : "w-full",
        className,
      )}
      style={{
        height: isVertical
          ? "100%"
          : typeof height === "number"
            ? `${height}px`
            : height,
        width: isVertical
          ? typeof width === "number"
            ? `${width}px`
            : width
          : "100%",
        ...style,
      }}
      role="progressbar"
      aria-valuenow={normalizedValue}
      aria-valuemin={0}
      aria-valuemax={100}
      dir={lng === "fa" ? "rtl" : "ltr"}
    >
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          isVertical ? "w-full" : "h-full",
        )}
        style={{
          [isVertical ? "height" : "width"]: `${normalizedValue}%`,
          backgroundColor: colors.brand?.brandPrimary,
        }}
      />
    </div>
  );
};

export { CustomProgress };
