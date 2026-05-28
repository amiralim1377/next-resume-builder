import { AnimatePresence, motion } from "framer-motion";
import { ICustomAccordionProps } from "../..";
import classes from "./index.module.css";
import { cn } from "@/utils/cn";

interface AccordionChildrenModeProps extends ICustomAccordionProps {
  isOpen: boolean;
  disableAnimation?: boolean;
  classNames?: {
    content?: string;
  };
  children: React.ReactNode;
}

export const AccordionChildrenMode: React.FC<AccordionChildrenModeProps> = ({
  isOpen,
  disableAnimation = false,
  classNames,
  children,
}) => {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          animate={{ height: "auto", opacity: 1 }}
          initial={{ height: 0, opacity: 0 }}
          exit={{ height: 0, opacity: 0 }}
          transition={
            disableAnimation
              ? { duration: 0 }
              : { duration: 0.2, ease: "easeInOut" }
          }
          style={{ overflow: "hidden" }}
        >
          <div className={cn(classes.childrenContent, classNames?.content)}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
