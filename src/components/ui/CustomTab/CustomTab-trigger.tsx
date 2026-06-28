import { cn } from "@/utils/cn";
import { useTabsContext } from "./context";

export interface TabTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  ref?: React.Ref<HTMLButtonElement>;
}

const TabTrigger = ({
  value,
  className = "",
  disabled = false,
  ref,
  children,
  onClick,
  onFocus,
  ...props
}: TabTriggerProps) => {
  const context = useTabsContext();
  const isSelected = context.value === value;

  return (
    <button
      id={`${context.baseId}-trigger-${value}`}
      ref={ref}
      type="button"
      disabled={disabled}
      aria-selected={isSelected}
      role="tab"
      aria-controls={`${context.baseId}-panel-${value}`}
      tabIndex={isSelected ? 0 : -1}
      data-state={isSelected ? "active" : "inactive"}
      className={cn(
        "inline-flex items-center justify-center px-4 py-2 text-sm font-medium whitespace-nowrap transition-all",
        "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        "disabled:pointer-events-none disabled:opacity-50",
        isSelected &&
          "bg-white text-black shadow-sm dark:bg-gray-800 dark:text-white",
        className,
      )}
      onClick={(e) => {
        if (!disabled) {
          context.onValueChange(value);
        }
        if (onClick) onClick(e);
      }}
      onFocus={(e) => {
        if (!disabled && context.activationMode === "automatic") {
          context.onValueChange(value);
        }
        if (onFocus) onFocus(e);
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export { TabTrigger };
