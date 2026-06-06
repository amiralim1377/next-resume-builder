import { ReactNode } from "react";
import { cn } from "@/utils/cn";

export interface CustomRadioGroupProps {
  children: ReactNode;
  className?: string;
  classNames?: {
    root?: string;
    label?: string;
  };
  label?: ReactNode;
  name?: string;
}

const CustomRadioGroup = ({
  children,
  className,
  classNames: customClassNames,
  label,
}: CustomRadioGroupProps) => {
  return (
    <div className={cn("flex flex-col", customClassNames?.root, className)}>
      {label && (
        <div
          className={cn("text-accent mb-2 text-xs", customClassNames?.label)}
        >
          {label}
        </div>
      )}
      <div className={"flex gap-2"}>{children}</div>
    </div>
  );
};

export { CustomRadioGroup };
