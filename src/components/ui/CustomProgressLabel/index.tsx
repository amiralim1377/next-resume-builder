"use client";
import { useHover } from "@/hooks/useHover";
import { cn } from "@/utils/cn";
import { CSSProperties, ReactNode } from "react";
import { CustomProgress } from "../CustomProgress";

type CustomProgressLabelClassName = {
  labelClassName?: string | CSSProperties;
  wrapperClassName?: string | CSSProperties;
};

type CustomProgressLabelProps = {
  classNames?: Partial<CustomProgressLabelClassName>;
  children: ReactNode;
  hasProgress?: boolean;
  height?: string | number;
  width?: string | number;
  layout?: "row" | "column";
};

function CustomProgressLabel({
  classNames,
  children,
  hasProgress = true,
  height = 5,
  width = 6,
  layout = "column",
}: CustomProgressLabelProps) {
  const { ref, hovered } = useHover();

  return (
    <div
      className={cn(
        "group relative text-nowrap",
        layout === "row"
          ? "flex flex-row items-center gap-4"
          : "flex flex-col gap-2",
        classNames?.wrapperClassName,
      )}
      ref={ref}
    >
      {layout === "row" ? (
        <>
          {/* Vertical Progress Bar (left side) */}
          {hasProgress && (
            <CustomProgress
              layout={layout}
              height="100%"
              width={width}
              value={hovered ? 100 : 30}
            />
          )}

          {/* Label */}
          <h5 className={cn(classNames?.labelClassName)}>{children}</h5>
        </>
      ) : (
        <>
          <h5 className={cn(classNames?.labelClassName)}>{children}</h5>
          {hasProgress && (
            <CustomProgress
              layout={layout}
              height={height}
              value={hovered ? 100 : 25}
            />
          )}
        </>
      )}
    </div>
  );
}

export { CustomProgressLabel };
