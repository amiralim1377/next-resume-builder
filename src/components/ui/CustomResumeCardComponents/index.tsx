import { cn } from "@/utils/cn";
import { CSSProperties, ReactNode } from "react";

type CardClassName = {
  labelClassName?: string;
  cardClassName?: string;
};

type CustomResumeCardComponentsProps = {
  children: ReactNode;
  className?: string;
  classNames?: CardClassName;

  style?: CSSProperties;
  label?: ReactNode;
  labelClassName?: string;
};

const CustomResumeCardComponents = ({
  children,
  className,
  classNames,
  style,
  label,
  ...props
}: CustomResumeCardComponentsProps) => {
  return (
    <div
      className={cn(
        "border-ui-border flex flex-col items-start justify-between gap-3 rounded-lg border p-5 shadow-lg",
        className,
      )}
    >
      <div
        className={cn(
          "border-ui-border w-full border-b py-3",
          classNames?.labelClassName,
        )}
      >
        {label}
      </div>

      <div
        className={cn("w-full", classNames?.cardClassName)}
        style={style}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};

export { CustomResumeCardComponents };
