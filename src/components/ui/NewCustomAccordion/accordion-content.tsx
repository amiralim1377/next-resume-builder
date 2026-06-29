"use client";

import React from "react";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import { cn } from "@/utils/cn";
import { useAccordionItem } from "./context";

export interface AccordionContentProps extends Omit<
  HTMLMotionProps<"div">,
  "children"
> {
  children?: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}

export const AccordionContent = ({
  className,
  children,
  ref,
  ...props
}: AccordionContentProps) => {
  const { id, isOpen } = useAccordionItem();

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          ref={ref}
          id={`accordion-content-${id}`}
          role="region"
          aria-labelledby={`accordion-trigger-${id}`}
          data-state={isOpen ? "open" : "closed"}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-visible text-sm"
          {...props}
        >
          <div className={cn("pt-0 pb-4", className)}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
AccordionContent.displayName = "AccordionContent";
