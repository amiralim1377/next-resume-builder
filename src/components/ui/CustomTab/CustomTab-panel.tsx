import { useTabsContext } from "./context";
import { cn } from "@/utils/cn";

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  forceMount?: boolean;
  ref?: React.Ref<HTMLDivElement>;
}

const TabPanel = ({
  value,
  forceMount = false,
  className = "",
  ref,
  children,
  ...props
}: TabPanelProps) => {
  const context = useTabsContext();
  const isSelected = context.value === value;

  if (!isSelected && !forceMount) return null;

  return (
    <div
      ref={ref}
      role="tabpanel"
      id={`${context.baseId}-panel-${value}`}
      aria-labelledby={`${context.baseId}-trigger-${value}`}
      data-state={isSelected ? "active" : "inactive"}
      tabIndex={0}
      hidden={!isSelected || undefined}
      className={cn(
        "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

TabPanel.displayName = "TabPanel";

export { TabPanel };
