import React, { ReactNode, useState, useMemo } from "react";
import { cn } from "@/utils/cn";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  arrow,
  useHover,
  useFocus,
  useInteractions,
  FloatingPortal,
  FloatingArrow,
  Placement,
} from "@floating-ui/react";

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
  className,
  triggerClassName,
  color,
  withinPortal = true,
  openDelay = 0,
  closeDelay = 0,
}: CustomTooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [arrowEl, setArrowEl] = useState<SVGSVGElement | null>(null);

  const middleware = useMemo(() => {
    const baseMiddleware = [
      offset(10),
      flip({ fallbackAxisSideDirection: "start" }),
      shift({ padding: 8 }),
    ];

    return withArrow
      ? [...baseMiddleware, arrow({ element: arrowEl })]
      : baseMiddleware;
  }, [withArrow, arrowEl]);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: position as Placement,
    whileElementsMounted: autoUpdate,
    middleware,
  });

  const { setReference, setFloating } = refs;

  const delaySettings = useMemo(
    () => ({
      open: openDelay,
      close: closeDelay,
    }),
    [openDelay, closeDelay],
  );

  const hover = useHover(context, {
    enabled: !disabled,
    delay: delaySettings,
  });

  const focus = useFocus(context, {
    enabled: !disabled,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
  ]);

  if (disabled || !label) {
    return (
      <span className={cn("inline-flex w-full", triggerClassName)}>
        {children}
      </span>
    );
  }

  const tooltipContent = isOpen && (
    <div
      ref={setFloating}
      style={{
        ...floatingStyles,
        zIndex: 9999,
        backgroundColor: color,
      }}
      className={cn(
        "text-text-secondary bg-accent pointer-events-none max-w-75 rounded-sm px-3 py-2 text-xs wrap-break-word shadow-xs",
        className,
      )}
      {...getFloatingProps()}
    >
      {label}

      {withArrow && (
        <FloatingArrow
          ref={setArrowEl}
          context={context}
          fill={color || "var(--color-accent)"}
          width={arrowSize * 2.5}
          height={arrowSize * 1.5}
        />
      )}
    </div>
  );

  return (
    <>
      <span
        ref={setReference}
        {...getReferenceProps()}
        className={cn("inline-flex w-full cursor-help", triggerClassName)}
      >
        {children}
      </span>

      {withinPortal && isOpen ? (
        <FloatingPortal>{tooltipContent}</FloatingPortal>
      ) : (
        tooltipContent
      )}
    </>
  );
};

export { CustomTooltip };
