"use client";

import { createContext, useContext } from "react";

export type AccordionType = "single" | "multiple";

export interface AccordionSingleProps {
  type: "single";
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  collapsible?: boolean;
}

export interface AccordionMultipleProps {
  type: "multiple";
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}

export interface AccordionContextValue {
  value: string | string[];
  onItemOpen: (value: string) => void;
  onItemClose: (value: string) => void;
  type: AccordionType;
  collapsible?: boolean;
}

export const AccordionContext = createContext<
  AccordionContextValue | undefined
>(undefined);

export function useAccordion() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion components must be used within an <Accordion>");
  }
  return context;
}

export interface AccordionItemContextValue {
  value: string;
  id: string;
  disabled: boolean;
  isOpen: boolean;
}

export const AccordionItemContext = createContext<
  AccordionItemContextValue | undefined
>(undefined);

export function useAccordionItem() {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error(
      "AccordionItem components must be used within an <AccordionItem>",
    );
  }
  return context;
}
