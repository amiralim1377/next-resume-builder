import { AnimatePresence, motion, MotionProps } from "framer-motion";
import { FC } from "react";
import {
  AccordionItemProps,
  ICustomAccordionClassNamesProps,
} from "../../index";
import { cn } from "@/utils/cn";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";
import { ChevronDown } from "@/components/svg/ChevronDown";

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
      className={cn("cursor-pointer", classNames?.itemWrapper)}
      style={{
        borderBottom:
          showDivider && !(hideLastDivider && isLastItem)
            ? `1px solid ${colors.ui?.border}`
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
          classNames?.labelWrapper,
          isOpen ? classNames?.select : classNames?.unSelect,
          item.disabledItem && "cursor-not-allowed",
        )}
        onClick={
          isDisabled ? undefined : () => onToggle(item.id, item.disabledItem)
        }
      >
        <div
          className={cn(
            "flex w-full items-center justify-between",
            classNames?.labelChevronIconContainer,
          )}
        >
          <div
            className={cn(
              "flex justify-center gap-1.25",
              classNames?.labelIconContainer,
            )}
          >
            {item?.icon}
            <p className={cn("font-[inherit] text-sm", classNames?.label)}>
              {item?.label}
            </p>
          </div>

          <div
            className={cn(
              "flex items-center justify-center",
              classNames?.chevronWrapper,
            )}
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={
                !disableAnimation
                  ? { duration: 0.3, ease: "easeInOut" }
                  : { duration: 0 }
              }
              {...motionProps}
              className={"flex items-center justify-center"}
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
                  item.disabledItem
                    ? "text-accent cursor-not-allowed"
                    : "m-0 cursor-pointer transition-transform duration-300",
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
            <div className={cn(classNames?.contentWrapper)}>
              <div
                className={cn("font-[inherit] text-sm", classNames?.content)}
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
