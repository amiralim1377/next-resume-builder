"use client";
import { MotionProps } from "framer-motion";
import { FC, ReactNode, useState } from "react";
import { AccordionHeader } from "./components/AccordionHeader";
import { AccordionChildrenMode } from "./components/ChildrenMode";
import { AccordionDataMode } from "./components/DataMode";
import { cn } from "@/utils/cn";

export interface AccordionItemProps {
  id: number | string;
  label?: ReactNode;
  content: ReactNode;
  icon?: ReactNode;
  disabledItem?: boolean;
  isActive?: boolean;
  shouldRender?: boolean | (() => boolean);
}

export interface ICustomAccordionClassNamesProps {
  root?: string;
  header?: string;
  headerInner?: string;
  headerIcon?: string;
  headerTitle?: string;
  chevronWrapper?: string;
  chevron?: string;
  itemWrapper?: string;
  labelWrapper?: string;
  labelChevronIconContainer?: string;
  labelIconContainer?: string;
  icon?: string;
  label?: string;
  select?: string;
  unSelect?: string;
  contentWrapper?: string;
  content?: string;
}

export interface ICustomAccordionProps {
  chevronSize?: number;
  children?: ReactNode;
  classNames?: ICustomAccordionClassNamesProps;
  data?: AccordionItemProps[];
  defaultActiveId?: string | number;
  disableAnimation?: boolean;
  headerIcon?: ReactNode;
  headerTitle?: string | ReactNode;
  isActive?: boolean;
  isDisabled?: boolean;
  motionProps?: MotionProps;
  showDivider?: boolean;
  type?: "single" | "multiple";
  hideLastDivider?: boolean;
}

const CustomAccordion: FC<ICustomAccordionProps> = ({
  chevronSize = 16,
  data,
  defaultActiveId,
  disableAnimation = false,
  children,
  classNames,
  headerTitle,
  headerIcon,
  isActive = false,
  isDisabled = false,
  motionProps,
  showDivider = false,
  hideLastDivider = false,
  type = "single",
}) => {
  const [isChildrenOpen, setIsChildrenOpen] = useState<boolean>(isActive);
  const [openItems, setOpenItems] = useState<Set<string | number>>(
    new Set([Number(defaultActiveId)]),
  );
  const isChildrenMode = !!children && !data;

  const isOpen = (id: string | number) => openItems.has(id);

  const handleToggle = (id: string | number, itemDisabled?: boolean) => {
    if (itemDisabled || isDisabled) return;
    setOpenItems((prevSet) => {
      const nextSet = new Set(prevSet);

      if (nextSet.has(id)) {
        nextSet.delete(id);
      } else {
        if (type !== "multiple") {
          nextSet.clear();
        }
        nextSet.add(id);
      }
      return nextSet;
    });
  };

  const canRenderItem = (item: AccordionItemProps) => {
    if (typeof item.shouldRender === "function") {
      return item.shouldRender();
    }
    if (typeof item.shouldRender === "boolean") {
      return item.shouldRender;
    }
    return true;
  };

  return (
    <div
      aria-disabled={isDisabled}
      className={cn(
        "mx-auto w-full select-none",
        classNames?.root,
        isDisabled && "pointer-none: opacity-5 select-none",
      )}
    >
      <AccordionHeader
        headerTitle={headerTitle}
        headerIcon={headerIcon}
        isChildrenMode={isChildrenMode}
        isChildrenOpen={isChildrenOpen}
        isDisabled={isDisabled}
        setIsChildrenOpen={setIsChildrenOpen}
        disableAnimation={disableAnimation}
        chevronSize={chevronSize}
        classNames={classNames}
        motionProps={motionProps}
      />

      {isChildrenMode ? (
        <AccordionChildrenMode
          isOpen={isChildrenOpen}
          disableAnimation={disableAnimation}
          classNames={classNames}
        >
          {children}
        </AccordionChildrenMode>
      ) : (
        data?.map((item, i) => {
          if (!canRenderItem(item)) return null;

          const isLastItem = i === data.length - 1;

          return (
            <AccordionDataMode
              key={i}
              item={item}
              isOpen={isOpen(item.id)}
              isLastItem={isLastItem}
              isDisabled={isDisabled}
              showDivider={showDivider}
              hideLastDivider={hideLastDivider}
              disableAnimation={disableAnimation}
              chevronSize={chevronSize}
              type={type}
              classNames={classNames}
              motionProps={motionProps}
              onToggle={handleToggle}
            />
          );
        })
      )}
    </div>
  );
};

export { CustomAccordion };
