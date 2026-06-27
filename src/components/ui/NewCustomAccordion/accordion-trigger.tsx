"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";
import { useAccordion, useAccordionItem } from "./context";

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: React.Ref<HTMLButtonElement>;
}

export const AccordionTrigger = ({
  className,
  children,
  ref,
  ...props
}: AccordionTriggerProps) => {
  const { onItemOpen, onItemClose, type, collapsible } = useAccordion();
  const { value, id, disabled, isOpen } = useAccordionItem();

  const handleToggle = () => {
    if (disabled) return;
    if (isOpen) {
      if (type === "multiple" || collapsible) onItemClose(value);
    } else {
      onItemOpen(value);
    }
  };

  return (
    <div className="flex">
      <button
        ref={ref}
        type="button"
        id={`accordion-trigger-${id}`}
        aria-controls={`accordion-content-${id}`}
        aria-expanded={isOpen}
        disabled={disabled}
        data-accordion-trigger=""
        data-state={isOpen ? "open" : "closed"}
        data-disabled={disabled ? "" : undefined}
        onClick={handleToggle}
        className={cn(
          "flex flex-1 cursor-pointer items-center justify-between py-4 font-medium transition-all disabled:cursor-not-allowed disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown className="text-text-secondary h-4 w-4 shrink-0 transition-transform duration-200" />
      </button>
    </div>
  );
};
AccordionTrigger.displayName = "AccordionTrigger";
