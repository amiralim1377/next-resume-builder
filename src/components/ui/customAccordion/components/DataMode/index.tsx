import { AnimatePresence, motion, MotionProps } from "framer-motion";
import { FC } from "react";
import {
  AccordionItemProps,
  ICustomAccordionClassNamesProps,
} from "../../index";
import classes from "./index.module.css";
import { cn } from "@/utils/cn";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";
import { ChevronDown } from "@/components/svg/chevronDown";

interface AccordionDataModeProps {
  item: AccordionItemProps;
  isOpen: boolean;
  isLastItem: boolean;
  isDisabled: boolean;
  showDivider: boolean;
  hideLastDivider: boolean;
  disableAnimation: boolean;
  chevronSize: number;
  type: "single" | "multiple";
  classNames?: ICustomAccordionClassNamesProps;
  motionProps?: MotionProps;
  onToggle: (id: string | number, itemDisabled?: boolean) => void;
}

export const AccordionDataMode: FC<AccordionDataModeProps> = ({
  item,
  isOpen,
  isLastItem,
  isDisabled,
  showDivider,
  hideLastDivider,
  disableAnimation,
  chevronSize,
  type,
  classNames,
  motionProps,
  onToggle,
}) => {
  const { colors } = useThemeColors();

  return (
    <div
      className={cn(classes.accMainContainer, classNames?.itemWrapper)}
      style={{
        borderBottom:
          showDivider && !(hideLastDivider && isLastItem)
            ? `1px solid ${colors.accent?.accent}`
            : "",
      }}
      role="button"
      aria-disabled={isDisabled}
      tabIndex={isDisabled ? -1 : 0}
      aria-expanded={isOpen}
      aria-controls={`accordion-content-${item.id}`}
    >
      <div
        className={cn(
          classes.labelAndChevroneWrapper,
          classNames?.labelWrapper,
          isOpen ? classNames?.select : classNames?.unSelect,
          item.disabledItem && classes.triggerDisabled,
        )}
        onClick={
          isDisabled ? undefined : () => onToggle(item.id, item.disabledItem)
        }
      >
        <div
          className={cn(
            classes.innerLabelAndChevroneContainer,
            classNames?.labelChevronIconContainer,
          )}
        >
          <div
            className={cn(
              classes.labelIconWrapper,
              classNames?.labelIconContainer,
            )}
          >
            {item?.icon}
            <p className={cn(classes.label, classNames?.label)}>
              {item?.label}
            </p>
          </div>

          <div
            className={cn(classes.chevronWrapper, classNames?.chevronWrapper)}
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={
                !disableAnimation
                  ? { duration: 0.3, ease: "easeInOut" }
                  : { duration: 0 }
              }
              {...motionProps}
              className={classes.chevronMotionContainer}
            >
              <ChevronDown
                size={chevronSize}
                onClick={
                  isDisabled
                    ? undefined
                    : (e) => {
                        e.stopPropagation();
                        onToggle(item.id, item.disabledItem);
                      }
                }
                className={cn(
                  item.disabledItem ? classes.triggerDisabled : classes.chevron,
                  classNames?.chevron,
                )}
              />
            </motion.div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={
              !disableAnimation
                ? {
                    duration: type === "multiple" ? 0.25 : 0.35,
                    ease: "easeInOut",
                  }
                : { duration: 0 }
            }
            style={{ overflow: "hidden" }}
            {...motionProps}
          >
            <div
              className={cn(classes.contentWrapper, classNames?.contentWrapper)}
            >
              <div
                className={cn(
                  classes.innerContentContainer,
                  classNames?.content,
                )}
              >
                {item.content}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
