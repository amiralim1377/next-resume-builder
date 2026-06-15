import { cn } from "@/utils/cn";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type TooltipPosition =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end"
  | "left-start"
  | "left-end"
  | "right-start"
  | "right-end";

interface TooltipChildProps {
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
}

interface CustomTooltipProps {
  children: React.ReactElement<TooltipChildProps>;
  label: ReactNode;
  position?: TooltipPosition;
  disabled?: boolean;
  withArrow?: boolean;
  arrowSize?: number;
  arrowOffset?: number;
  arrowPosition?: "center" | "side";
  color?: string;
  withinPortal?: boolean;
  openDelay?: number;
  closeDelay?: number;
  className?: string;
  triggerClassName?: string;
}

const CustomTooltip = ({
  children,
  label,
  position = "top",
  disabled = false,
  withArrow = false,
  arrowSize = 5,
  arrowOffset = 5,
  arrowPosition = "center",
  className,
  triggerClassName,
  color,
  withinPortal = false,
  openDelay = 0,
  closeDelay = 0,
}: CustomTooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [arrowStyles, setArrowStyles] = useState<React.CSSProperties>({});

  const targetRef = useRef<HTMLSpanElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const openTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const calculatePosition = () => {
    if (!targetRef.current || !tooltipRef.current) return;

    const targetRect = targetRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const gap = 15;
    const arrowGap = withArrow ? arrowSize : 0;

    let top = 0;
    let left = 0;
    let arrowTop: number | string = "auto";
    let arrowLeft: number | string = "auto";
    let arrowRight: number | string = "auto";
    let arrowBottom: number | string = "auto";
    let arrowRotate = 0;

    switch (position) {
      case "top":
      case "top-start":
      case "top-end":
        top = targetRect.top - tooltipRect.height - gap - arrowGap;
        if (position === "top-start") {
          left = targetRect.left;
        } else if (position === "top-end") {
          left = targetRect.right - tooltipRect.width;
        } else {
          left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
        }
        if (withArrow) {
          arrowBottom = -arrowSize;
          arrowLeft =
            arrowPosition === "side"
              ? arrowOffset
              : tooltipRect.width / 2 - arrowSize;
          arrowRotate = 45;
        }
        break;

      case "bottom":
      case "bottom-start":
      case "bottom-end":
        top = targetRect.bottom + gap + arrowGap;
        if (position === "bottom-start") {
          left = targetRect.left;
        } else if (position === "bottom-end") {
          left = targetRect.right - tooltipRect.width;
        } else {
          left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
        }
        if (withArrow) {
          arrowTop = -arrowSize;
          arrowLeft =
            arrowPosition === "side"
              ? arrowOffset
              : tooltipRect.width / 2 - arrowSize;
          arrowRotate = 45;
        }
        break;

      case "left":
      case "left-start":
      case "left-end":
        left = targetRect.left - tooltipRect.width - gap - arrowGap;
        if (position === "left-start") {
          top = targetRect.top;
        } else if (position === "left-end") {
          top = targetRect.bottom - tooltipRect.height;
        } else {
          top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2;
        }
        if (withArrow) {
          arrowRight = -arrowSize;
          arrowTop =
            arrowPosition === "side"
              ? arrowOffset
              : tooltipRect.height / 2 - arrowSize;
          arrowRotate = 45;
        }
        break;

      case "right":
      case "right-start":
      case "right-end":
        left = targetRect.right + gap + arrowGap;
        if (position === "right-start") {
          top = targetRect.top;
        } else if (position === "right-end") {
          top = targetRect.bottom - tooltipRect.height;
        } else {
          top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2;
        }
        if (withArrow) {
          arrowLeft = -arrowSize;
          arrowTop =
            arrowPosition === "side"
              ? arrowOffset
              : tooltipRect.height / 2 - arrowSize;
          arrowRotate = 45;
        }
        break;
    }

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (left < 0) left = 8;
    if (left + tooltipRect.width > viewportWidth) {
      left = viewportWidth - tooltipRect.width - 8;
    }
    if (top < 0) top = 8;
    if (top + tooltipRect.height > viewportHeight) {
      top = viewportHeight - tooltipRect.height - 8;
    }

    setTooltipPosition({ top, left });
    setArrowStyles({
      top: arrowTop,
      left: arrowLeft,
      right: arrowRight,
      bottom: arrowBottom,
      transform: `rotate(${arrowRotate}deg)`,
    });
  };

  const handleMouseEnter = () => {
    if (disabled) return;

    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }

    if (openDelay > 0) {
      openTimeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, openDelay);
    } else {
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
    }

    if (closeDelay > 0) {
      closeTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, closeDelay);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      calculatePosition();
      const handleScroll = () => calculatePosition();
      const handleResize = () => calculatePosition();

      window.addEventListener("scroll", handleScroll, true);
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("scroll", handleScroll, true);
        window.removeEventListener("resize", handleResize);
      };
    }
    return undefined;
  }, [isVisible, position, withArrow, arrowSize, arrowOffset, arrowPosition]);

  useEffect(() => {
    return () => {
      if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const clonedChild = React.cloneElement(children, {
    onMouseEnter: (e: React.MouseEvent) => {
      handleMouseEnter();
      children.props.onMouseEnter?.(e);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      handleMouseLeave();
      children.props.onMouseLeave?.(e);
    },
  });

  const tooltipContent = isVisible && !disabled && (
    <span
      ref={tooltipRef}
      className={cn(
        "text-text-secondary bg-accent animate-tooltip pointer-events-none fixed z-50 max-w-75 rounded-sm px-3 py-2 text-xs wrap-break-word shadow-xs",
        className,
      )}
      style={{
        top: tooltipPosition.top,
        left: tooltipPosition.left,
        backgroundColor: color,
      }}
    >
      {label}
      {withArrow && (
        <div
          className={cn("bg-accent pointer-events-none absolute h-1 w-1")}
          style={{
            ...arrowStyles,
            width: arrowSize * 2,
            height: arrowSize * 2,
            backgroundColor: color,
          }}
        />
      )}
    </span>
  );

  return (
    <>
      <span
        ref={targetRef}
        className={cn("inline-flex w-full", triggerClassName)}
      >
        {clonedChild}
      </span>
      {withinPortal && typeof document !== "undefined"
        ? createPortal(tooltipContent, document.body)
        : tooltipContent}
    </>
  );
};

export { CustomTooltip };
