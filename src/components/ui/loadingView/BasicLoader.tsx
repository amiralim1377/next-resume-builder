"use client";

import { useThemeColors } from "@/provider/themeProvider/useThemeColors";

export interface BasicLoaderProps {
  color?: string;
  size?: number;
}

const BasicLoader = ({ color, size = 12 }: BasicLoaderProps) => {
  const { colors } = useThemeColors();

  const bgColor = color || colors.brand?.brandPrimary;
  const dotStyle = { width: size, height: size, backgroundColor: bgColor };

  return (
    <div className="flex items-center justify-center gap-1.5" dir="ltr">
      <div className="animate-pulse rounded-full" style={dotStyle} />
      <div
        className="animate-pulse rounded-full [animation-delay:200ms]"
        style={dotStyle}
      />
      <div
        className="animate-pulse rounded-full [animation-delay:400ms]"
        style={dotStyle}
      />
    </div>
  );
};

export { BasicLoader };
