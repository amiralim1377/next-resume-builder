"use client";

import React, {
  CSSProperties,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/utils/cn";

export interface PopoverProps {
  /** Popover content (Popover.Target and Popover.Dropdown) */
  children: ReactNode;
  /** Control popover visibility (controlled mode) */
  opened?: boolean;
  /** Popover position relative to target */
  position?: "top" | "bottom" | "left" | "right";
  /** Popover width */
  width?: number | string;
  /** Show arrow pointing to target */
  withArrow?: boolean;
  /** Shadow size */
  shadow?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Custom styles for dropdown */
  styles?: {
    dropdown?: CSSProperties;
    arrow?: CSSProperties;
  };
  /** Offset from target in pixels */
  offset?: number;
  onClose?: () => void;
}

interface PopoverContextValue {
  opened: boolean;
  targetRef: React.RefObject<HTMLDivElement | null>;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  position: string;
  width: number | string;
  withArrow: boolean;
  shadow: string;
  offset: number;
  styles?: PopoverProps["styles"];
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

function usePopoverContext() {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error(
      "Popover.Target and Popover.Dropdown must be used within Popover",
    );
  }
  return context;
}

export function Popover({
  children,
  onClose,
  opened = false,
  position = "top",
  width = 200,
  withArrow = false,
  shadow = "md",
  styles,
  offset = 8,
}: PopoverProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const contextValue: PopoverContextValue = {
    opened,
    targetRef,
    dropdownRef,
    position,
    width,
    withArrow,
    shadow,
    offset,
    styles,
  };

  useEffect(() => {
    if (!opened) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current || !targetRef.current) return;

      const dropdown = dropdownRef.current;
      const target = targetRef.current;

      if (
        !dropdown.contains(event.target as Node) &&
        !target.contains(event.target as Node)
      ) {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [opened, onClose]);

  return (
    <PopoverContext.Provider value={contextValue}>
      {children}
    </PopoverContext.Provider>
  );
}

interface PopoverTargetProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

function PopoverTarget({ children, className, onClick }: PopoverTargetProps) {
  const { targetRef } = usePopoverContext();

  return (
    <div
      onClick={onClick}
      ref={targetRef}
      className={cn("cursor-pointer", className)}
    >
      {children}
    </div>
  );
}

interface PopoverDropdownProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClose?: () => void;
}

function PopoverDropdown({ children, className, style }: PopoverDropdownProps) {
  const {
    opened,
    dropdownRef,
    targetRef,
    position,
    width,
    withArrow,
    shadow,
    offset,
    styles: popoverStyles,
  } = usePopoverContext();

  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [arrowCoords, setArrowCoords] = useState({ top: 0, left: 0 });

  // Position calculation
  useLayoutEffect(() => {
    if (!opened || !targetRef.current || !dropdownRef.current) return;

    const updatePosition = () => {
      if (!targetRef.current || !dropdownRef.current) return;

      const targetRect = targetRef.current.getBoundingClientRect();
      const dropdownRect = dropdownRef.current.getBoundingClientRect();

      let top = 0;
      let left = 0;
      let arrowTop = 0;
      let arrowLeft = 0;

      switch (position) {
        case "top":
          top = targetRect.top - dropdownRect.height - offset;
          left = targetRect.left + (targetRect.width - dropdownRect.width) / 2;
          // Arrow at bottom center of dropdown
          arrowTop = dropdownRect.height;
          arrowLeft = dropdownRect.width / 2;
          break;

        case "bottom":
          top = targetRect.bottom + offset;
          left = targetRect.left + (targetRect.width - dropdownRect.width) / 2;
          // Arrow at top center of dropdown
          arrowTop = 2;
          arrowLeft = dropdownRect.width / 2;
          break;

        case "left":
          top = targetRect.top + (targetRect.height - dropdownRect.height) / 2;
          left = targetRect.left - dropdownRect.width - offset;
          // Arrow at right center of dropdown
          arrowTop = dropdownRect.height / 2;
          arrowLeft = dropdownRect.width;
          break;

        case "right":
          top = targetRect.top + (targetRect.height - dropdownRect.height) / 2;
          left = targetRect.right + offset;
          // Arrow at left center of dropdown
          arrowTop = dropdownRect.height / 2;
          arrowLeft = -8;
          break;

        default:
          top = targetRect.top - dropdownRect.height - offset;
          left = targetRect.left + (targetRect.width - dropdownRect.width) / 2;
          arrowTop = dropdownRect.height;
          arrowLeft = dropdownRect.width / 2;
      }

      // Keep within viewport
      const padding = 8;
      const maxLeft = window.innerWidth - dropdownRect.width - padding;
      const maxTop = window.innerHeight - dropdownRect.height - padding;

      if (left < padding) left = padding;
      if (left > maxLeft) left = maxLeft;
      if (top < padding) top = padding;
      if (top > maxTop) top = maxTop;

      setCoords({ top, left });
      setArrowCoords({ top: arrowTop, left: arrowLeft });
    };

    updatePosition();

    // Update on scroll and resize
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [opened, position, offset]);

  if (!opened) return null;

  const shadowClass =
    {
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
      xl: "shadow-xl",
    }[shadow] ?? "shadow-md";

  const arrowShadowClass =
    {
      top: "shadow-[2px_2px_4px_rgba(0,0,0,0.1)]",
      bottom: "shadow-[-2px_-2px_4px_rgba(0,0,0,0.1)]",
      left: "shadow-[2px_-2px_4px_rgba(0,0,0,0.1)]",
      right: "shadow-[-2px_2px_4px_rgba(0,0,0,0.1)]",
    }[position] ?? "";

  return createPortal(
    <div
      ref={dropdownRef}
      className={cn(
        "animate-popoverFadeIn bg-accentDark relative z-50 rounded-xl p-3",
        shadowClass,
        className,
      )}
      style={{
        ...popoverStyles?.dropdown,
        ...style,
        position: "fixed",
        top: `${coords.top}px`,
        left: `${coords.left}px`,
        width: typeof width === "number" ? `${width}px` : width,
        zIndex: 1000,
      }}
    >
      {children}
      {withArrow && (
        <div
          className={cn(
            "bg-accentDark pointer-events-none absolute -z-1 h-4 w-4 -translate-1/2 rotate-45",
            arrowShadowClass,
          )}
          style={{
            ...popoverStyles?.arrow,
            top: `${arrowCoords.top}px`,
            left: `${arrowCoords.left}px`,
          }}
        />
      )}
    </div>,
    document.body,
  );
}

Popover.Target = PopoverTarget;
Popover.Dropdown = PopoverDropdown;
