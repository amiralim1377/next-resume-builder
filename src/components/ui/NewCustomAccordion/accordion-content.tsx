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
          key="content"
          id={`accordion-content-${id}`}
          role="region"
          aria-labelledby={`accordion-trigger-${id}`}
          data-state={isOpen ? "open" : "closed"}
          initial={{ height: 0, opacity: 0, overflow: "hidden" }}
          animate={{
            height: "auto",
            opacity: 1,
            transitionEnd: { overflow: "visible" },
          }}
          exit={{ height: 0, opacity: 0, overflow: "hidden" }}
          transition={{
            height: {
              type: "spring",
              stiffness: 80,
              damping: 20,
              mass: 1,
            },
            opacity: {
              duration: 0.3,
              ease: "easeInOut",
            },
          }}
          style={{
            willChange: "height, opacity",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
            perspective: 1000,
          }}
          className="relative text-sm"
          {...props}
        >
          <div className={cn("pt-0 pb-4", className)}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
AccordionContent.displayName = "AccordionContent";
