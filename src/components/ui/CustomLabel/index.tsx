import { cn } from "@/utils/cn";
import React from "react";

interface CustomLabelProps {
  /** Label text or children */
  children: React.ReactNode;

  /** Shows red asterisk (*) */
  required?: boolean;

  /** Icon before the label */
  icon?: React.ReactNode;

  /** Links label to form input */
  htmlFor?: string;

  /** Label size */
  size?: "sm" | "md" | "lg" | "xl";

  /** Description/helper text size */
  descriptionSize?: "sm" | "md" | "lg" | "xl";

  /** Style variant */
  variant?: "default" | "bold" | "muted" | "error";

  /** Additional classes for the label */
  className?: string;

  /** Click handler */
  onClick?: () => void;

  /** Tooltip */
  title?: string;

  /** Optional description/helper text shown below the label */
  description?: string;

  /** Shows divider below label */
  divider?: boolean;

  /** Divider style */
  dividerClassName?: string;
}

export const CustomLabel: React.FC<CustomLabelProps> = ({
  children,
  required = false,
  icon,
  htmlFor,
  size = "md",
  descriptionSize = "sm",
  variant = "default",
  className = "",
  onClick,
  title,
  description,
  divider = false,
  dividerClassName,
}) => {
  const baseClasses =
    "inline-flex items-center gap-2 font-medium text-text-primary select-none";

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  const variantClasses = {
    default: "text-text-primary",
    bold: "font-semibold text-text-primary",
    muted: "text-text-muted",
    error: "text-state-error",
  };

  return (
    <div className="flex flex-col">
      <label
        htmlFor={htmlFor}
        className={cn(
          baseClasses,
          sizeClasses[size],
          variantClasses[variant],
          onClick
            ? "cursor-pointer transition-opacity hover:opacity-90"
            : "cursor-default",
          className,
        )}
        onClick={onClick}
        title={title}
      >
        {icon && (
          <span className="text-text-muted flex items-center">{icon}</span>
        )}

        <span className="flex items-center gap-0.5">
          {children}

          {required && (
            <span className="text-state-error text-base leading-none font-semibold">
              *
            </span>
          )}
        </span>
      </label>

      {description && (
        <p
          className={cn("text-text-muted mt-0.5", sizeClasses[descriptionSize])}
        >
          {description}
        </p>
      )}

      {divider && (
        <div
          className={cn(
            "border-ui-border mt-3 w-full border-t",
            dividerClassName,
          )}
        />
      )}
    </div>
  );
};
