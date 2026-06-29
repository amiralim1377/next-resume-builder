import { createContext, useContext } from "react";

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
  orientation: "horizontal" | "vertical";
  dir: "ltr" | "rtl";
  activationMode: "automatic" | "manual";
  baseId: string;
}

export const TabsContext = createContext<TabsContextValue | undefined>(
  undefined,
);

export function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error(
      "throw new Error('Tabs components must be used within a <Tabs> provider.",
    );
  }
  return context;
}
