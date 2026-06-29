import { useCallback, useId, useState, useMemo } from "react";
import { TabsContext } from "./context";
import { cn } from "@/utils/cn";
import { useLang } from "@/provider/lngProvider";

export interface TabsProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  dir?: "ltr" | "rtl";
  activationMode?: "automatic" | "manual";
  ref?: React.Ref<HTMLDivElement>;
}

const Tabs = ({
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  orientation = "horizontal",
  dir: dirProp,
  activationMode = "automatic",
  className = "",
  id,
  ref,
  children,
  ...props
}: TabsProps) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const { lng } = useLang();

  const dir = dirProp || (lng === "fa" ? "rtl" : "ltr");

  const generatedId = useId();
  const baseId = id || `tabs-${generatedId}`;

  const handleValueChange = useCallback(
    (newValue: string) => {
      if (!isControlled) setUncontrolledValue(newValue);
      if (onValueChange) onValueChange(newValue);
    },
    [isControlled, onValueChange],
  );

  const tabValue = useMemo(
    () => ({
      value,
      onValueChange: handleValueChange,
      orientation,
      dir,
      activationMode,
      baseId,
    }),
    [value, handleValueChange, orientation, dir, activationMode, baseId],
  );

  return (
    <TabsContext.Provider value={tabValue}>
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "vertical" ? "flex-row" : "flex-col",
          className,
        )}
        dir={dir}
        data-orientation={orientation}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
};

Tabs.displayName = "Tabs";

export { Tabs };
