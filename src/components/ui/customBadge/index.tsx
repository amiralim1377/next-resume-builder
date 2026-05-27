import { CSSProperties, ReactNode } from "react";
import { cn } from "@/utils/cn";
import { useLang } from "@/provider/lngProvider";

interface CustomBadgeProps {
  children?: ReactNode;
  color?: string;
  icon?: ReactNode;
  className?: string;
  maxHeight?: number;
}

const CustomBadge = ({
  children,
  color,
  icon,
  className,
  maxHeight,
}: CustomBadgeProps) => {
  const { lng } = useLang();
  const isRtl = lng === "fa";

  const rootStyle: CSSProperties = {
    backgroundColor: color,
    ...(maxHeight !== undefined && { maxHeight: `${maxHeight}px` }),
  };

  return (
    <div
      className={cn(
        "inline-flex items-center justify-between",
        "px-2.5 py-1 rounded-sm",
        "font-normal text-inherit leading-none",
        "whitespace-nowrap no-underline cursor-default select-none box-border",
        isRtl ? "flex-row-reverse" : "flex-row",
        className,
      )}
      style={rootStyle}
    >
      {icon && (
        <span className={"inline-flex items-center ml-0 mr-1.25"}>{icon}</span>
      )}
      {children}
    </div>
  );
};

export { CustomBadge };
