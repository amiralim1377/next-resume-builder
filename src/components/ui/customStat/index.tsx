import { cn } from "@/utils/cn";
import React from "react";

// Define the shape of a single stat item
export interface StatItem {
  label: React.ReactNode;
  content: React.ReactNode;
  id: number;
}

export interface CustomStatsProps {
  data: StatItem | StatItem[];
  labelLocation?: "top" | "bottom" | "left" | "right";
  size?: "sm" | "md" | "lg" | (string & {});
  className?: string;
  labelClassName?: string;
  contentClassName?: string;
  style?: React.CSSProperties;
}

const getFlexDirection = (location: CustomStatsProps["labelLocation"]) => {
  switch (location) {
    case "top":
      return "column";
    case "bottom":
      return "column-reverse";
    case "left":
      return "row";
    case "right":
      return "row-reverse";
    default:
      return "column";
  }
};

const getSizeStyles = (size: CustomStatsProps["size"]): React.CSSProperties => {
  switch (size) {
    case "sm":
      return { fontSize: "0.875rem", padding: "0.5rem" };
    case "md":
      return { fontSize: "1rem", padding: "1rem" };
    case "lg":
      return { fontSize: "1.25rem", padding: "1.5rem" };
    default:
      return {};
  }
};

const CustomStats: React.FC<CustomStatsProps> = ({
  data,
  labelLocation = "top",
  size = "md",
  className = "",
  labelClassName,
  contentClassName,
  style = {},
}) => {
  const items = Array.isArray(data) ? data : [data];

  const flexDirection = getFlexDirection(labelLocation);
  const sizeStyles = getSizeStyles(size);

  return (
    <div
      className={cn(`custom-stats-container ${className}`)}
      style={{ display: "flex", gap: "1rem", flexWrap: "wrap", ...style }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className="custom-stats-item"
          style={{
            display: "flex",
            flexDirection,
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            ...sizeStyles,
          }}
        >
          <span
            className={cn(`custom-stats-label ${labelClassName}`.trim())}
            style={{ fontWeight: "bold", opacity: 0.8 }}
          >
            {item.label}
          </span>
          <span
            className={cn(`custom-stats-content ${contentClassName}`.trim())}
          >
            {item.content}
          </span>
        </div>
      ))}
    </div>
  );
};

export { CustomStats };
