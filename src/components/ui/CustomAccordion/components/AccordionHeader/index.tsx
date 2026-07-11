import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { ICustomAccordionProps } from "../..";
import { cn } from "@/utils/cn";
import { ChevronDown } from "@/components/svg/ChevronDown";

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
        "flex w-full items-center justify-between p-1.25",
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
        className={cn("flex items-center gap-1.25", classNames?.headerInner)}
      >
        {headerIcon && (
          <span
            className={cn(
              "inline-flex cursor-pointer items-center justify-center select-none",
              classNames?.headerIcon,
            )}
          >
            {headerIcon}
          </span>
        )}

        {headerTitle && (
          <span
            className={cn(
              "font-inter cursor-pointer leading-none select-none",
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
          className={cn(
            "inline-flex items-center justify-center p-1.25",
            classNames?.chevronWrapper,
          )}
          transition={
            disableAnimation
              ? { duration: 0 }
              : { duration: 0.3, ease: "easeInOut" }
          }
          {...motionProps}
        >
          <ChevronDown className={cn(classNames?.chevron)} size={chevronSize} />
        </motion.div>
      )}
    </div>
  );
};

export { AccordionHeader };
