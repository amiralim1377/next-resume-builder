"use client";

import React, { useState, useCallback, useRef } from "react";
import { cn } from "@/utils/cn";
import {
  AccordionContext,
  AccordionSingleProps,
  AccordionContextValue,
} from "./context";

export type AccordionRootProps = (
  | AccordionSingleProps
  | import("./context").AccordionMultipleProps
) &
  Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "value" | "defaultValue" | "onChange" | "collapsible"
  > & {
    ref?: React.Ref<HTMLDivElement>;
    collapsible?: boolean;
  };

export const Accordion = ({
  type,
  className,
  ref,
  value: controlledValue,
  defaultValue,
  onValueChange,
  collapsible,
  ...props
}: AccordionRootProps) => {
  const [uncontrolledValue, setUncontrolledValue] = useState<string | string[]>(
    defaultValue !== undefined ? defaultValue : type === "single" ? "" : [],
  );

  const isControlled = controlledValue !== undefined;
  const resolvedValue = isControlled ? controlledValue! : uncontrolledValue;

  const handleValueChange = useCallback(
    (newValue: string | string[]) => {
      if (!isControlled) setUncontrolledValue(newValue);

      if (!onValueChange) return;

      if (type === "single" && typeof newValue === "string") {
        (onValueChange as (val: string) => void)(newValue);
      } else if (type === "multiple" && Array.isArray(newValue)) {
        (onValueChange as (val: string[]) => void)(newValue);
      }
    },
    [isControlled, onValueChange, type],
  );

  const onItemOpen = useCallback(
    (itemValue: string) => {
      if (type === "single") {
        handleValueChange(itemValue);
      } else {
        const currentArray = (resolvedValue as string[]) || [];
        if (!currentArray.includes(itemValue)) {
          handleValueChange([...currentArray, itemValue]);
        }
      }
    },
    [type, resolvedValue, handleValueChange],
  );

  const onItemClose = useCallback(
    (itemValue: string) => {
      if (type === "single") {
        if (collapsible) {
          handleValueChange("");
        }
      } else {
        const currentArray = (resolvedValue as string[]) || [];
        handleValueChange(currentArray.filter((v) => v !== itemValue));
      }
    },
    [type, resolvedValue, handleValueChange, collapsible],
  );

  const containerRef = useRef<HTMLDivElement>(null);
  React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) return;

    const triggers = Array.from(
      containerRef.current?.querySelectorAll<HTMLButtonElement>(
        "[data-accordion-trigger]:not([disabled])",
      ) || [],
    );

    if (!triggers.length) return;

    const activeIndex = triggers.findIndex(
      (el) => el === document.activeElement,
    );
    if (activeIndex === -1 && e.key !== "Home" && e.key !== "End") return;

    e.preventDefault();

    let nextIndex = activeIndex;
    if (e.key === "ArrowDown") {
      nextIndex = (activeIndex + 1) % triggers.length;
    } else if (e.key === "ArrowUp") {
      nextIndex = (activeIndex - 1 + triggers.length) % triggers.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = triggers.length - 1;
    }

    triggers[nextIndex]?.focus();
  };

  const contextValue: AccordionContextValue = {
    value: resolvedValue,
    onItemOpen,
    onItemClose,
    type,
    collapsible: type === "single" ? collapsible : true,
  };

  return (
    <AccordionContext.Provider value={contextValue}>
      <div
        ref={containerRef}
        onKeyDown={handleKeyDown}
        className={cn("w-full", className)}
        data-accordion-root=""
        {...props}
      />
    </AccordionContext.Provider>
  );
};
Accordion.displayName = "Accordion";
