import { cn } from "@/utils/cn";
import React from "react";

interface AccordionRowActionProps {
  icon: React.ReactNode;
  onClick: () => void;
  title?: string;
  variant?: "default" | "danger";
}

export function AccordionRowAction({
  icon,
  onClick,
  title,
  variant = "default",
}: AccordionRowActionProps) {
  const baseClasses =
    "flex h-8 w-8 cursor-pointer items-center justify-center rounded-md opacity-0 transition-all group-hover:opacity-100";

  const variantClasses =
    variant === "danger"
      ? "text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
      : "text-muted-foreground hover:bg-muted hover:text-foreground";

  return (
    <div
      role="button"
      tabIndex={0}
      title={title}
      className={cn(baseClasses, variantClasses)}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
      }}
    >
      {icon}
    </div>
  );
}
