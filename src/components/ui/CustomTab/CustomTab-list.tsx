import { useRef, useCallback, KeyboardEvent } from "react";
import { useTabsContext } from "./context";
import { cn } from "@/utils/cn";

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

export const TabsList = ({
  className = "",
  children,
  ref,
  ...props
}: TabsListProps) => {
  const { orientation, dir } = useTabsContext();
  const listRef = useRef<HTMLDivElement>(null);

  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      listRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as React.RefObject<HTMLDivElement | null>).current = node;
      }
    },
    [ref],
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!listRef.current) return;

    const tabs = Array.from(
      listRef.current.querySelectorAll<HTMLElement>(
        '[role="tab"]:not([disabled])',
      ),
    );
    if (!tabs.length) return;

    const currentIndex = tabs.indexOf(document.activeElement as HTMLElement);
    let nextIndex = -1;

    const isRTL = dir === "rtl";
    const isHorizontal = orientation === "horizontal";

    const nextKey = isHorizontal
      ? isRTL
        ? "ArrowLeft"
        : "ArrowRight"
      : "ArrowDown";
    const prevKey = isHorizontal
      ? isRTL
        ? "ArrowRight"
        : "ArrowLeft"
      : "ArrowUp";

    if (e.key === nextKey) {
      nextIndex = currentIndex + 1;
    } else if (e.key === prevKey) {
      nextIndex = currentIndex - 1;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = tabs.length - 1;
    }

    if (nextIndex !== -1) {
      e.preventDefault();
      if (nextIndex >= tabs.length) nextIndex = 0;
      if (nextIndex < 0) nextIndex = tabs.length - 1;

      tabs[nextIndex].focus();
    }
  };

  return (
    <div
      ref={setRefs}
      role="tablist"
      aria-orientation={orientation}
      onKeyDown={handleKeyDown}
      className={cn(
        "flex",
        orientation === "vertical" ? "flex-col" : "flex-row",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
