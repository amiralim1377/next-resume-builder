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
        "flex flex-col items-start justify-between gap-3",
        className,
      )}
    >
      <div className={cn(classNames?.labelClassName)}>{label}</div>

      <div
        className={cn(
          "border-ui-border w-full rounded-lg border p-5 shadow-lg",
          classNames?.cardClassName,
        )}
        style={style}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};

export { CustomResumeCardComponents };
