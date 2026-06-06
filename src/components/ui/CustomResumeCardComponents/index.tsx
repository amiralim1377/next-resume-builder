import { cn } from "@/utils/cn";
import { CSSProperties, ReactNode } from "react";

type CustomResumeCardComponentsProps = {
  children: ReactNode;
  calssName?: string;
  style?: CSSProperties;
};

const CustomResumeCardComponents = ({
  children,
  calssName,
  style,
  ...props
}: CustomResumeCardComponentsProps) => {
  return (
    <div
      className={cn(
        "border-ui-border w-full rounded-lg border p-5 shadow-lg",
        calssName,
      )}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};

export { CustomResumeCardComponents };
