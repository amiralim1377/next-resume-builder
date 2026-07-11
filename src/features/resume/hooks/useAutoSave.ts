import { useEffect, useMemo, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { set } from "idb-keyval";
import { customDebounce } from "@/utils/debounce";

export type AutoSaveStatus = "idle" | "saving" | "success" | "error";

export const useAutoSave = (key: string = "resume_draft") => {
  const { control } = useFormContext();
  const allValues = useWatch({ control });
  const [status, setStatus] = useState<AutoSaveStatus>("idle");

  const debouncedSave = useMemo(
    () =>
      customDebounce(async (values: unknown) => {
        setStatus("saving");

        try {
          await set(key, values);
          setStatus("success");

          setTimeout(() => {
            setStatus((prev) => (prev === "success" ? "idle" : prev));
          }, 3000);
        } catch (error) {
          setStatus("error");
          console.error("❌ Auto-save execution failed:", error);
        }
      }, 1000),
    [key],
  );

  useEffect(() => {
    const hasData = allValues && Object.keys(allValues).length > 0;

    if (hasData) {
      debouncedSave(allValues);
    }
  }, [allValues, debouncedSave]);

  useEffect(() => {
    return () => {
      debouncedSave.cancel();
    };
  }, [debouncedSave]);

  return { status };
};
