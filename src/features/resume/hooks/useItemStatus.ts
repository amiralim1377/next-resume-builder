import { useMemo } from "react";
import { RowStatus } from "../types/resume.types";

export const useItemStatus = <T>(
  data: T | undefined,
  hasError: boolean,
  engine: { getRowStatus: (d: T, e: boolean) => RowStatus },
): RowStatus => {
  return useMemo(() => {
    return engine.getRowStatus(data as T, hasError);
  }, [data, hasError, engine]);
};
