import { ReactNode, CSSProperties, memo } from "react";
import { cn } from "@/utils/cn";

export type CustomBadgeType = "success" | "warning" | "error" | "default";

interface CustomBadgeProps {
  children?: ReactNode;
  icon?: ReactNode;
  className?: string;
  type?: CustomBadgeType;
  color?: string;
  style?: CSSProperties;
}

const CustomBadgeComponent = ({
  children,
  icon,
  className,
  type = "default",
  color,
  style,
}: CustomBadgeProps) => {
  const getBadgeClass = (badgeType: CustomBadgeType) => {
    switch (badgeType) {
      case "success":
        return "bg-state-success/20 text-text-success";
      case "warning":
        return "bg-state-warning/20 text-text-warning";
      case "error":
        return "bg-state-error/20 text-state-error";
      default:
        return "bg-disabledText text-text-secondary";
    }
  };

  const mergedStyle: CSSProperties = {
    ...(color ? { backgroundColor: color } : {}),
    ...style,
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5",
        "rounded-full px-3 py-1.5 text-xs font-semibold capitalize",
        "leading-none text-inherit",
        "cursor-default whitespace-nowrap select-none",
        getBadgeClass(type),
        className,
      )}
      style={mergedStyle}
    >
      {icon}
      {children}
    </div>
  );
};

export const CustomBadge = memo(CustomBadgeComponent);
