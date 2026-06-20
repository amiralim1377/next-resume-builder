import { cn } from "@/utils/cn";
import { CSSProperties, ReactNode } from "react";

type CustomResumeCardComponentsProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

const CustomResumeCardComponents = ({
  children,
  className,
  style,
  ...props
}: CustomResumeCardComponentsProps) => {
  return (
    <div
      className={cn(
        "border-ui-border w-full rounded-lg border p-5 shadow-lg",
        className,
      )}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};

export { CustomResumeCardComponents };
