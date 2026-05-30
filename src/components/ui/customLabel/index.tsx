"use client";
import { useHover } from "@/hooks/useHover";
import { cn } from "@/utils/cn";
import { CSSProperties, ReactNode } from "react";
import { CustomProgress } from "../customProgress";

type CustomLabelClassName = {
  labelClassName: string | CSSProperties;
  wrapperClassName: string | CSSProperties;
};

type CustomLabelProps = {
  classNames?: Partial<CustomLabelClassName>;
  children: ReactNode;
};

function CustomLabel({ classNames, children }: CustomLabelProps) {
  const { ref, hovered } = useHover();

  return (
    <div className={cn(classNames?.wrapperClassName)} ref={ref}>
      <h5 className={cn(classNames?.labelClassName)}>{children}</h5>
      <div>
        <CustomProgress height={4} value={hovered ? 100 : 25} />
      </div>
    </div>
  );
}

export { CustomLabel };
