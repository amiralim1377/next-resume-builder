"use client";

import React, { useId } from "react";
import { cn } from "@/utils/cn";
import {
  useAccordion,
  AccordionItemContext,
  AccordionItemContextValue,
} from "./context";

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
  ref?: React.Ref<HTMLDivElement>;
}

export const AccordionItem = ({
  value,
  disabled = false,
  className,
  ref,
  ...props
}: AccordionItemProps) => {
  const { value: activeValue } = useAccordion();
  const uniqueId = useId();

  const isOpen = Array.isArray(activeValue)
    ? activeValue.includes(value)
    : activeValue === value;

  const contextValue: AccordionItemContextValue = {
    value,
    id: uniqueId,
    disabled,
    isOpen,
  };

  return (
    <AccordionItemContext.Provider value={contextValue}>
      <div
        ref={ref}
        className={cn("border-ui-border border-b", className)}
        data-state={isOpen ? "open" : "closed"}
        data-disabled={disabled ? "" : undefined}
        {...props}
      />
    </AccordionItemContext.Provider>
  );
};
AccordionItem.displayName = "AccordionItem";
