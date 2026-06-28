import { CSSProperties, ReactNode } from "react";
import { cn } from "@/utils/cn";
import { getFontFamily } from "@/utils/getFontFamily";

interface CustomTextProps {
  children: ReactNode;
  className?: string;
  color?: string;
  isNumber?: boolean;
  onClick?: () => void;
  size?: number;
  style?: CSSProperties;
}

const CustomText = ({
  children,
  className,
  color,
  isNumber = false,
  onClick,
  size,
  style,
}: CustomTextProps) => {
  return (
    <p
      className={cn("font-medium", className)}
      dir={isNumber ? "ltr" : undefined}
      onClick={onClick}
      style={{
        color: color,
        fontSize: size || undefined,
        fontFamily: isNumber ? "var(--inter)" : getFontFamily(children),
        ...style,
      }}
    >
      {children}
    </p>
  );
};

export { CustomText };
