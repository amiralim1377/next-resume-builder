import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { ICustomAccordionProps } from "../..";
import classes from "./index.module.css";
import { cn } from "@/utils/cn";
import { ChevronDown } from "@/components/svg/chevronDown";

interface AccordionHeaderProps extends ICustomAccordionProps {
  isChildrenMode: boolean;
  isChildrenOpen: boolean;
  isDisabled?: boolean;
  onToggle?: () => void;
  setIsChildrenOpen: Dispatch<SetStateAction<boolean>>;
}

const AccordionHeader: React.FC<AccordionHeaderProps> = ({
  headerTitle,
  headerIcon,
  isChildrenMode = false,
  isChildrenOpen = false,
  isDisabled = false,
  disableAnimation = false,
  chevronSize = 16,
  classNames,
  motionProps,
  setIsChildrenOpen,
}) => {
  const handleOpenChevronChildren = () => {
    if (isDisabled) return;
    setIsChildrenOpen((prev) => !prev);
  };
  if (!headerTitle || !headerIcon) return null;

  return (
    <div
      className={cn(
        classes.accordionHeaderWrapper,
        classNames?.header,
        isChildrenMode && isChildrenOpen
          ? classNames?.select
          : classNames?.unSelect,
      )}
      onClick={
        isChildrenMode && !isDisabled ? handleOpenChevronChildren : undefined
      }
    >
      <div
        className={cn(
          classes.accordionHeaderInnerContainer,
          classNames?.headerInner,
        )}
      >
        {headerIcon && (
          <span
            className={cn(classes.headerIconClassName, classNames?.headerIcon)}
          >
            {headerIcon}
          </span>
        )}

        {headerTitle && (
          <span
            className={cn(
              classes.headerTitleClassName,
              classNames?.headerTitle,
            )}
          >
            {headerTitle}
          </span>
        )}
      </div>

      {isChildrenMode && (
        <motion.div
          animate={{ rotate: isChildrenOpen ? 180 : 0 }}
          className={cn(classes.motionDivElem, classNames?.chevronWrapper)}
          transition={
            disableAnimation
              ? { duration: 0 }
              : { duration: 0.3, ease: "easeInOut" }
          }
          {...motionProps}
        >
          <ChevronDown
            className={cn(classes.chevron, classNames?.chevron)}
            size={chevronSize}
          />
        </motion.div>
      )}
    </div>
  );
};

export { AccordionHeader };
